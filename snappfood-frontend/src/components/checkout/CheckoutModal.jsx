import React, { useState } from 'react';
import { MapPin, Ticket, Bike, ShoppingBag, CreditCard, X, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

// دیتابیس تخفیف‌های معتبر برای تست
const VALID_COUPONS = {
    'OFF30': { type: 'percent', value: 30, max: 50000, min: 100000 },
    'SNAPPMO': { type: 'fixed', value: 25000, max: 25000, min: 50000 }
};

export default function CheckoutModal({ isOpen, onClose, cart = [], onConfirmOrder }) {
    if (!isOpen) return null;

    // استیت‌ها
    const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' یا 'pickup'
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [couponError, setCouponError] = useState('');
    const [gateway, setGateway] = useState('saman');

    // استیت‌های مدیریت آدرس متغیر و پویا
    const [addresses, setAddresses] = useState([
        { id: 1, title: 'خانه (اصلی)', detail: 'بلوار آزادی، خیابان جیحون، پلاک ۱۲، واحد ۳' },
        { id: 2, title: 'دفتر کار', detail: 'میدان ونک، خیابان ملاصدرا، پلاک ۴۵، طبقه ۵' }
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState(1);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [newAddressTitle, setNewAddressTitle] = useState('');
    const [newAddressDetail, setNewAddressDetail] = useState('');

    // محاسبات مالی پایه
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.count), 0);
    const deliveryFee = deliveryMethod === 'delivery' ? 19000 : 0;

    // اعمال کد تخفیف
    const handleApplyCoupon = () => {
        setCouponError('');
        const code = couponCode.trim().toUpperCase();
        const coupon = VALID_COUPONS[code];

        if (!coupon) {
            setCouponError('کد تخفیف معتبر نیست.');
            return;
        }
        if (subtotal < coupon.min) {
            setCouponError(`حداقل خرید برای این کد ${coupon.min.toLocaleString()} تومان است.`);
            return;
        }

        let amount = 0;
        if (coupon.type === 'percent') {
            amount = (subtotal * coupon.value) / 100;
            if (amount > coupon.max) amount = coupon.max;
        } else {
            amount = coupon.value;
        }

        setDiscount(amount);
        setAppliedCoupon(code);
    };

    // افزودن آدرس جدید به لیست
    const handleAddNewAddress = (e) => {
        e.preventDefault();
        if (!newAddressTitle.trim() || !newAddressDetail.trim()) return;

        const newAddress = {
            id: Date.now(),
            title: newAddressTitle,
            detail: newAddressDetail
        };

        setAddresses([...addresses, newAddress]);
        setSelectedAddressId(newAddress.id); // آدرس جدید به عنوان پیش‌فرض انتخاب شود
        setNewAddressTitle('');
        setNewAddressDetail('');
        setShowNewAddressForm(false);
    };

    const finalTotal = subtotal + deliveryFee - discount;
    const currentSelectedAddress = addresses.find(a => a.id === selectedAddressId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

            <div className="bg-white w-full max-w-4xl rounded-[32px] shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-5 overflow-hidden max-h-[90vh]">

                {/* ─── ستون سمت راست: جزییات و فرم‌ها ─── */}
                <div className="md:col-span-3 p-6 overflow-y-auto space-y-6 border-l border-gray-100">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <h2 className="font-black text-lg text-gray-900">تکمیل اطلاعات سفارش</h2>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 cursor-pointer"><X size={18} /></button>
                    </div>

                    {/* ۱. شیوه دریافت سفارش */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 block">۱. شیوه دریافت مرسوله</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 cursor-pointer ${deliveryMethod === 'delivery' ? 'border-brand-pink bg-brand-pink/[0.02]' : 'border-gray-200'}`}
                            >
                                <Bike className={deliveryMethod === 'delivery' ? 'text-brand-pink' : 'text-gray-400'} size={20} />
                                <div>
                                    <span className="block font-black text-xs text-gray-900">ارسال توسط پیک</span>
                                    <span className="text-[10px] font-bold text-gray-400">۱۹,۰۰۰ تومان</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 cursor-pointer ${deliveryMethod === 'pickup' ? 'border-brand-pink bg-brand-pink/[0.02]' : 'border-gray-200'}`}
                            >
                                <ShoppingBag className={deliveryMethod === 'pickup' ? 'text-brand-pink' : 'text-gray-400'} size={20} />
                                <div>
                                    <span className="block font-black text-xs text-gray-900">تحویل حضوری</span>
                                    <span className="text-[10px] font-bold text-emerald-600">بدون هزینه ارسال</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* ۲. آدرس تحویل به همراه دکمه افزودن */}
                    {deliveryMethod === 'delivery' && (
                        <div className="space-y-3 animate-fadeIn">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-black text-gray-400">۲. انتخاب یا افزودن آدرس ارسال</label>
                                <button
                                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                                    className="flex items-center gap-1 text-[11px] font-black text-brand-pink hover:bg-brand-pink/5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                                >
                                    <Plus size={14} />
                                    <span>{showNewAddressForm ? 'انصراف' : 'آدرس جدید'}</span>
                                </button>
                            </div>

                            {/* فرم افزودن آدرس جدید */}
                            {showNewAddressForm && (
                                <form onSubmit={handleAddNewAddress} className="p-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 space-y-3 animate-fadeIn">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-1">
                                            <input
                                                type="text" required placeholder="عنوان (مثلا: خانه دوم)" value={newAddressTitle}
                                                onChange={e => setNewAddressTitle(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input
                                                type="text" required placeholder="نشانی دقیق پستی را وارد کنید..." value={newAddressDetail}
                                                onChange={e => setNewAddressDetail(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-[11px] py-2 rounded-xl transition-all cursor-pointer text-center">
                                        ثبت و انتخاب این آدرس
                                    </button>
                                </form>
                            )}

                            {/* لیست آدرس‌ها */}
                            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                                {addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddressId(addr.id)}
                                        className={`p-3 border rounded-xl cursor-pointer transition-all flex items-start gap-2.5 ${selectedAddressId === addr.id ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                    >
                                        <MapPin size={16} className="mt-0.5 text-gray-400" />
                                        <div className="flex-1 min-w-0">
                                            <span className="block font-black text-xs text-gray-800">{addr.title}</span>
                                            <p className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">{addr.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ۳. انتخاب درگاه پرداخت */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 block">۳. انتخاب درگاه بانکی</label>
                        <div className="flex gap-4">
                            {['saman', 'mellat'].map(bank => (
                                <label key={bank} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 flex-1">
                                    <input
                                        type="radio" name="gateway" checked={gateway === bank}
                                        onChange={() => setGateway(bank)} className="accent-brand-pink"
                                    />
                                    <span className="text-xs font-bold text-gray-800">
                                        {bank === 'saman' ? 'درگاه بانک سامان' : 'درگاه بانک ملت'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── ستون سمت چپ: فاکتور و کد تخفیف ─── */}
                <div className="md:col-span-2 bg-gray-50/70 p-6 flex flex-col justify-between overflow-y-auto max-h-full">
                    <div className="space-y-5">
                        <h3 className="font-black text-sm text-gray-800 border-b border-gray-200/60 pb-3">خلاصه فاکتور خرید</h3>

                        <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100">
                                    <span className="text-xs font-bold text-gray-800 truncate max-w-[140px]">{item.name} <strong className="text-brand-pink font-black">×{item.count}</strong></span>
                                    <span className="text-[11px] font-black text-gray-500">{(item.price * item.count).toLocaleString()} تومان</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-3 rounded-2xl border border-gray-200/60">
                            <div className="flex items-center gap-1.5 text-[11px] font-black text-gray-600 mb-2">
                                <Ticket size={14} className="text-brand-pink" />
                                <span>کد تخفیف داری؟</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text" placeholder="مثلاً: OFF30" value={couponCode}
                                    onChange={e => setCouponCode(e.target.value)} disabled={!!appliedCoupon}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold uppercase text-center outline-none focus:border-brand-pink disabled:opacity-50"
                                />
                                <button
                                    onClick={handleApplyCoupon} disabled={!!appliedCoupon}
                                    className="bg-gray-900 text-white font-black text-xs px-3 py-1.5 rounded-xl hover:bg-gray-800 cursor-pointer disabled:opacity-40"
                                >
                                    {appliedCoupon ? 'اعمال‌شده' : 'ثبت'}
                                </button>
                            </div>
                            {couponError && <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={11}/>{couponError}</p>}
                            {appliedCoupon && <p className="text-emerald-600 text-[10px] font-bold mt-1.5 flex items-center gap-1"><CheckCircle2 size={11}/>تخفیف روی فاکتور اعمال شد.</p>}
                        </div>
                    </div>

                    <div className="border-t border-gray-200/80 pt-4 mt-6 space-y-2.5 text-xs font-bold text-gray-600">
                        <div className="flex justify-between">
                            <span>مجموع غذاها:</span>
                            <span>{subtotal.toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between">
                            <span>هزینه تحویل:</span>
                            <span>{deliveryFee === 0 ? 'رایگان' : `${deliveryFee.toLocaleString()} تومان`}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>سود شما از تخفیف:</span>
                                <span>- {discount.toLocaleString()} تومان</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 flex justify-between text-sm font-black text-gray-900">
                            <span>مبلغ نهایی پرداخت:</span>
                            <span className="text-base text-brand-pink">{finalTotal.toLocaleString()} تومان</span>
                        </div>

                        <button
                            onClick={() => onConfirmOrder({
                                total: finalTotal,
                                method: deliveryMethod,
                                address: deliveryMethod === 'delivery' ? currentSelectedAddress : { title: 'تحویل حضوری' },
                                gateway
                            })}
                            className="w-full bg-brand-pink hover:bg-pink-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            <CreditCard size={14} />
                            <span>اتصال به درگاه و پرداخت آنلاین</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}