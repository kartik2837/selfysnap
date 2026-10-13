import React from 'react';
import type { TicketStatus } from '../types/ticket.types';

interface Props { status: TicketStatus; }

const StatusBadge: React.FC<Props> = ({ status }) => {
    const colors: Record<TicketStatus, string> = {
        OPEN: 'bg-orange-100 text-orange-700 border-orange-300',
        IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-300',
        WAITING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        RESOLVED: 'bg-green-100 text-green-700 border-green-300',
        CLOSED: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colors[status] || colors.OPEN}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default StatusBadge;