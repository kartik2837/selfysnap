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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllBrandRequests,
  approveBrand,
  rejectBrand,
} from "../../../Redux Toolkit/Admin/adminBrandSlice";

const statusColors: any = {
  PENDING: "#f59e0b",
  APPROVED: "#16a34a",
  REJECTED: "#dc2626",
};

const FILTERS = ["all", "PENDING", "APPROVED", "REJECTED"];

const AdminBrands = () => {
  const dispatch = useAppDispatch();
  const { adminBrand } = useAppSelector((s: any) => s);

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchAllBrandRequests(filter === "all" ? undefined : filter) as any);
  }, [filter, dispatch]);

  const handleApprove = async () => {
    await dispatch(approveBrand(selected._id) as any);
    setOpen(false);
    dispatch(fetchAllBrandRequests(filter === "all" ? undefined : filter) as any);
    alert("✅ Brand approved!");
  };

  const handleReject = async () => {
    if (!reason.trim()) return alert("Enter rejection reason");
    await dispatch(rejectBrand({ id: selected._id, reason }) as any);
    setReason("");
    setOpen(false);
    dispatch(fetchAllBrandRequests(filter === "all" ? undefined : filter) as any);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏷️ Brand Certificate Requests</h1>

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

      {adminBrand.loading ? (
        <div className="text-center py-10"><CircularProgress /></div>
      ) : adminBrand.brands?.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          <p className="text-gray-500">No brand requests</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase">Brand</th>
                <th className="px-4 py-3 text-left text-xs uppercase">Seller</th>
                <th className="px-4 py-3 text-left text-xs uppercase">Cert No.</th>
                <th className="px-4 py-3 text-center text-xs uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminBrand.brands.map((b: any) => (
                <tr key={b._id} className="border-b hover:bg-indigo-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-sm">{b.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{b.seller?.sellerName}</p>
                    <p className="text-xs text-gray-500">{b.seller?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{b.certificateNumber}</td>
                  <td className="px-4 py-3 text-center">
                    <Chip
                      label={b.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors[b.status],
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSelected(b);
                        setOpen(true);
                      }}
                    >
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
            <DialogTitle>🏷️ {selected.name}</DialogTitle>
            <DialogContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="font-bold text-sm">👤 Seller</p>
                  <p className="text-sm">{selected.seller?.sellerName}</p>
                  <p className="text-xs text-gray-600">📧 {selected.seller?.email}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-bold text-sm">📋 Certificate Info</p>
                  <p className="text-sm mt-1">
                    <b>Number:</b> {selected.certificateNumber}
                  </p>
                  <a
                    href={selected.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 underline mt-2 block"
                  >
                    📎 View Certificate
                  </a>
                </div>

                {selected.status === "PENDING" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Rejection Reason (if rejecting)"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                )}

                {selected.status === "APPROVED" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                    <CheckCircleIcon sx={{ color: "#16a34a" }} />
                    <p className="text-sm font-semibold text-green-800">
                      Approved on{" "}
                      {selected.approvedAt
                        ? new Date(selected.approvedAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                )}

                {selected.status === "REJECTED" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                    <CancelIcon sx={{ color: "#dc2626" }} />
                    <p className="text-sm font-semibold text-red-800">
                      Rejected: {selected.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
              {selected.status === "PENDING" && (
                <>
                  <Button color="error" onClick={handleReject}>
                    Reject
                  </Button>
                  <Button color="success" variant="contained" onClick={handleApprove}>
                    Approve
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AdminBrands;