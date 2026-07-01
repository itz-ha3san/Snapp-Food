import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

// داده‌های بخش بهترین‌های شهر تو
const restaurants = [
    {
        id: 1,
        name: "پیتزا هومه",
        type: "پیتزا • ایتالیایی",
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
        rating: "4.6",
        time: "30-40 دقیقه",
        delivery: "ارسال رایگان",
        tag: "برگزیده",
        image: "https://images.unsplash.com/photo-1561651823-34fed0225408?w=500&auto=format&fit=crop&q=60"
    }
];

export default function FeaturedRestaurants() {
    // برطرف کردن خطای ارجاع به تصویر وب‌سایت
    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100 mt-6">
            <div className="flex items-center justify-between mb-6">
                <div className="text-right">
                    <span className="text-[10px] bg-pink-50 text-brand-pink px-2 py-0.5 rounded-md font-bold mb-1 inline-block">رستوران‌های برگزیده</span>
                    <h2 className="text-xl font-black text-gray-900">بهترین‌های شهر تو</h2>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-700 shadow-xs cursor-pointer"><ArrowRight size={16} /></button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-700 shadow-xs cursor-pointer"><ArrowLeft size={16} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {restaurants.map((res) => (
                    <div key={res.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition duration-200 flex flex-col h-full">
                        <div className="relative aspect-video w-full bg-gray-100">
                            <img
                                src={res.image}
                                alt={res.name}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl -z-10">🍲</div>

                            {res.discount && (
                                <span className="absolute top-3 right-3 bg-brand-pink text-white text-[10px] font-bold px-2 py-1 rounded-lg z-10">
                  {res.discount}
                </span>
                            )}
                            {res.tag && (
                                <span className="absolute bottom-3 right-3 bg-white text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-100 shadow-xs z-10">
                  {res.tag}
                </span>
                            )}
                        </div>
                        <div className="p-4 flex flex-col justify-between grow text-right">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-base text-gray-900">{res.name}</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-md text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        {res.rating}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 font-medium mb-4">{res.type}</p>
                            </div>

                            <div className="border-t border-gray-50 pt-3 flex items-center justify-between text-[11px] text-gray-500 font-bold">
                                <span>⏱️ {res.time}</span>
                                <span className="text-emerald-600">{res.delivery}</span>
                                <button className="bg-pink-50 text-brand-pink font-bold px-3 py-1 rounded-lg hover:bg-brand-pink hover:text-white transition cursor-pointer">
                                    سفارش
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}