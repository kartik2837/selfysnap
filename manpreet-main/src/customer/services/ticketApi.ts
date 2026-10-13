import { api } from '../../Config/Api';
import type {
    GetAllTicketsResponse,
    GetTicketDetailResponse,
    GetCategoriesResponse,
    CreateTicketPayload,
    TicketFilters
} from '../../types/ticket.types';

export const ticketApi = {
    // ✅ /api add किया
    getCategories: () => api.get<GetCategoriesResponse>('/api/customer/tickets/categories'),

    createTicket: (data: CreateTicketPayload) =>
        api.post('/api/customer/tickets', data),

    getMyTickets: (params: Partial<TicketFilters> = {}) =>
        api.get<GetAllTicketsResponse>('/api/customer/tickets', { params }),

    getTicketDetail: (ticketId: string) =>
        api.get<GetTicketDetailResponse>(`/api/customer/tickets/${ticketId}`),

    sendMessage: (ticketId: string, message: string, attachments: string[] = []) =>
        api.post(`/api/customer/tickets/${ticketId}/message`, { message, attachments }),

    closeTicket: (ticketId: string) =>
        api.patch(`/api/customer/tickets/${ticketId}/close`),

    reopenTicket: (ticketId: string, reason: string) =>
        api.patch(`/api/customer/tickets/${ticketId}/reopen`, { reason }),

    rateTicket: (ticketId: string, rating: number, feedback: string) =>
        api.post(`/api/customer/tickets/${ticketId}/rate`, { rating, feedback })
};