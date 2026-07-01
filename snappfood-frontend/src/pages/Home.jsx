import React, { useState } from 'react';
import Header from '../components/Home/Header.jsx';
import Hero from '../components/Home/Hero.jsx';
import Categories from '../components/Home/Categories.jsx';
import PromoBanners from '../components/Home/PromoBanners.jsx';
import AppDownload from '../components/Home/AppDownload.jsx';
import FeaturedRestaurants from '../components/Home/FeaturedRestaurants.jsx';
import AuthModal from '../components/Home/AuthModal.jsx'; // یا بدون /Home اگر جایش آنجاست

export default function Home() {
    // ۱. تعریف استیت برای باز و بسته بودن پنجره
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FAFAFA]" dir="rtl">

            {/* ۲. فرستادن تابع باز کردن مدال به هدر */}
            <Header onAuthClick={() => setIsAuthOpen(true)} />

            <Hero />
            <Categories />
            <PromoBanners />
            <AppDownload />
            <FeaturedRestaurants />

            {/* ۳. قرار دادن خود پنجره مدال در صفحه و پاس دادن وضعیت‌ها */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-bold">
                © ۱۴۰۵ اسنپ‌فود — تمام حقوق محفوظ است
            </footer>
        </div>
    );
}