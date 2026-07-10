import React, { useState } from 'react';
import { Gift, Bike, Copy, Check, ArrowLeft } from 'lucide-react';

export default function PromoBanners() {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('SNAPP30');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ direction: 'rtl' }}>

            {/* 🔮 بنر بنفش: کد تخفیف لوکس و مدرن */}
            <div className="group bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 rounded-[36px] p-8 text-white flex items-center justify-between relative overflow-hidden h-52 shadow-[0_20px_50px_rgba(109,40,217,0.2)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.35)] hover:scale-[1.02] transition-all duration-500 ease-out border border-white/10">
                {/* دایره‌های درخشان متحرک پس‌زمینه */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-400/30 rounded-full blur-3xl group-hover:scale-125 group-hover:bg-purple-300/40 transition-all duration-700" />
                <div className="absolute -bottom-16 left-16 w-40 h-40 bg-indigo-400/40 rounded-full blur-3xl pointer-events-none group-hover:translate-x-4 transition-transform duration-700" />

                <div className="z-10 text-right flex flex-col justify-between h-full items-start">
                    <div>
                        <span className="bg-white/10 text-[10px] font-black tracking-wider px-3 py-1.5 rounded-full mb-3 inline-block border border-white/20 backdrop-blur-lg shadow-inner animate-pulse">
                            🔥 پیشنهاد شگفت‌انگیز
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight drop-shadow-sm">۳۰٪ تخفیف داغ</h3>
                        <p className="text-xs text-purple-100/90 font-medium leading-relaxed">
                            روی سفارش بعدی با کد <span className="font-mono bg-black/30 px-2 py-0.5 rounded-lg font-black text-amber-300 border border-black/20 backdrop-blur-xs select-all">SNAPP30</span>
                        </p>
                    </div>

                    <button
                        onClick={handleCopyCode}
                        className={`font-black text-xs px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-2 shadow-lg active:scale-95 ${
                            copied
                                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                                : 'bg-white text-purple-700 hover:bg-purple-50 shadow-purple-900/20 hover:shadow-xl'
                        }`}
                    >
                        {copied ? <Check size={14} className="stroke-[3]" /> : <Copy size={14} />}
                        <span>{copied ? 'کپی شد!' : 'کپی کردن کد'}</span>
                    </button>
                </div>

                {/* آیکون هدیه با استایل سه بعدی ظاهری */}
                <div className="absolute left-4 bottom-2 text-white/10 group-hover:text-white/20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out pointer-events-none drop-shadow-2xl">
                    <Gift size={130} strokeWidth={1.2} />
                </div>
            </div>

            {/* 💖 بنر صورتی: ارسال رایگان با افکت حرکتی سینماتیک */}
            <div className="group bg-gradient-to-br from-[#ff2e6d] via-brand-pink to-[#e61e59] rounded-[36px] p-8 text-white flex items-center justify-between relative overflow-hidden h-52 shadow-[0_20px_50px_rgba(255,46,109,0.2)] hover:shadow-[0_20px_50px_rgba(255,46,109,0.35)] hover:scale-[1.02] transition-all duration-500 ease-out border border-white/10">
                {/* دایره‌های درخشان متحرک پس‌زمینه */}
                <div className="absolute -top-16 -left-8 w-44 h-44 bg-pink-300/30 rounded-full blur-3xl group-hover:scale-125 group-hover:bg-pink-200/40 transition-all duration-700" />
                <div className="absolute -bottom-20 left-24 w-48 h-48 bg-orange-400/30 rounded-full blur-3xl pointer-events-none group-hover:-translate-x-4 transition-transform duration-700" />

                <div className="z-10 text-right flex flex-col justify-between h-full items-start">
                    <div>
                        <span className="bg-white/10 text-[10px] font-black tracking-wider px-3 py-1.5 rounded-full mb-3 inline-block border border-white/20 backdrop-blur-lg shadow-inner">
                            🎁 هدیه خوش‌آمدگویی
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight drop-shadow-sm">اولین سفارش شما</h3>
                        <p className="text-xs text-pink-100/90 font-medium leading-relaxed">کاملاً رایگان، سریع و در سریع‌ترین زمان ارسال میشه!</p>
                    </div>

                    <button className="bg-white text-[#ff2e6d] hover:bg-pink-50 font-black text-xs px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg shadow-pink-900/10 hover:shadow-xl flex items-center gap-1.5 group/btn active:scale-95">
                        <span>همین الان سفارش بده</span>
                        <ArrowLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                    </button>
                </div>

                {/* آیکون موتور با انیمیشن جلوه عمق سه بعدی بر بروی RTL */}
                <div className="absolute left-2 bottom-0 text-white/10 group-hover:text-white/20 group-hover:-translate-x-6 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none drop-shadow-2xl">
                    <Bike size={140} strokeWidth={1} className="transform -scale-x-1" />
                </div>
            </div>

        </section>
    );
}