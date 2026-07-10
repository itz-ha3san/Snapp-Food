import React, { useState, useEffect } from 'react';
import { ChefHat, Bike, PackageCheck, Clock, ShieldCheck, MapPin } from 'lucide-react';

const STEPS = [
    { id: 1, label: 'تایید و آماده‌سازی', desc: 'رستوران در حال پخت سفارش شماست', icon: ChefHat },
    { id: 2, label: 'تحویل به پیک', desc: 'سفیر اسنپ‌فود سفارش را تحویل گرفت', icon: Bike },
    { id: 3, label: 'تحویل سفارش', desc: 'نوش جان! سفارش تحویل داده شد', icon: PackageCheck }
];

export default function orderTracking({ orderDetails, onBackToHome }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(25); // زمان تقریبی به دقیقه
    const [progressPercent, setProgressPercent] = useState(20);

    useEffect(() => {
        // شبیه‌سازی تغییر وضعیت خودکار سفارش برای دمو در فرانت‌اند
        const timer = setTimeout(() => {
            if (currentStep === 1) {
                setCurrentStep(2);
                setTimeLeft(12);
                setProgressPercent(65);
            } else if (currentStep === 2) {
                setCurrentStep(3);
                setTimeLeft(0);
                setProgressPercent(100);
            }
        }, 12000); // هر ۱۲ ثانیه وضعیت عوض می‌شود

        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 text-right" dir="rtl">

            {/* باکس بالای صفحه: زمان باقی‌مانده */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-brand-pink/5 rounded-2xl flex items-center justify-center text-brand-pink animate-pulse">
                        <Clock size={28} />
                    </div>
                    <div>
                        <h2 className="font-black text-xl text-gray-900">
                            {timeLeft > 0 ? `حدود ${timeLeft} دقیقه دیگر` : 'سفارش تحویل داده شد!'}
                        </h2>
                        <p className="text-gray-400 text-xs font-bold mt-0.5">کد سفارش: #{orderDetails?.id || 'SF-9482'}</p>
                    </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 font-black text-xs px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    پرداخت آنلاین موفق
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                {/* بخش استپ‌ها و وضعیت زمانی (سمت راست در دسکتاپ) */}
                <div className="md:col-span-3 bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm space-y-6">
                    <h3 className="font-black text-sm text-gray-800 mb-2">وضعیت مرسوله</h3>

                    <div className="relative border-r-2 border-gray-100 mr-4 pr-6 space-y-8">
                        {STEPS.map((step) => {
                            const IconComponent = step.icon;
                            const isDone = currentStep >= step.id;
                            const isCurrent = currentStep === step.id;

                            return (
                                <div key={step.id} className="relative">
                                    {/* نقطه شاخص خط زمانی */}
                                    <div className={`absolute -right-[31px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-xs transition-all ${
                                        isDone ? 'bg-brand-pink ring-4 ring-brand-pink/10' : 'bg-gray-200'
                                    }`} />

                                    <div className={`flex gap-3 transition-opacity duration-300 ${isDone ? 'opacity-100' : 'opacity-40'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                            isCurrent ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/20' : isDone ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            <IconComponent size={18} />
                                        </div>
                                        <div>
                                            <h4 className={`text-xs font-black ${isCurrent ? 'text-brand-pink' : 'text-gray-800'}`}>{step.label}</h4>
                                            <p className="text-[11px] text-gray-400 font-bold mt-0.5">{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* نقشه شبیه‌سازی شده زنده و گرافیکی (سمت چپ در دسکتاپ) */}
                <div className="md:col-span-2 bg-gray-950 border border-gray-900 rounded-[32px] p-5 shadow-inner flex flex-col justify-between overflow-hidden relative min-h-[280px]">
                    {/* ساختار انتزاعی خطوط جاده‌ای در بک‌گراند نقشه */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                    <svg className="absolute inset-0 w-full h-full stroke-white/10 fill-none" strokeWidth="2">
                        <path d="M-20 80 C 80 80, 100 200, 300 180" />
                        <path d="M60 -20 L 60 400" />
                        <path d="M220 -20 L 220 400" strokeDasharray="4 4" />
                    </svg>

                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full self-start relative z-10">
                        نمای زنده نقشه
                    </span>

                    {/* مسیر حرکت پیک زنده */}
                    <div className="w-full bg-white/5 h-1.5 rounded-full relative overflow-hidden my-auto">
                        <div
                            className="bg-brand-pink h-full rounded-full transition-all duration-1000 relative"
                            style={{ width: `${progressPercent}%` }}
                        >
                            {/* آیکون موتور متحرک روی لبه خط پیشرفت */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-brand-pink text-white rounded-full flex items-center justify-center border-2 border-gray-950 shadow-md">
                                <Bike size={11} className="scale-x-[-1]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10 bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/5">
                        <MapPin size={14} className="text-brand-pink" />
                        <div className="text-[10px] font-bold text-gray-300">
                            مقصد: <span className="text-white font-black truncate max-w-[120px] inline-block align-bottom">{orderDetails?.address?.title || 'خانه (اصلی)'}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* دکمه خروج/بازگشت */}
            <div className="mt-6 text-center">
                <button
                    onClick={onBackToHome}
                    className="text-xs font-black text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                    بازگشت به صفحه اصلی
                </button>
            </div>

        </div>
    );
}