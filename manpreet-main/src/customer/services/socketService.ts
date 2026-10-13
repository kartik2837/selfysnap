// import { io, Socket } from 'socket.io-client';
// import { DEPLOYED_URL } from '../../Config/Api';
// import { store } from '../../Redux Toolkit/Store';
// import { fetchMyTickets, fetchTicketDetail } from '../../Redux Toolkit/Admin/adminTicketSlice';

// let socket: Socket | null = null;

// export const initSocket = (customerId: string): Socket => {
//     if (socket) return socket;

//     socket = io(DEPLOYED_URL, {
//         transports: ['websocket'],
//         reconnection: true
//     });

//     socket.on('connect', () => {
//         console.log('✅ Customer socket connected');
//         if (customerId) socket?.emit('customer:join', customerId);
//     });

//     socket.on('ticket:new-reply', (data: { ticketId: string }) => {
//         const state = store.getState();
//         if (state.tickets.currentTicket?._id === data.ticketId) {
//             store.dispatch(fetchTicketDetail(data.ticketId));
//         }
//         store.dispatch(fetchMyTickets(state.tickets.filters));
//     });

//     socket.on('ticket:status-changed', () => {
//         const state = store.getState();
//         store.dispatch(fetchMyTickets(state.tickets.filters));
//     });

//     return socket;
// };

// export const getSocket = (): Socket | null => socket;

// export const joinTicketRoom = (ticketId: string): void => {
//     if (socket) socket.emit('ticket:join', ticketId);
// };

// export const disconnectSocket = (): void => {
//     if (socket) { socket.disconnect(); socket = null; }
// };















import { io, Socket } from 'socket.io-client';
import { DEPLOYED_URL } from '../../Config/Api';
import { store } from '../../Redux Toolkit/Store';
import {
    fetchMyTickets,
    fetchTicketDetail
} from '../../Redux Toolkit/Customer/ticketSlice';

let socket: Socket | null = null;

export const initCustomerSocket = (customerId: string): Socket => {
    if (socket) return socket;

    socket = io(DEPLOYED_URL, {
        transports: ['websocket'],
        reconnection: true
    });

    socket.on('connect', () => {
        console.log('✅ Customer socket connected');
        if (customerId) socket?.emit('customer:join', customerId);
    });

    socket.on('disconnect', () => {
        console.log('❌ Customer socket disconnected');
    });

    socket.on('ticket:new-reply', (data: any) => {
        console.log('💬 Agent replied:', data);
        const state = store.getState();

        if (state.tickets.currentTicket?._id === data.ticketId) {
            store.dispatch(fetchTicketDetail(data.ticketId));
        }
        store.dispatch(fetchMyTickets(state.tickets.filters));
    });

    socket.on('ticket:status-changed', (data: any) => {
        console.log('📊 Status changed:', data);
        const state = store.getState();
        store.dispatch(fetchMyTickets(state.tickets.filters));

        if (state.tickets.currentTicket?._id === data.ticketId) {
            store.dispatch(fetchTicketDetail(data.ticketId));
        }
    });

    return socket;
};

export const getCustomerSocket = (): Socket | null => socket;

export const joinTicketRoom = (ticketId: string): void => {
    if (socket) socket.emit('ticket:join', ticketId);
};

export const disconnectCustomerSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};