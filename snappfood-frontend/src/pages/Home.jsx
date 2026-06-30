import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            {/* بخش بالای سایت */}
            <div>
                <Header />
                <Hero />
                <Categories />
            </div>

            {/* بخش فوتر پایینی */}
            <footer className="bg-gray-950 text-gray-400 text-center py-6 text-sm" dir="rtl">
                <p>© ۲۰۲۶ اسنپ‌فود توسعه‌یافته با ری‌آکت و اسپرینگ‌بوت</p>
            </footer>
        </div>
    );
}

export default Home;