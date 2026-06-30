import React from 'react';

function Hero() {
    return (
        <div className="bg-gray-100 py-16 px-4 text-center flex flex-col items-center justify-center" dir="rtl">
            {/* شعار اصلی */}
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
                سفارش آنلاین غذا، <span className="text-pink-600">سریع و آسان</span>
            </h1>

            {/* توضیح کوتاه زیر شعار */}
            <p className="text-gray-500 text-base md:text-lg mb-8 max-w-xl">
                جدیدترین و بهترین رستوران‌ها، کافه‌ها و سوپرمارکت‌ها در اطراف شما
            </p>

            {/* باکس جستجوی آدرس شبیه به اسنپ‌فود */}
            <div className="w-full max-w-2xl bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-gray-100">

                {/* اینپوت وارد کردن آدرس */}
                <div className="flex-1 w-full flex items-center gap-2 px-3">
                    {/* آیکون لوکیشن ساده با اموجی (برای سادگی فعلی کد) */}
                    <span className="text-xl text-gray-400">📍</span>
                    <input
                        type="text"
                        placeholder="ابتدا آدرس خود را وارد کنید (مثلاً: تهران، نیاوران...)"
                        className="w-full py-3 bg-transparent text-gray-700 outline-none text-sm placeholder-gray-400"
                    />
                </div>

                {/* دکمه جستجو */}
                <button className="w-full sm:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                    یافتن رستوران‌ها
                </button>
            </div>
        </div>
    );
}

export default Hero;