import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    fetchMyTickets,
    setFilter,
    clearError
} from '../../Redux Toolkit/Customer/ticketSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import type { Ticket, TicketFilters } from '../../types/ticket.types';

const MyTickets: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tickets = useAppSelector((s) => s.tickets.tickets);
    const counts = useAppSelector((s) => s.tickets.counts);
    const filters = useAppSelector((s) => s.tickets.filters);
    const loading = useAppSelector((s) => s.tickets.loading);
    const error = useAppSelector((s) => s.tickets.error);

    useEffect(() => {
        dispatch(fetchMyTickets(filters));
    }, [filters, dispatch]);

    useEffect(() => {
        if (error) { alert(error); dispatch(clearError()); }
    }, [error, dispatch]);

    const handleFilter = (key: keyof TicketFilters, value: any) => {
        dispatch(setFilter({ key, value }));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">🎫 My Tickets</h1>
                    <p className="text-gray-500">Track your support requests</p>
                </div>
                <button
                    onClick={() => navigate('/tickets/new')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                    + New Ticket
                </button>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
                {[
                    { key: 'all', label: 'All' },
                    { key: 'OPEN', label: `Open (${counts.open})` },
                    { key: 'IN_PROGRESS', label: `Active (${counts.inProgress})` },
                    { key: 'RESOLVED', label: `Resolved (${counts.resolved})` }
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => handleFilter('status', tab.key)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                            filters.status === tab.key
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-700 border'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading.list && tickets.length === 0 ? (
                <div className="text-center py-10">Loading...</div>
            ) : tickets.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                    <div className="text-6xl mb-4">🎫</div>
                    <h3 className="text-lg font-bold mb-2">No tickets yet</h3>
                    <p className="text-gray-500 mb-6">Need help? Raise a ticket</p>
                    <button
                        onClick={() => navigate('/tickets/new')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold"
                    >
                        Create Ticket
                    </button>
                </div>
            ) : (
                <div className="grid gap-3">
                    {tickets.map((t: Ticket) => (
                        <div
                            key={t._id}
                            onClick={() => navigate(`/tickets/${t._id}`)}
                            className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-600">{t.ticketNumber}</span>
                                <div className="flex gap-2">
                                    <PriorityBadge priority={t.priority} />
                                    <StatusBadge status={t.status} />
                                </div>
                            </div>
                            <div className="font-bold text-lg mb-2">{t.subject}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="bg-gray-100 px-2 py-1 rounded">{t.category}</span>
                                <span>{new Date(t.lastMessageAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTickets;