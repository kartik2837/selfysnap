import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    fetchAllTickets,
    fetchAgents,
    setFilter,
    clearError
} from '../../Redux Toolkit/Admin/adminTicketSlice';

import { useAppDispatch, useAppSelector } from '../../Redux Toolkit/Store';

import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import type { Ticket } from '../../types/ticket.types';

const TicketsList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tickets = useAppSelector((s: any) => s.adminTickets.tickets);
    const stats = useAppSelector((s: any) => s.adminTickets.stats);
    const agents = useAppSelector((s: any) => s.adminTickets.agents);
    const filters = useAppSelector((s: any) => s.adminTickets.filters);
    const pagination = useAppSelector((s: any) => s.adminTickets.pagination);
    const loading = useAppSelector((s: any) => s.adminTickets.loading);
    const error = useAppSelector((s: any) => s.adminTickets.error);

    useEffect(() => {
        dispatch(fetchAgents() as any);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllTickets(filters) as any);
    }, [filters, dispatch]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleFilter = (key: string, value: any) => {
        dispatch(setFilter({ key, value }));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">🎫 Support Tickets</h1>
                    <p className="text-gray-500 mt-1">Manage all customer support tickets</p>
                </div>
                <button
                    onClick={() => dispatch(fetchAllTickets(filters) as any)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                    🔄 Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                <StatCard label="Total" value={stats.total} color="bg-gray-100 text-gray-800" />
                <StatCard label="Open" value={stats.open} color="bg-orange-100 text-orange-700" />
                <StatCard label="In Progress" value={stats.inProgress} color="bg-blue-100 text-blue-700" />
                <StatCard label="Resolved" value={stats.resolved} color="bg-green-100 text-green-700" />
                <StatCard label="Unassigned" value={stats.unassigned} color="bg-purple-100 text-purple-700" />
                <StatCard label="High Priority" value={stats.highPriority} color="bg-red-100 text-red-700" />
                <StatCard
                    label="Avg Rating"
                    value={stats.avgRating ? Number(stats.avgRating.toFixed(1)) : 0}
                    color="bg-yellow-100 text-yellow-700"
                />
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap gap-3 items-center">
                <input
                    type="text"
                    placeholder="🔍 Search tickets..."
                    value={filters.search}
                    onChange={(e) => handleFilter('search', e.target.value)}
                    className="px-4 py-2 border rounded-lg flex-1 min-w-[200px]"
                />
                <select
                    value={filters.status}
                    onChange={(e) => handleFilter('status', e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="all">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="WAITING">Waiting</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <select
                    value={filters.priority}
                    onChange={(e) => handleFilter('priority', e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="all">All Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <select
                    value={filters.category}
                    onChange={(e) => handleFilter('category', e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="all">All Category</option>
                    <option value="ORDER">Order</option>
                    <option value="PAYMENT">Payment</option>
                    <option value="PRODUCT">Product</option>
                    <option value="DELIVERY">Delivery</option>
                    <option value="REFUND">Refund</option>
                    <option value="OTHER">Other</option>
                </select>
                <select
                    value={filters.assignedTo}
                    onChange={(e) => handleFilter('assignedTo', e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                >
                    <option value="all">All Agents</option>
                    <option value="unassigned">Unassigned</option>
                    {agents.map((a: any) => (
                        <option key={a._id} value={a._id}>{a.name}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {loading.list ? (
                    <div className="p-10 text-center text-gray-500">Loading...</div>
                ) : tickets.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No tickets found</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Ticket #</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Subject</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Agent</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((t: Ticket) => {
                                const customer = typeof t.customer === 'object' ? t.customer : null;
                                const agent = typeof t.assignedTo === 'object' ? t.assignedTo : null;
                                return (
                                    <tr
                                        key={t._id}
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={() => navigate(`/admin/tickets/${t._id}`)}
                                    >
                                        <td className="px-4 py-3 text-sm font-bold">{t.ticketNumber}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="font-semibold">{customer?.name || 'N/A'}</div>
                                            <div className="text-xs text-gray-500">{customer?.mobile || ''}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm max-w-xs truncate">{t.subject}</td>
                                        <td className="px-4 py-3 text-xs font-semibold text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge priority={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                                        <td className="px-4 py-3 text-sm">
                                            {agent?.name || <span className="text-gray-400">Unassigned</span>}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">
                                            {new Date(t.lastMessageAt).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={pagination.page === 1}
                        onClick={() => handleFilter('page', pagination.page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        ← Prev
                    </button>
                    <span className="text-sm font-semibold">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                        disabled={pagination.page === pagination.pages}
                        onClick={() => handleFilter('page', pagination.page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

const StatCard: React.FC<{ label: string; value?: number; color: string }> = ({ label, value, color }) => (
    <div className={`p-3 rounded-lg ${color}`}>
        <div className="text-2xl font-bold">{value ?? 0}</div>
        <div className="text-xs font-semibold mt-1">{label}</div>
    </div>
);

export default TicketsList;