import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux Toolkit/Store';
import {
    fetchMyTickets,
    fetchTicketDetail,
    createTicket,
    sendTicketMessage,
    closeMyTicket,
    rateMyTicket,
    fetchCategories,
    clearError,
    clearCurrentTicket,
    clearLastCreated
} from '../../Redux Toolkit/Customer/ticketSlice';

// ✅ Back arrow icon
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// ✅ Close icon
const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
);

// ✅ Send icon
const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/>
    </svg>
);

const FloatingTicketWidget: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'menu' | 'category' | 'form' | 'chat' | 'tickets' | 'success'>('menu');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        orderId: '',
        subject: '',
        description: '',
        priority: 'MEDIUM'
    });

    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [createdTicket, setCreatedTicket] = useState<any>(null);

    const categories = useAppSelector((s: any) => s.tickets?.categories || []);
    const tickets = useAppSelector((s: any) => s.tickets?.tickets || []);
    const counts = useAppSelector((s: any) => s.tickets?.counts || {});
    const currentTicket = useAppSelector((s: any) => s.tickets?.currentTicket);
    const loading = useAppSelector((s: any) => s.tickets?.loading || {});
    const error = useAppSelector((s: any) => s.tickets?.error);
    const lastCreated = useAppSelector((s: any) => s.tickets?.lastCreatedTicket);

    // ✅ Categories - NO ICONS
    const CATEGORIES = [
        { id: 'ORDER', label: 'Order Related', desc: 'Not delivered, wrong item, damaged, etc.' },
        { id: 'PAYMENT', label: 'Payment Issue', desc: 'Money deducted, payment failed, refund pending' },
        { id: 'PRODUCT', label: 'Product Issue', desc: 'Defective, different from description' },
        { id: 'DELIVERY', label: 'Delivery Issue', desc: 'Late delivery, wrong address, not received' },
        { id: 'REFUND', label: 'Refund Related', desc: 'Refund not received, partial refund' },
        { id: 'OTHER', label: 'Other Issues', desc: 'Any other problem you are facing' }
    ];

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchCategories() as any);
            dispatch(fetchMyTickets({ status: 'all', page: 1 }) as any);
        }
    }, [isOpen, dispatch]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (lastCreated && isOpen) {
            setCreatedTicket(lastCreated);
            setStep('success');
            setForm({ orderId: '', subject: '', description: '', priority: 'MEDIUM' });
            setSelectedCategory(null);
            dispatch(clearLastCreated());
        }
    }, [lastCreated, isOpen, dispatch]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('menu');
                setSelectedTicketId(null);
                setSelectedCategory(null);
                setCreatedTicket(null);
                dispatch(clearCurrentTicket());
            }, 300);
        }
    }, [isOpen, dispatch]);

    useEffect(() => {
        if (selectedTicketId) {
            dispatch(fetchTicketDetail(selectedTicketId) as any);
        }
    }, [selectedTicketId, dispatch]);

    useEffect(() => {
        if (currentTicket?.status === 'RESOLVED' && !currentTicket?.rating) {
            setShowRating(true);
        }
    }, [currentTicket?.status, currentTicket?.rating]);

    const handleCreate = () => {
        if (!selectedCategory) return alert('Please select a category');
        if (!form.subject.trim()) return alert('Please enter subject');
        if (form.description.trim().length < 10) return alert('Description must be at least 10 characters');

        dispatch(createTicket({
            category: selectedCategory.id,
            orderId: form.orderId.trim() || undefined,
            subject: form.subject.trim(),
            description: form.description.trim(),
            priority: form.priority
        }) as any);
    };

    const handleSend = async () => {
        if (!message.trim() || !selectedTicketId) return;
        await dispatch(sendTicketMessage({ ticketId: selectedTicketId, message: message.trim() }) as any);
        setMessage('');
        dispatch(fetchTicketDetail(selectedTicketId) as any);
    };

    const handleRate = async () => {
        if (rating === 0 || !selectedTicketId) return;
        await dispatch(rateMyTicket({ ticketId: selectedTicketId, rating, feedback }) as any);
        setShowRating(false);
    };

    const activeTickets = tickets.filter((t: any) =>
        ['OPEN', 'IN_PROGRESS', 'WAITING'].includes(t.status)
    );
    const pastTickets = tickets.filter((t: any) =>
        ['RESOLVED', 'CLOSED'].includes(t.status)
    );

    const getStatusChip = (status: string) => {
        const map: any = {
            OPEN: { label: 'Pending', cls: 'bg-orange-100 text-orange-700' },
            IN_PROGRESS: { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
            WAITING: { label: 'Waiting', cls: 'bg-yellow-100 text-yellow-700' },
            RESOLVED: { label: 'Resolved', cls: 'bg-green-100 text-green-700' },
            CLOSED: { label: 'Closed', cls: 'bg-gray-200 text-gray-600' }
        };
        return map[status] || map.OPEN;
    };

    const formatDate = (d: string) => {
        const date = new Date(d);
        const diff = Math.floor((Date.now() - date.getTime()) / 60000);
        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff} min ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <>
            {/* ═══════════ FLOATING BUTTON ═══════════ */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[9998]
                           flex items-center gap-2
                           pl-2 pr-4 h-12 rounded-full
                           bg-white hover:bg-gray-50
                           border-2 border-[#2874F0]
                           shadow-lg hover:shadow-xl
                           hover:scale-105 active:scale-95
                           transition-all duration-200"
            >
                <div className="w-8 h-8 rounded-full bg-white
                                flex items-center justify-center
                                overflow-hidden">
                    <img src="/logos.png" alt="Help" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-bold text-[#2874F0]">Help</span>

                {counts.open > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white
                                     text-[10px] font-bold min-w-[18px] h-[18px] px-1
                                     rounded-full flex items-center justify-center
                                     border-2 border-white">
                        {counts.open > 9 ? '9+' : counts.open}
                    </span>
                )}
            </button>

            {/* ═══════════ OVERLAY ═══════════ */}
            <div
                className={`fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
                            transition-opacity duration-300
                            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* ═══════════ RIGHT SIDE DRAWER ═══════════ */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-[9999]
                            w-full md:w-[420px] lg:w-[450px]
                            bg-white shadow-2xl
                            flex flex-col overflow-hidden
                            transition-transform duration-300 ease-out
                            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* ═══ HEADER ═══ */}
                <div className="bg-gradient-to-r from-[#2874F0] to-[#5c9dff]
                                px-4 py-4 flex items-center justify-between
                                relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-10"></div>

                    <div className="relative flex items-center gap-3 flex-1 min-w-0">
                        {/* ✅ BACK BUTTON with Icon */}
                        {step !== 'menu' && (
                            <button
                                onClick={() => {
                                    if (step === 'form') setStep('category');
                                    else if (step === 'category') setStep('menu');
                                    else if (step === 'chat') { setSelectedTicketId(null); setStep('menu'); }
                                    else if (step === 'tickets') setStep('menu');
                                    else if (step === 'success') { setCreatedTicket(null); setStep('menu'); }
                                }}
                                className="w-9 h-9 rounded-full bg-white/20 flex-shrink-0
                                           flex items-center justify-center
                                           text-white hover:bg-white/30
                                           transition-colors"
                                aria-label="Back"
                            >
                                <BackIcon />
                            </button>
                        )}

                        {/* Logo */}
                        <div className="w-11 h-11 rounded-2xl bg-white
                                        flex items-center justify-center
                                        overflow-hidden p-1 shadow-md flex-shrink-0">
                            <img src="/logos.png" alt="Selfysnap" className="w-full h-full object-contain" />
                        </div>

                        {/* Title */}
                        <div className="min-w-0 flex-1">
                            <h2 className="text-white font-bold text-base leading-tight truncate">
                                Selfysnap Help Center
                            </h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-white/90 text-[11px] font-medium">
                                    24×7 Support Available
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Close Button with Icon */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="relative w-9 h-9 rounded-full bg-white/20 hover:bg-white/30
                                   flex items-center justify-center text-white flex-shrink-0
                                   transition-colors"
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* ═══ BODY ═══ */}
                <div className="flex-1 overflow-y-auto bg-gray-50">

                    {/* ─── MENU ─── */}
                    {step === 'menu' && (
                        <div className="p-4 space-y-3">
                            <button
                                onClick={() => setStep('tickets')}
                                className="w-full flex items-center gap-4 p-4 rounded-xl
                                           bg-white border border-gray-200
                                           hover:border-[#2874F0] hover:shadow-md
                                           transition-all text-left"
                            >
                                <div className="flex-1">
                                    <div className="font-bold text-sm text-gray-800">
                                        My Tickets
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                        {activeTickets.length > 0
                                            ? `${activeTickets.length} active ticket${activeTickets.length > 1 ? 's' : ''}`
                                            : 'View all your support tickets'}
                                    </div>
                                </div>
                                {activeTickets.length > 0 && (
                                    <span className="bg-orange-500 text-white text-[10px]
                                                    font-bold min-w-[20px] h-5 px-1.5
                                                    rounded-full flex items-center justify-center">
                                        {activeTickets.length}
                                    </span>
                                )}
                                <span className="text-gray-400">›</span>
                            </button>

                            <div className="mt-4">
                                <p className="text-xs font-bold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                                    Select an Issue
                                </p>
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    {CATEGORIES.map((cat, i) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setStep('form');
                                            }}
                                            className={`w-full flex items-center gap-3 p-4
                                                       hover:bg-blue-50 transition-colors
                                                       text-left ${i !== CATEGORIES.length - 1 ? 'border-b border-gray-100' : ''}`}
                                        >
                                            <span className="text-sm font-semibold text-gray-700 flex-1">
                                                {cat.label}
                                            </span>
                                            <span className="text-gray-300 text-sm">›</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 text-center">
                                <p className="text-[11px] text-gray-400">
                                     Average response time: 2-4 hours
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ─── CATEGORY SELECT ─── */}
                    {step === 'category' && (
                        <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">
                                please Category select 
                            </p>

                            <div className="space-y-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setStep('form');
                                        }}
                                        className="w-full flex items-center gap-3 p-4
                                                   rounded-xl bg-white border border-gray-200
                                                   hover:border-[#2874F0] hover:shadow-md
                                                   transition-all text-left"
                                    >
                                        <div className="flex-1">
                                            <div className="font-bold text-sm text-gray-800">
                                                {cat.label}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {cat.desc}
                                            </div>
                                        </div>
                                        <span className="text-gray-300">›</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ─── FORM ─── */}
                    {step === 'form' && (
                        <div className="p-4 space-y-4">
                            {selectedCategory && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50
                                                border border-blue-100">
                                    <span className="text-sm font-semibold text-[#2874F0] flex-1">
                                        {selectedCategory.label}
                                    </span>
                                    <button
                                        onClick={() => setStep('category')}
                                        className="text-xs font-bold text-[#2874F0] hover:underline"
                                    >
                                        Change
                                    </button>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                                    Order ID <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.orderId}
                                    onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                                    placeholder="e.g. ORD-12345"
                                    className="w-full px-4 py-2.5 border border-gray-300
                                               rounded-lg text-sm
                                               focus:border-[#2874F0] focus:outline-none
                                               focus:ring-2 focus:ring-blue-100
                                               transition-all"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Order ID अगर पता नहीं तो खाली छोड़ें
                                </p>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder="Short title of your issue"
                                    maxLength={200}
                                    className="w-full px-4 py-2.5 border border-gray-300
                                               rounded-lg text-sm
                                               focus:border-[#2874F0] focus:outline-none
                                               focus:ring-2 focus:ring-blue-100
                                               transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Explain your issue in detail..."
                                    rows={4}
                                    maxLength={2000}
                                    className="w-full px-4 py-2.5 border border-gray-300
                                               rounded-lg text-sm resize-none
                                               focus:border-[#2874F0] focus:outline-none
                                               focus:ring-2 focus:ring-blue-100
                                               transition-all"
                                />
                                <div className="text-[10px] text-gray-400 text-right mt-1">
                                    {form.description.length}/2000
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                                    Priority
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setForm({ ...form, priority: p })}
                                            className={`py-2.5 rounded-lg border-2
                                                        text-xs font-semibold transition-all
                                                        ${form.priority === p
                                                            ? 'border-[#2874F0] bg-blue-50 text-[#2874F0]'
                                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleCreate}
                                disabled={loading.create}
                                className="w-full py-3.5
                                           bg-[#FB641B] hover:bg-[#e55a15]
                                           text-white rounded-lg font-bold text-sm
                                           shadow-md transition-all
                                           disabled:opacity-50
                                           active:scale-[0.98]"
                            >
                                {loading.create ? 'Creating Ticket...' : 'Submit Request'}
                            </button>

                            <p className="text-[10px] text-gray-400 text-center">
                                Submit करने पर हमारी team आपसे 2-4 घंटे में contact करेगी
                            </p>
                        </div>
                    )}

                    {/* ─── SUCCESS ─── */}
                    {step === 'success' && createdTicket && (
                        <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-24 h-24 rounded-full bg-green-100
                                            flex items-center justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-green-500
                                                flex items-center justify-center shadow-lg">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                                Ticket Created Successfully!
                            </h3>
                            <p className="text-sm text-gray-600 text-center mb-1">
                                आपका ticket हमें मिल गया है
                            </p>
                            <p className="text-xs text-gray-500 text-center mb-6">
                                हमारी team 2-4 घंटे में आपसे contact करेगी
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl
                                            px-6 py-4 mb-6 w-full text-center">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                                    Ticket Number
                                </p>
                                <p className="text-lg font-bold text-[#2874F0] font-mono">
                                    {createdTicket.ticketNumber}
                                </p>
                            </div>

                            <div className="w-full space-y-2">
                                <button
                                    onClick={() => {
                                        setSelectedTicketId(createdTicket._id);
                                        setStep('chat');
                                    }}
                                    className="w-full py-3 bg-[#2874F0] hover:bg-[#1e5fcc]
                                               text-white rounded-lg font-bold text-sm
                                               shadow-md transition-all"
                                >
                                    View Ticket & Chat
                                </button>
                                <button
                                    onClick={() => {
                                        setCreatedTicket(null);
                                        setStep('menu');
                                    }}
                                    className="w-full py-3 bg-white border border-gray-300
                                               text-gray-700 rounded-lg font-semibold text-sm
                                               hover:bg-gray-50 transition-all"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ─── TICKET LIST ─── */}
                    {step === 'tickets' && (
                        <div className="p-4">
                            {tickets.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-sm font-bold text-gray-700 mb-1">
                                        No tickets yet
                                    </p>
                                    <p className="text-xs text-gray-500 mb-5">
                                        Need help? Raise a ticket
                                    </p>
                                    <button
                                        onClick={() => setStep('category')}
                                        className="px-6 py-2.5 bg-[#2874F0] text-white
                                                   rounded-lg text-sm font-bold"
                                    >
                                        Raise a Ticket
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {activeTickets.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                                                Active ({activeTickets.length})
                                            </p>
                                            <div className="space-y-2">
                                                {activeTickets.map((t: any) => {
                                                    const s = getStatusChip(t.status);
                                                    return (
                                                        <button
                                                            key={t._id}
                                                            onClick={() => { setSelectedTicketId(t._id); setStep('chat'); }}
                                                            className="w-full text-left p-4 rounded-xl
                                                                       bg-white border border-gray-200
                                                                       hover:border-[#2874F0] hover:shadow-md
                                                                       transition-all"
                                                        >
                                                            <div className="flex items-center justify-between mb-1.5">
                                                                <span className="text-[11px] font-bold text-gray-500">
                                                                    #{t.ticketNumber}
                                                                </span>
                                                                <span className={`text-[10px] px-2 py-0.5
                                                                                 rounded-full font-bold ${s.cls}`}>
                                                                    {s.label}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-800 truncate">
                                                                {t.subject}
                                                            </div>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-[10px] text-gray-500">
                                                                    {t.category}
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    {formatDate(t.lastMessageAt)}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {pastTickets.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                                                Closed ({pastTickets.length})
                                            </p>
                                            <div className="space-y-2">
                                                {pastTickets.map((t: any) => {
                                                    const s = getStatusChip(t.status);
                                                    return (
                                                        <button
                                                            key={t._id}
                                                            onClick={() => { setSelectedTicketId(t._id); setStep('chat'); }}
                                                            className="w-full text-left p-4 rounded-xl
                                                                       bg-white border border-gray-200
                                                                       hover:bg-gray-50
                                                                       transition-all"
                                                        >
                                                            <div className="flex items-center justify-between mb-1.5">
                                                                <span className="text-[11px] font-bold text-gray-500">
                                                                    #{t.ticketNumber}
                                                                </span>
                                                                <span className={`text-[10px] px-2 py-0.5
                                                                                 rounded-full font-bold ${s.cls}`}>
                                                                    {s.label}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-700 truncate">
                                                                {t.subject}
                                                            </div>
                                                            <div className="text-[10px] text-gray-400 mt-1.5">
                                                                {formatDate(t.lastMessageAt)}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── CHAT ─── */}
                    {step === 'chat' && currentTicket && (
                        <div className="flex flex-col h-full">
                            <div className="bg-white px-4 py-2.5 flex items-center justify-between
                                            border-b border-gray-200">
                                <span className="text-xs text-gray-600 truncate flex-1">
                                    {currentTicket.subject}
                                </span>
                                {(() => {
                                    const s = getStatusChip(currentTicket.status);
                                    return (
                                        <span className={`text-[10px] px-2 py-0.5
                                                         rounded-full font-bold ml-2 ${s.cls}`}>
                                            {s.label}
                                        </span>
                                    );
                                })()}
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
                                 style={{ maxHeight: 'calc(100vh - 240px)' }}>
                                {currentTicket.messages?.map((m: any, i: number) => {
                                    const isCustomer = m.senderRole === 'CUSTOMER';
                                    const isSystem = m.senderRole === 'SYSTEM';

                                    if (isSystem) {
                                        return (
                                            <div key={i} className="flex justify-center">
                                                <span className="text-[10px] text-gray-500
                                                               bg-white px-3 py-1.5 rounded-full
                                                               max-w-[85%] text-center
                                                               border border-gray-200">
                                                    {m.message}
                                                </span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={i} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl
                                                            ${isCustomer
                                                                ? 'bg-[#2874F0] text-white rounded-br-sm'
                                                                : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'}`}>
                                                {!isCustomer && (
                                                    <div className="text-[10px] font-bold mb-1 text-[#2874F0]">
                                                        {m.senderName}
                                                    </div>
                                                )}
                                                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                                    {m.message}
                                                </div>
                                                <div className={`text-[9px] mt-1 text-right
                                                                ${isCustomer ? 'text-white/70' : 'text-gray-400'}`}>
                                                    {formatDate(m.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!['CLOSED', 'RESOLVED'].includes(currentTicket.status) ? (
                                <div className="bg-white border-t border-gray-200 p-3 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
                                        }}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm
                                                   focus:outline-none focus:ring-2 focus:ring-[#2874F0]/30"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim() || loading.message}
                                        className="w-10 h-10 rounded-full bg-[#2874F0] hover:bg-[#1e5fcc]
                                                   text-white flex items-center justify-center
                                                   disabled:opacity-40 transition-colors"
                                        aria-label="Send"
                                    >
                                        <SendIcon />
                                    </button>
                                </div>
                            ) : currentTicket.status === 'RESOLVED' ? (
                                <div className="bg-green-50 border-t border-green-100 p-3">
                                    <button
                                        onClick={() => selectedTicketId && dispatch(closeMyTicket(selectedTicketId) as any)}
                                        className="w-full py-3 bg-green-600 hover:bg-green-700
                                                   text-white rounded-lg text-sm font-bold"
                                    >
                                        Close Ticket
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-gray-100 text-center py-3 text-xs text-gray-500 font-semibold">
                                    Ticket is closed
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ═══════════ RATING MODAL - WITH LOGO ═══════════ */}
            {showRating && (
                <div className="fixed inset-0 z-[10000] bg-black/60
                                flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
                        {/* ✅ Selfysnap Logo */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100
                                            flex items-center justify-center overflow-hidden p-2 shadow-sm">
                                <img src="/logos.png" alt="Selfysnap" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-base font-bold text-gray-800">Ticket Resolved!</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                How was your experience with Selfysnap?
                            </p>
                        </div>

                        <div className="flex justify-center gap-1 mb-5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setRating(i)}
                                    className={`text-3xl transition-transform hover:scale-110
                                                ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Feedback (optional)"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg
                                       text-sm resize-none mb-4
                                       focus:border-[#2874F0] focus:outline-none"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowRating(false)}
                                className="flex-1 py-2.5 border border-gray-300
                                           rounded-lg text-sm font-semibold text-gray-600"
                            >
                                Skip
                            </button>
                            <button
                                onClick={handleRate}
                                disabled={rating === 0}
                                className="flex-1 py-2.5 bg-[#2874F0] text-white
                                           rounded-lg text-sm font-bold disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingTicketWidget;