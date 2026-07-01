import { useState, useEffect } from "react";
import { User, Store, MapPin, ChevronDown } from "lucide-react";

// ۱. پروپ onAuthClick را در ورودی کامپوننت دریافت می‌کنیم
export default function Header({ onAuthClick }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_24px_rgba(17,24,39,0.06)]"
                    : "bg-white border-b border-gray-100"
            }`}
        >
            <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between" style={{ direction: "rtl" }}>

                {/* سمت راست: لوگو و لوکیشن */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-[14px] bg-[#E0245E] flex items-center justify-center shadow-lg shadow-[#E0245E]/30">
                            <span className="text-white text-lg font-black leading-none">S</span>
                        </div>
                        <div className="text-xl font-black tracking-tight">
                            <span className="text-gray-900">اسنپ</span>
                            <span className="text-[#E0245E]">فود</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 hover:border-[#E0245E]/30 hover:shadow-sm transition-all group cursor-pointer">
                        <MapPin size={15} className="text-[#E0245E]" />
                        <span className="text-sm font-medium text-gray-800">تهران، ولنجک</span>
                        <ChevronDown size={14} className="text-gray-400 group-hover:text-[#E0245E] transition-colors" />
                    </button>
                </div>

                {/* سمت چپ: دکمه‌های ورود و ثبت‌نام */}
                <div className="flex items-center gap-3">
                    {/* ۲. تابع onAuthClick را به onClick این دکمه متصل می‌کنیم */}
                    <button
                        onClick={onAuthClick}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                        <User size={16} />
                        ورود یا ثبت‌نام
                    </button>
                    <button className="flex items-center gap-2 bg-[#E0245E] text-white text-sm font-bold px-5 py-2.5 rounded-2xl hover:bg-[#E0245E]/90 transition-all shadow-lg shadow-[#E0245E]/25 hover:shadow-[#E0245E]/40 hover:-translate-y-px cursor-pointer">
                        <Store size={15} />
                        ثبت‌نام فروشندگان
                    </button>
                </div>

            </div>
        </header>
    );
}