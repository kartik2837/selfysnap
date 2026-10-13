import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminTicketApi } from '../../services/adminTicketApi';
import type {
    Ticket,
    TicketStats,
    TicketAgentWithCount,
    TicketFilters,
    TicketStatus,
    TicketPriority,
    TicketPagination
} from '../../types/ticket.types';

// ============================================================
// STATE INTERFACE
// ============================================================

interface LoadingState {
    list: boolean;
    detail: boolean;
    agents: boolean;
    stats: boolean;
    action: boolean;
    message: boolean;
}

interface AdminTicketState {
    tickets: Ticket[];
    pagination: TicketPagination;
    currentTicket: Ticket | null;
    stats: TicketStats;
    agents: TicketAgentWithCount[];
    filters: TicketFilters;
    loading: LoadingState;
    error: string | null;
    successMessage: string | null;
}

const initialState: AdminTicketState = {
    tickets: [],
    pagination: { page: 1, limit: 20, total: 0, pages: 0 },
    currentTicket: null,
    stats: {},
    agents: [],
    filters: {
        status: 'all',
        priority: 'all',
        category: 'all',
        assignedTo: 'all',
        search: '',
        page: 1
    },
    loading: {
        list: false,
        detail: false,
        agents: false,
        stats: false,
        action: false,
        message: false
    },
    error: null,
    successMessage: null
};

// ============================================================
// THUNKS
// ============================================================

export const fetchAllTickets = createAsyncThunk<
    { tickets: Ticket[]; stats: TicketStats; pagination: TicketPagination },
    Partial<TicketFilters>,
    { rejectValue: string }
>(
    'adminTickets/fetchAll',
    async (filters, { rejectWithValue }) => {
        try {
            const res = await adminTicketApi.getAllTickets(filters);
            return {
                tickets: res.data.tickets,
                stats: res.data.stats,
                pagination: res.data.pagination
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchTicketDetail = createAsyncThunk<
    Ticket,
    string,
    { rejectValue: string }
>(
    'adminTickets/fetchDetail',
    async (ticketId, { rejectWithValue }) => {
        try {
            const res = await adminTicketApi.getTicketDetail(ticketId);
            return res.data.ticket;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchAgents = createAsyncThunk<
    TicketAgentWithCount[],
    void,
    { rejectValue: string }
>(
    'adminTickets/fetchAgents',
    async (_, { rejectWithValue }) => {
        try {
            const res = await adminTicketApi.getAgents();
            return res.data.agents;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchStats = createAsyncThunk<
    TicketStats,
    void,
    { rejectValue: string }
>(
    'adminTickets/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const res = await adminTicketApi.getStats();
            return res.data.stats;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const assignTicket = createAsyncThunk<
    { ticketId: string; agentId: string | null },
    { ticketId: string; agentId: string | null },
    { rejectValue: string }
>(
    'adminTickets/assign',
    async ({ ticketId, agentId }, { rejectWithValue }) => {
        try {
            await adminTicketApi.assignTicket(ticketId, agentId);
            return { ticketId, agentId };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateTicketStatus = createAsyncThunk<
    { ticketId: string; status: TicketStatus },
    { ticketId: string; status: TicketStatus; resolutionNote?: string },
    { rejectValue: string }
>(
    'adminTickets/updateStatus',
    async ({ ticketId, status, resolutionNote }, { rejectWithValue }) => {
        try {
            await adminTicketApi.updateStatus(ticketId, status, resolutionNote);
            return { ticketId, status };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateTicketPriority = createAsyncThunk<
    { ticketId: string; priority: TicketPriority },
    { ticketId: string; priority: TicketPriority },
    { rejectValue: string }
>(
    'adminTickets/updatePriority',
    async ({ ticketId, priority }, { rejectWithValue }) => {
        try {
            await adminTicketApi.updatePriority(ticketId, priority);
            return { ticketId, priority };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const sendTicketMessage = createAsyncThunk<
    { ticketId: string },
    { ticketId: string; message: string; attachments?: string[]; isInternal?: boolean },
    { rejectValue: string }
>(
    'adminTickets/sendMessage',
    async ({ ticketId, message, attachments = [], isInternal = false }, { rejectWithValue }) => {
        try {
            await adminTicketApi.sendMessage(ticketId, message, attachments, isInternal);
            return { ticketId };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ============================================================
// SLICE
// ============================================================

const adminTicketSlice = createSlice({
    name: 'adminTickets',
    initialState,
    reducers: {
        // ✅ Without PayloadAction - using `any`
        setFilter: (state, action: any) => {
            const { key, value } = action.payload;
            const filters = state.filters as any;
            filters[key] = value;
            if (key !== 'page') filters.page = 1;
        },

        resetFilters: (state) => {
            state.filters = initialState.filters;
        },

        clearCurrentTicket: (state) => {
            state.currentTicket = null;
        },

        clearError: (state) => {
            state.error = null;
        },

        clearSuccess: (state) => {
            state.successMessage = null;
        }
    },

    extraReducers: (builder) => {
        builder
            // ============ FETCH ALL ============
            .addCase(fetchAllTickets.pending, (state) => {
                state.loading.list = true;
                state.error = null;
            })
            .addCase(fetchAllTickets.fulfilled, (state, action) => {
                state.loading.list = false;
                state.tickets = action.payload.tickets;
                state.stats = action.payload.stats;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAllTickets.rejected, (state, action) => {
                state.loading.list = false;
                state.error = action.payload || 'Failed to fetch tickets';
            })

            // ============ FETCH DETAIL ============
            .addCase(fetchTicketDetail.pending, (state) => {
                state.loading.detail = true;
                state.error = null;
            })
            .addCase(fetchTicketDetail.fulfilled, (state, action) => {
                state.loading.detail = false;
                state.currentTicket = action.payload;
            })
            .addCase(fetchTicketDetail.rejected, (state, action) => {
                state.loading.detail = false;
                state.error = action.payload || 'Failed to fetch ticket';
            })

            // ============ FETCH AGENTS ============
            .addCase(fetchAgents.pending, (state) => {
                state.loading.agents = true;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading.agents = false;
                state.agents = action.payload;
            })
            .addCase(fetchAgents.rejected, (state) => {
                state.loading.agents = false;
            })

            // ============ FETCH STATS ============
            .addCase(fetchStats.pending, (state) => {
                state.loading.stats = true;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading.stats = false;
                state.stats = action.payload;
            })
            .addCase(fetchStats.rejected, (state) => {
                state.loading.stats = false;
            })

            // ============ ASSIGN ============
            .addCase(assignTicket.pending, (state) => {
                state.loading.action = true;
                state.error = null;
            })
            .addCase(assignTicket.fulfilled, (state, action) => {
                state.loading.action = false;
                state.successMessage = 'Ticket assigned successfully';
                const { ticketId, agentId } = action.payload;
                const agent = state.agents.find((a) => a._id === agentId);

                const agentData = agent
                    ? {
                        _id: agent._id,
                        name: agent.name,
                        mobile: agent.mobile || '',
                        email: agent.email || ''
                    }
                    : null;

                const idx = state.tickets.findIndex((t) => t._id === ticketId);
                if (idx !== -1) {
                    state.tickets[idx].assignedTo = agentData;
                }
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.assignedTo = agentData;
                }
            })
            .addCase(assignTicket.rejected, (state, action) => {
                state.loading.action = false;
                state.error = action.payload || 'Failed to assign';
            })

            // ============ UPDATE STATUS ============
            .addCase(updateTicketStatus.pending, (state) => {
                state.loading.action = true;
            })
            .addCase(updateTicketStatus.fulfilled, (state, action) => {
                state.loading.action = false;
                state.successMessage = `Status: ${action.payload.status}`;
                const { ticketId, status } = action.payload;

                const idx = state.tickets.findIndex((t) => t._id === ticketId);
                if (idx !== -1) state.tickets[idx].status = status;
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.status = status;
                }
            })
            .addCase(updateTicketStatus.rejected, (state, action) => {
                state.loading.action = false;
                state.error = action.payload || 'Failed to update status';
            })

            // ============ UPDATE PRIORITY ============
            .addCase(updateTicketPriority.pending, (state) => {
                state.loading.action = true;
            })
            .addCase(updateTicketPriority.fulfilled, (state, action) => {
                state.loading.action = false;
                state.successMessage = 'Priority updated';
                const { ticketId, priority } = action.payload;

                const idx = state.tickets.findIndex((t) => t._id === ticketId);
                if (idx !== -1) state.tickets[idx].priority = priority;
                if (state.currentTicket?._id === ticketId) {
                    state.currentTicket.priority = priority;
                }
            })
            .addCase(updateTicketPriority.rejected, (state, action) => {
                state.loading.action = false;
                state.error = action.payload || 'Failed to update priority';
            })

            // ============ SEND MESSAGE ============
            .addCase(sendTicketMessage.pending, (state) => {
                state.loading.message = true;
                state.error = null;
            })
            .addCase(sendTicketMessage.fulfilled, (state) => {
                state.loading.message = false;
                state.successMessage = 'Reply sent';
            })
            .addCase(sendTicketMessage.rejected, (state, action) => {
                state.loading.message = false;
                state.error = action.payload || 'Failed to send message';
            });
    }
});

// ============================================================
// ACTIONS
// ============================================================

export const {
    setFilter,
    resetFilters,
    clearCurrentTicket,
    clearError,
    clearSuccess
} = adminTicketSlice.actions;

export default adminTicketSlice.reducer;