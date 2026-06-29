import React from 'react';

function App() {
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans" dir="rtl">
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-pink-600 tracking-wider">
            SNAPP <span className="text-gray-800">FOOD</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors">
              ورود
            </button>
            <button className="px-5 py-2 text-sm font-bold text-white bg-pink-600 rounded-full hover:bg-pink-700 shadow-md transition-all">
              ثبت‌نام
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            سفارش آنلاین غذا از <span className="text-pink-600">بهترین رستوران‌ها</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl">
            مجموعه‌ای از لذیذترین غذاها، شیرینی‌ها و سوپرمارکت‌های اطراف شما، آماده ارسال سریع.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <button className="flex-1 px-8 py-4 font-bold text-white bg-pink-600 rounded-xl hover:bg-pink-700 shadow-lg transform hover:-translate-y-0.5 transition-all">
              شروع تجربه لذیذ
            </button>
          </div>
        </main>

        <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
          <p>© ۲۰۲۶ اسنپ‌فود توسعه‌یافته با ری‌آکت و اسپرینگ‌بوت</p>
        </footer>
      </div>
  );
}

export default App;