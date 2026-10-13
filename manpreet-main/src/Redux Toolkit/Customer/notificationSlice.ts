import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// ─── Fetch Notifications ─────────────────────────────
export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async (
    { page = 1, limit = 20 }: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/api/notifications", {
        params: { page, limit },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Fetch Unread Count ──────────────────────────────
export const fetchUnreadCount = createAsyncThunk(
  "notification/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/notifications/unread-count");
      return res.data.count;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Mark as Read ────────────────────────────────────
export const markNotificationRead = createAsyncThunk(
  "notification/markRead",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Mark All as Read ────────────────────────────────
export const markAllNotificationsRead = createAsyncThunk(
  "notification/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/api/notifications/read-all");
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Delete Notification ─────────────────────────────
export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/notifications/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ───────────────────────────────────────────
interface NotificationState {
  notifications: any[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotifications: () => initialState,
    incrementUnread: (state) => {
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data || [];
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.notifications.find((n) => n._id === id);
        if (notif && !notif.isRead) {
          notif.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload
        );
      });
  },
});

export const { clearNotifications, incrementUnread } = notificationSlice.actions;
export default notificationSlice.reducer;