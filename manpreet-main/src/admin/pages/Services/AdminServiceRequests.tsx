import { useEffect, useState } from "react";
import {
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllServiceRequests,
  approveServiceRequest,
  rejectServiceRequest,
  assignSelfToRequest,
  uploadAndDeliverRequest,
} from "../../../Redux Toolkit/Customer/ServiceRequestSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import { forceDownload } from "../../../util/downloadHelper";

const statusColors: any = {
  PENDING: "#f59e0b",
  REJECTED: "#dc2626",
  APPROVED: "#3b82f6",
  PAID: "#10b981",
  IN_PROGRESS: "#8b5cf6",
  DELIVERED: "#06b6d4",
  COMPLETED: "#16a34a",
};

const FILTERS = ["all", "PENDING", "APPROVED", "PAID", "IN_PROGRESS", "DELIVERED", "COMPLETED"];

const isImage = (filename: string) =>
  /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(filename);

const isZip = (filename: string) =>
  /\.(zip|rar|7z|tar|gz)$/i.test(filename);

const AdminServiceRequests = () => {
  const dispatch = useAppDispatch();
  const { serviceRequest } = useAppSelector((s: any) => s);

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
  const [deliveryFiles, setDeliveryFiles] = useState<any[]>([]);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllServiceRequests(filter === "all" ? undefined : filter) as any);
  }, [filter, dispatch]);

  const openDialog = (r: any) => {
    setSelected(r);
    setOpen(true);
    setPrice(r.price ? String(r.price) : "");
    setDeliveryFiles(r.files?.filter((f: any) => f.type === "delivery") || []);
    setDeliveryNote(r.deliveryNote || "");
    setReason("");
  };

  const handleApprove = async () => {
    if (!price || Number(price) <= 0) return alert("Enter valid price");
    await dispatch(approveServiceRequest({ id: selected._id, price: Number(price) }) as any);
    setOpen(false);
    dispatch(fetchAllServiceRequests(filter === "all" ? undefined : filter) as any);
    alert("✅ Approved!");
  };

  const handleReject = async () => {
    if (!reason.trim()) return alert("Enter reason");
    await dispatch(rejectServiceRequest({ id: selected._id, reason }) as any);
    setOpen(false);
    dispatch(fetchAllServiceRequests(filter === "all" ? undefined : filter) as any);
  };

  const handleAssignSelf = async () => {
    await dispatch(assignSelfToRequest(selected._id) as any);
    setOpen(false);
    dispatch(fetchAllServiceRequests(filter === "all" ? undefined : filter) as any);
    alert("✅ Assigned to you!");
  };

  const handleFileUpload = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const newFiles: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadToCloudinary(file);
        newFiles.push({
          originalName: file.name,
          url,
          size: file.size,
          fileType: file.type,
        });
      }
      setDeliveryFiles([...deliveryFiles, ...newFiles]);
      e.target.value = "";
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setDeliveryFiles(deliveryFiles.filter((_, i) => i !== index));
  };

  const handleDeliver = async () => {
    if (deliveryFiles.length === 0) return alert("Upload at least one file");
    await dispatch(
      uploadAndDeliverRequest({
        id: selected._id,
        files: deliveryFiles,
        note: deliveryNote,
      }) as any
    );
    setOpen(false);
    dispatch(fetchAllServiceRequests(filter === "all" ? undefined : filter) as any);
    alert("✅ Files delivered!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎨 Service Requests</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {serviceRequest.loading ? (
        <div className="text-center py-10"><CircularProgress /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs">Seller</th>
                <th className="px-4 py-3 text-left text-xs">Service</th>
                <th className="px-4 py-3 text-center text-xs">Price</th>
                <th className="px-4 py-3 text-center text-xs">Status</th>
                <th className="px-4 py-3 text-center text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequest.allRequests?.map((r: any) => (
                <tr key={r._id} className="border-b hover:bg-indigo-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-sm">
                      {r.seller?.sellerName || r.seller?.fullName || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      📞 {r.seller?.mobile || "N/A"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{r.serviceName}</p>
                    <p className="text-xs text-gray-500">{r.title}</p>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">
                    {r.price > 0 ? `₹${r.price}` : "TBD"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Chip
                      label={r.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors[r.status],
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button size="small" variant="outlined" onClick={() => openDialog(r)}>
                      Open
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        {selected && (
          <>
            <DialogTitle>{selected.serviceName} — {selected.title}</DialogTitle>
            <DialogContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="font-bold text-sm">Seller</p>
                  <p className="text-sm">{selected.seller?.sellerName || selected.seller?.fullName}</p>
                  <p className="text-xs">📞 {selected.seller?.mobile}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-sm">Request</p>
                  <p className="text-sm">{selected.description}</p>
                  {selected.specificNotes && (
                    <p className="text-xs mt-1 text-gray-600">Notes: {selected.specificNotes}</p>
                  )}
                </div>

                {/* SELLER REFERENCE FILES */}
                {selected.files?.filter((f: any) => f.type === "reference").length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">📎 Seller Reference Files</p>
                    <div className="flex flex-wrap gap-3">
                      {selected.files
                        .filter((f: any) => f.type === "reference")
                        .map((f: any, i: number) => (
                          <div key={i}>
                            {isImage(f.originalName) ? (
                              <div className="relative">
                                <img
                                  src={f.url}
                                  alt={f.originalName}
                                  className="w-28 h-28 object-cover rounded-lg border-2 border-white shadow cursor-pointer"
                                  onClick={() => window.open(f.url, "_blank")}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    forceDownload(f.url, f.originalName);
                                  }}
                                  className="absolute bottom-1 right-1 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-green-700"
                                  title="Download"
                                >
                                  ⬇
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => forceDownload(f.url, f.originalName)}
                                className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-400 text-xs text-gray-600 p-2 transition"
                                title="Click to download"
                              >
                                <span className="text-3xl mb-1">
                                  {isZip(f.originalName) ? "📦" : "📄"}
                                </span>
                                <span className="truncate w-full text-center font-semibold">
                                  {f.originalName}
                                </span>
                                <span className="text-green-600 text-xs mt-1 font-bold">⬇ Download</span>
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {selected.status === "PENDING" && (
                  <>
                    <TextField
                      fullWidth
                      type="number"
                      label="Set Price (₹)"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Reject Reason (if rejecting)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </>
                )}

                {selected.status === "PAID" && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-sm font-bold text-green-800">
                      ✅ Payment received: ₹{selected.price}
                    </p>
                  </div>
                )}

                {selected.status === "IN_PROGRESS" && (
                  <>
                    <div>
                      <p className="font-bold text-sm mb-2">📤 Upload Delivered Files</p>
                      <p className="text-xs text-gray-500 mb-2">
                        Images, PDF, ZIP, Video — sab support hai
                      </p>

                      <input
                        type="file"
                        id="df"
                        multiple
                        hidden
                        onChange={handleFileUpload}
                        accept="image/*,application/pdf,.zip,.rar,.7z,.mp4,.mov,.doc,.docx,.xls,.xlsx"
                      />

                      <label
                        htmlFor="df"
                        className="block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                      >
                        {uploading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <>
                            <CloudUploadIcon sx={{ fontSize: 40, color: "#6366f1" }} />
                            <p className="text-sm mt-1 font-semibold">Click to upload files</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              JPG, PNG, PDF, ZIP, MP4 (multiple select)
                            </p>
                          </>
                        )}
                      </label>

                      {deliveryFiles.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-bold text-gray-600 mb-2">
                            {deliveryFiles.length} file(s) ready to deliver
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {deliveryFiles.map((f: any, i: number) => (
                              <div key={i} className="relative">
                                {isImage(f.originalName) ? (
                                  <img
                                    src={f.url}
                                    alt={f.originalName}
                                    className="w-24 h-24 object-cover rounded border-2 border-green-200 shadow"
                                  />
                                ) : isZip(f.originalName) ? (
                                  <div className="w-24 h-24 bg-yellow-50 rounded border-2 border-yellow-200 flex flex-col items-center justify-center">
                                    <span className="text-3xl">📦</span>
                                    <span className="text-[10px] text-gray-600 truncate w-full px-1 text-center mt-1">
                                      {f.originalName}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="w-24 h-24 bg-gray-50 rounded border-2 border-gray-200 flex flex-col items-center justify-center">
                                    <InsertDriveFileIcon sx={{ fontSize: 32, color: "#6366f1" }} />
                                    <span className="text-[10px] text-gray-600 truncate w-full px-1 text-center mt-1">
                                      {f.originalName}
                                    </span>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => removeFile(i)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Delivery Notes"
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                    />
                  </>
                )}

                {/* DELIVERED FILES */}
                {["DELIVERED", "COMPLETED"].includes(selected.status) &&
                  selected.files?.filter((f: any) => f.type === "delivery").length > 0 && (
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <p className="font-bold text-sm mb-2">📁 Delivered Files</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.files
                          .filter((f: any) => f.type === "delivery")
                          .map((f: any, i: number) => (
                            <div key={i}>
                              {isImage(f.originalName) ? (
                                <div className="relative">
                                  <img
                                    src={f.url}
                                    alt={f.originalName}
                                    className="w-20 h-20 object-cover rounded border cursor-pointer"
                                    onClick={() => window.open(f.url, "_blank")}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      forceDownload(f.url, f.originalName);
                                    }}
                                    className="absolute bottom-1 right-1 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-green-700 text-xs"
                                  >
                                    ⬇
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => forceDownload(f.url, f.originalName)}
                                  className="flex flex-col items-center justify-center w-20 h-20 bg-white rounded border-2 border-gray-200 hover:border-indigo-400 text-[10px] text-gray-600 p-1"
                                >
                                  {isZip(f.originalName) ? "📦" : "📄"}
                                  <span className="truncate w-full text-center px-1 mt-1 font-semibold">
                                    {f.originalName}
                                  </span>
                                  <span className="text-green-600 font-bold mt-0.5">⬇</span>
                                </button>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
              {selected.status === "PENDING" && (
                <>
                  <Button color="error" onClick={handleReject}>Reject</Button>
                  <Button color="success" variant="contained" onClick={handleApprove}>
                    Approve & Set Price
                  </Button>
                </>
              )}
              {selected.status === "PAID" && (
                <Button color="primary" variant="contained" onClick={handleAssignSelf}>
                  Assign to Me
                </Button>
              )}
              {selected.status === "IN_PROGRESS" && (
                <Button color="primary" variant="contained" onClick={handleDeliver}>
                  Deliver Files
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AdminServiceRequests;