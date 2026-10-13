// import { io, Socket } from 'socket.io-client';
// import { DEPLOYED_URL } from '../Config/Api';
// import { store } from '../Redux Toolkit/Store';
// import {
//     fetchAllTickets,
//     fetchTicketDetail
// } from '../Redux Toolkit/Admin/adminTicketSlice';

// let socket: Socket | null = null;

// interface TicketNewPayload {
//     _id?: string;
//     ticketId?: string;
//     ticketNumber: string;
//     subject?: string;
//     customer?: string;
//     category?: string;
//     priority?: string;
// }

// interface TicketMessagePayload {
//     ticketId: string;
//     ticketNumber?: string;
//     customerName?: string;
//     preview?: string;
// }

// interface TicketAssignedPayload {
//     ticketId: string;
//     ticketNumber: string;
//     subject?: string;
//     priority?: string;
// }

// export const initAdminSocket = (adminId: string): Socket => {
//     if (socket) return socket;

//     socket = io(DEPLOYED_URL, {
//         transports: ['websocket'],
//         reconnection: true
//     });

//     socket.on('connect', () => {
//         console.log('✅ Admin socket connected');
//         if (adminId) socket?.emit('admin:join', adminId);
//     });

//     socket.on('disconnect', () => {
//         console.log('❌ Admin socket disconnected');
//     });

//     socket.on('ticket:new', (data: TicketNewPayload) => {
//         console.log('🎫 New ticket:', data);
//         const state = store.getState();
//         store.dispatch(fetchAllTickets(state.adminTickets.filters));

//         if ((window as any).showToast) {
//             (window as any).showToast(`New Ticket: ${data.ticketNumber}`, 'info');
//         }
//     });

//     socket.on('ticket:assigned', (data: TicketAssignedPayload) => {
//         console.log('🎯 Ticket assigned:', data);
//         const state = store.getState();
//         store.dispatch(fetchAllTickets(state.adminTickets.filters));

//         if ((window as any).showToast) {
//             (window as any).showToast(`Assigned: ${data.ticketNumber}`, 'success');
//         }
//     });

//     socket.on('ticket:new-message', (data: TicketMessagePayload) => {
//         console.log('💬 New message:', data);
//         const state = store.getState();
//         store.dispatch(fetchAllTickets(state.adminTickets.filters));

//         if (state.adminTickets.currentTicket?._id === data.ticketId) {
//             store.dispatch(fetchTicketDetail(data.ticketId));
//         }

//         if ((window as any).showToast) {
//             (window as any).showToast(`Message from ${data.customerName}`, 'info');
//         }
//     });

//     return socket;
// };

// export const getAdminSocket = (): Socket | null => socket;

// export const joinTicketRoom = (ticketId: string): void => {
//     if (socket) socket.emit('ticket:join', ticketId);
// };

// export const disconnectAdminSocket = (): void => {
//     if (socket) {
//         socket.disconnect();
//         socket = null;
//     }
// };





















import { io, Socket } from 'socket.io-client';
import { DEPLOYED_URL } from '../Config/Api';
import { store } from '../Redux Toolkit/Store';
import {
    fetchAllTickets,
    fetchTicketDetail
} from '../Redux Toolkit/Admin/adminTicketSlice';

let socket: Socket | null = null;

export const initAdminSocket = (adminId: string): Socket => {
    if (socket) return socket;

    socket = io(DEPLOYED_URL, {
        transports: ['websocket'],
        reconnection: true
    });

    socket.on('connect', () => {
        console.log('✅ Admin socket connected');
        if (adminId) socket?.emit('admin:join', adminId);
    });

    socket.on('disconnect', () => {
        console.log('❌ Admin socket disconnected');
    });

    socket.on('ticket:new', (data: any) => {
        console.log('🎫 New ticket:', data);
        const state = store.getState();
        store.dispatch(fetchAllTickets(state.adminTickets.filters));
    });

    socket.on('ticket:assigned', (data: any) => {
        console.log('🎯 Ticket assigned:', data);
        const state = store.getState();
        store.dispatch(fetchAllTickets(state.adminTickets.filters));
    });

    socket.on('ticket:new-message', (data: any) => {
        console.log('💬 New message:', data);
        const state = store.getState();
        store.dispatch(fetchAllTickets(state.adminTickets.filters));

        if (state.adminTickets.currentTicket?._id === data.ticketId) {
            store.dispatch(fetchTicketDetail(data.ticketId));
        }
    });

    return socket;
};

export const getAdminSocket = (): Socket | null => socket;

export const joinTicketRoom = (ticketId: string): void => {
    if (socket) socket.emit('ticket:join', ticketId);
};

export const disconnectAdminSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};