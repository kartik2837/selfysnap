// import React, { useState, useRef, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { createReturn, clearReturnError } from "../../Redux Toolkit/Customer/ReturnSlice";
// import { uploadToCloudinary } from "../../util/uploadToCloudnary";

// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   CircularProgress,
//   Typography,
//   IconButton,
//   Alert,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Chip,
// } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import MicIcon from "@mui/icons-material/Mic";
// import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { useNavigate, useParams } from "react-router-dom";

// const ReturnForm = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { orderId } = useParams<{ orderId: string }>();
//   const { loading, error } = useAppSelector((state) => state.return);

//   const [reason, setReason] = useState("");
//   const [description, setDescription] = useState("");
//   const [pickupAddress, setPickupAddress] = useState("");
//   const [activeStep, setActiveStep] = useState(0);

//   const [media, setMedia] = useState<{ images: string[]; videos: string[]; audio: string | null }>({
//     images: [],
//     videos: [],
//     audio: null,
//   });
//   const [uploading, setUploading] = useState(false);

//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   // ✅ Fixed: Use number for browser setTimeout/setInterval
//   const timerRef = useRef<number | null>(null);

//   const steps = ["Reason", "Media Proof", "Address", "Submit"];

//   useEffect(() => {
//     return () => {
//       dispatch(clearReturnError());
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [dispatch]);

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const url = await uploadToCloudinary(file, "image");
//       if (url) setMedia({ ...media, images: [...media.images, url] });
//     } catch {
//       alert("Image upload failed");
//     }
//     setUploading(false);
//   };

//   const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const url = await uploadToCloudinary(file, "video");
//       if (url) setMedia({ ...media, videos: [...media.videos, url] });
//     } catch {
//       alert("Video upload failed");
//     }
//     setUploading(false);
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = recorder;
//       audioChunksRef.current = [];
//       recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
//       recorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//         const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
//         setUploading(true);
//         try {
//           const url = await uploadToCloudinary(file, "audio");
//           if (url) setMedia({ ...media, audio: url });
//         } catch {
//           alert("Audio upload failed");
//         }
//         setUploading(false);
//         stream.getTracks().forEach((track) => track.stop());
//         setRecordingTime(0);
//         if (timerRef.current) clearInterval(timerRef.current);
//       };
//       recorder.start();
//       setIsRecording(true);
//       timerRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
//     } catch {
//       alert("Microphone access denied");
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     setIsRecording(false);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
//   };

//   const removeImage = (index: number) =>
//     setMedia({ ...media, images: media.images.filter((_, i) => i !== index) });
//   const removeVideo = (index: number) =>
//     setMedia({ ...media, videos: media.videos.filter((_, i) => i !== index) });
//   const removeAudio = () => setMedia({ ...media, audio: null });

//   const handleNext = () => {
//     if (activeStep === 0 && !reason) {
//       alert("Please select a reason");
//       return;
//     }
//     if (
//       activeStep === 1 &&
//       media.images.length === 0 &&
//       media.videos.length === 0 &&
//       !media.audio
//     ) {
//       alert("Please upload at least one proof");
//       return;
//     }
//     setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async () => {
//     if (!orderId) {
//       alert("Order ID missing");
//       return;
//     }
//     try {
//       await dispatch(
//         createReturn({
//           orderId,
//           reason,
//           description,
//           media,
//           pickupAddress: pickupAddress || undefined,
//         })
//       ).unwrap();
//       navigate("/my-returns", { state: { success: true } });
//     } catch {
//       // error handled in slice
//     }
//   };

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box className="space-y-4">
//             <Typography variant="h6" fontWeight="600">
//               Why are you returning this product?
//             </Typography>
//             <FormControl fullWidth required>
//               <InputLabel>Return Reason</InputLabel>
//               <Select
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 label="Return Reason"
//               >
//                 <MenuItem value="Defective">Defective / Damaged</MenuItem>
//                 <MenuItem value="Wrong Item">Wrong Item Received</MenuItem>
//                 <MenuItem value="Size Issue">Size / Fit Issue</MenuItem>
//                 <MenuItem value="Not as described">Not as described</MenuItem>
//                 <MenuItem value="Quality Issue">Quality Issue</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Description (Optional)"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Please provide more details..."
//             />
//           </Box>
//         );

//       case 1:
//         return (
//           <Box className="space-y-4">
//             <Typography variant="h6" fontWeight="600">
//               Upload Proof
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Upload images, videos, or record audio.
//             </Typography>
//             <Box className="flex flex-wrap gap-3">
//               <label htmlFor="image-upload">
//                 <Box className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition">
//                   {uploading ? (
//                     <CircularProgress size={24} />
//                   ) : (
//                     <AddPhotoAlternateIcon className="text-gray-500" />
//                   )}
//                   <input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={handleImageUpload}
//                   />
//                 </Box>
//                 <Typography variant="caption" display="block" align="center">
//                   Image
//                 </Typography>
//               </label>

//               <label htmlFor="video-upload">
//                 <Box className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition">
//                   <VideocamIcon className="text-gray-500" />
//                   <input
//                     id="video-upload"
//                     type="file"
//                     accept="video/*"
//                     hidden
//                     onChange={handleVideoUpload}
//                   />
//                 </Box>
//                 <Typography variant="caption" display="block" align="center">
//                   Video
//                 </Typography>
//               </label>

//               <Box
//                 className={`w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
//                   isRecording
//                     ? "border-red-500 bg-red-50"
//                     : "border-gray-300 hover:border-primary hover:bg-gray-50"
//                 }`}
//                 onClick={isRecording ? stopRecording : startRecording}
//               >
//                 {isRecording ? (
//                   <>
//                     <MicIcon className="text-red-500 animate-pulse" />
//                     <Typography variant="caption" className="text-red-500">
//                       {formatTime(recordingTime)}
//                     </Typography>
//                   </>
//                 ) : (
//                   <MicIcon className="text-gray-500" />
//                 )}
//                 <Typography variant="caption" display="block" align="center">
//                   {isRecording ? "Stop" : "Record"}
//                 </Typography>
//               </Box>
//             </Box>

//             {media.images.length > 0 && (
//               <Box>
//                 <Typography variant="subtitle2">Images ({media.images.length})</Typography>
//                 <Box className="flex flex-wrap gap-2 mt-1">
//                   {media.images.map((img, i) => (
//                     <Box key={i} className="relative w-16 h-16">
//                       <img
//                         src={img}
//                         className="w-full h-full object-cover rounded border"
//                         alt=""
//                       />
//                       <IconButton
//                         size="small"
//                         onClick={() => removeImage(i)}
//                         className="absolute -top-2 -right-2 bg-white shadow-sm"
//                       >
//                         <CloseIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             )}

//             {media.videos.length > 0 && (
//               <Box>
//                 <Typography variant="subtitle2">Videos ({media.videos.length})</Typography>
//                 <Box className="flex flex-wrap gap-2 mt-1">
//                   {media.videos.map((vid, i) => (
//                     <Box key={i} className="relative w-16 h-16">
//                       <video
//                         src={vid}
//                         className="w-full h-full object-cover rounded border"
//                       />
//                       <IconButton
//                         size="small"
//                         onClick={() => removeVideo(i)}
//                         className="absolute -top-2 -right-2 bg-white shadow-sm"
//                       >
//                         <CloseIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             )}

//             {media.audio && (
//               <Box className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 max-w-md">
//                 <audio controls src={media.audio} className="h-8" />
//                 <IconButton size="small" onClick={removeAudio}>
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>
//         );

//       case 2:
//         return (
//           <Box className="space-y-4">
//             <Typography variant="h6" fontWeight="600">
//               Pickup Address
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Where should the product be picked up?
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Pickup Address"
//               placeholder="Enter full address"
//               value={pickupAddress}
//               onChange={(e) => setPickupAddress(e.target.value)}
//               helperText="Leave empty to use order delivery address"
//             />
//           </Box>
//         );

//       case 3:
//         return (
//           <Box className="space-y-4">
//             <Typography variant="h6" fontWeight="600">
//               Review & Submit
//             </Typography>
//             <Paper className="p-4 bg-gray-50 rounded-lg space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Reason</span>
//                 <span className="font-medium">{reason}</span>
//               </div>
//               {description && (
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Description</span>
//                   <span className="font-medium">{description}</span>
//                 </div>
//               )}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Media</span>
//                 <span className="font-medium">
//                   {media.images.length} images, {media.videos.length} videos{" "}
//                   {media.audio ? ", 1 audio" : ""}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Pickup Address</span>
//                 <span className="font-medium">{pickupAddress || "Order address"}</span>
//               </div>
//             </Paper>
//             <Chip
//               icon={<CheckCircleIcon />}
//               label="Please verify all details before submitting"
//               color="info"
//               variant="outlined"
//             />
//           </Box>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Box className="max-w-2xl mx-auto p-4">
//       <Paper className="p-6 rounded-xl shadow-lg">
//         <Typography variant="h4" fontWeight="bold" className="mb-2">
//           Return Request
//         </Typography>
//         <Typography variant="body2" color="text.secondary" className="mb-6">
//           Order #{orderId?.slice(-6)}
//         </Typography>

//         {error && (
//           <Alert
//             severity="error"
//             className="mb-4"
//             onClose={() => dispatch(clearReturnError())}
//           >
//             {error}
//           </Alert>
//         )}

//         <Stepper activeStep={activeStep} alternativeLabel className="mb-6">
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         <Box className="min-h-[300px]">{renderStepContent(activeStep)}</Box>

//         <Box className="flex justify-between mt-6 pt-4 border-t">
//           <Button onClick={handleBack} disabled={activeStep === 0}>
//             Back
//           </Button>
//           <Box className="flex gap-2">
//             {activeStep === steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="px-8"
//               >
//                 {loading ? <CircularProgress size={24} /> : "Submit Return"}
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={loading}
//               >
//                 Next
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ReturnForm;



import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { createReturn, clearReturnError } from "../../Redux Toolkit/Customer/ReturnSlice";
import { uploadToCloudinary } from "../../util/uploadToCloudnary";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";

const ReturnForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { loading, error } = useAppSelector((state) => state.return);

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const [media, setMedia] = useState<{ images: string[]; videos: string[]; audio: string | null }>({
    images: [],
    videos: [],
    audio: null,
  });
  const [uploading, setUploading] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // ✅ Fixed: Use number for browser setTimeout/setInterval (window.setInterval returns number)
  const timerRef = useRef<number | null>(null);

  const steps = ["Reason", "Media Proof", "Address", "Submit"];

  useEffect(() => {
    return () => {
      dispatch(clearReturnError());
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [dispatch]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      if (url) setMedia({ ...media, images: [...media.images, url] });
    } catch {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "video");
      if (url) setMedia({ ...media, videos: [...media.videos, url] });
    } catch {
      alert("Video upload failed");
    }
    setUploading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
        setUploading(true);
        try {
          const url = await uploadToCloudinary(file, "audio");
          if (url) setMedia({ ...media, audio: url });
        } catch {
          alert("Audio upload failed");
        }
        setUploading(false);
        stream.getTracks().forEach((track) => track.stop());
        setRecordingTime(0);
        if (timerRef.current) window.clearInterval(timerRef.current);
      };
      recorder.start();
      setIsRecording(true);
      timerRef.current = window.setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } catch {
      alert("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const removeImage = (index: number) =>
    setMedia({ ...media, images: media.images.filter((_, i) => i !== index) });
  const removeVideo = (index: number) =>
    setMedia({ ...media, videos: media.videos.filter((_, i) => i !== index) });
  const removeAudio = () => setMedia({ ...media, audio: null });

  const handleNext = () => {
    if (activeStep === 0 && !reason) {
      alert("Please select a reason");
      return;
    }
    if (
      activeStep === 1 &&
      media.images.length === 0 &&
      media.videos.length === 0 &&
      !media.audio
    ) {
      alert("Please upload at least one proof");
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!orderId) {
      alert("Order ID missing");
      return;
    }
    try {
      await dispatch(
        createReturn({
          orderId,
          reason,
          description,
          media,
          pickupAddress: pickupAddress || undefined,
        })
      ).unwrap();
      navigate("/my-returns", { state: { success: true } });
    } catch {
      // error handled in slice
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-4">
            <Typography variant="h6" fontWeight="600">
              Why are you returning this product?
            </Typography>
            <FormControl fullWidth required>
              <InputLabel>Return Reason</InputLabel>
              <Select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                label="Return Reason"
              >
                <MenuItem value="Defective">Defective / Damaged</MenuItem>
                <MenuItem value="Wrong Item">Wrong Item Received</MenuItem>
                <MenuItem value="Size Issue">Size / Fit Issue</MenuItem>
                <MenuItem value="Not as described">Not as described</MenuItem>
                <MenuItem value="Quality Issue">Quality Issue</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details..."
            />
          </Box>
        );

      case 1:
        return (
          <Box className="space-y-4">
            <Typography variant="h6" fontWeight="600">
              Upload Proof
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload images, videos, or record audio.
            </Typography>
            <Box className="flex flex-wrap gap-3">
              <label htmlFor="image-upload">
                <Box className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition">
                  {uploading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <AddPhotoAlternateIcon className="text-gray-500" />
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Box>
                <Typography variant="caption" display="block" align="center">
                  Image
                </Typography>
              </label>

              <label htmlFor="video-upload">
                <Box className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition">
                  <VideocamIcon className="text-gray-500" />
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleVideoUpload}
                  />
                </Box>
                <Typography variant="caption" display="block" align="center">
                  Video
                </Typography>
              </label>

              <Box
                className={`w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
                  isRecording
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-primary hover:bg-gray-50"
                }`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <MicIcon className="text-red-500 animate-pulse" />
                    <Typography variant="caption" className="text-red-500">
                      {formatTime(recordingTime)}
                    </Typography>
                  </>
                ) : (
                  <MicIcon className="text-gray-500" />
                )}
                <Typography variant="caption" display="block" align="center">
                  {isRecording ? "Stop" : "Record"}
                </Typography>
              </Box>
            </Box>

            {media.images.length > 0 && (
              <Box>
                <Typography variant="subtitle2">Images ({media.images.length})</Typography>
                <Box className="flex flex-wrap gap-2 mt-1">
                  {media.images.map((img, i) => (
                    <Box key={i} className="relative w-16 h-16">
                      <img
                        src={img}
                        className="w-full h-full object-cover rounded border"
                        alt=""
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 bg-white shadow-sm"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {media.videos.length > 0 && (
              <Box>
                <Typography variant="subtitle2">Videos ({media.videos.length})</Typography>
                <Box className="flex flex-wrap gap-2 mt-1">
                  {media.videos.map((vid, i) => (
                    <Box key={i} className="relative w-16 h-16">
                      <video
                        src={vid}
                        className="w-full h-full object-cover rounded border"
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeVideo(i)}
                        className="absolute -top-2 -right-2 bg-white shadow-sm"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {media.audio && (
              <Box className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 max-w-md">
                <audio controls src={media.audio} className="h-8" />
                <IconButton size="small" onClick={removeAudio}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        );

      case 2:
        return (
          <Box className="space-y-4">
            <Typography variant="h6" fontWeight="600">
              Pickup Address
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Where should the product be picked up?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Pickup Address"
              placeholder="Enter full address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              helperText="Leave empty to use order delivery address"
            />
          </Box>
        );

      case 3:
        return (
          <Box className="space-y-4">
            <Typography variant="h6" fontWeight="600">
              Review & Submit
            </Typography>
            <Paper className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Reason</span>
                <span className="font-medium">{reason}</span>
              </div>
              {description && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Description</span>
                  <span className="font-medium">{description}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Media</span>
                <span className="font-medium">
                  {media.images.length} images, {media.videos.length} videos{" "}
                  {media.audio ? ", 1 audio" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Address</span>
                <span className="font-medium">{pickupAddress || "Order address"}</span>
              </div>
            </Paper>
            <Chip
              icon={<CheckCircleIcon />}
              label="Please verify all details before submitting"
              color="info"
              variant="outlined"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box className="max-w-2xl mx-auto p-4">
      <Paper className="p-6 rounded-xl shadow-lg">
        <Typography variant="h4" fontWeight="bold" className="mb-2">
          Return Request
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-6">
          Order #{orderId?.slice(-6)}
        </Typography>

        {error && (
          <Alert
            severity="error"
            className="mb-4"
            onClose={() => dispatch(clearReturnError())}
          >
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} alternativeLabel className="mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className="min-h-[300px]">{renderStepContent(activeStep)}</Box>

        <Box className="flex justify-between mt-6 pt-4 border-t">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Box className="flex gap-2">
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8"
              >
                {loading ? <CircularProgress size={24} /> : "Submit Return"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={loading}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReturnForm;








