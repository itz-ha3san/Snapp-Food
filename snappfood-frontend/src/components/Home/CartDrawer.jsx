import React from 'react';
import { X, ShoppingBag, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';

// اضافه کردن مقدار پیش‌فرض = [] به پراپرتی cart برای جلوگیری از ارور undefined
export default function CartDrawer({
                                       isOpen,
                                       onClose,
                                       cart = [],
                                       restaurant,
                                       onAdd,
                                       onRemove,
                                       user,
                                       onOpenAuth,
                                       onGoToCheckout // جایگزین دکمه پرداخت مستقیم برای رفتن به فلو تسویه آدرس و تخفیف
                                   }) {

    // ایمن‌سازی محاسبه قیمت با استفاده از Optional Chaining و مقدار فال‌بک
    const totalPrice = cart?.reduce((acc, item) => acc + (item.price * item.count), 0) || 0;
    const isCartEmpty = !cart || cart.length === 0;

    return (
        <>
            {/* 👥 لایه تاریک پس‌زمینه (Overlay) */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* 🛒 بدنه اصلی سبد خرید با انیمیشن ورود و خروج نرم از سمت چپ */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                dir="rtl"
            >
                {/* هدر سبد خرید */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-brand-pink" />
                        <h2 className="font-black text-base text-gray-900">سبد خرید شما</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* لیست غذاها */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {isCartEmpty ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3">
                            <span className="text-4xl">🛒</span>
                            <p className="text-xs font-bold">سبد خرید شما در حال حاضر خالی است.</p>
                        </div>
                    ) : (
                        <>
                            {restaurant && (
                                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs font-black text-gray-700 mb-2">
                                    سفارش از: {restaurant.name}
                                </div>
                            )}

                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:border-gray-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-gray-50 shrink-0" />
                                        <div>
                                            <h4 className="font-black text-xs text-gray-900">{item.name}</h4>
                                            <span className="text-[11px] font-black text-gray-500 block mt-1">
                                                {(item.price * item.count).toLocaleString()} تومان
                                            </span>
                                        </div>
                                    </div>

                                    {/* استپر دکمه‌ها با استاندارد RTL (راست پلاس، چپ ماینس) */}
                                    <div className="flex items-center gap-2.5 bg-brand-pink/5 border border-brand-pink/10 px-2 py-1 rounded-xl text-brand-pink text-xs select-none">
                                        <button onClick={() => onAdd(item)} className="cursor-pointer font-bold hover:scale-110 transition-transform"><Plus size={12} /></button>
                                        <span className="font-black text-gray-800 w-4 text-center">{item.count}</span>
                                        <button onClick={() => onRemove(item.id)} className="cursor-pointer font-bold hover:scale-110 transition-transform"><Minus size={12} /></button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* بخش فوتر و دکمه پرداخت */}
                {!isCartEmpty && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                        <div className="flex items-center justify-between text-sm font-bold text-gray-500">
                            <span>جمع محصولات:</span>
                            <span className="font-black text-gray-900 text-base">{totalPrice.toLocaleString()} تومان</span>
                        </div>

                        {user ? (
                            <button
                                onClick={() => {
                                    if(onGoToCheckout) onGoToCheckout();
                                    onClose(); // بستن دراور پس از رفتن به مرحله بعد
                                }}
                                className="w-full bg-brand-pink hover:bg-pink-600 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-md shadow-brand-pink/10 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                            >
                                <CreditCard size={15} />
                                <span>انتخاب آدرس و ثبت نهایی سفارش</span>
                                <ArrowLeft size={14} className="mr-auto" />
                            </button>
                        ) : (
                            <button
                                onClick={onOpenAuth}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                            >
                                <span>برای ثبت سفارش ابتدا وارد شوید</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}