// src/admin/pages/Offers/OfferList.tsx

import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  CircularProgress, Alert, TextField, InputAdornment,
  MenuItem, Select, FormControl, InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllOffers,
  deleteOffer,
  toggleOfferStatus,
  notifyOffer,
} from "../../../Redux Toolkit/Admin/offerSlice";
import { useNavigate } from "react-router-dom";

const OfferList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { offers, loading, error } = useAppSelector(
    (state: any) => state.offers
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllOffers({ page: 1, limit: 50, status: statusFilter }) as any);
  }, [dispatch, statusFilter]);

  const handleDelete = (id: string) => {
    if (window.confirm("यह Offer delete करें?")) {
      dispatch(deleteOffer(id) as any);
    }
  };

  const handleToggle = (id: string) => {
    dispatch(toggleOfferStatus(id) as any);
  };

  const handleNotify = (id: string) => {
    if (window.confirm("सभी Users को Notification भेजें?")) {
      dispatch(notifyOffer(id) as any);
    }
  };

  const filtered = offers.filter(
    (o: any) =>
      o.title?.toLowerCase().includes(search.toLowerCase()) ||
      o.offerCode?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusChip = (offer: any) => {
    const now = new Date();
    if (!offer.isActive)
      return <Chip label="Inactive" color="default" size="small" />;
    if (new Date(offer.endDate) < now)
      return <Chip label="Expired" color="error" size="small" />;
    if (new Date(offer.startDate) > now)
      return <Chip label="Upcoming" color="warning" size="small" />;
    return <Chip label="🟢 Live" color="success" size="small" />;
  };

  if (loading && offers.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Paper className="p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Typography variant="h5" className="font-bold text-gray-800">
              🎁 Offers Management
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              सभी Offers देखें, Edit करें, Notification भेजें
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/offers/create")}
            sx={{
              bgcolor: "#4f46e5",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Create New Offer
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <TextField
            size="small"
            placeholder="Search offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </FormControl>
        </div>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-indigo-600">
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Offer
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Type
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Discount
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Validity
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-8">
                    <Typography color="textSecondary">
                      कोई Offers नहीं मिले
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((offer: any) => (
                  <TableRow key={offer._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {offer.bannerImage && (
                          <img
                            src={offer.bannerImage}
                            alt=""
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-bold text-gray-800">
                            {offer.title}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">
                            {offer.offerCode}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={offer.offerType}
                        size="small"
                        sx={{ bgcolor: "#eef2ff", color: "#4f46e5" }}
                      />
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-green-600">
                        {offer.discountPercent}% OFF
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>
                          {new Date(offer.startDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                        <p className="text-gray-500">
                          to{" "}
                          {new Date(offer.endDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusChip(offer)}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center gap-1">
                        <IconButton
                          size="small"
                          onClick={() => handleToggle(offer._id)}
                          title="Toggle Active"
                        >
                          {offer.isActive ? (
                            <ToggleOnIcon sx={{ color: "#10b981" }} />
                          ) : (
                            <ToggleOffIcon sx={{ color: "#9ca3af" }} />
                          )}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleNotify(offer._id)}
                          title="Send Notification"
                        >
                          <NotificationsActiveIcon
                            sx={{ color: "#f59e0b" }}
                          />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/admin/offers/edit/${offer._id}`)
                          }
                          title="Edit"
                        >
                          <EditIcon sx={{ color: "#4f46e5" }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(offer._id)}
                          title="Delete"
                        >
                          <DeleteIcon sx={{ color: "#ef4444" }} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default OfferList;