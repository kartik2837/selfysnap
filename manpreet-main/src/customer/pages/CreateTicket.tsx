import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux Toolkit/Store';
import {
    fetchCategories,
    createTicket,
    clearError,
    clearLastCreated
} from '../../Redux Toolkit/Customer/ticketSlice';
import type { TicketCategory, TicketPriority } from '../../types/ticket.types';

// ✅ Fallback categories (अगर backend से नहीं आएं)
const FALLBACK_CATEGORIES = [
    { id: 'ORDER', label: 'Order Issue', icon: '📦' },
    { id: 'PAYMENT', label: 'Payment Issue', icon: '💳' },
    { id: 'PRODUCT', label: 'Product Issue', icon: '🛍️' },
    { id: 'DELIVERY', label: 'Delivery Issue', icon: '🚚' },
    { id: 'REFUND', label: 'Refund Issue', icon: '💰' },
    { id: 'OTHER', label: 'Other', icon: '❓' }
];

const CreateTicket: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const backendCategories = useAppSelector((s: any) => s.tickets.categories);
    const loading = useAppSelector((s: any) => s.tickets.loading);
    const error = useAppSelector((s: any) => s.tickets.error);
    const lastCreated = useAppSelector((s: any) => s.tickets.lastCreatedTicket);

    // ✅ Backend से आएं तो use करो, वरना fallback
    const categories = backendCategories && backendCategories.length > 0
        ? backendCategories
        : FALLBACK_CATEGORIES;

    const [form, setForm] = useState({
        category: '' as TicketCategory | '',
        orderId: '',
        subject: '',
        description: '',
        priority: 'MEDIUM' as TicketPriority
    });

    const [debugInfo, setDebugInfo] = useState('');

    // Try to fetch categories (but don't block if fails)
    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    // Error alert
    useEffect(() => {
        if (error) {
            console.log('❌ Error:', error);
            // Categories fetch failed → fallback use होगा
            if (!error.includes('categor')) {
                alert(error);
            }
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // Ticket create success
    useEffect(() => {
        if (lastCreated) {
            alert(`✅ Ticket Created!\n\nTicket #: ${lastCreated.ticketNumber}\n\nTeam will reply within 2-4 hours.`);
            dispatch(clearLastCreated());
            navigate(`/tickets/${lastCreated._id}`);
        }
    }, [lastCreated, dispatch, navigate]);

    // ✅ Category select handler
    const handleCategorySelect = (catId: string) => {
        console.log('🎯 Category selected:', catId);
        setForm(prev => ({ ...prev, category: catId as TicketCategory }));
        setDebugInfo(`Selected: ${catId}`);
    };

    const handleSubmit = () => {
        // Debug: form state देखो
        console.log('📝 Form:', form);

        // Validation
        if (!form.category || form.category === '') {
            alert(`Please select a category.\n\nDebug: "${form.category}" (empty)\n\nCategories available: ${categories.length}`);
            return;
        }
        if (!form.subject.trim()) {
            alert('Please enter subject');
            return;
        }
        if (form.description.trim().length < 10) {
            alert('Description must be at least 10 characters');
            return;
        }

        // Submit
        console.log('✅ Submitting:', form);
        dispatch(createTicket({
            category: form.category as TicketCategory,
            orderId: form.orderId || undefined,
            subject: form.subject.trim(),
            description: form.description.trim(),
            priority: form.priority
        }) as any);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">🎫 Raise a Ticket</h1>

            {/* Debug info (hata do बाद में) */}
            {debugInfo && (
                <div className="bg-yellow-100 p-2 rounded mb-2 text-xs">
                    {debugInfo}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
                {/* Category */}
                <div>
                    <label className="block font-semibold mb-2 text-sm">
                        Category *
                        {form.category && (
                            <span className="text-green-600 ml-2">
                                ✓ {form.category} selected
                            </span>
                        )}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {categories.map((cat: any) => {
                            const isSelected = form.category === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                                        isSelected
                                            ? 'border-green-600 bg-green-600 text-white'
                                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{cat.icon}</div>
                                    <div>{cat.label}</div>
                                </button>
                            );
                        })}
                    </div>
                    {categories.length === 0 && (
                        <p className="text-red-500 text-xs mt-2">
                            ⚠️ No categories available
                        </p>
                    )}
                </div>

                {/* Order ID */}
                <div>
                    <label className="block font-semibold mb-2 text-sm">
                        Order ID (optional)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., ORD-12345"
                        value={form.orderId}
                        onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className="block font-semibold mb-2 text-sm">
                        Subject *
                    </label>
                    <input
                        type="text"
                        maxLength={200}
                        placeholder="Brief title of your issue"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-2 text-sm">
                        Description *
                    </label>
                    <textarea
                        rows={5}
                        maxLength={2000}
                        placeholder="Explain your issue in detail..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:border-black"
                    />
                    <div className="text-xs text-gray-400 text-right mt-1">
                        {form.description.length}/2000
                    </div>
                </div>

                {/* Priority */}
                <div>
                    <label className="block font-semibold mb-2 text-sm">
                        Priority
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['LOW', 'MEDIUM', 'HIGH'] as TicketPriority[]).map((p) => {
                            const isSelected = form.priority === p;
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setForm({ ...form, priority: p })}
                                    className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                                        isSelected
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                                    }`}
                                >
                                    {p === 'HIGH' ? '🔴' : p === 'MEDIUM' ? '🟡' : '🟢'} {p}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading.create}
                    className="w-full py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition"
                >
                    {loading.create ? '⏳ Creating Ticket...' : '🎫 Submit Ticket'}
                </button>
            </div>
        </div>
    );
};

export default CreateTicket;