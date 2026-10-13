import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RaiseTicketButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Tickets pages पर hide
    if (location.pathname.startsWith('/tickets')) {
        return null;
    }

    return (
        <>
            {/* 🖥️ Desktop - Right Side Circle */}
            <div
                onClick={() => navigate('/tickets/new')}
                title="Raise a Ticket"
                style={{
                    position: 'fixed',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 99999,
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    boxShadow: '0 10px 25px rgba(34, 197, 94, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 30,
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.7)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.5)';
                }}
            >
                🎫

                {/* Pulse ring */}
                <span
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: '#22c55e',
                        opacity: 0.3,
                        animation: 'pulse-ring 2s infinite',
                        pointerEvents: 'none',
                    }}
                />

                {/* Tooltip */}
                <span
                    style={{
                        position: 'absolute',
                        right: 80,
                        background: '#000',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '8px 12px',
                        borderRadius: 8,
                        whiteSpace: 'nowrap',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        pointerEvents: 'none',
                    }}
                    className="ticket-tooltip"
                >
                    Raise a Ticket
                </span>
            </div>

            {/* 📱 Mobile - Bottom Right Circle */}
            <div
                onClick={() => navigate('/tickets/new')}
                title="Raise a Ticket"
                style={{
                    position: 'fixed',
                    bottom: 100,
                    right: 20,
                    zIndex: 99999,
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    boxShadow: '0 10px 25px rgba(34, 197, 94, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 24,
                }}
            >
                🎫
            </div>

            {/* CSS Animation */}
            <style>
                {`
                    @keyframes pulse-ring {
                        0% {
                            transform: scale(1);
                            opacity: 0.4;
                        }
                        100% {
                            transform: scale(1.4);
                            opacity: 0;
                        }
                    }

                    /* Desktop tooltip on hover */
                    @media (min-width: 768px) {
                        div[title="Raise a Ticket"]:hover .ticket-tooltip {
                            opacity: 1 !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default RaiseTicketButton;