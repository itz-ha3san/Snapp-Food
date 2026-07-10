import React, { useState } from 'react';
import Navbar from '../components/Home/Navbar.jsx';
import Hero from '../components/Home/Hero.jsx';
import Categories from '../components/Home/Categories.jsx';
import PromoBanners from '../components/Home/PromoBanners.jsx';
import FeaturedRestaurants from '../components/Home/FeaturedRestaurants.jsx';
import AppDownload from '../components/Home/AppDownload.jsx';
import Footer from '../components/Home/Footer.jsx';
// 📍 فرض می‌کنیم مودال انتخاب آدرس را هم اینجا مدیریت می‌کنیم یا از هدر جدا کرده‌ایم
import Header from '../components/Home/Header.jsx';

export default function Home({ user, cartCount, onCartOpen, onAuthClick, onRestaurantSelect }) {
    // 📍 ایجاد استیت مرکزی لوکیشن برای همگام‌سازی ناوبری و هیرو
    const [currentLocation, setCurrentLocation] = useState({ province: 'تهران', city: 'تهران' });
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white" dir="rtl">

            {/* ناوبری بالای صفحه با پروپ‌های کامل لوکیشن */}
            <Navbar
                user={user}
                cartCount={cartCount}
                onCartOpen={onCartOpen}
                onAuthClick={onAuthClick}
                currentLocation={currentLocation}
                onLocationClick={() => setIsLocationModalOpen(true)}
            />

            {/* بخش هیرو متصل به آدرس انتخابی کاربر */}
            <Hero currentLocation={currentLocation} />

            {/* بخش دسته‌بندی‌ها */}
            <Categories />

            {/* بنرهای تخفیف ویژه */}
            <PromoBanners />

            {/* رستوران‌های برگزیده */}
            <FeaturedRestaurants onRestaurantSelect={onRestaurantSelect} />

            {/* بخش دانلود اپلیکیشن */}
            <AppDownload />

            {/* فوتر سایت */}
            <Footer />

            {/* 📍 رندر مخفی پنجره مودال لوکیشن بر اساس استیت صفحه اصلی */}
            {isLocationModalOpen && (
                <Header
                    currentLocation={currentLocation}
                    onLocationChange={setCurrentLocation}
                    // این بخش فقط برای رندر گرفتن لایه‌ رویی مودال Header استفاده می‌شود
                    cartCount={cartCount}
                    user={user}
                />
            )}
        </div>
    );
}