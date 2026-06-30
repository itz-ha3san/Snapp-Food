import React from 'react';

function Categories() {
    // دیتای ماک (Mock Data) برای آیتم‌های دسته‌بندی همراه با اموجی به جای عکس فعلی
    const categoriesList = [
        { id: 1, name: 'ایرانی', icon: '🍲' },
        { id: 2, name: 'فست‌فود', icon: '🍔' },
        { id: 3, name: 'پیتزا', icon: '🍕' },
        { id: 4, name: 'کباب', icon: '🍢' },
        { id: 5, name: 'ساندویچ', icon: '🥪' },
        { id: 6, name: 'شیرینی', icon: '🍰' },
        { id: 7, name: 'آبمیوه بستنی', icon: '🍦' },
        { id: 8, name: 'سالاد', icon: '🥗' },
    ];

    return (
        <div className="max-w-6xl mx-auto my-12 px-4" dir="rtl">
            <h2 className="text-xl font-extrabold text-gray-800 mb-6 text-right">
                دسته بندی‌های جذاب اسنپ‌فود
            </h2>

            {/* گرید هوشمند تلویند برای چیدمان دایره‌ها */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {categoriesList.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                    >
                        {/* دایره پس‌زمینه اموجی */}
                        <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-3xl group-hover:bg-pink-100 transition-colors">
                            {cat.icon}
                        </div>
                        {/* نام دسته‌بندی */}
                        <span className="text-sm font-bold text-gray-700 group-hover:text-pink-600 transition-colors">
              {cat.name}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;