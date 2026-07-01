import { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, Sparkles } from "lucide-react";

const FLOATING_FOODS = [
    { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=340&h=340&fit=crop&auto=format", alt: "پیتزا", style: "top-[8%] right-[2%] w-48 rotate-[12deg]", delay: "0s" },
    { src: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&h=300&fit=crop&auto=format", alt: "سوشی", style: "top-[12%] left-[2%] w-40 rotate-[-10deg]", delay: "0.4s" },
    { src: "https://images.unsplash.com/photo-1544025162-d76594e11b58?w=300&h=300&fit=crop&auto=format", alt: "کباب", style: "bottom-[12%] right-[4%] w-44 rotate-[8deg]", delay: "0.8s" },
    { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=280&h=280&fit=crop&auto=format", alt: "برگر", style: "bottom-[10%] left-[3%] w-40 rotate-[-6deg]", delay: "1.2s" },
];

const SUGGESTIONS = ["پیتزا مارگاریتا…", "کباب کوبیده…", "سوشی سالمون…", "برگر دبل چیز…"];

export default function Hero() {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [placeholderIdx, setPlaceholderIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setPlaceholderIdx((p) => (p + 1) % SUGGESTIONS.length), 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative min-h-[580px] flex flex-col items-center justify-center overflow-hidden py-16" style={{ direction: "rtl" }}>
            {/* بک‌گراند گرادینت */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] via-[#F9FAFB] to-[#F0F4FF] pointer-events-none" />

            {/* حباب‌های نوری دکوراتیو */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

            {/* تصاویر شناور غذاها با انیمیشن */}
            {FLOATING_FOODS.map((f, i) => (
                <div key={i} className={`absolute ${f.style} hidden lg:block pointer-events-none select-none z-0`}>
                    <div className="relative shadow-2xl rounded-[28px] overflow-hidden bg-black/5 p-1 ring-4 ring-white/80 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: f.delay }}>
                        <img src={f.src} alt={f.alt} className="rounded-[24px] object-cover w-full aspect-square" />
                    </div>
                </div>
            ))}

            {/* محتوای وسط */}
            <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full px-6 text-center">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-1.5 shadow-sm">
                    <Sparkles size={13} className="text-[#E0245E]" />
                    <span className="text-xs font-semibold text-[#E0245E]">سریع‌ترین سرویس تحویل غذا</span>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        سفارش آنلاین غذا، <br />
                        <span className="text-[#E0245E]">سریع و آسان</span> در خانه شما
                    </h1>
                    <p className="text-base text-gray-500 font-medium max-w-md mx-auto">
                        جدیدترین و بهترین رستوران‌ها، کافه‌ها و سوپرمارکت‌ها در اطراف شما
                    </p>
                </div>

                {/* باکس جستجوی مدرن */}
                <div className={`w-full max-w-xl transition-all duration-300 ${focused ? "scale-[1.01]" : ""}`}>
                    <div className={`flex items-center bg-white rounded-[24px] border p-2 transition-all duration-300 shadow-xl ${focused ? "border-[#E0245E]/40 shadow-[#E0245E]/5" : "border-gray-200/80"}`}>
                        <div className="flex-1 flex items-center gap-3 pr-4">
                            <Search size={18} className={focused ? "text-[#E0245E]" : "text-gray-400"} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder={`جستجوی ${SUGGESTIONS[placeholderIdx]}`}
                                className="flex-1 bg-transparent py-3 text-sm font-medium outline-none text-gray-900"
                            />
                        </div>

                        <div className="w-px h-6 bg-gray-200 mx-2" />

                        <button className="flex items-center gap-1 px-3 text-xs text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap">
                            <MapPin size={14} className="text-[#E0245E]" />
                            ولنجک <ChevronDown size={12} />
                        </button>

                        <button className="bg-[#E0245E] text-white font-bold text-sm px-6 py-3 rounded-2xl hover:bg-[#E0245E]/90 transition-all shadow-md">
                            جستجو
                        </button>
                    </div>
                </div>

                {/* آمار ارقام انتهای هیرو */}
                <div className="flex items-center gap-10 mt-4 border-t border-gray-100 pt-6 w-full justify-center">
                    {[
                        { label: "رستوران فعال", value: "+۵۰۰" },
                        { label: "سفارش روزانه", value: "+۱۲,۰۰۰" },
                        { label: "شهر ایران", value: "+۳۰" },
                    ].map((s, idx) => (
                        <div key={idx} className="text-center">
                            <div className="font-black text-xl text-gray-900">{s.value}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}