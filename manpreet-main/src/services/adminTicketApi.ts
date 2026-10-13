// import { api } from '../Config/Api';
// import type {
//     GetAllTicketsResponse,
//     GetTicketDetailResponse,
//     GetAgentsResponse,
//     GetStatsResponse,
//     TicketFilters,
//     TicketPriority,
//     TicketStatus
// } from '../types/ticket.types';

// export const adminTicketApi = {
//     // List & Detail
//     getAllTickets: (params: Partial<TicketFilters> = {}) =>
//         api.get<GetAllTicketsResponse>('/admin/tickets', { params }),

//     getTicketDetail: (ticketId: string) =>
//         api.get<GetTicketDetailResponse>(`/admin/tickets/${ticketId}`),

//     // Actions
//     assignTicket: (ticketId: string, agentId: string | null) =>
//         api.patch(`/admin/tickets/${ticketId}/assign`, { agentId }),

//     updateStatus: (
//         ticketId: string,
//         status: TicketStatus,
//         resolutionNote?: string
//     ) =>
//         api.patch(`/admin/tickets/${ticketId}/status`, { status, resolutionNote }),

//     updatePriority: (ticketId: string, priority: TicketPriority) =>
//         api.patch(`/admin/tickets/${ticketId}/priority`, { priority }),

//     sendMessage: (
//         ticketId: string,
//         message: string,
//         attachments: string[] = [],
//         isInternal: boolean = false
//     ) =>
//         api.post(`/admin/tickets/${ticketId}/message`, {
//             message,
//             attachments,
//             isInternal
//         }),

//     // Meta
//     getStats: () => api.get<GetStatsResponse>('/admin/tickets/stats/overview'),
//     getAgents: () => api.get<GetAgentsResponse>('/admin/tickets/agents/list')
// };





















import { api } from '../Config/Api';
import type {
    GetAllTicketsResponse,
    GetTicketDetailResponse,
    GetAgentsResponse,
    GetStatsResponse,
    TicketFilters,
    TicketPriority,
    TicketStatus
} from '../types/ticket.types';

export const adminTicketApi = {
    // ✅ /api add किया
    getAllTickets: (params: Partial<TicketFilters> = {}) =>
        api.get<GetAllTicketsResponse>('/api/admin/tickets', { params }),

    getTicketDetail: (ticketId: string) =>
        api.get<GetTicketDetailResponse>(`/api/admin/tickets/${ticketId}`),

    assignTicket: (ticketId: string, agentId: string | null) =>
        api.patch(`/api/admin/tickets/${ticketId}/assign`, { agentId }),

    updateStatus: (ticketId: string, status: TicketStatus, resolutionNote?: string) =>
        api.patch(`/api/admin/tickets/${ticketId}/status`, { status, resolutionNote }),

    updatePriority: (ticketId: string, priority: TicketPriority) =>
        api.patch(`/api/admin/tickets/${ticketId}/priority`, { priority }),

    sendMessage: (
        ticketId: string,
        message: string,
        attachments: string[] = [],
        isInternal: boolean = false
    ) =>
        api.post(`/api/admin/tickets/${ticketId}/message`, {
            message, attachments, isInternal
        }),

    getStats: () => api.get<GetStatsResponse>('/api/admin/tickets/stats/overview'),
    getAgents: () => api.get<GetAgentsResponse>('/api/admin/tickets/agents/list')
};