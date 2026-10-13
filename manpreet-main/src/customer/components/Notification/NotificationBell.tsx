import React, { useState, useEffect, useRef } from "react";
import {
  Badge,
  IconButton,
  Popover,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../../Redux Toolkit/Customer/notificationSlice";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount, loading } = useAppSelector(
    (state: any) => state.notifications
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // ─── Fetch on Mount + Interval ─────────────────────
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUnreadCount() as any);

      const interval = setInterval(() => {
        dispatch(fetchUnreadCount() as any);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, [dispatch]);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    dispatch(fetchNotifications({ page: 1, limit: 20 }) as any);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notif: any) => {
    if (!notif.isRead) {
      dispatch(markNotificationRead(notif._id) as any);
    }
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
    }
    handleClose();
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead() as any);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(deleteNotification(id) as any);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "ORDER_PLACED":
      case "ORDER_CONFIRMED":
      case "ORDER_SHIPPED":
      case "ORDER_DELIVERED":
        return <ShoppingBagIcon sx={{ fontSize: 18 }} />;
      case "PRICE_DROP":
        return <TrendingDownIcon sx={{ fontSize: 18 }} />;
      case "OFFER":
      case "FLASH_SALE":
        return <LocalOfferIcon sx={{ fontSize: 18 }} />;
      default:
        return <NotificationsIcon sx={{ fontSize: 18 }} />;
    }
  };

  const getColor = (type: string) => {
    if (type.includes("ORDER")) return "#4f46e5";
    if (type === "PRICE_DROP") return "#10b981";
    if (type === "OFFER" || type === "FLASH_SALE") return "#f59e0b";
    if (type === "NEW_PRODUCT") return "#ec4899";
    return "#6b7280";
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    if (seconds < 60) return "अभी";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString("en-IN");
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: "inherit" }}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              fontWeight: "bold",
              fontSize: 10,
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 400,
            maxWidth: "95vw",
            maxHeight: "80vh",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* Header */}
        <Box className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <NotificationsIcon sx={{ color: "white", fontSize: 22 }} />
            <Typography className="font-bold text-white">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                sx={{
                  bgcolor: "#ef4444",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 10,
                  height: 20,
                }}
              />
            )}
          </div>

          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllRead}
              startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: 11,
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              }}
            >
              Mark All Read
            </Button>
          )}
        </Box>

        <Divider />

        {/* Body */}
        <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          {loading ? (
            <Box className="flex justify-center items-center py-10">
              <CircularProgress size={30} />
            </Box>
          ) : notifications.length === 0 ? (
            <Box className="py-12 text-center">
              <NotificationsIcon sx={{ fontSize: 50, color: "#cbd5e1", mb: 1 }} />
              <Typography color="textSecondary" className="text-sm">
                        No Notifications Yet
              </Typography>
            </Box>
          ) : (
            notifications.map((notif: any) => (
              <Box
                key={notif._id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-4 border-b cursor-pointer transition-all hover:bg-gray-50 ${
                  !notif.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: getColor(notif.type),
                    }}
                  >
                    {getIcon(notif.type)}
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Typography className="font-bold text-sm text-gray-900">
                        {notif.title}
                      </Typography>
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>

                    <Typography className="text-xs text-gray-600 mt-1">
                      {notif.message}
                    </Typography>

                    {notif.image && (
                      <img
                        src={notif.image}
                        alt=""
                        className="w-full h-24 object-cover rounded mt-2"
                      />
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <Typography className="text-[10px] text-gray-400">
                        {getTimeAgo(notif.createdAt)}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={(e) => handleDelete(e, notif._id)}
                        sx={{
                          color: "#9ca3af",
                          "&:hover": { color: "#ef4444" },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <Divider />
            <Box className="p-3 text-center bg-gray-50">
              <Typography
                className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline"
                onClick={() => {
                  navigate("/notifications");
                  handleClose();
                }}
              >
                View All Notifications →
              </Typography>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationBell;