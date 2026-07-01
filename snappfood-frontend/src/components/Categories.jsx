import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
    { id: 1, label: "غذای ایرانی", emoji: "🍲", color: "from-rose-100 to-red-50" },
    { id: 2, label: "فست فود", emoji: "🍔", color: "from-orange-100 to-amber-50" },
    { id: 3, label: "پیتزا", emoji: "🍕", color: "from-yellow-100 to-lime-50" },
    { id: 4, label: "سوشی", emoji: "🍣", color: "from-cyan-100 to-sky-50" },
    { id: 5, label: "شیرینی", emoji: "🍰", color: "from-pink-100 to-fuchsia-50" },
    { id: 6, label: "ساندویچ", emoji: "🥪", color: "from-green-100 to-emerald-50" },
    { id: 7, label: "سالاد", emoji: "🥗", color: "from-lime-100 to-teal-50" },
    { id: 8, label: "کباب", emoji: "🥙", color: "from-amber-100 to-orange-50" },
    { id: 9, label: "نوشیدنی", emoji: "🧃", color: "from-violet-100 to-purple-50" },
    { id: 10, label: "دسر", emoji: "🍮", color: "from-red-100 to-rose-50" },
];

export default function Categories() {
    const [active, setActive] = useState(null);

    return (
        <section className="max-w-[1280px] mx-auto px-8 py-12" style={{ direction: "rtl" }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-1 rounded-full bg-[#E0245E]" />
                        <span className="text-xs font-bold text-[#E0245E] tracking-wider">دسته‌بندی‌ها</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">هر چی دوست داری، اینجاست</h2>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-[#E0245E] hover:gap-2 transition-all">
                    مشاهده همه دسته‌ها <ArrowLeft size={14} />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActive(active === cat.id ? null : cat.id)}
                        className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                            active === cat.id
                                ? "bg-[#E0245E] border-[#E0245E] shadow-lg shadow-[#E0245E]/20 -translate-y-1"
                                : "bg-white border-gray-100 hover:border-pink-200 hover:shadow-md hover:-translate-y-1"
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${active === cat.id ? "bg-white/20" : cat.color}`}>
                            {cat.emoji}
                        </div>
                        <span className={`text-xs font-bold transition-colors ${active === cat.id ? "text-white" : "text-gray-800"}`}>
              {cat.label}
            </span>
                    </button>
                ))}
            </div>
        </section>
    );
}