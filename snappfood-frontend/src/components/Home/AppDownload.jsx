import React from 'react';
import { Smartphone, Download, ArrowLeft } from 'lucide-react';

export default function AppDownload() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16" style={{ direction: 'rtl' }}>
            <div className="bg-gradient-to-br from-gray-900 via-slate-950 to-neutral-950 rounded-[40px] p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-pink-950/20 border border-gray-800/60 group">

                {/* هاله‌های نوری درخشان داینامیک پس‌زمینه */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-pink/30 transition-all duration-700" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* بخش متن و توصیفات کاربردی */}
                <div className="flex-1 text-right z-10 space-y-5">
                    <span className="text-[10px] bg-brand-pink/10 text-brand-pink border border-brand-pink/20 font-black px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                        <Smartphone size={12} />
                        <span>اپلیکیشن اختصاصی اسنپ‌فود</span>
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight leading-tight">
                        هر جا هستی، <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-brand-pink via-pink-400 to-amber-300 bg-clip-text text-transparent">غذا سریع‌تر</span> بهت می‌رسه
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed font-bold">
                        با اپلیکیشن اسنپ‌فود فرآیند سفارش بسیار ساده‌تر است؛ از تخفیف‌های اختصاصی و لحظه‌ای باخبر شوید و مسیر حرکت پیک را به صورت زنده روی نقشه دنبال کنید.
                    </p>

                    {/* دکمه‌های مارکت‌ها با کدهای بومی اس‌وی‌جی (بدون نیاز به لود عکس بیرونی) */}
                    <div className="flex flex-wrap gap-4 pt-6 justify-start">
                        {/* دکمه گوگل پلی */}
                        <a
                            href="#download"
                            className="bg-gray-900/80 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-white px-5 py-3 rounded-2xl flex items-center gap-3.5 min-w-[165px] cursor-pointer transition-all duration-300 shadow-md group/btn"
                        >
                            {/* آیکون اختصاصی و سبک گوگل پلی */}
                            <svg className="w-6 h-6 shrink-0 text-brand-pink" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.11L17.87,12.89L11.5,16L16.55,12L11.5,8L17.87,11.33Z" />
                            </svg>
                            <div className="text-right">
                                <p className="text-[9px] text-gray-500 font-bold group-hover/btn:text-gray-400 transition-colors">دریافت از</p>
                                <p className="text-xs font-black font-mono tracking-tight">Google Play</p>
                            </div>
                        </a>

                        {/* دکمه اپ استور */}
                        <a
                            href="#download"
                            className="bg-gray-900/80 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-white px-5 py-3 rounded-2xl flex items-center gap-3.5 min-w-[165px] cursor-pointer transition-all duration-300 shadow-md group/btn"
                        >
                            {/* آیکون اختصاصی و سبک اپل */}
                            <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                            </svg>
                            <div className="text-right">
                                <p className="text-[9px] text-gray-500 font-bold group-hover/btn:text-gray-400 transition-colors">دانلود از</p>
                                <p className="text-xs font-black font-mono tracking-tight">App Store</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* بخش موکاپ با آدرس تصویر جایگزین ۱۰۰٪ پایدار و تست شده دنیای وب */}
                <div className="flex-1 flex justify-center md:justify-end relative z-10 max-w-xs md:max-w-none w-full">
                    <div className="relative transform group-hover:scale-[1.04] group-hover:-rotate-1 transition-all duration-700 ease-out">
                        {/* بک‌دراپ نئونی پشت تلفن همراه */}
                        <div className="absolute inset-x-6 bottom-0 top-12 bg-brand-pink/30 rounded-[40px] blur-3xl pointer-events-none" />
                        <img
                            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=80"
                            alt="Snappfood Application Mockup"
                            className="h-80 md:h-[380px] w-64 object-cover rounded-[36px] border-4 border-gray-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}