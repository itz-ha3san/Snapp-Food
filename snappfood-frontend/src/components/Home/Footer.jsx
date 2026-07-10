import React from 'react';
import { Send, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 text-right pt-16 pb-8 mt-20 border-t border-gray-800" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                {/* 🍲 بخش برند و معرفی کوتاه */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-3xl">🍲</span>
                        <span className="font-black text-xl tracking-tight">
                            اسنپ<span className="text-brand-pink">فود</span>
                        </span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium text-gray-400">
                        تجربه سفارش آنلاین غذا، شیرینی و مایحتاج روزانه با بیشترین سرعت و بالاترین کیفیت در پلتفرم مدرن اسنپ‌فود.
                    </p>
                </div>

                {/* 🔗 دسترسی سریع */}
                <div className="space-y-3">
                    <h4 className="text-white text-sm font-black">دسترسی سریع</h4>
                    <ul className="text-xs space-y-2.5 font-bold">
                        <li><a href="#about" className="hover:text-brand-pink transition-colors">درباره ما</a></li>
                        <li><a href="#contact" className="hover:text-brand-pink transition-colors">تماس با پشتیبانی</a></li>
                        <li><a href="#blog" className="hover:text-brand-pink transition-colors">وبلاگ اسنپ‌فود</a></li>
                        <li><a href="#careers" className="hover:text-brand-pink transition-colors">فرصت‌های شغلی</a></li>
                    </ul>
                </div>

                {/* ⚖️ قوانین و فروشندگان */}
                <div className="space-y-3">
                    <h4 className="text-white text-sm font-black">قوانین و پشتیبانی</h4>
                    <ul className="text-xs space-y-2.5 font-bold">
                        <li><a href="#terms" className="hover:text-brand-pink transition-colors">شرایط و قوانین سایت</a></li>
                        <li><a href="#privacy" className="hover:text-brand-pink transition-colors">حریم خصوصی کاربران</a></li>
                        <li><a href="#faq" className="hover:text-brand-pink transition-colors">سوالات متداول</a></li>
                        <li><a href="#vendors" className="hover:text-brand-pink transition-colors">ثبت‌نام فروشندگان</a></li>
                    </ul>
                </div>

                {/* 📲 شبکه‌های اجتماعی و وضعیت پشتیبانی */}
                <div className="space-y-4">
                    <h4 className="text-white text-sm font-black">همراه ما باشید</h4>
                    <div className="flex gap-3">
                        {/* آیکون اختصاصی اینستاگرام به صورت SVG */}
                        <a href="#ig" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-brand-pink hover:text-white flex items-center justify-center transition-all shadow-sm group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:scale-105 transition-transform"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                            </svg>
                        </a>

                        {/* آیکون اختصاصی توییتر (X جدید) به صورت SVG برای مهار کرش نسخه‌های Lucide */}
                        <a href="#tw" aria-label="X" className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-brand-pink hover:text-white flex items-center justify-center transition-all shadow-sm group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="group-hover:scale-105 transition-transform"
                            >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                        </a>

                        {/* تصحیح زاویه آیکون تلگرام برای ارسال رو به چپ در ساختار RTL */}
                        <a href="#tg" aria-label="Telegram" className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-brand-pink hover:text-white flex items-center justify-center transition-all shadow-sm"><Send size={16} className="transform rotate-180 translate-x-0.5" /></a>
                    </div>

                    <div className="bg-gray-800/50 p-3 rounded-2xl border border-gray-800/80 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                        <span className="text-[10px] font-bold text-gray-300">پشتیبانی ۲۴ ساعته در هفت روز هفته</span>
                    </div>
                </div>

            </div>

            {/* 📝 کپی‌رایت و امضای فوتر */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-gray-500 gap-4">
                <p>© ۱۴۰۵ اسنپ‌فود. تمامی حقوق مادی و معنوی محفوظ است.</p>
                <p className="flex items-center gap-1 select-none">
                    <span>طراحی شده با</span>
                    <Heart size={12} className="text-brand-pink fill-brand-pink animate-pulse" />
                    <span>توسط تیم توسعه فرانت‌اند</span>
                </p>
            </div>
        </footer>
    );
}