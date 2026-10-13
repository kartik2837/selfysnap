// src/customer/pages/Offers/OffersPage.tsx

import React, { useEffect } from "react";
import {
  CircularProgress, Alert, Typography, Chip, Button,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchLiveOffers } from "../../../Redux Toolkit/Admin/offerSlice";
import { useNavigate } from "react-router-dom";

const OffersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { liveOffers, loading, error } = useAppSelector(
    (state: any) => state.offers
  );

  useEffect(() => {
    dispatch(fetchLiveOffers() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-full">
          <LocalOfferIcon sx={{ color: "white", fontSize: 28 }} />
          <Typography variant="h5" className="font-bold text-white">
            🎁 Live Offers
          </Typography>
        </div>
        <Typography className="text-gray-500 mt-3">
          {liveOffers.length} Active Offers उपलब्ध हैं
        </Typography>
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveOffers.map((offer: any) => {
          const hoursLeft = Math.ceil(
            (new Date(offer.endDate).getTime() - Date.now()) /
              (1000 * 60 * 60)
          );

          return (
            <div
              key={offer._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/offers/${offer._id}`)}
            >
              {/* Banner */}
              {offer.bannerImage ? (
                <img
                  src={offer.bannerImage}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div
                  className="w-full h-48 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${offer.backgroundColor}, #7c3aed)`,
                  }}
                >
                  <LocalOfferIcon sx={{ fontSize: 80, color: "white" }} />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Typography className="font-bold text-gray-800 text-lg">
                    {offer.title}
                  </Typography>
                  {offer.discountPercent > 0 && (
                    <Chip
                      label={`${offer.discountPercent}% OFF`}
                      size="small"
                      sx={{
                        bgcolor: "#fef3c7",
                        color: "#92400e",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </div>

                <Typography className="text-sm text-gray-600 mb-3">
                  {offer.description}
                </Typography>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    <span className="font-bold">
                      {hoursLeft > 0 ? `${hoursLeft}h left` : "Expired"}
                    </span>
                  </div>
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#4f46e5",
                      fontWeight: "bold",
                    }}
                  >
                    Shop Now →
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {liveOffers.length === 0 && !loading && (
        <div className="text-center py-20">
          <LocalOfferIcon sx={{ fontSize: 80, color: "#cbd5e1" }} />
          <Typography className="text-gray-500 mt-4">
            अभी कोई Live Offer नहीं है
          </Typography>
        </div>
      )}
    </div>
  );
};

export default OffersPage;