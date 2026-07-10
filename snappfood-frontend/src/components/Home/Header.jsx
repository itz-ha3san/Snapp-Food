import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, MapPin, Search, ChevronDown, X, Check, Smartphone } from 'lucide-react';

const LOCATION_DATA = {
    'تهران': ['تهران', 'شهریار', 'ورامین', 'پاکدشت', 'اسلامشهر', 'قرچک', 'قدس', 'ملارد', 'رباط‌کریم', 'بومهن', 'دماوند', 'پیشوا', 'پرند', 'چهاردانگه', 'فیروزکوه'],
    'اصفهان': ['اصفهان', 'کاشان', 'خمینی‌شهر', 'نجف‌آباد', 'شاهین‌شهر', 'شهرضا', 'فلاورجان', 'مبارکه', 'زرین‌شهر', 'گلپایگان', 'آران و بیدگل', 'دهاقان', 'سمیرم', 'خوانسار', 'نطنز', 'اردستان', 'نائین', 'چادگان', 'فریدن', 'تیران و کرون'],
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بناب', 'سراب', 'آذرشهر', 'هادیشهر', 'عجب‌شیر', 'ملکان', 'شبستر', 'هشترود', 'بستان‌آباد', 'ورزقان', 'کلیبر', 'جلفا', 'هریس', 'خداآفرین', 'چاراویماق'],
    'آذربایجان غربی': ['ارومیه', 'خوی', 'بوکان', 'مهاباد', 'میاندوآب', 'سلماس', 'پیرانشهر', 'نقده', 'تکاب', 'ماکو', 'sردشت', 'اشنویه', 'شاهین‌دژ', 'شوط', 'چالدران', 'چایپاره', 'پلدشت'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت‌حیدریه', 'قوчан', 'تربت‌جام', 'کاشمر', 'چناران', 'سرخس', 'خواف', 'تایباد', 'بردسکن', 'گناباد', 'درگز', 'کلات'],
    'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'لارستان', 'فسا', 'داراب', 'فیروزآباد', 'ممسنی', 'نی‌ریز', 'آباده', 'اقلید', 'لامرد', 'سپیدان', 'کوار'],
    'البرز': ['کرج', 'فردیس', 'کمال‌شهر', 'نظرآباد', 'محمدشهر', 'ماهدشت', 'هشتگرد', 'اشتهارد', 'گرمدره', 'طالقان'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر', 'چالوس', 'نکا', 'بابلسر', 'تنکابن', 'نوشهر', 'رامسر', 'محمودآباد', 'نور'],
    'گیلان': ['رشت', 'بندرانزلی', 'لاهیجان', 'لنگرود', 'هشتپر', 'آستارا', 'صومعه‌سرا', 'آستانه اشرفیه', 'رودسر', 'فومن', 'رودبار'],
    'خوزستان': ['اهواز', 'دزفول', 'آبادان', 'بندر ماهشهر', 'خرمشهر', 'اندیمشک', 'ایذه', 'بهبهان', 'شوشتر', 'مسجدسلیمان', 'شوش', 'رامهرمز', 'امیدیه', 'باغ‌ملک', 'بندر امام خمینی'],
    'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'جیرفت', 'بم', 'زرند', 'بافت', 'شهربابک', 'بردسیر', 'کهنوج', 'منوجان', 'عنبرآباد', 'قلعه‌گنج']
};

export default function Header({ onAuthClick, currentLocation, onLocationChange, cartCount, onCartOpen, user, onNavigate }) {
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const [tempProvince, setTempProvince] = useState(currentLocation?.province || 'تهران');
    const [tempCity, setTempCity] = useState(currentLocation?.city || 'تهران');

    const [provinceSearch, setProvinceSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');

    const modalRef = useRef(null);

    const handleScrollToDownload = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (isLocationModalOpen) {
            setTempProvince(currentLocation?.province || 'تهران');
            setTempCity(currentLocation?.city || 'تهران');
            setProvinceSearch('');
            setCitySearch('');
        }
    }, [isLocationModalOpen, currentLocation]);

    const filteredProvinces = Object.keys(LOCATION_DATA).filter(prov =>
        prov.includes(provinceSearch)
    );

    const cities = tempProvince ? LOCATION_DATA[tempProvince] : [];
    const filteredCities = cities.filter(city =>
        city.includes(citySearch)
    );

    const handleConfirmLocation = () => {
        if (tempProvince && tempCity && onLocationChange) {
            onLocationChange({ province: tempProvince, city: tempCity });
            setIsLocationModalOpen(false);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100 text-right" dir="rtl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">

                    {/* ─── سمت راست: لوگو و موقعیت مکانی ─── */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div onClick={() => onNavigate('home')} className="flex items-center gap-2 select-none cursor-pointer">
                            <div className="w-9 h-9 bg-gradient-to-tr from-brand-pink to-[#ff4081] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
                                S
                            </div>
                            <span className="font-black text-lg tracking-tight text-gray-900 hidden sm:block">
                                اسنپ<span className="text-brand-pink">فود</span>
                            </span>
                        </div>

                        <button
                            onClick={() => setIsLocationModalOpen(true)}
                            className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200/50 transition-all text-right cursor-pointer"
                        >
                            <MapPin size={16} className="text-brand-pink shrink-0" />
                            <span className="font-black text-gray-800 text-xs truncate max-w-[100px] sm:max-w-[150px]">
                                {currentLocation?.city || 'تهران'}
                            </span>
                            <ChevronDown size={12} className="text-gray-400 shrink-0 mr-1" />
                        </button>
                    </div>

                    {/* ─── سمت چپ: دکمه‌ها (دانلود اپ، سبد خرید، پروفایل) ─── */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                        {/* دکمه دانلود اپلیکیشن */}
                        <button
                            onClick={handleScrollToDownload}
                            className="flex items-center gap-1.5 text-[11px] font-black text-brand-pink bg-brand-pink/5 hover:bg-brand-pink hover:text-white border border-brand-pink/20 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-2xs"
                        >
                            <Smartphone size={13} className="shrink-0" />
                            <span>دانلود اپ</span>
                        </button>

                        {/* سبد خرید */}
                        <button
                            onClick={onCartOpen}
                            className="relative flex items-center justify-center p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all cursor-pointer border border-gray-100"
                        >
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -left-1 w-4.5 h-4.5 bg-brand-pink text-white rounded-full flex items-center justify-center text-[9px] font-black border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* ⚡ بخش هوشمند پروفایل / ورود کاربران */}
                        {user ? (
                            <button
                                onClick={() => onNavigate('profile')}
                                className="flex items-center gap-2 bg-brand-pink/5 hover:bg-brand-pink/10 text-brand-pink px-3 py-2 rounded-xl font-black text-xs border border-brand-pink/10 transition-all cursor-pointer"
                            >
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></span>
                                <span className="max-w-[80px] truncate">{user.name || "حساب من"}</span>
                            </button>
                        ) : (
                            <button
                                onClick={onAuthClick}
                                className="flex items-center gap-1.5 bg-gradient-to-r from-brand-pink to-[#ff4081] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-black text-xs shadow-sm cursor-pointer"
                            >
                                <User size={14} />
                                <span className="hidden sm:inline">ورود</span>
                            </button>
                        )}
                    </div>

                </div>
            </header>

            {/* مودال انتخاب موقعیت */}
            {isLocationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsLocationModalOpen(false)} />

                    <div
                        ref={modalRef}
                        className="w-full max-w-2xl rounded-[32px] p-6 relative z-10 text-right bg-white border border-gray-100 shadow-2xl flex flex-col max-h-[85vh]"
                        dir="rtl"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                <MapPin className="text-brand-pink" size={20} />
                                <span>انتخاب استان و شهر</span>
                            </h3>
                            <button onClick={() => setIsLocationModalOpen(false)} className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-all cursor-pointer"><X size={18} /></button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden flex-1 min-h-[320px]">
                            {/* انتخاب استان */}
                            <div className="flex flex-col bg-gray-50 border border-gray-100 rounded-2xl p-4 overflow-hidden">
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

                                <div className="overflow-y-auto flex-1 space-y-1 pr-1 scrollbar-none">
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

                            {/* انتخاب شهر */}
                            <div className="flex flex-col bg-gray-50 border border-gray-100 rounded-2xl p-4 overflow-hidden">
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

                                <div className="overflow-y-auto flex-1 space-y-1 pr-1 scrollbar-none">
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
                        <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between">
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