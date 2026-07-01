import { Search, MapPin, User, Store, ArrowLeft, Star, ShoppingBag, Download, ArrowRight, Gift, Bike } from 'lucide-react';

const categories = [
    { id: 1, title: "غذای ایرانی", icon: "🍱" },
    { id: 2, title: "فست فود", icon: "🍔" },
    { id: 3, title: "پیتزا", icon: "🍕" },
    { id: 4, title: "سوشی", icon: "🍣" },
    { id: 5, title: "شیرینی", icon: "🍰" },
    { id: 6, title: "ساندویچ", icon: "🥪" },
    { id: 7, title: "سالاد", icon: "🥗" },
    { id: 8, title: "کباب", icon: "🍢" },
    { id: 9, title: "نوشیدنی", icon: "🥤" },
    { id: 10, title: "دسر", icon: "🍮" },
];

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

export default function App() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-brand-pink selection:text-white" dir="rtl">

            {/* ۱. هدر اصلی سایت */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 lg:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="text-brand-pink font-black text-2xl flex items-center gap-1">
                        <span className="bg-brand-pink text-white px-2 py-1 rounded-xl text-lg font-mono">S</span>
                        <span className="font-bold tracking-tight text-gray-900">اسنپ<span className="text-brand-pink">فود</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-600">
                        <MapPin size={16} className="text-brand-pink" />
                        <span>تهران، ولنجک</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-pink px-3 py-2 rounded-xl transition">
                        <User size={18} />
                        ورود یا عضویت
                    </button>
                    <button className="bg-brand-pink hover:bg-brand-pink-dark text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2">
                        <Store size={18} />
                        ثبت رستوران
                    </button>
                </div>
            </header>

            {/* ۲. بخش هیرو (مشابه تصویر ۱) */}
            <section className="relative bg-gradient-to-b from-pink-50/40 to-white pt-16 pb-24 px-4 overflow-hidden">
                <div className="absolute -right-12 top-12 w-48 h-48 hidden xl:block animate-hero-float">
                    <div className="w-full h-full bg-amber-100 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-6xl">🍕</div>
                </div>
                <div className="absolute -left-12 bottom-12 w-48 h-48 hidden xl:block animate-hero-float" style={{ animationDelay: '2.5s' }}>
                    <div className="w-full h-full bg-rose-100 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-6xl">🍔</div>
                </div>

                <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="bg-white text-brand-pink border border-pink-100 text-xs font-black px-3 py-1.5 rounded-full shadow-xs inline-block mb-4">
            🚀 سریع‌ترین سرویس تحویل غذا
          </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                        غذای لذیذ، <span className="text-brand-pink">همین الان</span> در خانه‌ات
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base mb-8">
                        از بهترین رستوران‌های شهر، با ارسال سریع تا در خانه‌ات
                    </p>

                    <div className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-100 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-gray-100">
                        <div className="flex items-center gap-2 px-3 w-full border-b sm:border-b-0 sm:border-l border-gray-100 pb-2 sm:pb-0">
                            <MapPin className="text-gray-400 shrink-0" size={20} />
                            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">ولنجک</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 w-full">
                            <Search className="text-gray-400 shrink-0" size={20} />
                            <input
                                type="text"
                                placeholder="جستجوی خورشت قیمه، برگر..."
                                className="w-full text-sm py-2 bg-transparent focus:outline-hidden text-right font-medium"
                            />
                        </div>
                        <button className="bg-brand-pink hover:bg-brand-pink-dark text-white font-black text-sm px-8 py-3 rounded-xl w-full sm:w-auto transition shrink-0">
                            جستجو
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-12 mt-12 text-center border-t border-gray-100 pt-8 max-w-xl mx-auto">
                        <div>
                            <p className="text-2xl font-black text-gray-900">۵۰۰ +</p>
                            <p className="text-xs text-gray-400 font-bold mt-1">رستوران فعال</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">۱۲,۰۰۰ +</p>
                            <p className="text-xs text-gray-400 font-bold mt-1">سفارش روزانه</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">۳۰ +</p>
                            <p className="text-xs text-gray-400 font-bold mt-1">شهر</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۳. دسته‌بندی‌ها (مشابه تصویر ۲) */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span className="text-[10px] bg-pink-50 text-brand-pink px-2 py-0.5 rounded-md font-bold mb-1 inline-block">دسته‌بندی</span>
                        <h2 className="text-xl font-black text-gray-900">هر چی دوست داری، اینجاست</h2>
                    </div>
                    <button className="text-brand-pink hover:text-brand-pink-dark text-xs font-black flex items-center gap-1 transition">
                        همه دسته‌ها <ArrowLeft size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition duration-200 group">
                            <span className="text-3xl mb-2 p-2 bg-gray-50 rounded-full group-hover:bg-pink-50 transition">{cat.icon}</span>
                            <span className="text-xs font-black text-gray-700 group-hover:text-brand-pink transition">{cat.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ۴. بنرهای تخفیف دوقلو (مشابه تصویر ۳) */}
            <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-600 rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden h-44 shadow-lg shadow-purple-50">
                    <div className="z-10">
                        <span className="bg-white/20 text-[10px] font-black px-2 py-1 rounded-md mb-2 inline-block">کد تخفیف</span>
                        <h3 className="text-2xl font-black mb-1">۳۰٪ تخفیف</h3>
                        <p className="text-xs text-purple-100 mb-4">با کد تخفیف <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded-md font-bold">SNAPP30</span></p>
                        <button className="bg-white text-purple-700 font-black text-xs px-4 py-2 rounded-xl transition">
                            کد رو کپی کن
                        </button>
                    </div>
                    <Gift size={80} className="text-purple-500/40 absolute left-6 bottom-4" />
                </div>

                <div className="bg-brand-pink rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden h-44 shadow-lg shadow-pink-50">
                    <div className="z-10">
                        <span className="bg-white/20 text-[10px] font-black px-2 py-1 rounded-md mb-2 inline-block">پیشنهاد ویژه</span>
                        <h3 className="text-2xl font-black mb-1">اولین سفارش</h3>
                        <p className="text-xs text-pink-100 mb-4">رایگان ارسال میشه!</p>
                        <button className="bg-white text-brand-pink font-black text-xs px-4 py-2 rounded-xl transition">
                            همین الان سفارش بده
                        </button>
                    </div>
                    <Bike size={84} className="text-pink-400/30 absolute left-6 bottom-4" />
                </div>
            </section>

            {/* ۵. بخش تیره اپلیکیشن اسنپ فود (مشابه تصویر ۴) */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-[#111827] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="flex items-center gap-6 z-10">
                        <div className="hidden lg:flex gap-4 transform -rotate-3 shrink-0">
                            <div className="w-24 h-36 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl flex items-center justify-center text-3xl">📱</div>
                            <div className="w-24 h-36 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl translate-y-4 flex items-center justify-center text-3xl">🍕</div>
                        </div>
                        <div>
                            <span className="text-brand-pink text-xs font-black block mb-1">اپلیکیشن اسنپ‌فود</span>
                            <h3 className="text-2xl font-black mb-2">هر جا هستی، غذا بهت می‌رسه</h3>
                            <p className="text-gray-400 text-xs max-w-sm leading-relaxed font-medium">
                                با اپ اسنپ‌فود سریع‌تر سفارش بده، تخفیف بیشتری بگیر و پیک رو لحظه‌ای روی نقشه دنبال کن.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 z-10 justify-center shrink-0">
                        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition text-right min-w-[150px]">
                            <Download size={20} className="text-brand-pink" />
                            <div>
                                <p className="text-[9px] text-gray-400 font-bold">دانلود از</p>
                                <p className="text-xs font-black font-mono">Google Play</p>
                            </div>
                        </button>
                        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition text-right min-w-[150px]">
                            <ShoppingBag size={20} className="text-brand-pink" />
                            <div>
                                <p className="text-[9px] text-gray-400 font-bold">دانلود از</p>
                                <p className="text-xs font-black font-mono">App Store</p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* ۶. بخش بهترین‌های شهر تو (درخواست جدید شما در پایین صفحه) */}
            <section className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100 mt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span className="text-[10px] bg-pink-50 text-brand-pink px-2 py-0.5 rounded-md font-bold mb-1 inline-block">رستوران‌های برگزیده</span>
                        <h2 className="text-xl font-black text-gray-900">بهترین‌های شهر تو</h2>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-700 shadow-xs"><ArrowRight size={16} /></button>
                        <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-700 shadow-xs"><ArrowLeft size={16} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {restaurants.map((res) => (
                        <div key={res.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition duration-200 flex flex-col h-full">
                            <div className="relative aspect-video w-full bg-gray-100">
                                <img src={res.image} alt={res.name} className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl -z-10">🍲</div>

                                {res.discount && (
                                    <span className="absolute top-3 right-3 bg-brand-pink text-white text-[10px] font-black px-2 py-1 rounded-lg z-10 shadow-xs">
                    {res.discount}
                  </span>
                                )}
                                {res.tag && (
                                    <span className="absolute bottom-3 right-3 bg-white text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-lg border border-gray-100 shadow-xs z-10">
                    {res.tag}
                  </span>
                                )}
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-black text-base text-gray-900">{res.name}</h3>
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
                                    <button className="bg-pink-50 text-brand-pink font-black px-3 py-1 rounded-lg hover:bg-brand-pink hover:text-white transition">
                                        سفارش
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ۷. فوتر پایانی سایت */}
            <footer className="bg-white border-t border-gray-100 py-8 px-4 lg:px-12 text-center md:flex md:items-center md:justify-between text-xs text-gray-400 font-bold">
                <div className="flex justify-center gap-6 mb-4 md:mb-0">
                    <a href="#" className="hover:text-brand-pink transition">حریم خصوصی</a>
                    <a href="#" className="hover:text-brand-pink transition">شرایط استفاده</a>
                    <a href="#" className="hover:text-brand-pink transition">تماس با ما</a>
                </div>
                <div className="mb-4 md:mb-0">
                    © ۱۴۰۵ اسنپ‌فود — تمام حقوق محفوظ است
                </div>
                <div className="text-brand-pink font-black text-lg flex items-center justify-center gap-1">
                    <span className="bg-brand-pink text-white px-1.5 py-0.5 rounded-lg text-sm font-mono">S</span>
                    اسنپ‌فود
                </div>
            </footer>

        </div>
    );
}