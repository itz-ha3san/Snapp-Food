import React from 'react';
import { ShoppingBag, User, Search, MapPin, ChevronDown } from 'lucide-react';

export default function Navbar({
                                   user,
                                   cartCount = 0,
                                   onCartOpen,
                                   onAuthClick,
                                   currentLocation,
                                   onLocationOpen
                               }) {
    // مقداردهی اولیه برای استان و شهر جهت جلوگیری از خطای رندر
    const province = currentLocation?.province || 'تهران';
    const city = currentLocation?.city || 'تهران';

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

                {/* 🔹 سمت راست: لوگو و انتخاب آدرس */}
                <div className="flex items-center gap-6 flex-1 sm:flex-initial">
                    {/* لوگوی اسنپ‌فود */}
                    <div className="flex items-center gap-2 cursor-pointer select-none">
                        <div className="w-9 h-9 bg-gradient-to-tr from-brand-pink to-[#ff4081] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-pink/20">
                            S
                        </div>
                        <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:inline">
                            اسنپ<span className="text-brand-pink">فود</span>
                        </span>
                    </div>

                    {/* انتخاب موقعیت/آدرس متصل به مودال */}
                    <button
                        onClick={onLocationOpen}
                        className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200/60 hover:bg-gray-100/80 px-4 py-2.5 rounded-2xl cursor-pointer transition-all group"
                    >
                        <MapPin size={16} className="text-brand-pink group-hover:animate-bounce" />
                        <span className="text-xs font-bold text-gray-800">
                            {province}، {city}
                        </span>
                        <ChevronDown size={14} className="text-gray-400 mr-1 group-hover:text-gray-600 transition-colors" />
                    </button>
                </div>

                {/* 🔹 وسط: بار جستجوی مدرن */}
                <div className="flex-1 max-w-md mx-4 hidden sm:block relative">
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="جستجو در اسنپ‌فود (پیتزا، کباب، برگر...)"
                        className="w-full bg-gray-50/80 border border-gray-200/70 rounded-2xl py-2.5 pr-11 pl-4 text-xs font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-brand-pink/60 focus:ring-4 focus:ring-brand-pink/10 transition-all text-right"
                    />
                </div>

                {/* 🔹 سمت چپ: دکمه‌های پروفایل و سبد خرید */}
                <div className="flex items-center gap-3">

                    {/* دکمه ورود / حساب کاربری */}
                    {user ? (
                        <div className="flex items-center gap-2 bg-gray-100/80 px-4 py-2.5 rounded-2xl text-xs font-black text-gray-800 border border-gray-200/30">
                            <User size={16} className="text-brand-pink" />
                            <span>{user.name || "حساب من"}</span>
                        </div>
                    ) : (
                        <button
                            onClick={onAuthClick}
                            className="flex items-center gap-2 bg-gradient-to-r from-brand-pink to-[#ff4081] text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-md shadow-brand-pink/10 transition-all cursor-pointer transform active:scale-95"
                        >
                            <User size={16} />
                            <span>ورود یا عضویت</span>
                        </button>
                    )}

                    {/* دکمه سبد خرید با نشانگر تعداد اقلام */}
                    <button
                        onClick={onCartOpen}
                        className="relative p-2.5 bg-gray-100/80 hover:bg-gray-200/60 rounded-2xl text-gray-700 transition-all cursor-pointer group"
                    >
                        <ShoppingBag size={20} className="group-hover:scale-105 transition-transform" />

                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -left-1.5 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>

                </div>

            </div>
        </header>
    );
}