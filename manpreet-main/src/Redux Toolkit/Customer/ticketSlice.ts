import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ticketApi } from '../../customer/services/ticketApi';
import type {
    Ticket,
    TicketFilters,
    TicketStatus,
    TicketCategoryItem,
    TicketPagination
} from '../../types/ticket.types';

interface Counts { open: number; inProgress: number; resolved: number; closed: number; }

interface TicketState {
    tickets: Ticket[];
    counts: Counts;
    pagination: TicketPagination;
    currentTicket: Ticket | null;
    categories: TicketCategoryItem[];
    filters: TicketFilters;
    loading: {
        list: boolean; detail: boolean; create: boolean;
        message: boolean; action: boolean;
    };
    error: string | null;
    lastCreatedTicket: Ticket | null;
}

const initialState: TicketState = {
    tickets: [],
    counts: { open: 0, inProgress: 0, resolved: 0, closed: 0 },
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    currentTicket: null,
    categories: [],
    filters: {
        status: 'all',
        priority: 'all',
        category: 'all',
        assignedTo: 'all',
        search: '',
        page: 1
    },
    loading: { list: false, detail: false, create: false, message: false, action: false },
    error: null,
    lastCreatedTicket: null
};

// ============ THUNKS ============

export const fetchCategories = createAsyncThunk<
    TicketCategoryItem[], void, { rejectValue: string }
>('tickets/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const res = await ticketApi.getCategories();
        return res.data.categories || [];
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// ✅ FIXED: Safe access to stats/counts
export const fetchMyTickets = createAsyncThunk<
    { tickets: Ticket[]; counts: Counts; pagination: TicketPagination },
    Partial<TicketFilters>,
    { rejectValue: string }
>('tickets/fetchMy', async (filters, { rejectWithValue }) => {
    try {
        const res = await ticketApi.getMyTickets(filters);
        const data: any = res?.data || {};
        const stats: any = data.stats || data.counts || {};

        const counts: Counts = {
            open: Number(stats.open) || 0,
            inProgress: Number(stats.inProgress) || 0,
            resolved: Number(stats.resolved) || 0,
            closed: Number(stats.closed) || 0
        };

        const pag = data.pagination || {};

        return {
            tickets: Array.isArray(data.tickets) ? data.tickets : [],
            counts,
            pagination: {
                page: Number(pag.page) || 1,
                limit: Number(pag.limit) || 10,
                total: Number(pag.total) || 0,
                pages: Number(pag.pages) || 0
            }
        };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const fetchTicketDetail = createAsyncThunk<Ticket, string, { rejectValue: string }>(
    'tickets/fetchDetail',
    async (ticketId, { rejectWithValue }) => {
        try {
            const res = await ticketApi.getTicketDetail(ticketId);
            return res.data.ticket;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const createTicket = createAsyncThunk<
    Ticket, any, { rejectValue: string }
>('tickets/create', async (data, { rejectWithValue }) => {
    try {
        const res = await ticketApi.createTicket(data);
        return res.data.ticket;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const sendTicketMessage = createAsyncThunk<
    any, { ticketId: string; message: string; attachments?: string[] },
    { rejectValue: string }
>('tickets/sendMessage', async ({ ticketId, message, attachments = [] }, { rejectWithValue }) => {
    try {
        const res = await ticketApi.sendMessage(ticketId, message, attachments);
        return res.data.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const closeMyTicket = createAsyncThunk<{ ticketId: string }, string, { rejectValue: string }>(
    'tickets/close',
    async (ticketId, { rejectWithValue }) => {
        try {
            await ticketApi.closeTicket(ticketId);
            return { ticketId };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const reopenMyTicket = createAsyncThunk<
    { ticketId: string },
    { ticketId: string; reason: string },
    { rejectValue: string }
>('tickets/reopen', async ({ ticketId, reason }, { rejectWithValue }) => {
    try {
        await ticketApi.reopenTicket(ticketId, reason);
        return { ticketId };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const rateMyTicket = createAsyncThunk<
    { ticketId: string; rating: number; feedback: string },
    { ticketId: string; rating: number; feedback: string },
    { rejectValue: string }
>('tickets/rate', async ({ ticketId, rating, feedback }, { rejectWithValue }) => {
    try {
        await ticketApi.rateTicket(ticketId, rating, feedback);
        return { ticketId, rating, feedback };
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

// ============ SLICE ============

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setFilter: (state, action: any) => {
            const { key, value } = action.payload;
            const filters = state.filters as any;
            filters[key] = value;
            if (key !== 'page') filters.page = 1;
        },

        clearCurrentTicket: (state) => {
            state.currentTicket = null;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearLastCreated: (state) => {
            state.lastCreatedTicket = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchMyTickets.pending, (state) => {
                state.loading.list = true;
                state.error = null;
            })
            .addCase(fetchMyTickets.fulfilled, (state, action) => {
                state.loading.list = false;
                state.tickets = action.payload.tickets;
                state.counts = action.payload.counts;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchMyTickets.rejected, (state, action) => {
                state.loading.list = false;
                state.error = action.payload || 'Failed';
            })
            .addCase(fetchTicketDetail.pending, (state) => {
                state.loading.detail = true;
            })
            .addCase(fetchTicketDetail.fulfilled, (state, action) => {
                state.loading.detail = false;
                state.currentTicket = action.payload;
            })
            .addCase(fetchTicketDetail.rejected, (state, action) => {
                state.loading.detail = false;
                state.error = action.payload || 'Failed';
            })
            .addCase(createTicket.pending, (state) => {
                state.loading.create = true;
                state.error = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading.create = false;
                state.lastCreatedTicket = action.payload;
                state.tickets.unshift(action.payload);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading.create = false;
                state.error = action.payload || 'Failed';
            })
            .addCase(sendTicketMessage.pending, (state) => {
                state.loading.message = true;
            })
            .addCase(sendTicketMessage.fulfilled, (state, action) => {
                state.loading.message = false;
                if (state.currentTicket && action.payload) {
                    state.currentTicket.messages = state.currentTicket.messages || [];
                    state.currentTicket.messages.push(action.payload);
                }
            })
            .addCase(sendTicketMessage.rejected, (state, action) => {
                state.loading.message = false;
                state.error = action.payload || 'Failed';
            })
            .addCase(closeMyTicket.fulfilled, (state, action) => {
                const { ticketId } = action.payload;
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.status = 'CLOSED';
                }
                const idx = state.tickets.findIndex((t) => t._id === ticketId);
                if (idx !== -1) state.tickets[idx].status = 'CLOSED';
            })
            .addCase(reopenMyTicket.fulfilled, (state, action) => {
                const { ticketId } = action.payload;
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.status = 'OPEN';
                }
                const idx = state.tickets.findIndex((t) => t._id === ticketId);
                if (idx !== -1) state.tickets[idx].status = 'OPEN';
            })
            .addCase(rateMyTicket.fulfilled, (state, action) => {
                const { ticketId, rating, feedback } = action.payload;
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.rating = rating;
                    state.currentTicket.feedback = feedback;
                }
            });
    }
});

export const {
    setFilter,
    clearCurrentTicket,
    clearError,
    clearLastCreated
} = ticketSlice.actions;

export default ticketSlice.reducer;