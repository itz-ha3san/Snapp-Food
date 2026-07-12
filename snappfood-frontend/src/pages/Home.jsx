import React from 'react';
import Hero from '../components/Home/Hero.jsx';
import Categories from '../components/Home/Categories.jsx';
import PromoBanners from '../components/Home/PromoBanners.jsx';
import FeaturedRestaurants from '../components/Home/FeaturedRestaurants.jsx';
import AppDownload from '../components/Home/AppDownload.jsx';
import Footer from '../components/Home/Footer.jsx';

export default function Home({ onRestaurantSelect, currentLocation }) {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            {/*
               ✅ نوار ناوبری و هدر کاملاً حذف شدند.
               چون هدر اصلی را در App.jsx گذاشتیم و به صورت سراسری بالا رندر می‌شود.
            */}

            {/* بخش هیرو متصل به آدرس انتخابی کاربر از کامپوننت مادر */}
            <Hero currentLocation={currentLocation} />

            {/* محتوای اصلی صفحه */}
            <div className="space-y-12 pb-16">
                {/* بخش دسته‌بندی‌ها */}
                <Categories />

                {/* بنرهای تخفیف ویژه */}
                <PromoBanners />

                {/* رستوران‌های برگزیده */}
                <FeaturedRestaurants onRestaurantSelect={onRestaurantSelect} />

                {/* بخش دانلود اپلیکیشن */}
                <AppDownload />
            </div>

            {/* فوتر سایت */}
            <Footer />
        </div>
    );
}