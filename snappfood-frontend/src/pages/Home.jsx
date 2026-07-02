import React, { useState } from 'react';
import Header from '../components/Home/Header.jsx';
import Hero from '../components/Home/Hero.jsx';
import Categories from '../components/Home/Categories.jsx';
import PromoBanners from '../components/Home/PromoBanners.jsx';
import AppDownload from '../components/Home/AppDownload.jsx';
import FeaturedRestaurants from '../components/Home/FeaturedRestaurants.jsx';
import AuthModal from '../components/Home/AuthModal.jsx';

export default function Home() {
    // ۱. تعریف استیت برای باز و بسته بودن پنجره مودال ثبت‌نام
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // 📍 ۲. تعریف استیت مرکزی لوکیشن (استان و شهر پیش‌فرض)
    const [location, setLocation] = useState({ province: 'تهران', city: 'تهران' });

    return (
        <div className="min-h-screen bg-[#FAFAFA]" dir="rtl">

            {/* ۳. پاس دادن اطلاعات لوکیشن و تابع تغییر آن به هدر */}
            <Header
                onAuthClick={() => setIsAuthOpen(true)}
                currentLocation={location}
                onLocationChange={setLocation}
            />

            {/* 📍 ۴. پاس دادن لوکیشن فعلی به هیرو برای نمایش در سرچ‌بار */}
            <Hero currentLocation={location} />

            <Categories />
            <PromoBanners />
            <AppDownload />
            <FeaturedRestaurants />

            {/* ۵. قرار دادن خود پنجره مدال در صفحه و پاس دادن وضعیت‌ها */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-bold">
                © ۱۴۰۵ اسنپ‌فود — تمام حقوق محفوظ است
            </footer>
        </div>
    );
}