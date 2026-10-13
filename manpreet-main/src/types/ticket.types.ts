// ============================================================
// TICKET TYPES
// ============================================================

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TicketCategory = 'ORDER' | 'PAYMENT' | 'PRODUCT' | 'DELIVERY' | 'REFUND' | 'OTHER';
export type SenderRole = 'CUSTOMER' | 'AGENT' | 'SYSTEM';

// ============================================================
// ATTACHMENT
// ============================================================

export interface Attachment {
    url: string;
    type?: string;
    uploadedAt?: string;
}

// ============================================================
// MESSAGE
// ============================================================

export interface TicketMessage {
    _id?: string;
    sender?: string | null;
    senderModel?: 'User' | 'AdminUser';
    senderName: string;
    senderRole: SenderRole;
    message: string;
    attachments?: Attachment[];
    isInternal?: boolean;
    createdAt: string;
}

// ============================================================
// USER (Customer / Agent) - mobile optional
// ============================================================

export interface TicketCustomer {
    _id: string;
    name: string;
    mobile?: string;      // ✅ optional - error fix
    email?: string;
}

// ============================================================
// ORDER
// ============================================================

export interface TicketOrder {
    _id: string;
    orderId: string;
    totalAmount: number;
    status: string;
    createdAt?: string;
}

// ============================================================
// TICKET
// ============================================================

export interface Ticket {
    _id: string;
    ticketNumber: string;
    customer: TicketCustomer | string;
    order?: TicketOrder | null;
    category: TicketCategory;
    subject: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: TicketCustomer | null;
    assignedAt?: string;
    resolvedAt?: string;
    closedAt?: string;
    resolutionNote?: string;
    rating?: number | null;
    feedback?: string;
    attachments?: Attachment[];
    messages?: TicketMessage[];
    lastMessageAt: string;
    unreadCountCustomer?: number;
    unreadCountAgent?: number;
    createdAt: string;
    updatedAt?: string;
}

// ============================================================
// STATS
// ============================================================

export interface TicketStats {
    total?: number;
    open?: number;
    inProgress?: number;
    resolved?: number;
    closed?: number;
    unassigned?: number;
    highPriority?: number;
    avgRating?: number;
    today?: number;
}

// ============================================================
// AGENT WITH COUNT
// ============================================================

export interface TicketAgentWithCount extends TicketCustomer {
    role?: string;
    activeTickets?: number;
}

// ============================================================
// PAGINATION
// ============================================================

export interface TicketPagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

// ============================================================
// FILTERS
// ============================================================

export interface TicketFilters {
    status: 'all' | TicketStatus;
    priority: 'all' | TicketPriority;
    category: 'all' | TicketCategory;
    assignedTo: 'all' | 'unassigned' | string;
    search: string;
    page: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// ============================================================
// API RESPONSES
// ============================================================

export interface GetAllTicketsResponse {
    success: boolean;
    tickets: Ticket[];
    stats: TicketStats;
    pagination: TicketPagination;
}

export interface GetTicketDetailResponse {
    success: boolean;
    ticket: Ticket;
}

export interface GetAgentsResponse {
    success: boolean;
    agents: TicketAgentWithCount[];
}

export interface GetStatsResponse {
    success: boolean;
    stats: TicketStats;
}

export interface CreateTicketPayload {
    category: TicketCategory;
    orderId?: string;
    subject: string;
    description: string;
    priority?: TicketPriority;
    attachments?: string[];
}

export interface TicketCategoryItem {
    id: TicketCategory;
    label: string;
    icon: string;
}

export interface GetCategoriesResponse {
    success: boolean;
    categories: TicketCategoryItem[];
}