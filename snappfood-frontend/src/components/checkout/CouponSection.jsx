import React, { useState } from 'react';
import { Ticket, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

// دیتابیس فرضی کدهای تخفیف معتبر
const VALID_COUPONS = {
    'OFF30': { type: 'percent', value: 30, maxDiscount: 50000, minOrder: 100000, label: 'تخفیف ۳۰ درصدی ویژه اولین خرید' },
    'SNAPPMO': { type: 'fixed', value: 25000, maxDiscount: 25000, minOrder: 70000, label: '۲۵ هزار تومان تخفیف مخصوص هدر اصلی' },
};

export default function CouponSection({ subtotal, onApplyDiscount, currentDiscount }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleApply = () => {
        setError('');
        setSuccessMsg('');
        const cleanCode = code.trim().toUpperCase();

        if (!cleanCode) {
            setError('لطفاً کد تخفیف را وارد کنید.');
            return;
        }

        const coupon = VALID_COUPONS[cleanCode];

        if (!coupon) {
            setError('کد تخفیف وارد شده معتبر نیست یا منقضی شده است.');
            return;
        }

        if (subtotal < coupon.minOrder) {
            setError(`حداقل مبلغ سفارش برای این کد باید ${coupon.minOrder.toLocaleString()} تومان باشد.`);
            return;
        }

        // محاسبه مبلغ دقیق تخفیف
        let discountAmount = 0;
        if (coupon.type === 'percent') {
            discountAmount = (subtotal * coupon.value) / 100;
            if (discountAmount > coupon.maxDiscount) discountAmount = coupon.maxDiscount;
        } else {
            discountAmount = coupon.value;
        }

        setSuccessMsg(`${coupon.label} با موفقیت اعمال شد.`);
        onApplyDiscount({ code: cleanCode, amount: discountAmount });
    };

    const handleRemove = () => {
        setCode('');
        setError('');
        setSuccessMsg('');
        onApplyDiscount(null);
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100" dir="rtl">
            <div className="flex items-center gap-2 text-xs font-black text-gray-800 mb-3">
                <Ticket size={16} className="text-brand-pink" />
                <span>کد تخفیف یا کارت هدیه</span>
            </div>

            {!currentDiscount ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="مثلاً: SNAPPMO"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:border-brand-pink outline-none uppercase tracking-wider text-left"
                    />
                    <button
                        onClick={handleApply}
                        className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                        اعمال
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                        <CheckCircle2 size={16} />
                        <span>کد <strong className="font-black">{currentDiscount.code}</strong> فعال است</span>
                    </div>
                    <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold mt-2 animate-headShake">
                    <AlertCircle size={13} />
                    <span>{error}</span>
                </div>
            )}
            {successMsg && !error && (
                <p className="text-emerald-600 text-[11px] font-bold mt-2">{successMsg}</p>
            )}
        </div>
    );
}