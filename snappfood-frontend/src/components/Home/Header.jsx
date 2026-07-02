import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, MapPin, Search, ChevronDown, X, Check } from 'lucide-react';

const LOCATION_DATA = {
    'تهران': ['تهران', 'شهریار', 'ورامین', 'پاکدشت', 'اسلامشهر', 'قرچک', 'قدس', 'ملارد', 'رباط‌کریم', 'بومهن', 'دماوند', 'پیشوا', 'پرند', 'چهاردانگه', 'فیروزکوه'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'شهرضا', 'فلاورجان', 'مبارکه', 'زرین‌شهر', 'گلپایگان', 'آران و بیدگل', 'دهاقان', 'سمیرم', 'خوانسار', 'نطنز', 'اردستان', 'نائین', 'چادگان', 'فریدن', 'تیران و کرون'],
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بناب', 'سراب', 'آذرشهر', 'هادیشهر', 'عجب‌شیر', 'ملکان', 'شبستر', 'هشترود', 'بستان‌آباد', 'ورزقان', 'کلیبر', 'جلفا', 'هریس', 'خداآفرین', 'چاراویماق'],
    'آذربایجان غربی': ['ارومیه', 'خوی', 'بوکان', 'مهاباد', 'میاندوآب', 'سلماس', 'پیرانشهر', 'نقده', 'تکاب', 'ماکو', 'سردشت', 'اشنویه', 'شاهین‌دژ', 'شوط', 'چالدران', 'چایپاره', 'پلدشت'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت‌حیدریه', 'قوچان', 'تربت‌جام', 'کاشمر', 'چناران', 'سرخس', 'خواف', 'تایباد', 'بردسکن', 'گناباد', 'درگز', 'کلات'],
    'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'لارستان', 'فسا', 'داراب', 'فیروزآباد', 'ممسنی', 'نی‌ریز', 'آباده', 'اقلید', 'لامرد', 'سپیدان', 'کوار'],
    'البرز': ['کرج', 'فردیس', 'کمال‌شهر', 'نظرآباد', 'محمدشهر', 'ماهدشت', 'هشتگرد', 'اشتهارد', 'گرمدره', 'طالقان'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر', 'چالوس', 'نکا', 'بابلسر', 'تنکابن', 'نوشهر', 'رامسر', 'محمودآباد', 'نور'],
    'گیلان': ['رشت', 'بندرانزلی', 'لاهیجان', 'لنگرود', 'هشتپر', 'آستارا', 'صومعه‌سرا', 'آستانه اشرفیه', 'رودسر', 'فومن', 'رودبار'],
    'خوزستان': ['اهواز', 'دزفول', 'آبادان', 'بندر ماهشهر', 'خرمشهر', 'اندیمشک', 'ایذه', 'بهبهان', 'شوشتر', 'مسجدسلیمان', 'شوش', 'رامهرمز', 'امیدیه', 'باغ‌ملک', 'بندر امام خمینی'],
    'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'جیرفت', 'بم', 'زرند', 'بافت', 'شهربابک', 'بردسیر', 'کهنوج', 'منوجان', 'عنبرآباد', 'قلعه‌گنج']
};

// 📍 اصلاح اصلی: دریافت currentLocation و onLocationChange از کامپوننت Home
export default function Header({ onAuthClick, currentLocation, onLocationChange }) {
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    // وضعیت‌های موقت داخل مودال (بر اساس مقادیر ورودی کامپوننت مادر مقداردهی می‌شوند)
    const [tempProvince, setTempProvince] = useState(currentLocation?.province || 'تهران');
    const [tempCity, setTempCity] = useState(currentLocation?.city || 'تهران');

    // سرچ‌ باکس‌ها
    const [provinceSearch, setProvinceSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');

    const modalRef = useRef(null);

    // همگام‌سازی استیت موقت مودال با دیتای واقعی هنگام باز شدن پنجره
    useEffect(() => {
        if (isLocationModalOpen && currentLocation) {
            setTempProvince(currentLocation.province);
            setTempCity(currentLocation.city);
            setProvinceSearch('');
            setCitySearch('');
        }
    }, [isLocationModalOpen, currentLocation]);

    // فیلتر استان‌ها
    const filteredProvinces = Object.keys(LOCATION_DATA).filter(prov =>
        prov.includes(provinceSearch)
    );

    // فیلتر شهرهای مربوط به استان انتخاب‌شده
    const cities = tempProvince ? LOCATION_DATA[tempProvince] : [];
    const filteredCities = cities.filter(city =>
        city.includes(citySearch)
    );

    // تایید نهایی آدرس و ارسال به کامپوننت مادر
    const handleConfirmLocation = () => {
        if (tempProvince && tempCity && onLocationChange) {
            // 📍 ارسال تغییرات به کامپوننت مادر (Home)
            onLocationChange({ province: tempProvince, city: tempCity });
            setIsLocationModalOpen(false);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 text-right" dir="rtl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                    {/* سمت راست: لوگو و آدرس استانی */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 select-none cursor-pointer">
                            <div className="w-9 h-9 bg-linear-to-tr from-brand-pink to-[#ff4081] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-pink/20">
                                S
                            </div>
                            <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:block">
                                اسنپ<span className="text-brand-pink">فود</span>
                            </span>
                        </div>

                        {/* دکمه باز کردن مودال - حالا دیتای خود را مستقیم از currentLocation می‌گیرد */}
                        <button
                            onClick={() => setIsLocationModalOpen(true)}
                            className="flex items-center gap-2 bg-gray-100/80 hover:bg-gray-200/60 px-4 py-2.5 rounded-2xl border border-gray-200/30 transition-all duration-200 cursor-pointer group"
                        >
                            <MapPin size={18} className="text-brand-pink group-hover:animate-bounce" />
                            <div className="text-right text-xs">
                                <span className="block text-[10px] text-gray-400 font-bold">استان موقعیت</span>
                                <span className="font-black text-gray-800">
                                    {currentLocation?.province}، {currentLocation?.city}
                                </span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400 mr-2 group-hover:text-gray-600 transition-colors" />
                        </button>
                    </div>

                    {/* سمت چپ: دکمه‌ها */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={onAuthClick}
                            className="flex items-center gap-2 bg-linear-to-r from-brand-pink to-[#ff4081] text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-md shadow-brand-pink/10 transition-all cursor-pointer"
                        >
                            <User size={16} />
                            <span>ورود یا عضویت</span>
                        </button>
                    </div>

                </div>
            </header>

            {/* 🏙️ مودال انتخاب استان و شهر */}
            {isLocationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 [perspective:1200px]">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsLocationModalOpen(false)} />

                    <div
                        ref={modalRef}
                        className="w-full max-w-2xl rounded-[32px] p-6 relative z-10 text-right bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.15)] animate-fade-in duration-200 flex flex-col max-h-[85vh]"
                        dir="rtl"
                    >
                        {/* هدر مودال */}
                        <div className="flex items-center justify-between border-b border-gray-200/60 pb-4 mb-4">
                            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                <MapPin className="text-brand-pink" size={20} />
                                <span>انتخاب استان و شهر</span>
                            </h3>
                            <button onClick={() => setIsLocationModalOpen(false)} className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-all cursor-pointer"><X size={18} /></button>
                        </div>

                        {/* دو ستون پویا */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden flex-1 min-h-[320px]">
                            {/* ستون اول: انتخاب استان */}
                            <div className="flex flex-col bg-gray-50/50 border border-gray-200/40 rounded-2xl p-4 overflow-hidden">
                                <label className="text-xs font-black text-gray-500 mb-2 block">۱. انتخاب استان</label>
                                <div className="relative flex items-center mb-3">
                                    <Search size={16} className="absolute right-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="جستجوی استان..."
                                        value={provinceSearch}
                                        onChange={(e) => setProvinceSearch(e.target.value)}
                                        className="w-full text-xs font-bold bg-white border border-gray-200 rounded-xl pr-9 pl-3 py-2.5 outline-none focus:border-brand-pink text-gray-900"
                                    />
                                </div>

                                <div className="overflow-y-auto flex-1 space-y-1 pr-1 scrollbar-thin">
                                    {filteredProvinces.map(prov => (
                                        <button
                                            key={prov}
                                            onClick={() => {
                                                setTempProvince(prov);
                                                setTempCity('');
                                            }}
                                            className={`w-full text-right px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                                                tempProvince === prov ? 'bg-brand-pink/10 text-brand-pink font-black' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span>استان {prov}</span>
                                            {tempProvince === prov && <Check size={14} className="text-brand-pink" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ستون دوم: انتخاب شهر */}
                            <div className="flex flex-col bg-gray-50/50 border border-gray-200/40 rounded-2xl p-4 overflow-hidden">
                                <label className="text-xs font-black text-gray-500 mb-2 block">
                                    ۲. شهرهای {tempProvince || 'استان انتخاب شده'}
                                </label>
                                <div className="relative flex items-center mb-3">
                                    <Search size={16} className="absolute right-3 text-gray-400" />
                                    <input
                                        type="text"
                                        disabled={!tempProvince}
                                        placeholder="جستجوی شهر..."
                                        value={citySearch}
                                        onChange={(e) => setCitySearch(e.target.value)}
                                        className="w-full text-xs font-bold bg-white border border-gray-200 rounded-xl pr-9 pl-3 py-2.5 outline-none focus:border-brand-pink text-gray-900"
                                    />
                                </div>

                                <div className="overflow-y-auto flex-1 space-y-1 pr-1 scrollbar-thin">
                                    {tempProvince && filteredCities.map(city => (
                                        <button
                                            key={city}
                                            onClick={() => setTempCity(city)}
                                            className={`w-full text-right px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                                                tempCity === city ? 'bg-purple-500/10 text-purple-600 font-black' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span>{city}</span>
                                            {tempCity === city && <Check size={14} className="text-purple-600" />}
                                        </button>
                                    ))}
                                    {tempProvince && filteredCities.length === 0 && (
                                        <p className="text-center text-[11px] text-gray-400 font-bold py-4">شهری یافت نشد</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* فوتر مودال */}
                        <div className="border-t border-gray-200/60 pt-4 mt-4 flex items-center justify-between">
                            <div className="text-xs text-gray-500 font-bold">
                                {tempProvince && tempCity ? (
                                    <span>محدوده: <strong className="text-gray-800">{tempProvince}، {tempCity}</strong></span>
                                ) : (
                                    <span className="text-red-500">لطفاً شهر خود را انتخاب کنید.</span>
                                )}
                            </div>
                            <button
                                disabled={!tempProvince || !tempCity}
                                onClick={handleConfirmLocation}
                                className="bg-gray-900 hover:bg-gray-800 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40"
                            >
                                تایید و اعمال آدرس
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}