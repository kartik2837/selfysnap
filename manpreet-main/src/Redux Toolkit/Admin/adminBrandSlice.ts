import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { type Brand } from '../../types/brandTypes';

interface State {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: State = { brands: [], loading: false, error: null };

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
});

export const fetchAllBrandRequests = createAsyncThunk<
  Brand[],
  string | undefined,
  { rejectValue: string }
>('adminBrand/fetchAll', async (status, { rejectWithValue }) => {
  try {
    const url = status
      ? `/api/brands/admin/all?status=${status}`
      : '/api/brands/admin/all';
    const { data } = await api.get(url, authHeader());
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message || 'Failed');
  }
});

export const approveBrand = createAsyncThunk<Brand, string, { rejectValue: string }>(
  'adminBrand/approve',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/api/brands/admin/${id}/approve`,
        {},
        authHeader()
      );
      return data.brand;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Failed');
    }
  }
);

export const rejectBrand = createAsyncThunk<
  Brand,
  { id: string; reason: string },
  { rejectValue: string }
>('adminBrand/reject', async ({ id, reason }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/brands/admin/${id}/reject`,
      { reason },
      authHeader()
    );
    return data.brand;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message || 'Failed');
  }
});

const adminBrandSlice = createSlice({
  name: 'adminBrand',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchAllBrandRequests.pending, (s) => {
      s.loading = true;
    })
      .addCase(fetchAllBrandRequests.fulfilled, (s, a) => {
        s.brands = a.payload;
        s.loading = false;
      })
      .addCase(fetchAllBrandRequests.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(approveBrand.fulfilled, (s, a) => {
        s.brands = s.brands.map((x) => (x._id === a.payload._id ? a.payload : x));
      })
      .addCase(rejectBrand.fulfilled, (s, a) => {
        s.brands = s.brands.map((x) => (x._id === a.payload._id ? a.payload : x));
      });
  },
});

export default adminBrandSlice.reducer;