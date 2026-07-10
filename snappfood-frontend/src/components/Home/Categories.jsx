import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
    { id: 1, label: "غذای ایرانی", emoji: "🍲", color: "from-rose-50 to-red-100/60 text-rose-600" },
    { id: 2, label: "فست فود", emoji: "🍔", color: "from-orange-50 to-amber-100/60 text-orange-600" },
    { id: 3, label: "پیتزا", emoji: "🍕", color: "from-yellow-50 to-orange-100/60 text-amber-600" },
    { id: 4, label: "سوشی", emoji: "🍣", color: "from-cyan-50 to-sky-100/60 text-cyan-600" },
    { id: 5, label: "شیرینی", emoji: "🍰", color: "from-pink-50 to-fuchsia-100/60 text-pink-600" },
    { id: 6, label: "ساندویچ", emoji: "🥪", color: "from-green-50 to-emerald-100/60 text-green-600" },
    { id: 7, label: "سالاد", emoji: "🥗", color: "from-lime-50 to-teal-100/60 text-lime-600" },
    { id: 8, label: "کباب", emoji: "🥙", color: "from-amber-50 to-orange-100/60 text-amber-700" },
    { id: 9, label: "نوشیدنی", emoji: "🧃", color: "from-violet-50 to-purple-100/60 text-purple-600" },
    { id: 10, label: "دسر", emoji: "🍮", color: "from-red-50 to-rose-100/60 text-rose-700" },
];

export default function Categories() {
    const [active, setActive] = useState(null);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ direction: "rtl" }}>

            {/* هدر بخش دسته‌بندی‌ها */}
            <div className="flex items-center justify-between mb-10">
                <div className="text-right">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-1.5 rounded-full bg-brand-pink" />
                        <span className="text-[11px] font-black text-brand-pink tracking-wider uppercase">تنظیم ذائقه</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">هر چی دوست داری، اینجاست</h2>
                </div>
                <button className="group flex items-center gap-1.5 text-xs font-black text-brand-pink hover:text-brand-pink/80 transition-all cursor-pointer">
                    <span>مشاهده همه دسته‌ها</span>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            {/* گرید دسته‌بندی‌ها با استایل مدرن شناور */}
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-5">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActive(active === cat.id ? null : cat.id)}
                        className={`group flex flex-col items-center gap-3.5 p-4 rounded-[24px] border transition-all duration-300 cursor-pointer ${
                            active === cat.id
                                ? "bg-brand-pink border-brand-pink shadow-lg shadow-brand-pink/25 -translate-y-2"
                                : "bg-white border-gray-100/80 hover:border-pink-200 hover:shadow-[0_12px_24px_rgba(255,64,129,0.06)] hover:-translate-y-1.5"
                        }`}
                    >
                        {/* باکس اموجی با انیمیشن تعاملی زوم و چرخش در هاور */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br transition-all duration-300 transform group-hover:scale-110 ${
                            active === cat.id
                                ? "from-white/20 to-white/10 text-white"
                                : cat.color
                        }`}>
                            {/* اصلاح شد: استفاده از کلاس معتبر inline-block به جای نمایش نامعتبر قبلی */}
                            <span className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">
                                {cat.emoji}
                            </span>
                        </div>

                        {/* متن دسته‌بندی */}
                        <span className={`text-xs font-black transition-colors tracking-tight ${
                            active === cat.id ? "text-white" : "text-gray-700 group-hover:text-brand-pink"
                        }`}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}