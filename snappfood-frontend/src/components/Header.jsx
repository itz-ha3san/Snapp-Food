import React from 'react';

// این یک کامپوننت مجزا برای هدر است
function Header() {
    return (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center" dir="rtl">
            {/* سمت راست: لوگو */}
            <div className="text-2xl font-black text-pink-600 tracking-wider">
                SNAPP <span className="text-gray-800">FOOD</span>
            </div>

            {/* سمت چپ: دکمه‌ها */}
            <div className="flex items-center gap-4">
                <button className="px-5 py-2 text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors">
                    ورود یا ثبت‌نام
                </button>
                <button className="px-5 py-2 text-sm font-bold text-pink-600 bg-pink-50 rounded-xl hover:bg-pink-100 transition-all">
                    ثبت‌نام فروشندگان
                </button>
            </div>
        </header>
    );
}

export default Header; // خروجی گرفتن برای استفاده در صفحات دیگر