import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export type RequestStatus =
  | "PENDING"
  | "REJECTED"
  | "APPROVED"
  | "PAID"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED";

export interface FileItem {
  originalName: string;
  url: string;
  size: number;
  type: "reference" | "delivery";
  uploadedAt: string;
}

export interface ServiceRequest {
  _id: string;
  seller: any;
  service: any;
  serviceName: string;
  servicePrice: number;
  serviceCategory: string;
  title: string;
  description: string;
  specificNotes?: string;
  price: number;
  isPriceSet: boolean;
  status: RequestStatus;
  isPaid: boolean;
  payment?: any;
  assignedAdmin?: any;
  rejectionReason?: string;
  deliveryNote?: string;
  files: FileItem[];
  timeline: any[];
  createdAt: string;
}

interface State {
  myRequests: ServiceRequest[];
  allRequests: ServiceRequest[];
  current: ServiceRequest | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: State = {
  myRequests: [],
  allRequests: [],
  current: null,
  loading: false,
  error: null,
  success: null,
};

const authHeader = (): { headers: { Authorization: string } } => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
  },
});

/* ═══════════════════════════════════════════
   SELLER THUNKS
   ═══════════════════════════════════════════ */
export const createServiceRequest = createAsyncThunk<
  ServiceRequest,
  any,
  { rejectValue: string }
>("serviceRequest/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(
      "/api/service-requests/seller/request",
      payload,
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to create request"
    );
  }
});

export const fetchMyServiceRequests = createAsyncThunk<
  ServiceRequest[],
  void,
  { rejectValue: string }
>("serviceRequest/my", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(
      "/api/service-requests/seller/my-requests",
      authHeader()
    );
    return data as ServiceRequest[];
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to fetch requests"
    );
  }
});

/* ═══════════════════════════════════════════
   🔥 RAZORPAY: CREATE ORDER
   ═══════════════════════════════════════════ */
export const createPaymentOrder = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("serviceRequest/createPayment", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.post(
      `/api/service-requests/seller/${id}/create-payment`,
      {},
      authHeader()
    );
    return data;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Payment order failed"
    );
  }
});

/* ═══════════════════════════════════════════
   🔥 RAZORPAY: VERIFY PAYMENT
   ═══════════════════════════════════════════ */
export const verifyServicePayment = createAsyncThunk<
  ServiceRequest,
  any,
  { rejectValue: string }
>("serviceRequest/verifyPayment", async (paymentData, { rejectWithValue }) => {
  try {
    const { data } = await api.post(
      `/api/service-requests/seller/${paymentData.requestId}/verify-payment`,
      {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
      },
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Payment verification failed"
    );
  }
});

export const completeServiceRequest = createAsyncThunk<
  ServiceRequest,
  string,
  { rejectValue: string }
>("serviceRequest/complete", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.post(
      `/api/service-requests/seller/${id}/complete`,
      {},
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Complete failed"
    );
  }
});

/* ═══════════════════════════════════════════
   ADMIN THUNKS
   ═══════════════════════════════════════════ */
export const fetchAllServiceRequests = createAsyncThunk<
  ServiceRequest[],
  string | undefined,
  { rejectValue: string }
>("serviceRequest/all", async (status, { rejectWithValue }) => {
  try {
    const url = status
      ? `/api/service-requests/admin/all?status=${status}`
      : "/api/service-requests/admin/all";
    const { data } = await api.get(url, authHeader());
    return data as ServiceRequest[];
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to fetch all"
    );
  }
});

export const approveServiceRequest = createAsyncThunk<
  ServiceRequest,
  { id: string; price: number; note?: string },
  { rejectValue: string }
>("serviceRequest/approve", async ({ id, price, note }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/service-requests/admin/${id}/approve`,
      { price, note },
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Approve failed");
  }
});

export const rejectServiceRequest = createAsyncThunk<
  ServiceRequest,
  { id: string; reason: string },
  { rejectValue: string }
>("serviceRequest/reject", async ({ id, reason }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/service-requests/admin/${id}/reject`,
      { reason },
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Reject failed");
  }
});

export const assignSelfToRequest = createAsyncThunk<
  ServiceRequest,
  string,
  { rejectValue: string }
>("serviceRequest/assign", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/service-requests/admin/${id}/assign`,
      {},
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Assign failed");
  }
});

export const uploadAndDeliverRequest = createAsyncThunk<
  ServiceRequest,
  { id: string; files: any[]; note: string },
  { rejectValue: string }
>("serviceRequest/deliver", async ({ id, files, note }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/service-requests/admin/${id}/deliver`,
      { files, note },
      authHeader()
    );
    return data.request as ServiceRequest;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Deliver failed");
  }
});

/* ═══════════════════════════════════════════
   HELPER
   ═══════════════════════════════════════════ */
const upsert = (state: any, req: ServiceRequest) => {
  state.current = req;
  const i = state.myRequests.findIndex((x: any) => x._id === req._id);
  if (i >= 0) state.myRequests[i] = req;
  const j = state.allRequests.findIndex((x: any) => x._id === req._id);
  if (j >= 0) state.allRequests[j] = req;
};

/* ═══════════════════════════════════════════
   SLICE
   ═══════════════════════════════════════════ */
const serviceRequestSlice = createSlice({
  name: "serviceRequest",
  initialState,
  reducers: {
    clearCurrentRequest: (s) => {
      s.current = null;
    },
    clearServiceRequestStatus: (s) => {
      s.error = null;
      s.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createServiceRequest.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.success = null;
      })
      .addCase(
        createServiceRequest.fulfilled,
        (s, a: PayloadAction<ServiceRequest>) => {
          s.loading = false;
          s.success = "Request submitted!";
          s.myRequests.unshift(a.payload);
        }
      )
      .addCase(createServiceRequest.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      .addCase(
        fetchMyServiceRequests.fulfilled,
        (s, a: PayloadAction<ServiceRequest[]>) => {
          s.myRequests = a.payload;
        }
      )

      .addCase(
        fetchAllServiceRequests.fulfilled,
        (s, a: PayloadAction<ServiceRequest[]>) => {
          s.allRequests = a.payload;
        }
      )

      /* 🔥 RAZORPAY: Verify payment update */
      .addCase(verifyServicePayment.fulfilled, (s, a) => upsert(s, a.payload))

      .addCase(completeServiceRequest.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(approveServiceRequest.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(rejectServiceRequest.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(assignSelfToRequest.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(uploadAndDeliverRequest.fulfilled, (s, a) => upsert(s, a.payload));
  },
});

export const { clearCurrentRequest, clearServiceRequestStatus } =
  serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;