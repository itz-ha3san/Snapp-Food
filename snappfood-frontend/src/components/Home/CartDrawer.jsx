import React, { useState, useEffect } from 'react';
import {
    X, ShoppingBag, Plus, Minus, CreditCard, ArrowLeft,
    Trash2, MessageSquare, AlertTriangle, Loader2
} from 'lucide-react';

export default function CartDrawer({
                                       isOpen,
                                       onClose,
                                       cart = [],
                                       restaurant,
                                       onAdd,
                                       onRemove,
                                       user,
                                       onOpenAuth,
                                       onGoToCheckout,
                                       currentRestaurantId
                                   }) {
    // ---- وضعیت‌های داخلی کامپوننت ----
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

    const [itemNotes, setItemNotes] = useState({});
    const [activeNoteId, setActiveNoteId] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ---- محاسبات مالی ----
    const totalItemsCount = cart?.reduce((acc, item) => acc + item.count, 0) || 0;
    const itemsPrice = cart?.reduce((acc, item) => acc + (item.price * item.count), 0) || 0;

    const deliveryFee = itemsPrice > 0 ? 25000 : 0;
    const minOrderForFreeDelivery = 150000;
    const remainingForFreeDelivery = minOrderForFreeDelivery - itemsPrice;

    const finalPrice = Math.max(0, itemsPrice + deliveryFee - couponDiscount);
    const isCartEmpty = !cart || cart.length === 0;

    // ---- قفل اسکرول و مدیریت کلید Esc ----
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // ---- هندلرها ----
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;

        setIsValidatingCoupon(true);
        setTimeout(() => {
            setIsValidatingCoupon(false);
            if (couponCode.toUpperCase() === 'SNAP20') {
                setCouponDiscount(20000);
                setIsCouponApplied(true);
                alert('کد تخفیف با موفقیت اعمال شد.');
            } else {
                alert('کد تخفیف معتبر نیست.');
            }
        }, 700);
    };

    const handleCheckoutSubmit = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            if (onGoToCheckout) onGoToCheckout({ notes: itemNotes, discount: couponDiscount });
            onClose();
        }, 1500);
    };

    const isDifferentRestaurant = restaurant && currentRestaurantId && restaurant.id !== currentRestaurantId;

    return (
        <>
            {/* Overlay پس‌زمینه */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* بدنه دراور */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                dir="rtl"
            >
                {/* هدر */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <ShoppingBag size={20} className="text-brand-pink" />
                            {totalItemsCount > 0 && (
                                <span className="absolute -top-2 -left-2 bg-brand-pink text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItemsCount}
                                </span>
                            )}
                        </div>
                        <h2 className="font-black text-base text-gray-900">سبد خرید شما</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* هشدار تغییر رستوران */}
                {isOpen && isDifferentRestaurant && !isCartEmpty && (
                    <div className="bg-amber-50 border-b border-amber-100 px-5 py-2.5 flex items-center gap-2 text-[11px] font-bold text-amber-800">
                        <AlertTriangle size={14} className="shrink-0 text-amber-600" />
                        <span>افزودن آیتم جدید، سبد خرید قبلی از «{restaurant.name}» را پاک می‌کند.</span>
                    </div>
                )}

                {/* وضعیت ارسال رایگان */}
                {!isCartEmpty && (
                    <div className="bg-gray-50 border-b border-gray-100 px-5 py-2.5 text-center text-[11px] font-bold text-gray-600">
                        {remainingForFreeDelivery > 0 ? (
                            <span>هنوز <strong className="text-brand-pink">{remainingForFreeDelivery.toLocaleString()} تومان</strong> دیگر تا ارسال رایگان فاصله دارید.</span>
                        ) : (
                            <span className="text-emerald-600">🎉 سفارش شما واجد شرایط ارسال رایگان شد!</span>
                        )}
                    </div>
                )}

                {/* لیست آیتم‌ها */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
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
                                <div key={item.id} className="p-3 rounded-2xl border border-gray-50 hover:border-gray-100 bg-white transition-all">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/150?text=Food'}
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23db2777' stroke-width='2'><rect width='18' height='18' x='3' y='3' rx='2'/><path d='M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/><circle cx='9' cy='9' r='2'/></svg>";
                                                }}
                                                className="w-14 h-14 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-100"
                                            />
                                            <div>
                                                <h4 className="font-black text-xs text-gray-900">{item.name}</h4>
                                                {item.options && item.options.length > 0 && (
                                                    <p className="text-[10px] font-medium text-brand-pink/80 mt-0.5">
                                                        مخلفات: {item.options.join(' + ')}
                                                    </p>
                                                )}
                                                <span className="text-[11px] font-black text-gray-500 block mt-1">
                                                    {(item.price * item.count).toLocaleString()} تومان
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2 bg-brand-pink/5 border border-brand-pink/10 px-2 py-1 rounded-xl text-brand-pink text-xs select-none">
                                                <button onClick={() => onAdd(item)} className="cursor-pointer font-bold hover:scale-110 transition-transform"><Plus size={12} /></button>
                                                <span className="font-black text-gray-800 w-4 text-center">{item.count}</span>
                                                <button onClick={() => onRemove(item.id)} className="cursor-pointer font-bold hover:scale-110 transition-transform"><Minus size={12} /></button>
                                            </div>

                                            {/* دکمه سطل زباله اصلاح شده برای حذف کامل یک‌جا */}
                                            <button
                                                onClick={() => {
                                                    for (let i = 0; i < item.count; i++) {
                                                        onRemove(item.id);
                                                    }
                                                }}
                                                className="text-gray-300 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                                                title="حذف کامل از سبد"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* یادداشت آیتم */}
                                    <div className="mt-2 pt-2 border-t border-dashed border-gray-50">
                                        {activeNoteId === item.id ? (
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    placeholder="توضیحات سفارش..."
                                                    value={itemNotes[item.id] || ''}
                                                    onChange={(e) => setItemNotes({...itemNotes, [item.id]: e.target.value})}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold outline-none focus:border-brand-pink"
                                                />
                                                <button onClick={() => setActiveNoteId(null)} className="text-[10px] font-black text-brand-pink bg-pink-50 px-2 py-1 rounded-md">ثبت</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setActiveNoteId(item.id)}
                                                className="text-[10px] text-gray-400 font-bold flex items-center gap-1 hover:text-brand-pink transition-colors"
                                            >
                                                <MessageSquare size={11} />
                                                <span>{itemNotes[item.id] ? `یادداشت: ${itemNotes[item.id]}` : 'افزودن یادداشت به این آیتم'}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* فوتر مالی */}
                {!isCartEmpty && (
                    <div className="p-5 border-t border-gray-100 bg-gray-50/70 space-y-4 shrink-0">
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="کد تخفیف (تست: SNAP20)"
                                value={couponCode}
                                disabled={isCouponApplied || isValidatingCoupon}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink disabled:bg-gray-100"
                            />
                            <button
                                type="submit"
                                disabled={isCouponApplied || isValidatingCoupon}
                                className="bg-gray-900 hover:bg-gray-800 text-white font-black text-xs px-4 rounded-xl transition-all disabled:bg-gray-300 min-w-[70px]"
                            >
                                {isValidatingCoupon ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'اعمال'}
                            </button>
                        </form>

                        <div className="space-y-2 text-xs font-bold text-gray-500 border-b border-gray-200/60 pb-3">
                            <div className="flex justify-between">
                                <span>جمع محصولات:</span>
                                <span className="text-gray-900">{itemsPrice.toLocaleString()} تومان</span>
                            </div>
                            <div className="flex justify-between">
                                <span>هزینه ارسال:</span>
                                <span className="text-gray-900">{itemsPrice >= minOrderForFreeDelivery ? 'رایگان' : `${deliveryFee.toLocaleString()} تومان`}</span>
                            </div>
                            {couponDiscount > 0 && (
                                <div className="flex justify-between text-emerald-600">
                                    <span>سود شما از تخفیف:</span>
                                    <span>{couponDiscount.toLocaleString()} - تومان</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm font-black text-gray-900">
                            <span>مبلغ نهایی پرداختی:</span>
                            <span className="text-brand-pink text-lg">{finalPrice.toLocaleString()} تومان</span>
                        </div>

                        {user ? (
                            <button
                                onClick={handleCheckoutSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-brand-pink hover:bg-pink-600 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-pink-400"
                            >
                                {isSubmitting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        <CreditCard size={15} />
                                        <span>ثبت نهایی و تسویه حساب</span>
                                        <ArrowLeft size={14} className="mr-auto" />
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={onOpenAuth}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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