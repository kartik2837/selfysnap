import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchTicketDetail,
    fetchAgents,
    assignTicket,
    updateTicketStatus,
    sendTicketMessage,
    clearCurrentTicket,
    clearError,
    clearSuccess
} from '../../Redux Toolkit/Admin/adminTicketSlice';
import { useAppDispatch, useAppSelector } from '../../Redux Toolkit/Store';
import { joinTicketRoom } from '../../services/adminSocketService';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import type { TicketStatus, TicketMessage } from '../../types/ticket.types';

const TicketDetail: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const ticket = useAppSelector((s: any) => s.adminTickets.currentTicket);
    const agents = useAppSelector((s: any) => s.adminTickets.agents);
    const loading = useAppSelector((s: any) => s.adminTickets.loading);
    const error = useAppSelector((s: any) => s.adminTickets.error);
    const successMessage = useAppSelector((s: any) => s.adminTickets.successMessage);

    const [message, setMessage] = useState('');
    const [isInternal, setIsInternal] = useState(false);

    useEffect(() => {
        if (!ticketId) return;

        console.log('📌 Ticket ID:', ticketId);
        dispatch(fetchTicketDetail(ticketId) as any);
        dispatch(fetchAgents() as any);
        joinTicketRoom(ticketId);

        return () => {
            dispatch(clearCurrentTicket());
        };
    }, [ticketId, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ticket?.messages]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (successMessage) dispatch(clearSuccess());
    }, [successMessage, dispatch]);

    const handleSend = async (): Promise<void> => {
        if (!message.trim() || !ticketId) return;
        await dispatch(sendTicketMessage({ ticketId, message, attachments: [], isInternal }) as any);
        setMessage('');
        setIsInternal(false);
        dispatch(fetchTicketDetail(ticketId) as any);
    };

    const handleAssign = async (agentId: string): Promise<void> => {
        if (!ticketId) return;
        await dispatch(assignTicket({ ticketId, agentId: agentId || null }) as any);
        dispatch(fetchTicketDetail(ticketId) as any);
    };

    const handleStatus = async (status: TicketStatus): Promise<void> => {
        if (!ticketId) return;
        const note = status === 'RESOLVED'
            ? prompt('Resolution note (optional):', 'Issue resolved successfully') || ''
            : '';
        await dispatch(updateTicketStatus({ ticketId, status, resolutionNote: note }) as any);
        dispatch(fetchTicketDetail(ticketId) as any);
    };

    if (loading.detail && !ticket) {
        return (
            <div className="p-10 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <p>Loading ticket...</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="p-10 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-xl font-bold mb-2">Ticket Not Found</h2>
                <p className="text-xs text-gray-400 mb-4">Ticket ID: {ticketId}</p>
                <button
                    onClick={() => navigate('/admin/tickets')}
                    className="px-6 py-2 bg-black text-white rounded-lg"
                >
                    Back to Tickets
                </button>
            </div>
        );
    }

    const customer = typeof ticket.customer === 'object' ? ticket.customer : null;
    const agent = typeof ticket.assignedTo === 'object' ? ticket.assignedTo : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/tickets')}
                        className="text-gray-600 hover:text-black text-xl"
                    >
                        ←
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">{ticket.ticketNumber}</h1>
                        <p className="text-xs text-gray-500">
                            Created {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PriorityBadge priority={ticket.priority} />
                    <StatusBadge status={ticket.status} />
                </div>
            </div>

            <div className="flex gap-4 p-6">
                {/* Chat */}
                <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {ticket.messages?.map((m: TicketMessage, i: number) => {
                            const isCustomer = m.senderRole === 'CUSTOMER';
                            const isSystem = m.senderRole === 'SYSTEM';
                            return (
                                <div key={m._id || i} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-md rounded-lg px-4 py-2 ${
                                        isSystem
                                            ? 'bg-gray-100 text-gray-600 text-xs italic mx-auto'
                                            : isCustomer
                                            ? 'bg-blue-50 border border-blue-200'
                                            : m.isInternal
                                            ? 'bg-yellow-50 border border-yellow-300'
                                            : 'bg-green-50 border border-green-200'
                                    }`}>
                                        {!isSystem && (
                                            <div className="text-xs font-bold mb-1">
                                                {m.senderName}
                                                {m.isInternal && <span className="ml-2 text-yellow-700">🔒 Internal</span>}
                                            </div>
                                        )}
                                        <div className="text-sm whitespace-pre-wrap">{m.message}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {new Date(m.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {ticket.status !== 'CLOSED' && (
                        <div className="border-t p-3">
                            <label className="flex items-center gap-1 text-sm mb-2">
                                <input
                                    type="checkbox"
                                    checked={isInternal}
                                    onChange={(e) => setIsInternal(e.target.checked)}
                                />
                                <span className="text-yellow-700 font-semibold">🔒 Internal note</span>
                            </label>
                            <div className="flex gap-2">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Type your reply..."
                                    className="flex-1 px-3 py-2 border rounded-lg resize-none"
                                    rows={2}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading.message || !message.trim()}
                                    className="px-5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold"
                                >
                                    {loading.message ? '...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-72 space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold text-sm mb-2 text-gray-700">👤 Customer</h3>
                        <div className="text-sm space-y-1">
                            <div className="font-semibold">{customer?.name}</div>
                            <div className="text-gray-500">{customer?.mobile}</div>
                            {customer?.email && <div className="text-gray-500 text-xs">{customer.email}</div>}
                        </div>
                    </div>

                    {ticket.order && typeof ticket.order === 'object' && (
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="font-bold text-sm mb-2 text-gray-700">📦 Order</h3>
                            <div className="text-sm space-y-1">
                                <div className="font-semibold">{ticket.order.orderId}</div>
                                <div className="text-gray-500">₹{ticket.order.totalAmount}</div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold text-sm mb-2 text-gray-700">📋 Category</h3>
                        <div className="text-sm font-semibold">{ticket.category}</div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold text-sm mb-2 text-gray-700">👨‍💼 Agent</h3>
                        <select
                            value={agent?._id || ''}
                            onChange={(e) => handleAssign(e.target.value)}
                            disabled={loading.action}
                            className="w-full px-2 py-1.5 border rounded-lg text-sm"
                        >
                            <option value="">-- Unassigned --</option>
                            {agents.map((a: any) => (
                                <option key={a._id} value={a._id}>
                                    {a.name} ({a.activeTickets || 0} active)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold text-sm mb-2 text-gray-700">⚡ Actions</h3>
                        <div className="flex flex-col gap-2">
                            {ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' && (
                                <button
                                    onClick={() => handleStatus('RESOLVED')}
                                    disabled={loading.action}
                                    className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
                                >
                                    ✅ Mark Resolved
                                </button>
                            )}
                            {ticket.status !== 'CLOSED' && (
                                <button
                                    onClick={() => handleStatus('CLOSED')}
                                    disabled={loading.action}
                                    className="w-full py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
                                >
                                    🔒 Close Ticket
                                </button>
                            )}
                            {ticket.status === 'CLOSED' && (
                                <button
                                    onClick={() => handleStatus('OPEN')}
                                    disabled={loading.action}
                                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                                >
                                    🔄 Reopen
                                </button>
                            )}
                        </div>
                    </div>

                    {ticket.rating && (
                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h3 className="font-bold text-sm mb-2 text-yellow-800">⭐ Rating</h3>
                            <div className="text-2xl">{'⭐'.repeat(ticket.rating)}</div>
                            {ticket.feedback && (
                                <p className="text-xs text-yellow-800 mt-2 italic">"{ticket.feedback}"</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;