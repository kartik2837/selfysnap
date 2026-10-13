import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { type Brand } from '../../types/brandTypes';

interface State {
  myBrands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: State = { myBrands: [], loading: false, error: null };

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
});

export const createBrandRequest = createAsyncThunk<
  Brand,
  { name: string; certificateUrl: string; certificateNumber: string },
  { rejectValue: string }
>('brand/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/api/brands/seller/request', payload, authHeader());
    return data.brand;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message || 'Failed');
  }
});

export const fetchMyBrands = createAsyncThunk<Brand[], void, { rejectValue: string }>(
  'brand/my',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/brands/seller/my-brands', authHeader());
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Failed');
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(createBrandRequest.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(createBrandRequest.fulfilled, (s, a) => {
        s.loading = false;
        s.myBrands.unshift(a.payload);
      })
      .addCase(createBrandRequest.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(fetchMyBrands.fulfilled, (s, a) => {
        s.myBrands = a.payload;
        s.loading = false;
      });
  },
});

export default brandSlice.reducer;