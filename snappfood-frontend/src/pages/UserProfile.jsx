import React, { useState } from 'react';
import { User, MapPin, History, RefreshCw, Star, Trash2, Plus, CheckCircle2 } from 'lucide-react';

export default function UserProfile({ user, pastOrders = [], onReorder, onAddComment }) {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses'
    const [addresses, setAddresses] = useState([
        { id: 1, title: 'خانه', detail: 'بلوار آزادی، خیابان جیحون، پلاک ۱۲' },
        { id: 2, title: 'دفتر کار', detail: 'میدان ونک، خیابان ملاصدرا، پلاک ۴۵' }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDetail, setNewDetail] = useState('');

    // ثبت آدرس جدید
    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!newTitle || !newDetail) return;
        setAddresses([...addresses, { id: Date.now(), title: newTitle, detail: newDetail }]);
        setNewTitle(''); setNewDetail(''); setShowForm(false);
    };

    // حذف آدرس
    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-right" dir="rtl">
            {/* کارت خوش‌آمدگویی هدر */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
                    <User size={28} />
                </div>
                <div>
                    <h2 className="font-black text-lg text-gray-900">{user?.name || 'کاربر مهمان'}</h2>
                    <p className="text-gray-400 text-xs font-bold mt-1">{user?.phone || '۰۹۱۲۳۴۵۶۷۸۹'}</p>
                </div>
            </div>

            {/* تب‌های جابجایی */}
            <div className="flex gap-4 border-b border-gray-200 pb-3 mb-6">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-3 text-xs font-black transition-all relative flex items-center gap-1.5 cursor-pointer ${activeTab === 'orders' ? 'text-brand-pink' : 'text-gray-400'}`}
                >
                    <History size={16} />
                    <span>تاریخچه سفارش‌ها</span>
                    {activeTab === 'orders' && <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-pink rounded-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('addresses')}
                    className={`pb-3 text-xs font-black transition-all relative flex items-center gap-1.5 cursor-pointer ${activeTab === 'addresses' ? 'text-brand-pink' : 'text-gray-400'}`}
                >
                    <MapPin size={16} />
                    <span>آدرس‌های من</span>
                    {activeTab === 'addresses' && <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-pink rounded-full" />}
                </button>
            </div>

            {/* محتوای تب تاریخچه سفارش‌ها */}
            {activeTab === 'orders' && (
                <div className="space-y-4">
                    {pastOrders.length === 0 ? (
                        <p className="text-center py-10 text-xs text-gray-400 font-bold bg-white rounded-2xl border border-dashed border-gray-200">هنوز سفارشی ثبت نکرده‌اید.</p>
                    ) : (
                        pastOrders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-xs text-gray-900">{order.restaurantName}</h4>
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md">تحویل شده</span>
                                    </div>
                                    <p className="text-gray-400 text-[11px] font-medium">{order.itemsSummary}</p>
                                    <span className="text-gray-500 text-[11px] font-black block">{order.total.toLocaleString()} تومان</span>
                                </div>

                                {/* عملیات: سفارش مجدد و ثبت نظر */}
                                <div className="flex gap-2 self-end sm:self-center">
                                    <button
                                        onClick={() => onAddComment(order)}
                                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-[11px] rounded-xl transition-all cursor-pointer flex items-center gap-1"
                                    >
                                        <Star size={13} className="text-amber-500 fill-amber-500" />
                                        <span>ثبت نظر</span>
                                    </button>
                                    <button
                                        onClick={() => onReorder(order.cartItems, order.restaurantObj)}
                                        className="px-4 py-2 bg-brand-pink hover:bg-pink-600 text-white font-black text-[11px] rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm shadow-brand-pink/10"
                                    >
                                        <RefreshCw size={13} />
                                        <span>سفارش مجدد</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* محتوای تب مدیریت آدرس‌ها */}
            {activeTab === 'addresses' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black text-xs text-gray-800">نشانی‌های ثبت شده</h3>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center gap-1 text-[11px] font-black text-brand-pink hover:bg-brand-pink/5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                            <Plus size={14} />
                            <span>{showForm ? 'بستن فرم' : 'افزودن آدرس جدید'}</span>
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleAddAddress} className="p-4 border border-dashed border-gray-200 rounded-2xl bg-white space-y-3 animate-fadeIn">
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="text" required placeholder="عنوان (مانند: خانه دوم)" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                                    className="col-span-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink"
                                />
                                <input
                                    type="text" required placeholder="نشانی دقیق پستی..." value={newDetail} onChange={e => setNewDetail(e.target.value)}
                                    className="col-span-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink"
                                />
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white font-black text-[11px] py-2 rounded-xl">ذخیره آدرس</button>
                        </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(addr => (
                            <div key={addr.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start justify-between gap-2">
                                <div className="flex items-start gap-2.5">
                                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="font-black text-xs text-gray-800">{addr.title}</span>
                                        <p className="text-gray-400 text-[11px] font-medium mt-1">{addr.detail}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}