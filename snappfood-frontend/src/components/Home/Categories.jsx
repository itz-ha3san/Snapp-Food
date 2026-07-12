import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

// افزودن متادیتاهای جدید (تعداد رستوران، زمان ارسال، نشان ویژه) برای غنی‌سازی کارت‌ها
const CATEGORIES = [
    { id: 1, label: "غذای ایرانی", emoji: "🍲", color: "from-rose-50 to-red-100/60 text-rose-600", count: 124, deliveryTime: "۳۵ دقیقه", badge: "پرطرفدار" },
    { id: 2, label: "فست فود", emoji: "🍔", color: "from-orange-50 to-amber-100/60 text-orange-600", count: 86, deliveryTime: "۳۰ دقیقه", badge: "تخفیف‌دار" },
    { id: 3, label: "پیتزا", emoji: "🍕", color: "from-yellow-50 to-orange-100/60 text-amber-600", count: 92, deliveryTime: "۴۰ دقیقه" },
    { id: 4, label: "سوشی", emoji: "🍣", color: "from-cyan-50 to-sky-100/60 text-cyan-600", count: 18, deliveryTime: "۴۵ دقیقه", badge: "جدید" },
    { id: 5, label: "شیرینی", emoji: "🍰", color: "from-pink-50 to-fuchsia-100/60 text-pink-600", count: 45, deliveryTime: "۲۵ دقیقه" },
    { id: 6, label: "ساندویچ", emoji: "🥪", color: "from-green-50 to-emerald-100/60 text-green-600", count: 73, deliveryTime: "۳۰ دقیقه" },
    { id: 7, label: "سالاد", emoji: "🥗", color: "from-lime-50 to-teal-100/60 text-lime-600", count: 29, deliveryTime: "۲۵ دقیقه" },
    { id: 8, label: "کباب", emoji: "🥙", color: "from-amber-50 to-orange-100/60 text-amber-700", count: 64, deliveryTime: "۳۵ دقیقه", badge: "محبوب" },
    { id: 9, label: "نوشیدنی", emoji: "🧃", color: "from-violet-50 to-purple-100/60 text-purple-600", count: 12, deliveryTime: "۱۵ دقیقه" },
    { id: 10, label: "دسر", emoji: "🍮", color: "from-red-50 to-rose-100/60 text-rose-700", count: 31, deliveryTime: "۲۰ دقیقه" },
];

export default function Categories({
                                       onSelectCategory, // تابع کالبک برای فیلتر کردن لیست رستوران‌ها در صفحه اصلی
                                       onViewAllClick,    // اکشن کلیک روی دکمه مشاهده همه دسته‌ها
                                       isLoading = false  // حالت Skeleton لودینگ
                                   }) {
    // تغییر به آرایه برای پشتیبانی از انتخاب چندتایی (Multi-select) هم‌زمان
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (catId) => {
        let updatedSelection;

        if (selectedCategories.includes(catId)) {
            // اگر قبلاً انتخاب شده بود، حذفش کن
            updatedSelection = selectedCategories.filter(id => id !== catId);
        } else {
            // در غیر این صورت به آرایه اضافه‌ش کن
            updatedSelection = [...selectedCategories, catId];
        }

        setSelectedCategories(updatedSelection);

        // ۱. پاس دادن آرایه دسته‌های انتخاب شده به کامپوننت پدر
        if (onSelectCategory) {
            onSelectCategory(updatedSelection);
        }

        // ۲. اسکرول خودکار و نرم به بخش رستوران‌ها هنگام اعمال فیلتر
        const restaurantsSection = document.getElementById("restaurants-section");
        if (restaurantsSection) {
            restaurantsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // کامپوننت داخلی اسکلتون برای زمان لودینگ (Shimmer effect)
    const SkeletonCard = () => (
        <div className="flex flex-col items-center gap-3.5 p-4 rounded-[24px] border border-gray-100 bg-white animate-pulse">
            <div className="w-14 h-14 rounded-2xl bg-gray-200" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-2 w-10 bg-gray-100 rounded" />
        </div>
    );

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

                <button
                    onClick={onViewAllClick}
                    className="group flex items-center gap-1.5 text-xs font-black text-brand-pink hover:text-brand-pink/80 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg p-1 outline-none"
                >
                    <span>مشاهده همه دسته‌ها</span>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            {/* گرید دسته‌بندی‌ها */}
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-5">
                {isLoading ? (
                    // نمایش ۱۰ عدد کارت اسکلتون در حالت لودینگ داده‌ها
                    Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    CATEGORIES.map((cat) => {
                        const isSelected = selectedCategories.includes(cat.id);

                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                aria-pressed={isSelected} // افزوده شده برای دسترسی‌پذیری Screen Readerها
                                className={`group relative flex flex-col items-center p-4 rounded-[24px] border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-pink outline-none ${
                                    isSelected
                                        ? "bg-brand-pink border-brand-pink shadow-lg shadow-brand-pink/25 -translate-y-2"
                                        : "bg-white border-gray-100/80 hover:border-pink-200 hover:shadow-[0_12px_24px_rgba(255,64,129,0.06)] hover:-translate-y-1.5"
                                }`}
                            >
                                {/* نمایش نشان (Badge) مثل پرطرفدار یا جدید روی کارت */}
                                {cat.badge && (
                                    <span className={`absolute -top-2 right-3 text-[9px] font-black px-2 py-0.5 rounded-full border shadow-sm transition-colors ${
                                        isSelected
                                            ? "bg-white text-brand-pink border-white"
                                            : "bg-amber-500 text-white border-amber-400"
                                    }`}>
                                        {cat.badge}
                                    </span>
                                )}

                                {/* باکس اموجی با انیمیشن تعاملی زوم و چرخش */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br transition-all duration-300 transform group-hover:scale-110 mb-2 ${
                                    isSelected
                                        ? "from-white/20 to-white/10 text-white"
                                        : cat.color
                                }`}>
                                    <span className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">
                                        {cat.emoji}
                                    </span>
                                </div>

                                {/* متن اصلی دسته‌بندی */}
                                <span className={`text-xs font-black transition-colors tracking-tight text-center ${
                                    isSelected ? "text-white" : "text-gray-700 group-hover:text-brand-pink"
                                }`}>
                                    {cat.label}
                                </span>

                                {/* متادیتاهای تکمیلی: تعداد رستوران‌های فعال و زمان ارسال میانگین */}
                                <div className="mt-2 text-center space-y-0.5">
                                    <span className={`text-[10px] font-bold block ${
                                        isSelected ? "text-white/80" : "text-gray-400"
                                    }`}>
                                        {cat.count} رستوران
                                    </span>
                                    <span className={`text-[9px] font-medium block ${
                                        isSelected ? "text-white/60" : "text-gray-400/80"
                                    }`}>
                                        {cat.deliveryTime}
                                    </span>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </section>
    );
}