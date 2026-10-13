import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { createServiceRequest } from "../../../Redux Toolkit/Customer/ServiceRequestSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import { api } from "../../../Config/Api";

const CreateRequest = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    specificNotes: "",
  });
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* Fetch service by slug */
  useEffect(() => {
    if (!slug) return;
    api
      .get(`/api/services/${slug}`)
      .then((res) => setService(res.data))
      .catch((err) => {
        console.error("Failed to load service:", err);
        alert("Service not found");
      });
  }, [slug]);

  /* File upload */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    setUploading(true);
    try {
      const newFiles: any[] = [];
      for (let i = 0; i < uploaded.length; i++) {
        const url = await uploadToCloudinary(uploaded[i]);
        newFiles.push({
          originalName: uploaded[i].name,
          url,
          size: uploaded[i].size,
        });
      }
      setFiles([...files, ...newFiles]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* Submit */
  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("Enter title");
    if (!form.description.trim()) return alert("Enter description");
    if (!slug) return;

    setSubmitting(true);
    const res = await dispatch(
      createServiceRequest({
        serviceSlug: slug,
        ...form,
        files,
      }) as any
    );
    setSubmitting(false);

    if (createServiceRequest.fulfilled.match(res)) {
      alert("✅ Request submitted! Admin will review.");
      navigate("/seller/creative-services/my-requests");
    } else {
      alert("❌ " + res.payload);
    }
  };

  if (!service) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold">
          {service.icon} {service.name}
        </h1>
        <p className="text-white/80 mt-1">
          ₹{service.price} · {service.deliveryDays} days
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <TextField
          fullWidth
          label="Project Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g., Nike Shoes Listing"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Explain what you need..."
        />

        <div>
          <label className="block font-semibold mb-2 text-sm">
            Reference Files (optional)
          </label>
          <input
            type="file"
            id="file-upload"
            multiple
            hidden
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {uploading ? (
              <CircularProgress size={30} />
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 40, color: "#6366f1" }} />
                <p className="text-sm text-gray-600 mt-2">
                  Click to upload files
                </p>
              </>
            )}
          </label>

          {files.length > 0 && (
            <div className="mt-3 space-y-1">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="text-xs text-green-600 flex gap-2"
                >
                  ✅ {f.originalName}
                </div>
              ))}
            </div>
          )}
        </div>

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Specific Notes (optional)"
          value={form.specificNotes}
          onChange={(e) => setForm({ ...form, specificNotes: e.target.value })}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-bold">What happens next?</p>
          <ul className="text-xs text-blue-700 mt-1 list-disc pl-4 space-y-0.5">
            <li>Admin will review your request</li>
            <li>Admin will set the price</li>
            <li>You will pay the amount</li>
            <li>Admin will complete the work</li>
            <li>You will download files and mark complete</li>
          </ul>
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={submitting || uploading}
          sx={{
            py: 2,
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
          }}
        >
          {submitting ? <CircularProgress size={20} /> : "Submit Request"}
        </Button>
      </div>
    </div>
  );
};

export default CreateRequest;