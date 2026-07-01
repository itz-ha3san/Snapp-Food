import { Gift, Bike } from 'lucide-react';

export default function PromoBanners() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* بنر بنفش */}
            <div className="bg-purple-600 rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden h-44 shadow-md">
                <div className="z-10 text-right">
                    <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block">کد تخفیف</span>
                    <h3 className="text-2xl font-black mb-1">۳۰٪ تخفیف</h3>
                    <p className="text-xs text-purple-100 mb-4">
                        با کد تخفیف <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded-md font-bold">SNAPP30</span>
                    </p>
                    <button className="bg-white text-purple-700 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-purple-50 transition">
                        کد رو کپی کن
                    </button>
                </div>
                <Gift size={80} className="text-purple-500/40 absolute left-6 bottom-4" />
            </div>

            {/* بنر صورتی */}
            <div className="bg-brand-pink rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden h-44 shadow-md">
                <div className="z-10 text-right">
                    <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block">پیشنهاد ویژه</span>
                    <h3 className="text-2xl font-black mb-1">اولین سفارش</h3>
                    <p className="text-xs text-pink-100 mb-4">رایگان ارسال میشه!</p>
                    <button className="bg-white text-brand-pink font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-50 transition">
                        همین الان سفارش بده
                    </button>
                </div>
                <Bike size={84} className="text-pink-400/30 absolute left-6 bottom-4" />
            </div>
        </section>
    );
}