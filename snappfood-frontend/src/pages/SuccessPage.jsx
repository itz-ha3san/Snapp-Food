import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

export default function SuccessPage({ onBackToHome }) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center" dir="rtl">
            <div className="max-w-md w-full bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl space-y-6 transform animate-fade-in">

                {/* بخش آیکون تیک با انیمیشن پالس ملایم */}
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto animate-pulse">
                    <CheckCircle size={36} className="stroke-2" />
                </div>

                {/* پیام موفقیت */}
                <div className="space-y-1">
                    <h1 className="text-xl font-black text-gray-900">سفارش شما با موفقیت ثبت شد</h1>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">
                        طباخ رستوران مشغول آماده‌سازی غذای شماست. پیک اسنپ‌فود به زودی حرکت خواهد کرد.
                    </p>
                </div>

                {/* دکمه بازگشت */}
                <button
                    onClick={onBackToHome}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                    <Home size={15} />
                    <span>بازگشت به صفحه اصلی</span>
                </button>
            </div>
        </div>
    );
}