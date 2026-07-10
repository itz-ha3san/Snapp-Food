import React, { useState } from 'react';
import { Star, X, MessageSquareCheck } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, order, onSubmitReview }) {
    if (!isOpen || !order) return null;

    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitReview({
            orderId: order.id,
            restaurantId: order.restaurantId,
            rating,
            comment
        });
        setComment('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

            <div className="bg-white w-full max-w-md rounded-3xl p-6 relative z-10 space-y-5 shadow-2xl text-right animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="font-black text-sm text-gray-900">ثبت نظر برای {order.restaurantName}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* بخش انتخاب ستاره‌ها به صورت هاور هوشمند */}
                    <div className="text-center space-y-2">
                        <label className="text-[11px] font-black text-gray-400 block">امتیاز شما به این سفارش چند است؟</label>
                        <div className="flex justify-center gap-1.5" dir="ltr">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-2xl cursor-pointer transition-transform active:scale-90"
                                >
                                    <Star
                                        size={28}
                                        className={star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* باکس نوشتن کامنت */}
                    <div>
                        <label className="text-[11px] font-black text-gray-400 block mb-1">تجربه خود از کیفیت غذا و ارسال را بنویسید (اختیاری)</label>
                        <textarea
                            rows="3"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="مثلاً: پیتزا گرم به دستم رسید و کیفیت خمیر عالی بود..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs font-bold outline-none focus:border-brand-pink resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-pink hover:bg-pink-600 text-white font-black text-xs py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                        <MessageSquareCheck size={15} />
                        <span>ثبت و ارسال امتیاز</span>
                    </button>
                </form>
            </div>
        </div>
    );
}