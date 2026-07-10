import React, { useState, useMemo } from 'react';
import {
    ArrowRight, Star, Clock, Plus, Minus, ShoppingBag,
    Flame, Bike, Store, Ticket, ChevronLeft, Info, MessageSquare, History, Percent, X, Heart
} from 'lucide-react';
import { RESTAURANT_MENUS } from '../data/menuData.js';

export default function RestaurantMenu({
                                           restaurant,
                                           onBack,
                                           cart = [],
                                           onAddToCart,
                                           onRemoveFromCart,
                                           onCartOpen
                                       }) {
    const [activeTab, setActiveTab] = useState('all');
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [showInfoModal, setShowInfoModal] = useState(false);

    // استیت جدید برای مدیریت غذای انتخاب شده جهت نمایش جزئیات
    const [selectedFood, setSelectedFood] = useState(null);

    const currentMenu = RESTAURANT_MENUS[restaurant?.categories?.[0]] || RESTAURANT_MENUS.pizza;

    const filteredMenu = useMemo(() => {
        if (activeTab === 'all') return currentMenu;
        return currentMenu.filter(food => food.type === activeTab);
    }, [activeTab, currentMenu]);

    const bestPriceItems = useMemo(() => {
        return currentMenu.filter(food => food.price <= 150000);
    }, [currentMenu]);

    const previousOrders = useMemo(() => {
        return currentMenu.slice(0, 3);
    }, [currentMenu]);

    const totalCount = cart?.reduce((acc, item) => acc + item.count, 0) || 0;
    const totalPrice = cart?.reduce((acc, item) => acc + (item.price * item.count), 0) || 0;
    const deliveryFee = deliveryMethod === 'delivery' ? (restaurant?.deliveryFee || 25000) : 0;

    // پیدا کردن وضعیت دیتای غذای انتخاب شده در سبد خرید فعلی
    const selectedFoodCartItem = cart?.find(i => i.id === selectedFood?.id);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-right pb-32" dir="rtl">

            {/* 💎 هدر فوق‌مدرن */}
            <div className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 shadow-xs">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-xs font-black text-gray-600 hover:text-brand-pink bg-gray-50 hover:bg-brand-pink/5 px-4 py-2 rounded-2xl transition-all cursor-pointer group"
                    >
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        <span>بازگشت</span>
                    </button>

                    <button
                        onClick={onCartOpen}
                        className="relative p-2.5 bg-gray-50 hover:bg-brand-pink/10 text-gray-700 hover:text-brand-pink rounded-2xl transition-all cursor-pointer"
                    >
                        <ShoppingBag size={20} />
                        {totalCount > 0 && (
                            <span className="absolute -top-1.5 -left-1.5 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                                {totalCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 🖼️ بنر بالایی رستوران */}
            <div className="w-full h-48 sm:h-64 relative bg-gray-200 overflow-hidden">
                <img
                    src={restaurant?.banner || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"}
                    alt="رستوران بنر"
                    className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10 space-y-6">

                {/* 🏰 کارت مشخصات، عکس پروفایل و اسم رستوران */}
                <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={restaurant?.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150"}
                            alt={restaurant?.name}
                            className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
                        />
                        <div className="space-y-1">
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{restaurant?.name || 'نام رستوران'}</h1>
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-500 font-bold">
                                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg font-black">
                                    {restaurant?.rating || '۴.۵'} <Star size={12} fill="currentColor" />
                                </span>
                                <span>({restaurant?.reviewsCount || '۱۲۰+'} نظر)</span>
                                <span className="text-gray-300">•</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {restaurant?.deliveryTime || '۳۰'} دقیقه</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowInfoModal(true)}
                        className="flex items-center gap-1.5 text-xs font-black text-brand-pink bg-brand-pink/5 hover:bg-brand-pink/10 px-4 py-2.5 rounded-2xl transition-all cursor-pointer self-stretch sm:self-auto justify-center"
                    >
                        <MessageSquare size={14} />
                        <span>اطلاعات و نظرات</span>
                        <ChevronLeft size={14} />
                    </button>
                </div>

                {/* 🛵 انتخاب بین پیک اسنپ و مراجعه حضوری */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between gap-4">
                        <span className="text-xs font-black text-gray-800">روش تحویل سفارش:</span>
                        <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${deliveryMethod === 'delivery' ? 'bg-white text-brand-pink shadow-xs' : 'text-gray-500'}`}
                            >
                                <Bike size={14} />
                                <span>ارسال توسط پیک</span>
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${deliveryMethod === 'pickup' ? 'bg-white text-brand-pink shadow-xs' : 'text-gray-500'}`}
                            >
                                <Store size={14} />
                                <span>مراجعه حضوری</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between">
                        <span className="text-xs font-black text-gray-400">هزینه ارسال:</span>
                        <span className="text-xs font-black text-gray-900">
                            {deliveryMethod === 'pickup' ? 'رایگان' : `${deliveryFee.toLocaleString()} تومان`}
                        </span>
                    </div>
                </div>

                {/* 🎟️ بخش کوپن‌های اختصاصی */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-800">
                        <Ticket size={14} className="text-amber-500" />
                        <h3>کوپن‌های تخفیف این رستوران</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                        {['کوپن خوش‌آمدگویی: HELLO', 'تخفیف آخر هفته: WEEKEND'].map((coupon, idx) => (
                            <div key={idx} className="bg-amber-50/60 border border-amber-200/60 rounded-xl px-4 py-2.5 text-xs font-black text-amber-800 flex items-center gap-2 shrink-0">
                                <Percent size={12} />
                                <span>{coupon}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🕒 بخش خریدهای قبلی شما */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-800">
                        <History size={14} className="text-indigo-500" />
                        <h3>خریدهای قبلی شما از این رستوران</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                        {previousOrders.map((food) => (
                            <div key={`prev-${food.id}`} className="w-64 bg-white border border-gray-100 rounded-2xl p-3 shrink-0 flex items-center gap-3 snap-start shadow-2xs">
                                <img src={food.image} alt={food.name} className="w-12 h-12 rounded-xl object-cover cursor-pointer" onClick={() => setSelectedFood(food)} />
                                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedFood(food)}>
                                    <h4 className="text-xs font-black text-gray-900 truncate">{food.name}</h4>
                                    <span className="text-[10px] text-gray-500 block mt-0.5">{food.price.toLocaleString()} تومان</span>
                                </div>
                                <button onClick={() => onAddToCart(food)} className="p-1.5 bg-gray-50 hover:bg-brand-pink/10 text-brand-pink rounded-lg cursor-pointer"><Plus size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🎯 ناوبری دسته‌بندی‌ها */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sticky top-16 z-30 bg-[#FAFAFA]/90 backdrop-blur-md py-2">
                    {[{ id: 'all', label: '✨ همه منو' }, { id: 'main', label: '🍔 غذای اصلی' }, { id: 'starter', label: '🍟 پیش‌غذا' }, { id: 'drink', label: '🥤 نوشیدنی' }].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 shrink-0 cursor-pointer ${activeTab === tab.id ? 'bg-brand-pink text-white shadow-md' : 'bg-white text-gray-600 border border-gray-100'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 🍕 لیست اصلی غذاها با قابلیت کلیک جهت نمایش جزئیات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMenu.map((food) => {
                        const cartItem = cart?.find(i => i.id === food.id);
                        return (
                            <div
                                key={food.id}
                                className="group flex items-center justify-between p-4 rounded-[24px] border border-gray-100 bg-white hover:border-brand-pink/20 hover:shadow-xs transition-all duration-300 relative overflow-hidden"
                            >
                                {/* بخش کلیک‌خور برای باز شدن جزئیات کالا */}
                                <div className="flex gap-4 items-center flex-1 cursor-pointer" onClick={() => setSelectedFood(food)}>
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-50">
                                        <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {cartItem && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs">
                                                <span className="bg-brand-pink text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md">{cartItem.count}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1 max-w-[60%]">
                                        <h3 className="font-black text-xs text-gray-900">{food.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed line-clamp-1">{food.desc}</p>
                                        <div className="text-xs font-black text-gray-800 pt-0.5">{food.price.toLocaleString()} تومان</div>
                                    </div>
                                </div>

                                <div className="z-10">
                                    {cartItem ? (
                                        <div className="flex items-center gap-3 bg-gray-900 px-2.5 py-1.5 rounded-2xl text-white text-xs shadow-md">
                                            <button onClick={() => onAddToCart(food)} className="cursor-pointer text-emerald-400 font-bold"><Plus size={13} /></button>
                                            <span className="font-black w-4 text-center text-xs">{cartItem.count}</span>
                                            <button onClick={() => onRemoveFromCart(food.id)} className="cursor-pointer text-rose-400 font-bold"><Minus size={13} /></button>
                                        </div>
                                    ) : (
                                        <button onClick={() => onAddToCart(food)} className="text-brand-pink border border-brand-pink/20 bg-brand-pink/5 hover:bg-brand-pink hover:text-white px-4 py-2 rounded-2xl font-black text-xs transition-all duration-300 cursor-pointer">
                                            افزودن
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 🚪 سایدبار هوشمند همواره فعال */}
            {totalCount > 0 && (
                <div onClick={onCartOpen} className="fixed bottom-6 left-6 z-50 bg-gray-950 hover:bg-brand-pink text-white px-5 py-4 rounded-3xl shadow-2xl flex items-center gap-3 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group">
                    <div className="bg-white/10 p-2 rounded-xl"><ShoppingBag size={18} /></div>
                    <div className="text-right">
                        <span className="block text-[10px] text-gray-400 group-hover:text-white/80 font-bold">سبد خرید ({totalCount})</span>
                        <span className="text-xs font-black text-emerald-400 group-hover:text-white">{(totalPrice + deliveryFee).toLocaleString()} تومان</span>
                    </div>
                </div>
            )}

            {/* 🍔 مدال پاپ‌آپ جدید: جزئیات فوق‌مدرن کالا، محتویات و نظرات مخصوص هر غذا */}
            {selectedFood && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[36px] max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col text-right relative">

                        {/* تصویر بزرگ هدر کالا */}
                        <div className="w-full h-56 sm:h-64 relative bg-gray-100 shrink-0">
                            <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            {/* دکمه‌های کنترلی شناور روی عکس */}
                            <button
                                onClick={() => setSelectedFood(null)}
                                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-800 p-2.5 rounded-full hover:bg-white transition-all cursor-pointer shadow-md"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* محتوای متنی و مشخصات غذا */}
                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h2 className="text-lg sm:text-xl font-black text-gray-900">{selectedFood.name}</h2>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md flex items-center gap-0.5 font-black">
                                            ۴.۷ <Star size={11} fill="currentColor" />
                                        </span>
                                        <span>•</span>
                                        <span>محبوب‌ترین‌های این ماه</span>
                                    </div>
                                </div>
                                <div className="text-base font-black text-brand-pink">{selectedFood.price.toLocaleString()} تومان</div>
                            </div>

                            {/* ترکیبات و محتویات غذا */}
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 space-y-1.5">
                                <h4 className="text-xs font-black text-gray-800">🥣 ترکیبات و محتویات:</h4>
                                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                    {selectedFood.desc} همراه با ادویه‌های مخصوص سرآشپز، سبزیجات تازه معطر و سس اختصاصی اسنپ‌فود.
                                </p>
                            </div>

                            {/* 💬 بخش نظرات کاربران مخصوص این غذا */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                                    <MessageSquare size={14} className="text-indigo-500" />
                                    <span>نظرات خریداران این غذا (۳ نظر)</span>
                                </h4>
                                <div className="space-y-2.5">
                                    {[
                                        { user: 'مهدی ح.', text: 'حجمش واقعا عالی بود، داغ داغ هم رسید دستم.', rate: 5 },
                                        { user: 'نیلوفر ر.', text: 'مواد داخلش خیلی تازه بود، فقط سسش کمی تند بود.', rate: 4 },
                                    ].map((comment, i) => (
                                        <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl space-y-1 shadow-2xs">
                                            <div className="flex justify-between items-center text-[10px] font-black">
                                                <span className="text-gray-700">{comment.user}</span>
                                                <span className="text-amber-500 flex items-center gap-0.5">{comment.rate} <Star size={10} fill="currentColor" /></span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* فکس دکمه افزودن نهایی در پایین پاپ‌آپ */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4 shrink-0 rounded-b-[36px]">
                            <div>
                                <span className="block text-[10px] text-gray-400 font-bold">قیمت نهایی آیتم</span>
                                <span className="text-sm font-black text-gray-900">{selectedFood.price.toLocaleString()} تومان</span>
                            </div>

                            <div>
                                {selectedFoodCartItem ? (
                                    <div className="flex items-center gap-4 bg-gray-900 px-4 py-2 rounded-2xl text-white text-xs shadow-md">
                                        <button onClick={() => onAddToCart(selectedFood)} className="cursor-pointer text-emerald-400 font-bold"><Plus size={14} /></button>
                                        <span className="font-black w-4 text-center text-sm">{selectedFoodCartItem.count}</span>
                                        <button onClick={() => onRemoveFromCart(selectedFood.id)} className="cursor-pointer text-rose-400 font-bold"><Minus size={14} /></button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onAddToCart(selectedFood)}
                                        className="bg-brand-pink text-white font-black text-xs px-6 py-3 rounded-2xl hover:bg-pink-600 transition-all shadow-md shadow-brand-pink/10 cursor-pointer"
                                    >
                                        افزودن به سبد خرید
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* 💬 مدال اطلاعات کلی رستوران */}
            {showInfoModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs" onClick={() => setShowInfoModal(false)}>
                    <div className="bg-white rounded-[32px] max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 space-y-6 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="font-black text-base text-gray-900 flex items-center gap-1.5"><Info size={18} className="text-brand-pink" /> اطلاعات و آدرس</h2>
                            <button onClick={() => setShowInfoModal(false)} className="text-xs font-black text-gray-400 hover:text-gray-900 cursor-pointer">بستن</button>
                        </div>
                        <div className="text-xs font-bold text-gray-600 space-y-2">
                            <p>📍 آدرس: {restaurant?.address || 'تهران، خیابان اصلی، پلاک ۴'}</p>
                            <p>⏰ ساعت کاری: ۱۲:۰۰ ظهر الی ۲۳:۴۵ شب</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}