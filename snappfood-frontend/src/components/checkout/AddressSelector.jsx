import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle, Briefcase, Home } from 'lucide-react';

const INITIAL_ADDRESSES = [
    { id: 1, type: 'home', title: 'خانه (اصلی)', fullAddress: 'بلوار آزادی، خیابان جیحون، کوچه فروردین، پلاک ۱۲، واحد ۳', city: 'تهران' },
    { id: 2, type: 'work', title: 'دفتر شرکت', fullAddress: 'میدان ونک، خیابان ملاصدرا، نرسیده به کردستان، پلاک ۴۵، طبقه ۵', city: 'تهران' }
];

export default function AddressCheckout({ onSelectAddress }) {
    const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
    const [selectedId, setSelectedId] = useState(1);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const handleSelect = (addr) => {
        setSelectedId(addr.id);
        onSelectAddress(addr);
    };

    const handleAddNew = (e) => {
        e.preventDefault();
        if (!newTitle || !newAddress) return;

        const newObj = {
            id: Date.now(),
            type: 'other',
            title: newTitle,
            fullAddress: newAddress,
            city: 'تهران'
        };

        const updated = [...addresses, newObj];
        setAddresses(updated);
        setSelectedId(newObj.id);
        onSelectAddress(newObj);
        setShowNewForm(false);
        setNewTitle('');
        setNewAddress('');
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-5 text-right" dir="rtl">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <MapPin size={18} className="text-brand-pink" />
                    <span>آدرس تحویل سفارش</span>
                </h4>
                <button
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="flex items-center gap-1 text-[11px] font-black text-brand-pink hover:bg-brand-pink/5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                    <Plus size={14} />
                    <span>افزودن آدرس جدید</span>
                </button>
            </div>

            {/* لیست آدرس‌ها */}
            <div className="space-y-3">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        onClick={() => handleSelect(addr)}
                        className={`border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${
                            selectedId === addr.id
                                ? 'border-brand-pink bg-brand-pink/[0.02]'
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                    >
                        <div className="mt-0.5">
                            {addr.type === 'home' && <Home size={16} className="text-gray-400" />}
                            {addr.type === 'work' && <Briefcase size={16} className="text-gray-400" />}
                            {addr.type === 'other' && <MapPin size={16} className="text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-black text-xs text-gray-800">{addr.title}</span>
                                {selectedId === addr.id && <span className="bg-brand-pink text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">انتخاب شده</span>}
                            </div>
                            <p className="text-gray-500 text-[11px] font-medium leading-relaxed truncate-2-lines">{addr.fullAddress}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* فرم آدرس جدید */}
            {showNewForm && (
                <form onSubmit={handleAddNew} className="mt-4 p-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 space-y-3 animate-fadeIn">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 mb-1">عنوان آدرس (مثلا: خانه مادربزرگ)</label>
                        <input
                            type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 mb-1">نشانی دقیق پستی</label>
                        <textarea
                            required rows="2" value={newAddress} onChange={e => setNewAddress(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-2 text-[11px]">
                        <button type="button" onClick={() => setShowNewForm(false)} className="px-3 py-1.5 font-bold text-gray-500 hover:bg-gray-100 rounded-lg">انصراف</button>
                        <button type="submit" className="px-4 py-1.5 font-black bg-gray-900 text-white rounded-lg hover:bg-gray-800">ذخیره آدرس</button>
                    </div>
                </form>
            )}
        </div>
    );
}