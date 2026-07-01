import { Download, ShoppingBag } from 'lucide-react';

export default function AppDownload() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-app-bg rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="flex items-center gap-6 z-10 text-right">
                    <div>
                        <span className="text-brand-pink text-xs font-bold block mb-1">اپلیکیشن اسنپ‌فود</span>
                        <h3 className="text-2xl font-black mb-2">هر جا هستی، غذا بهت می‌رسه</h3>
                        <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
                            با اپ اسنپ‌فود سریع‌تر سفارش بده، تخفیف بیشتری بگیر و پیک رو لحظه‌ای روی نقشه دنبال کن.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 z-10 justify-center">
                    {/* دکمه گوگل پلی */}
                    <button className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 min-w-37.5 cursor-pointer transition">
                        <Download size={20} className="text-brand-pink" />
                        <div className="text-right">
                            <p className="text-[9px] text-gray-400">دانلود از</p>
                            <p className="text-xs font-bold font-mono">Google Play</p>
                        </div>
                    </button>

                    {/* دکمه اپ استور */}
                    <button className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 min-w-37.5 cursor-pointer transition">
                        <ShoppingBag size={20} className="text-brand-pink" />
                        <div className="text-right">
                            <p className="text-[9px] text-gray-400">دانلود از</p>
                            <p className="text-xs font-bold font-mono">App Store</p>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}