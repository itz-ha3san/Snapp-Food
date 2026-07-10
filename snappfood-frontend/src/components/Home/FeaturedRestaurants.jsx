import React from 'react';
import { Star, ArrowLeft, ArrowRight, Clock, Bike, ChevronLeft } from 'lucide-react';

const restaurants = [
    {
        id: 1,
        name: "پیتزا هومه",
        type: "پیتزا • ایتالیایی",
        categories: ["pizza"],
        rating: "4.9",
        time: "25-35 دقیقه",
        delivery: "ارسال رایگان",
        discount: "20% تخفیف",
        tag: "پرطرفدار",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "برگر فکتوری",
        type: "برگر • فست فود",
        categories: ["burger"],
        rating: "4.7",
        time: "20-30 دقیقه",
        delivery: "ارسال رایگان",
        discount: "15% تخفیف",
        tag: "تخفیف ویژه",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "رستوران کوکو",
        type: "سوشی • ژاپنی",
        categories: ["pizza"],
        rating: "4.8",
        time: "45-55 دقیقه",
        delivery: "ارسال رایگان",
        tag: "جدید",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "کباب‌سرای لاله",
        type: "کباب • ایرانی",
        categories: ["iranian"],
        rating: "4.6",
        time: "30-40 دقیقه",
        delivery: "ارسال رایگان",
        tag: "برگزیده",
        image: "https://images.unsplash.com/photo-1561651823-34fed0225408?w=500&auto=format&fit=crop&q=60"
    }
];

export default function FeaturedRestaurants({ onRestaurantSelect }) {
    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100/70 mt-8" style={{ direction: 'rtl' }}>
            {/* هدر بخش بهترین‌ها */}
            <div className="flex items-center justify-between mb-10">
                <div className="text-right">
                    <span className="text-[11px] bg-pink-50 text-brand-pink px-3 py-1 rounded-full font-black mb-2 inline-block tracking-wide shadow-xs shadow-brand-pink/5">
                        رستوران‌های برگزیده
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">بهترین‌های شهر تو</h2>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-800 hover:border-gray-300 shadow-sm transition-all cursor-pointer"><ArrowRight size={18} /></button>
                    <button className="p-2.5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-800 hover:border-gray-300 shadow-sm transition-all cursor-pointer"><ArrowLeft size={18} /></button>
                </div>
            </div>

            {/* گرید کارت‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {restaurants.map((res) => (
                    <div
                        key={res.id}
                        onClick={() => onRestaurantSelect && onRestaurantSelect(res)}
                        className="group bg-white rounded-[32px] border border-gray-100/80 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full relative cursor-pointer"
                    >
                        {/* بخش تصویر کارت */}
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
                            <img
                                src={res.image}
                                alt={res.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-80 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl -z-10">🍲</div>

                            {/* تگ تخفیف شرطی (اصلاح شد) */}
                            {res.discount && (
                                <span className="absolute top-4 right-4 bg-gradient-to-r from-brand-pink to-[#ff4081] text-white text-[11px] font-black px-3 py-1.5 rounded-xl z-10 shadow-md shadow-brand-pink/20 tracking-tight">
                                    {res.discount}
                                </span>
                            )}

                            {/* تگ وضعیت رستوران */}
                            {res.tag && (
                                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-xs z-10 border border-white/20">
                                    {res.tag}
                                </span>
                            )}
                        </div>

                        {/* بخش توضیحات دیتای کارت */}
                        <div className="p-5 flex flex-col justify-between grow text-right bg-gradient-to-b from-white to-gray-50/40 rounded-b-[32px] space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <h3 className="font-black text-base text-gray-800 group-hover:text-brand-pink transition-colors">
                                        {res.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[11px] font-black">
                                        <Star size={12} className="fill-amber-600" />
                                        <span>{res.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs font-bold">{res.type}</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] font-bold text-gray-500">
                                <div className="flex items-center gap-1"><Clock size={13} /><span>{res.time}</span></div>
                                <div className="flex items-center gap-1 text-emerald-600"><Bike size={13} /><span>{res.delivery}</span></div>
                                <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-brand-pink group-hover:text-white transition-colors"><ChevronLeft size={14} /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}