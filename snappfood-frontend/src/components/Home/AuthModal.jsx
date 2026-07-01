import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Lock, User, ArrowLeft, Eye, EyeOff, Bike } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    // وضعیت‌های مربوط به لودینگ موتور و فاز دوم
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

    const cardRef = useRef(null);
    const magnetBtnRef = useRef(null);

    useEffect(() => {
        if (isOpen) setAnimate(true);
    }, [isOpen]);

    useEffect(() => {
        setPassword('');
        setShowPassword(false);
        setIsOtpStep(false);
        setIsSubmitting(false);
        setOtpValues(['', '', '', '', '']);
    }, [isLoginTab, isOpen]);

    // فیزیک شناوری ماوس
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isOpen) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            setMousePos({ x, y });

            if (magnetBtnRef.current && !isSubmitting) {
                const btn = magnetBtnRef.current.getBoundingClientRect();
                const distanceX = e.clientX - (btn.left + btn.width / 2);
                const distanceY = e.clientY - (btn.top + btn.height / 2);
                if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 60) {
                    setBtnOffset({ x: distanceX * 0.35, y: distanceY * 0.35 });
                } else {
                    setBtnOffset({ x: 0, y: 0 });
                }
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isOpen, isSubmitting]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setBtnOffset({ x: 0, y: 0 }); // قفل شدن دکمه برای اجرای انیمیشن فیزیکی

        // ۲.۵ ثانیه گاز دادن موتور روی دکمه و سپس ورود به بخش کد تایید
        setTimeout(() => {
            setIsOtpStep(true);
            setIsSubmitting(false);
        }, 2500);
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otpValues];
        newOtp[index] = value.substring(value.length - 1);
        setOtpValues(newOtp);

        if (value && index < 4) {
            otpRefs[index + 1].current.focus();
        }
    };

    const getPasswordStrength = () => {
        if (isLoginTab || password.length === 0) return 'default';
        if (password.length < 6) return 'weak';
        if (password.length < 10) return 'medium';
        return 'strong';
    };

    const getLiquidClass = () => {
        if (isOtpStep) return 'from-purple-500/30 to-purple-500/5';
        const strength = getPasswordStrength();
        if (strength === 'weak') return 'from-red-500/30 to-red-500/5';
        if (strength === 'medium') return 'from-amber-500/30 to-amber-500/5';
        if (strength === 'strong') return 'from-emerald-500/35 to-emerald-500/5';
        return 'from-brand-pink/25 to-brand-pink/5';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 [perspective:1200px]">
            <div className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} onClick={() => !isSubmitting && handleClose()} />

            <div
                ref={cardRef}
                style={{
                    transform: animate
                        ? `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg) rotateY(${isOtpStep ? 360 : 0}deg)`
                        : 'rotateX(15deg) scale(0.9)',
                    transition: isOtpStep ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.15s ease-out',
                    willChange: 'transform'
                }}
                className={`w-full max-w-md rounded-[32px] p-8 relative z-10 text-right overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.18)] ${animate ? 'opacity-100' : 'opacity-0'}`}
                dir="rtl"
            >
                {/* لایه مایع پشت شیشه */}
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[32px]">
                    <div style={{ transform: `translateX(${mousePos.x * 15}px) translateY(${mousePos.y * 10}px)` }} className={`absolute -bottom-16 -left-20 -right-20 h-44 bg-linear-to-t ${getLiquidClass()} rounded-[40%] animate-[spin_10s_infinite_linear] opacity-70 transition-colors duration-500`} />
                </div>

                <button onClick={() => !isSubmitting && handleClose()} className="absolute top-5 left-5 p-2 rounded-xl text-gray-500 hover:bg-white/60 hover:text-brand-pink border border-white/20 transition-all duration-200 cursor-pointer z-20"><X size={18} /></button>

                {!isOtpStep ? (
                    <div className="animate-fade-in duration-300">
                        {/* بخش لوگو و اموجی */}
                        <div className="text-center mb-8 relative z-10 select-none">
                            <div className="inline-flex items-center justify-center bg-linear-to-br from-brand-pink to-[#ff4081] text-white w-12 h-12 rounded-2xl text-2xl font-mono font-black shadow-lg mb-3 relative overflow-hidden">
                                <span className={`transition-transform duration-300 ${(!isLoginTab && isPasswordFocused && !showPassword) ? 'translate-y-12' : ''}`}>S</span>
                                <div className={`absolute inset-0 bg-black/20 flex items-center justify-center text-xs transition-all duration-300 ${(!isLoginTab && isPasswordFocused && !showPassword) ? 'translate-y-0' : 'translate-y-12'}`}>🙈</div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900">{!isLoginTab && getPasswordStrength() === 'weak' ? 'رمزت خیلی کوتاهه! 🧐' : !isLoginTab && getPasswordStrength() === 'medium' ? 'خوبه، ولی قوی‌ترش کن ⚡' : !isLoginTab && getPasswordStrength() === 'strong' ? 'آفرین! رمز فوق‌العادست 💪' : 'به اسنپ‌فود خوش آمدید'}</h3>
                        </div>

                        {/* تب‌ها */}
                        <div className="flex bg-gray-900/5 backdrop-blur-xs p-1 rounded-2xl mb-6 font-bold text-xs border border-white/30">
                            <button type="button" disabled={isSubmitting} onClick={() => setIsLoginTab(true)} className={`flex-1 py-2.5 rounded-xl text-center cursor-pointer transition-all ${isLoginTab ? 'bg-white/90 text-brand-pink shadow-sm font-black' : 'text-gray-600'}`}>ورود به پنل</button>
                            <button type="button" disabled={isSubmitting} onClick={() => setIsLoginTab(false)} className={`flex-1 py-2.5 rounded-xl text-center cursor-pointer transition-all ${!isLoginTab ? 'bg-white/90 text-brand-pink shadow-sm font-black' : 'text-gray-600'}`}>ساخت حساب جدید</button>
                        </div>

                        {/* فرم ورود */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className={`transition-all duration-300 overflow-hidden ${!isLoginTab ? 'max-h-24 opacity-100 mb-2' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">نام و نام خانوادگی</label>
                                <div className="relative flex items-center"><User size={16} className="absolute right-4 text-gray-400" /><input type="text" placeholder="مثلاً حسن محمدی" className="w-full border border-gray-300/40 rounded-xl pr-11 pl-4 py-3 text-sm outline-none bg-white/40 focus:bg-white/70 focus:border-brand-pink text-gray-900" /></div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">شماره تلفن همراه</label>
                                <div className="relative flex items-center"><Phone size={16} className="absolute right-4 text-gray-400" /><input required type="tel" placeholder="09123456789" className="w-full border border-gray-300/40 rounded-xl pr-11 pl-4 py-3 text-sm outline-none bg-white/40 focus:bg-white/70 focus:border-brand-pink text-left font-mono text-gray-900" /></div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">رمز عبور</label>
                                <div className="relative flex items-center">
                                    <Lock size={16} className="absolute right-4 text-gray-400" />
                                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} placeholder="••••••••" className="w-full border border-gray-300/40 rounded-xl pr-11 pl-12 py-3 text-sm outline-none bg-white/40 focus:bg-white/70 focus:border-brand-pink text-left font-mono text-gray-900" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 text-gray-400 hover:text-brand-pink p-1 rounded-lg"><Eye size={16} /></button>
                                </div>
                            </div>

                            {/* 🏍️ دکمه آهنربایی ارتقا یافته با پیست حرکت موتور زنده */}
                            <div className="pt-2">
                                <button
                                    ref={magnetBtnRef}
                                    disabled={isSubmitting}
                                    style={{
                                        transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                                        willChange: 'transform',
                                        transition: isSubmitting ? 'none' : 'transform 0.2s ease-out'
                                    }}
                                    className="w-full bg-linear-to-r from-brand-pink to-[#ff4081] text-white font-black text-sm h-[52px] rounded-xl shadow-lg shadow-brand-pink/20 cursor-pointer flex items-center justify-center relative overflow-hidden group"
                                >
                                    {isSubmitting ? (
                                        <div className="absolute inset-0 flex items-center w-full h-full" dir="ltr">
                                            {/* خط‌چین جاده کاملاً افقی و سراسری */}
                                            <div className="absolute left-6 right-6 h-0 border-t-2 border-dashed border-white/40 top-1/2 -translate-y-1/2 z-0" />

                                            {/* محفظه متحرک موتور و متن */}
                                            <div className="animate-[moveBike_2.5s_linear_infinite] flex items-center gap-2 relative z-10 text-white">
                                                <Bike size={22} className="animate-[bikeBounce_0.15s_infinite_linear]" />
                                                <span className="font-sans text-xs font-bold tracking-wider select-none">پیک اسنپ‌فود در راه است...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>{isLoginTab ? 'ورود به حساب کاربری' : 'تکمیل ثبت‌نام و عضویت'}</span>
                                            <ArrowLeft size={16} className="transform -translate-x-1 group-hover:translate-x-0 transition-transform" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* فاز دوم: تایید کد OTP */
                    <div className="animate-fade-in [transform:rotateY(360deg)] text-center py-4">
                        <div className="inline-flex items-center justify-center bg-purple-600 text-white w-12 h-12 rounded-2xl text-xl font-black mb-4 shadow-lg shadow-purple-500/30">🔑</div>
                        <h3 className="text-xl font-black text-gray-900">کد تایید را وارد کنید</h3>
                        <p className="text-xs text-gray-500 font-bold mt-1.5 mb-8">کد ۵ رقمی فرستاده شده به شماره همراه را وارد کنید</p>

                        <div className="flex justify-center gap-2.5" dir="ltr">
                            {otpValues.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    ref={otpRefs[index]}
                                    value={data}
                                    maxLength="1"
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => e.key === 'Backspace' && !otpValues[index] && index > 0 && otpRefs[index - 1].current.focus()}
                                    className="w-12 h-14 text-center text-xl font-black rounded-xl border border-white/60 bg-white/30 backdrop-blur-md outline-none text-purple-900 transition-all duration-300 focus:bg-white/80 focus:border-purple-500 focus:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                                />
                            ))}
                        </div>

                        <button onClick={() => setIsOtpStep(false)} className="mt-8 text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer block mx-auto">اصلاح شماره تلفن</button>
                    </div>
                )}
            </div>

            {/* 🛠️ انیمیشن‌های CSS سفارشی اصلاح شده برای حرکت در پیست دکمه */}
            <style>{`
        @keyframes moveBike {
          0% { transform: translateX(-180px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(380px); opacity: 0; }
        }
        @keyframes bikeBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px) rotate(-1deg); }
        }
      `}</style>
        </div>
    );
}