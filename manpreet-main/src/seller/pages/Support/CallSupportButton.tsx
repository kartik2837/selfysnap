import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSupportCall } from "../../../Redux Toolkit/Seller/supportCallSlice";
import { useSocket } from "../../../hooks/useSocket";

const CATEGORIES = [
  { value: "PRODUCT_ISSUE", label: "Product Issue" },
  { value: "ORDER_ISSUE", label: "Order Issue" },
  { value: "PAYMENT_ISSUE", label: "Payment Issue" },
  { value: "TECHNICAL", label: "Technical Problem" },
  { value: "OTHER", label: "Other" },
];

const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

const CallSupportButton = () => {
  const dispatch = useAppDispatch();
  const { supportCall, auth } = useAppSelector((s: any) => s);
  const socket = useSocket();

  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "OTHER",
    priority: "MEDIUM",
  });

  /* Join seller room & listen for incoming calls */
  useEffect(() => {
    if (!socket || !auth?.user) return;

    const sellerId = auth.user._id || auth.user.id;
    socket.emit("join_seller", sellerId);

    socket.on("incoming_call", (data: any) => {
      console.log("📞 Admin is calling:", data);
      setIncomingCall(data);
      if (Notification.permission === "granted") {
        new Notification("📞 Support is calling you!", { body: data.message });
      }
      setTimeout(() => setIncomingCall(null), 30000);
    });

    socket.on("call_resolved", () => setIncomingCall(null));

    return () => {
      socket.off("incoming_call");
      socket.off("call_resolved");
    };
  }, [socket, auth]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = async () => {
    if (!form.subject.trim()) return alert("Please enter a subject");

    const res = await dispatch(createSupportCall(form) as any);
    if (createSupportCall.fulfilled.match(res)) {
      setOpen(false);
      setSnackbarOpen(true);
      setForm({ subject: "", description: "", category: "OTHER", priority: "MEDIUM" });
    } else {
      alert("Failed: " + (res.payload || "Try again"));
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all font-bold"
      >
        <HeadsetMicIcon />
        Call Support
      </button>

      {/* Incoming Call Banner */}
      {incomingCall && (
        <div className="fixed top-4 right-4 z-[9999] bg-green-500 text-white p-4 rounded-xl shadow-2xl max-w-sm animate-pulse">
          <p className="font-bold text-lg">📞 Support is calling!</p>
          <p className="text-sm mt-1">{incomingCall.message}</p>
        </div>
      )}

      {/* Request Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="flex items-center gap-2">
            <HeadsetMicIcon className="text-indigo-600" />
            <span className="font-bold">Request Support Call</span>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="space-y-4 mt-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              Our team will call you within 5-10 minutes during business hours (9 AM - 9 PM).
            </div>

            <TextField
              fullWidth
              label="Subject *"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Brief issue summary"
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Describe your issue"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Explain the problem..."
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                label="Category"
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                label="Priority"
              >
                {PRIORITIES.map((p) => (
                  <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={supportCall.loading}
            sx={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)" }}
          >
            {supportCall.loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : "Request Call"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Support call requested! We'll call you shortly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default CallSupportButton;