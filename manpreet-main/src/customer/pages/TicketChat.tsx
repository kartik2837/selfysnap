import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchTicketDetail,
    sendTicketMessage,
    closeMyTicket,
    reopenMyTicket,
    rateMyTicket,
    clearCurrentTicket,
    clearError
} from '../../Redux Toolkit/Customer/ticketSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { joinTicketRoom } from '../services/socketService';
import StatusBadge from '../components/StatusBadge';
import type { TicketMessage } from '../../types/ticket.types';

const TicketChat: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const endRef = useRef<HTMLDivElement>(null);

    const ticket = useAppSelector((s) => s.tickets.currentTicket);
    const loading = useAppSelector((s) => s.tickets.loading);
    const error = useAppSelector((s) => s.tickets.error);

    const [message, setMessage] = useState('');
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (!ticketId) return;
        dispatch(fetchTicketDetail(ticketId));
        joinTicketRoom(ticketId);
        return () => { dispatch(clearCurrentTicket()); };
    }, [ticketId, dispatch]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ticket?.messages]);

    useEffect(() => {
        if (error) { alert(error); dispatch(clearError()); }
    }, [error, dispatch]);

    useEffect(() => {
        if (ticket?.status === 'RESOLVED' && !ticket.rating) setShowRating(true);
    }, [ticket?.status, ticket?.rating]);

    const handleSend = async () => {
        if (!message.trim() || !ticketId) return;
        await dispatch(sendTicketMessage({ ticketId, message }));
        setMessage('');
        dispatch(fetchTicketDetail(ticketId));
    };

    const handleRate = async () => {
        if (rating === 0 || !ticketId) return;
        await dispatch(rateMyTicket({ ticketId, rating, feedback }));
        setShowRating(false);
    };

    if (loading.detail && !ticket) return <div className="p-10 text-center">Loading...</div>;
    if (!ticket) return <div className="p-10 text-center">Ticket not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/tickets')} className="text-gray-600">
                        ← Back
                    </button>
                    <div>
                        <h1 className="font-bold">{ticket.ticketNumber}</h1>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{ticket.subject}</p>
                    </div>
                </div>
                <StatusBadge status={ticket.status} />
            </div>

            <div className="max-w-3xl mx-auto p-4">
                <div className="bg-white rounded-lg p-4 mb-4 min-h-[400px] max-h-[60vh] overflow-y-auto space-y-3">
                    {ticket.messages?.map((m: TicketMessage, i: number) => {
                        const isCustomer = m.senderRole === 'CUSTOMER';
                        const isSystem = m.senderRole === 'SYSTEM';

                        if (isSystem) {
                            return (
                                <div key={i} className="text-center">
                                    <span className="inline-block bg-gray-100 text-gray-600 text-xs italic px-3 py-1 rounded-full">
                                        {m.message}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div key={i} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-md px-4 py-2 rounded-lg ${
                                    isCustomer ? 'bg-blue-100' : 'bg-green-100'
                                }`}>
                                    <div className="text-xs font-bold mb-1">{m.senderName}</div>
                                    <div className="text-sm whitespace-pre-wrap">{m.message}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(m.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={endRef} />
                </div>

                {ticket.status === 'CLOSED' ? (
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600">This ticket is closed</span>
                        <button
                            onClick={() => dispatch(reopenMyTicket({ ticketId: ticketId!, reason: 'Issue not resolved' }))}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                        >
                            Reopen
                        </button>
                    </div>
                ) : ticket.status === 'RESOLVED' ? (
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <button
                            onClick={() => dispatch(closeMyTicket(ticketId!))}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold"
                        >
                            ✅ Close Ticket
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 border rounded-lg"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading.message || !message.trim()}
                            className="px-6 bg-black text-white rounded-lg font-semibold disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>

            {showRating && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold mb-2 text-center">🎉 Ticket Resolved!</h3>
                        <p className="text-sm text-gray-600 text-center mb-4">Rate our support</p>

                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setRating(i)}
                                    className={`text-4xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Add feedback (optional)"
                            className="w-full px-3 py-2 border rounded-lg resize-none mb-4"
                            rows={3}
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowRating(false)}
                                className="flex-1 py-3 border rounded-lg font-semibold"
                            >
                                Skip
                            </button>
                            <button
                                onClick={handleRate}
                                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketChat;