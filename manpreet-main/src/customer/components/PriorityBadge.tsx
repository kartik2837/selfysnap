import React from 'react';
import type { TicketPriority } from '../../types/ticket.types';

interface Props { priority: TicketPriority; }

const PriorityBadge: React.FC<Props> = ({ priority }) => {
    const colors: Record<TicketPriority, string> = {
        HIGH: 'bg-red-100 text-red-700 border-red-300',
        MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        LOW: 'bg-green-100 text-green-700 border-green-300'
    };
    const icons: Record<TicketPriority, string> = {
        HIGH: '🔴', MEDIUM: '🟡', LOW: '🟢'
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${colors[priority]}`}>
            {icons[priority]} {priority}
        </span>
    );
};

export default PriorityBadge;