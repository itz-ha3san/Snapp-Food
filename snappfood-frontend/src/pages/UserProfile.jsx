import React, { useState } from 'react';
import {
    User, MapPin, History, RefreshCw, Star, Trash2,
    Plus, Wallet, Ticket, Edit3, Check, X, LogOut, Home,
    CreditCard, Calendar, Mail, ShieldAlert, ArrowLeftRight,
    Heart, Eye, Bell, MessageSquare, HelpCircle, AlertTriangle,
    Award, ShoppingBag, Percent, ChevronDown, FileText, Smartphone
} from 'lucide-react';

export default function UserProfile({ user, pastOrders = [], onReorder, onAddComment, onLogout, onGoHome }) {
    const [activeTab, setActiveTab] = useState('orders');

    // ۱. مدیریت پروفایل و تصاویر
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'محمد حسن ضیغمی',
        phone: user?.phone || '۰۹۱۲۳۴۵۶۷۸۹',
        email: user?.email || 'm.h.zeyghami@gmail.com',
        nationalCode: '۰۰۱۲۳۴۵۶۷۸',
        birthDate: '۱۳۷۸/۰۶/۱۵',
        gender: 'آقا'
    });
    const [tempProfileData, setTempProfileData] = useState({ ...profileData });
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [newPhone, setNewPhone] = useState('');
    const [otpCode, setOtpCode] = useState('');

    // ۲. مدیریت آدرس‌ها (اضافه شدن قابلیت ویرایش)
    const [addresses, setAddresses] = useState([
        { id: 1, title: 'خانه', tag: 'خانه', detail: 'بلوار آزادی، خیابان جیحون، پلاک ۱۲', isDefault: true },
        { id: 2, title: 'دفتر کار', tag: 'محل کار', detail: 'میدان ونک، خیابان ملاصدرا، پلاک ۴۵', isDefault: false }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null); // نگهداری آی‌دی آدرس در حال ویرایش
    const [newTitle, setNewTitle] = useState('');
    const [newDetail, setNewDetail] = useState('');
    const [newTag, setNewTag] = useState('خانه');
    const [useMap, setUseMap] = useState(false);

    // ۳. مدیریت مالی و تراکنش‌ها
    const [walletBalance, setWalletBalance] = useState(125000);
    const [chargeAmount, setChargeAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('۶۰۳۷۹۹۷۹۱۲۳۴۵۶۷۸');
    const [transactions] = useState([
        { id: 1, type: 'charge', amount: 50000, date: '۱۴۰۵/۰۴/۱۰', status: 'موفق' },
        { id: 2, type: 'order_pay', amount: -85000, date: '۱۴۰۵/۰۴/۰۸', status: 'موفق' }
    ]);
    const [discounts] = useState([
        { id: 1, code: 'SNAPNEW', description: '۵۰٪ تخفیف اولین سفارش سفارش', expiry: 'تا ۲ روز دیگر' },
        { id: 2, code: 'BURGER20', description: '۲۰٪ تخفیف بدون محدودیت منوی برگر', expiry: 'تا پایان هفته' }
    ]);

    // ۴. علاقه‌مندی‌ها و اخیراً بازدید شده‌ها
    const [wishlist, setWishlist] = useState([
        { id: 1, name: 'رستوران سنتی هانی', rate: 4.6, type: 'ایرانی' },
        { id: 2, name: 'فست‌فود باگت', rate: 4.2, type: 'پیتزا و برگر' }
    ]);
    const [recentViews] = useState([
        { id: 1, name: 'کافه نادری', date: 'امروز' },
        { id: 2, name: 'رستوران ارکیده', date: 'دیروز' }
    ]);

    // ۵. تنظیمات اعلان‌ها
    const [notifications, setNotifications] = useState({ sms: true, app: true, email: false });

    // ۶. پشتیبانی و FAQ
    const [openFaq, setOpenFaq] = useState(null);
    const [reportOrderId, setReportOrderId] = useState('');
    const [reportText, setReportText] = useState('');

    // ۷. فاکتور مودال
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // هندلرهای مدیریت پروفایل و OTP شماره جدید
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setProfileData(prev => ({ ...prev, phone: newPhone }));
        setShowOtpModal(false);
        alert('شماره موبایل جدید با موفقیت تایید و جایگزین شد.');
    };
    const handleSaveProfile = (e) => {
        e.preventDefault();
        setProfileData({ ...tempProfileData });
        setIsEditingProfile(false);
        alert('تغییرات با موفقیت ثبت شد.');
    };
    const handleDeleteAccount = () => {
        const confirmFirst = window.confirm('آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟ این عمل غیرقابل بازگشت است.');
        if (confirmFirst) {
            const confirmSecond = window.prompt('جهت تایید نهایی، واژه "حذف" را تایپ کنید:');
            if (confirmSecond === 'حذف') {
                alert('حساب کاربری شما با موفقیت حذف شد.');
                if (onLogout) onLogout();
            }
        }
    };

    // هندلر ذخیره آدرس (مدیریت همزمان افزودن و ویرایش)
    const handleSaveAddress = (e) => {
        e.preventDefault();
        if (!newTitle || !newDetail) return;

        if (editingAddressId) {
            // حالت ویرایش آدرس قبلی
            setAddresses(addresses.map(addr =>
                addr.id === editingAddressId
                    ? { ...addr, title: newTitle, tag: newTag, detail: newDetail }
                    : addr
            ));
            setEditingAddressId(null);
            alert('تغییرات آدرس با موفقیت اعمال شد.');
        } else {
            // حالت ثبت آدرس جدید
            setAddresses([...addresses, { id: Date.now(), title: newTitle, tag: newTag, detail: newDetail, isDefault: false }]);
            alert('آدرس جدید با موفقیت اضافه شد.');
        }

        // ریست کردن فرم
        setNewTitle('');
        setNewDetail('');
        setNewTag('خانه');
        setShowForm(false);
    };

    // فعال‌سازی حالت ویرایش روی فرم
    const handleEditClick = (addr) => {
        setEditingAddressId(addr.id);
        setNewTitle(addr.title);
        setNewDetail(addr.detail);
        setNewTag(addr.tag);
        setUseMap(false);
        setShowForm(true);
    };

    const setAddressAsDefault = (id) => {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-right font-sans" dir="rtl">

            {/* ================= کارت‌های آماری بالای صفحه (Gamification) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-brand-pink">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <span className="text-gray-400 text-[11px] font-bold">کل سفارش‌ها</span>
                        <h4 className="text-xl font-black text-gray-800">{pastOrders.length || 32} سفارش</h4>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Percent size={24} />
                    </div>
                    <div>
                        <span className="text-gray-400 text-[11px] font-bold">مجموع صرفه‌جویی</span>
                        <h4 className="text-xl font-black text-gray-800">۴۲۰,۰۰۰ <span className="text-xs font-medium">تومان</span></h4>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Award className="text-amber-500" size={20} />
                            <span className="text-xs font-black text-gray-800">باشگاه مشتریان (سطح طلایی)</span>
                        </div>
                        <span className="bg-amber-50 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-md">امتیاز: ۲,۴۵۰</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-amber-500 h-full w-[75%]" />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">۵۰ امتیاز تا سطح پلاتینیوم</span>
                </div>
            </div>

            {/* ================= هدر اصلی پروفایل ================= */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200">
                            {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User size={32} />}
                        </div>
                        <label className="absolute inset-0 bg-black/40 text-white text-[10px] font-black flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-2xl transition-all cursor-pointer">
                            تغییر عکس
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                    <div>
                        <h2 className="font-black text-lg text-gray-900">{profileData.name}</h2>
                        <p className="text-gray-400 text-xs font-bold mt-1">تلفen همراه: {profileData.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                    <button onClick={() => onGoHome ? onGoHome() : window.location.href = '/'} className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer">
                        <Home size={15} />
                        <span>صفحه اصلی</span>
                    </button>
                    <button onClick={() => window.confirm('آیا می‌خواهید خارج شوید؟') && onLogout()} className="flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer">
                        <LogOut size={15} />
                        <span>خروج</span>
                    </button>
                </div>
            </div>

            {/* ================= تب‌های ناوبری اصلی ================= */}
            <div className="flex gap-4 border-b border-gray-200 pb-3 mb-6 overflow-x-auto scrollbar-none whitespace-nowrap">
                {[
                    { id: 'orders', label: 'سفارش‌ها', icon: <History size={16} /> },
                    { id: 'info', label: 'اطلاعات حساب', icon: <User size={16} /> },
                    { id: 'addresses', label: 'نشانی‌ها', icon: <MapPin size={16} /> },
                    { id: 'wallet', label: 'کیف پول و مالی', icon: <Wallet size={16} /> },
                    { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: <Heart size={16} /> },
                    { id: 'support', label: 'پشتیبانی', icon: <MessageSquare size={16} /> }
                ].map(tab => (
                    <button
                        key={tab.id} onClick={() => { setActiveTab(tab.id); setShowForm(false); setEditingAddressId(null); }}
                        className={`pb-3 text-xs font-black transition-all relative flex items-center gap-1.5 cursor-pointer ${activeTab === tab.id ? 'text-brand-pink' : 'text-gray-400'}`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {activeTab === tab.id && <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-pink rounded-full" />}
                    </button>
                ))}
            </div>

            {/* ================= ۱. تاریخچه و سفارش‌ها ================= */}
            {activeTab === 'orders' && (
                <div className="space-y-4">
                    {pastOrders.length === 0 ? (
                        <p className="text-center py-10 text-xs text-gray-400 font-bold bg-white rounded-2xl border border-dashed border-gray-200">هنوز سفارشی ثبت نکرده‌اید.</p>
                    ) : (
                        pastOrders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-xs text-gray-900">{order.restaurantName}</h4>
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md">تحویل شده</span>
                                        <span className="text-gray-400 text-[10px]">{order.date || '۱۴۰۵/۰۴/۱۱'}</span>
                                    </div>
                                    <p className="text-gray-400 text-[11px] font-medium">{order.itemsSummary}</p>
                                    <span className="text-gray-500 text-[11px] font-black block">{order.total.toLocaleString()} تومان</span>
                                </div>
                                <div className="flex gap-2 self-end sm:self-center">
                                    <button onClick={() => setSelectedInvoice(order)} className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-black text-[11px] rounded-xl transition-all flex items-center gap-1 cursor-pointer">
                                        <FileText size={13} />
                                        <span>فاکتور</span>
                                    </button>
                                    <button onClick={() => onAddComment(order)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-[11px] rounded-xl transition-all flex items-center gap-1 cursor-pointer">
                                        <Star size={13} className="text-amber-500 fill-amber-500" />
                                        <span>ثبت نظر</span>
                                    </button>
                                    <button onClick={() => onReorder(order.cartItems, order.restaurantObj)} className="px-4 py-2 bg-brand-pink hover:bg-pink-600 text-white font-black text-[11px] rounded-xl transition-all flex items-center gap-1 shadow-sm cursor-pointer">
                                        <RefreshCw size={13} />
                                        <span>سفارش مجدد</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* ================= ۲. اطلاعات و مدیریت حساب کاربری ================= */}
            {activeTab === 'info' && (
                <div className="space-y-6">
                    <form onSubmit={handleSaveProfile} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <h3 className="font-black text-xs text-gray-800">مشخصات عمومی و امنیتی</h3>
                            {!isEditingProfile && (
                                <button type="button" onClick={() => setIsEditingProfile(true)} className="flex items-center gap-1 text-[11px] font-black text-brand-pink bg-brand-pink/5 px-3 py-1.5 rounded-xl cursor-pointer">
                                    <Edit3 size={12} />
                                    <span>ویرایش اطلاعات</span>
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-black text-gray-500 block mb-1.5">نام و نام خانوادگی</label>
                                <input type="text" disabled={!isEditingProfile} value={tempProfileData.name} onChange={e => setTempProfileData({...tempProfileData, name: e.target.value})} className="w-full bg-gray-50 disabled:bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800" />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-gray-500 block mb-1.5 flex items-center justify-between">
                                    <span>شماره تلفن همراه</span>
                                    {!isEditingProfile && <button type="button" onClick={() => setShowOtpModal(true)} className="text-[10px] text-brand-pink font-black hover:underline flex items-center gap-0.5"><Smartphone size={10}/> تغییر شماره / OTP</button>}
                                </label>
                                <input type="text" disabled value={profileData.phone} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-400 text-left" dir="ltr" />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-gray-500 block mb-1.5 flex items-center gap-1"><Mail size={12} /> <span>آدرس ایمیل (اختیاری)</span></label>
                                <input type="email" placeholder="نمونه: info@site.com" disabled={!isEditingProfile} value={tempProfileData.email} onChange={e => setTempProfileData({...tempProfileData, email: e.target.value})} className="w-full bg-gray-50 disabled:bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 text-left" dir="ltr" />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-gray-500 block mb-1.5 flex items-center gap-1"><Calendar size={12} /> <span>تاریخ تولد</span></label>
                                <input type="text" placeholder="۱۳۷۸/۰۶/۱۵" disabled={!isEditingProfile} value={tempProfileData.birthDate} onChange={e => setTempProfileData({...tempProfileData, birthDate: e.target.value})} className="w-full bg-gray-50 disabled:bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800" />
                            </div>
                        </div>

                        {isEditingProfile && (
                            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                                <button type="button" onClick={() => { setTempProfileData({...profileData}); setIsEditingProfile(false); }} className="flex items-center gap-1 text-xs font-black text-gray-500 bg-gray-100 px-4 py-2.5 rounded-xl cursor-pointer"><X size={14} /><span>انصراف</span></button>
                                <button type="submit" className="flex items-center gap-1 text-xs font-black text-white bg-gray-900 px-5 py-2.5 rounded-xl cursor-pointer shadow-md"><Check size={14} /><span>ثبت تغییرات</span></button>
                            </div>
                        )}
                    </form>

                    {/* تنظیمات اعلان‌ها */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6">
                        <h4 className="font-black text-xs text-gray-800 mb-4 flex items-center gap-1.5"><Bell size={15} /> <span>تنظیمات اطلاع‌رسانی و اعلان‌ها</span></h4>
                        <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-700">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={notifications.sms} onChange={e => setNotifications({...notifications, sms: e.target.checked})} className="accent-brand-pink" /> <span>پیامک وضعیت سفارش</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={notifications.app} onChange={e => setNotifications({...notifications, app: e.target.checked})} className="accent-brand-pink" /> <span>اعلان داخل اپلیکیشن (Push)</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={notifications.email} onChange={e => setNotifications({...notifications, email: e.target.checked})} className="accent-brand-pink" /> <span>خبرنامه و تخفیف‌ها ایمیلی</span></label>
                        </div>
                    </div>

                    {/* حریم خصوصی و حذف اکانت */}
                    <div className="bg-rose-50/40 border border-rose-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h4 className="font-black text-xs text-rose-900 flex items-center gap-1.5"><AlertTriangle size={15}/> حذف حساب کاربری</h4>
                            <p className="text-rose-700/70 text-[11px] font-medium mt-1">با حذف حساب کاربری، تمام تاریخچه‌ها، امتیازات باشگاه مشتریان و کیف پول شما برای همیشه پاک خواهد شد.</p>
                        </div>
                        <button type="button" onClick={handleDeleteAccount} className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0">حذف کامل حساب</button>
                    </div>
                </div>
            )}

            {/* ================= ۳. مدیریت آدرس‌ها (فرم جدید، پیش‌فرض و ویرایش) ================= */}
            {activeTab === 'addresses' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black text-xs text-gray-800">نشانی‌های ذخیره شده</h3>
                        <button
                            onClick={() => {
                                if(showForm) { setEditingAddressId(null); setNewTitle(''); setNewDetail(''); }
                                setShowForm(!showForm);
                            }}
                            className="flex items-center gap-1 text-[11px] font-black text-brand-pink hover:bg-brand-pink/5 px-2.5 py-1.5 rounded-xl cursor-pointer"
                        >
                            {showForm ? <X size={14} /> : <Plus size={14} />}
                            <span>{showForm ? 'بستن فرم' : 'افزودن آدرس جدید'}</span>
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleSaveAddress} className="p-5 border border-brand-pink/20 rounded-3xl bg-white space-y-4 shadow-xs">
                            <h4 className="text-xs font-black text-gray-800">{editingAddressId ? 'ویرایش نشانی انتخاب شده' : 'مشخصات نشانی جدید'}</h4>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setUseMap(true)} className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${useMap ? 'bg-brand-pink text-white border-brand-pink' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                    انتخاب روی نقشه
                                </button>
                                <button type="button" onClick={() => setUseMap(false)} className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${!useMap ? 'bg-brand-pink text-white border-brand-pink' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                    فرم دستی آدرس
                                </button>
                            </div>

                            {useMap ? (
                                <div className="w-full h-40 bg-slate-100 rounded-2xl flex items-center justify-center border border-gray-200 relative overflow-hidden">
                                    <MapPin size={32} className="text-brand-pink animate-bounce z-10" />
                                    <span className="text-[11px] font-bold text-gray-500 absolute bottom-2">نقشه شبیه‌سازی شده سیستم</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input type="text" required placeholder="عنوان (مثال: خانه)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink" />
                                    <select value={newTag} onChange={e => setNewTag(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700">
                                        <option value="خانه">خانه</option>
                                        <option value="محل کار">محل کار</option>
                                        <option value="سایر">سایر</option>
                                    </select>
                                    <input type="text" required placeholder="استان، شهر و جزئیات دقیق" value={newDetail} onChange={e => setNewDetail(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-brand-pink" />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-gray-900 text-white font-black text-xs py-2.5 rounded-xl cursor-pointer">
                                    {editingAddressId ? 'ثبت تغییرات ویرایش' : 'ذخیره نهایی نشانی'}
                                </button>
                                {editingAddressId && (
                                    <button type="button" onClick={() => { setEditingAddressId(null); setNewTitle(''); setNewDetail(''); setShowForm(false); }} className="bg-gray-100 text-gray-600 text-xs font-black px-4 rounded-xl">انصراف</button>
                                )}
                            </div>
                        </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(addr => (
                            <div key={addr.id} className={`bg-white border rounded-2xl p-4 flex flex-col justify-between gap-3 relative transition-all ${addr.isDefault ? 'border-brand-pink/40 bg-pink-50/5' : 'border-gray-100'}`}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2.5">
                                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="font-black text-xs text-gray-800">{addr.title}</span>
                                                <span className="bg-gray-100 text-gray-600 text-[9px] font-black px-1.5 py-0.5 rounded-md">{addr.tag}</span>
                                                {addr.isDefault && <span className="bg-brand-pink/10 text-brand-pink text-[9px] font-black px-1.5 py-0.5 rounded-md">پیش‌فرض سفارش سریع</span>}
                                            </div>
                                            <p className="text-gray-400 text-[11px] font-medium mt-1">{addr.detail}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        {/* دکمه ادیت آدرس */}
                                        <button onClick={() => handleEditClick(addr)} className="text-gray-400 hover:text-brand-pink p-1 cursor-pointer transition-colors" title="ویرایش آدرس">
                                            <Edit3 size={14} />
                                        </button>
                                        <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors" title="حذف آدرس">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                {!addr.isDefault && (
                                    <button type="button" onClick={() => setAddressAsDefault(addr.id)} className="text-[10px] text-gray-500 hover:text-brand-pink font-black self-start mt-1">انتخاب به عنوان پیش‌فرض</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= ۴. کیف پول و بخش مالی ================= */}
            {activeTab === 'wallet' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-brand-pink to-pink-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-md h-40">
                            <span className="text-xs font-bold opacity-80">موجودی کیف پول</span>
                            <h3 className="text-2xl font-black">{walletBalance.toLocaleString()} <span className="text-xs">تومان</span></h3>
                            <div className="w-full bg-white/10 h-px my-2" />
                            <span className="text-[10px] opacity-75">قابل استفاده روی کل سبد خرید</span>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setWalletBalance(p => p + parseInt(chargeAmount)); setChargeAmount(''); alert('حساب شارژ شد.'); }} className="md:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between h-40">
                            <div>
                                <label className="text-xs font-black text-gray-700 block mb-2">شارژ آنلاین حساب</label>
                                <input type="number" required placeholder="مبلغ به تومان" value={chargeAmount} onChange={e => setChargeAmount(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold" />
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white font-black text-xs py-2.5 rounded-xl transition-all">اتصال به درگاه بانکی</button>
                        </form>
                    </div>

                    {/* کدهای تخفیف فعال کاربر */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {discounts.map(discount => (
                            <div key={discount.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
                                <div className="space-y-1">
                                    <span className="inline-block bg-brand-pink/10 text-brand-pink font-black text-[11px] px-2 py-0.5 rounded-md tracking-wider">{discount.code}</span>
                                    <h4 className="font-bold text-xs text-gray-800 pt-1">{discount.description}</h4>
                                    <p className="text-[10px] text-gray-400">{discount.expiry}</p>
                                </div>
                                <button onClick={() => alert('کپی شد')} className="text-[10px] font-black text-brand-pink bg-brand-pink/5 px-3 py-1.5 rounded-xl cursor-pointer">کپی</button>
                            </div>
                        ))}
                    </div>

                    {/* لیست تراکنش‌های مالی */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6">
                        <h4 className="font-black text-xs text-gray-800 mb-4 flex items-center gap-1.5"><ArrowLeftRight size={15} /> <span>تاریخچه تراکنش‌ها (واریز/برداشت)</span></h4>
                        <div className="space-y-2">
                            {transactions.map(t => (
                                <div key={t.id} className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${t.type === 'charge' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span className="font-bold text-gray-800">{t.type === 'charge' ? 'افزایش اعتبار آنلاین' : 'برداشت بابت ثبت سفارش'}</span>
                                    </div>
                                    <span className={`font-black ${t.type === 'charge' ? 'text-emerald-600' : 'text-gray-700'}`}>{t.type === 'charge' ? '+' : ''}{t.amount.toLocaleString()} تومان</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= ۵. علاقه‌مندی‌ها و شخصی‌سازی ================= */}
            {activeTab === 'favorites' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-black text-xs text-gray-800 mb-4 flex items-center gap-1.5"><Heart size={15} className="text-rose-500 fill-rose-500" /> <span>رستوران‌های محبوب من (Wishlist)</span></h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {wishlist.map(rest => (
                                <div key={rest.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-black text-xs text-gray-800">{rest.name}</h4>
                                        <p className="text-[10px] text-gray-400 mt-1">{rest.type} • امتیاز {rest.rate}</p>
                                    </div>
                                    <button onClick={() => setWishlist(wishlist.filter(w => w.id !== rest.id))} className="text-rose-500 hover:scale-110 transition-transform cursor-pointer"><Heart size={18} className="fill-rose-500" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-black text-xs text-gray-800 mb-4 flex items-center gap-1.5"><Eye size={15} /> <span>اخیراً بازدید شده</span></h3>
                        <div className="bg-white border border-gray-100 rounded-3xl p-4 divide-y divide-gray-50">
                            {recentViews.map(view => (
                                <div key={view.id} className="flex justify-between items-center py-2.5 text-xs font-bold text-gray-700">
                                    <span>{view.name}</span>
                                    <span className="text-[11px] text-gray-400 font-medium">{view.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= ۶. پشتیبانی و مودال‌ها ================= */}
            {activeTab === 'support' && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-900 to-slate-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h4 className="font-black text-xs">نیاز به گفتگوی آنی دارید؟</h4>
                            <p className="text-gray-300 text-[11px] mt-1">پشتیبانی ۲۴ ساعته سیستم آماده پاسخگویی به سوالات و مشکلات شما در فرایند سفارش‌گیری است.</p>
                        </div>
                        <button onClick={() => alert('اتصال به چت آنلاین پشتیبانی...')} className="bg-white text-gray-900 font-black text-xs px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">شروع چت آنلاین</button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-6">
                        <h4 className="font-black text-xs text-gray-800 mb-4 flex items-center gap-1.5"><AlertTriangle size={15} className="text-amber-500" /> <span>گزارش مشکل برای یک سفارش خاص</span></h4>
                        <div className="space-y-3">
                            <select value={reportOrderId} onChange={e => setReportOrderId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700">
                                <option value="">انتخاب سفارش مربوطه...</option>
                                {pastOrders.map(o => <option key={o.id} value={o.id}>{o.restaurantName} - {o.total.toLocaleString()} تومان</option>)}
                            </select>
                            <textarea placeholder="توضیحات مشکل (مثلا: تاخیر در تحویل، اقلام ناقص و...)" value={reportText} onChange={e => setReportText(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold h-20 outline-none" />
                            <button type="button" onClick={() => { if(!reportText) return; alert('گزارش شما ثبت شد.'); setReportText(''); }} className="w-full bg-brand-pink text-white font-black text-xs py-2 rounded-xl">ارسال گزارش خرابی</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-black text-xs text-gray-800 mb-2 flex items-center gap-1.5"><HelpCircle size={15} /> <span>سوالات متداول (FAQ)</span></h4>
                        {[
                            { q: 'چگونه می‌توان سفارش را لغو کرد؟', a: 'تا قبل از تایید سفارش توسط رستوران می‌توانید از منوی پیگیری سفارش اقدام به لغو آنلاین کنید.' },
                            { q: 'زمان عودت وجه کیف پول چقدر است؟', a: 'عودت وجه به شماره کارت تایید شده معمولاً بین ۱۲ الی ۲۴ ساعت کاری انجام می‌پذیرد.' }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-4 text-right flex justify-between items-center text-xs font-black text-gray-800 cursor-pointer">
                                    <span>{faq.q}</span>
                                    <ChevronDown size={14} className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && <div className="px-4 pb-4 text-[11px] text-gray-500 font-medium leading-relaxed bg-gray-50/50">{faq.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= مودال تایید OTP شماره جدید ================= */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleVerifyOtp} className="bg-white p-6 rounded-3xl max-w-sm w-full text-right space-y-4">
                        <h4 className="font-black text-sm text-gray-900">تغییر شماره همراه با تایید OTP</h4>
                        <input type="text" required placeholder="شماره جدید (مثال: ۰۹۱۲)" value={newPhone} onChange={e => setNewPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-center" dir="ltr" />
                        <button type="button" onClick={() => alert('کد تایید ۴ رقمی به شماره جدید ارسال شد.')} className="w-full bg-gray-900 text-white font-black text-[11px] py-1.5 rounded-lg">ارسال کد تایید</button>
                        <input type="text" required placeholder="کد تایید ۴ رقمی ورود" value={otpCode} onChange={e => setOtpCode(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-center tracking-widest" dir="ltr" />
                        <div className="flex gap-2 pt-2">
                            <button type="button" onClick={() => setShowOtpModal(false)} className="flex-1 bg-gray-100 font-black text-xs py-2 rounded-xl text-gray-500">انصراف</button>
                            <button type="submit" className="flex-1 bg-brand-pink text-white font-black text-xs py-2 rounded-xl">تایید نهایی</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ================= مودال نمایش فاکتور ================= */}
            {selectedInvoice && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-3xl max-w-md w-full text-right space-y-4 relative border border-gray-100">
                        <button onClick={() => setSelectedInvoice(null)} className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
                        <h3 className="font-black text-sm text-gray-900 border-b pb-2">فاکتور رسمی سفارش</h3>
                        <div className="text-xs space-y-2 text-gray-700 font-bold">
                            <div className="flex justify-between"><span>رستوران صادرکننده:</span> <span>{selectedInvoice.restaurantName}</span></div>
                            <div className="flex justify-between"><span>جزئیات اقلام:</span> <span className="font-medium text-gray-500">{selectedInvoice.itemsSummary}</span></div>
                            <div className="flex justify-between"><span>تاریخ ثبت:</span> <span>{selectedInvoice.date || '۱۴۰۵/۰۴/۱۱'}</span></div>
                            <div className="w-full bg-gray-100 h-px my-2" />
                            <div className="flex justify-between text-brand-pink text-sm font-black"><span>مبلغ کل پرداختی:</span> <span>{selectedInvoice.total.toLocaleString()} تومان</span></div>
                        </div>
                        <button type="button" onClick={() => window.print()} className="w-full bg-gray-900 text-white font-black text-xs py-2.5 rounded-xl">پرینت / دانلود نسخه PDF</button>
                    </div>
                </div>
            )}

        </div>
    );
}