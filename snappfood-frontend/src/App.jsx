import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import RestaurantMenu from './pages/RestaurantMenu.jsx';
import LiveOrderTracker from './pages/OrderTracking.jsx';
import UserProfile from './pages/UserProfile.jsx'; // 👈 اضافه شدن صفحه پروفایل
import CartDrawer from './components/Home/CartDrawer.jsx';
import AuthModal from './components/Home/AuthModal.jsx';
import CheckoutModal from './components/checkout/CheckoutModal.jsx';
import ReviewModal from './components/profile/ReviewModal.jsx'; // 👈 اضافه شدن مودال ثبت نظر

// دیتابیس اولیه تاریخچه سفارش‌های کاربر برای دمو و قابلیت سفارش مجدد
const INITIAL_PAST_ORDERS = [
    {
        id: 'SF-1021',
        restaurantId: 1,
        restaurantName: 'پیتزا هومه',
        itemsSummary: 'پیتزا مخلوط (۱) + سیب‌زمینی سرخ‌کرده (۲)',
        total: 215000,
        restaurantObj: {
            id: 1,
            name: 'پیتزا هومه',
            categories: ['pizza'],
            rating: 4.9,
            time: '۲۵-۳۵ دقیقه',
            delivery: 'ارسال رایگان',
            image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600'
        },
        cartItems: [
            { id: 101, name: 'پیتزا مخلوط', price: 155050, count: 1, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=100' },
            { id: 102, name: 'سیب‌زمینی سرخ‌کرده', price: 29975, count: 2, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100' }
        ]
    }
];

export default function App() {
    const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'restaurant' | 'tracking' | 'profile'
    const [activeRestaurant, setActiveRestaurant] = useState(null);
    const [user, setUser] = useState({ name: 'محمد حسن ضیغمی', phone: '۰۹۱۲۳۴۵۶۷۸۹' }); // کاربر پیش‌فرض برای دسترسی آسان به پروفایل
    const [cart, setCart] = useState([]);
    const [cartRestaurant, setCartRestaurant] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [latestOrder, setLatestOrder] = useState(null);

    // استیت‌های جدید مدیریت تاریخچه و ثبت نظر
    const [pastOrders, setPastOrders] = useState(INITIAL_PAST_ORDERS);
    const [selectedOrderForComment, setSelectedOrderForComment] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    // تابع کمکی برای تغییر صفحه همراه با اسکرول به بالای مرورگر
    const navigateTo = (page) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    const handleAddToCart = (food, restaurant) => {
        const targetRestaurant = restaurant || cartRestaurant || activeRestaurant;
        if (!targetRestaurant) return;

        if (cartRestaurant && cartRestaurant.id !== targetRestaurant.id && cart.length > 0) {
            const confirmReplace = window.confirm(
                `شما از رستوران "${cartRestaurant.name}" سفارش در جریان دارید. با اضافه کردن این غذا، سبد قبلی پاک می‌شود.`
            );
            if (!confirmReplace) return;
            setCart([{ ...food, count: 1 }]);
            setCartRestaurant(targetRestaurant);
            return;
        }

        if (cart.length === 0) {
            setCartRestaurant(targetRestaurant);
        }

        setCart((prev) => {
            const existing = prev.find(item => item.id === food.id);
            if (existing) {
                return prev.map(item => item.id === food.id ? { ...item, count: item.count + 1 } : item);
            }
            return [...prev, { ...food, count: 1 }];
        });
    };

    const handleRemoveFromCart = (foodId) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === foodId);
            if (!existing) return prev;
            if (existing.count === 1) {
                const updated = prev.filter(item => item.id !== foodId);
                if (updated.length === 0) setCartRestaurant(null);
                return updated;
            }
            return prev.map(item => item.id === foodId ? { ...item, count: item.count - 1 } : item);
        });
    };

    // این تابع پس از کلیک روی "اتصال به درگاه و پرداخت آنلاین" در مودال تسویه اجرا می‌شود
    const handleConfirmOrder = (checkoutData) => {
        const orderId = 'SF-' + Math.floor(1000 + Math.random() * 9000);
        const newOrderObj = {
            id: orderId,
            restaurant: cartRestaurant,
            cart: cart,
            ...checkoutData
        };

        // ۱. پکیج کردن دیتای نهایی سفارش برای صفحه پیگیری زنده
        setLatestOrder(newOrderObj);

        // ۲. اضافه کردن هوشمند سفارش جدید به ابتدای تاریخچه سفارشات گذشته کاربران
        const itemsSummaryString = cart.map(item => `${item.name} (${item.count})`).join(' + ');
        setPastOrders(prev => [
            {
                id: orderId,
                restaurantId: cartRestaurant.id,
                restaurantName: cartRestaurant.name,
                itemsSummary: itemsSummaryString,
                total: checkoutData.total,
                restaurantObj: cartRestaurant,
                cartItems: cart
            },
            ...prev
        ]);

        // ۳. بستن مودال تسویه حساب و خالی کردن سبد خرید
        setIsCheckoutOpen(false);
        setCart([]);
        setCartRestaurant(null);

        // ۴. هدایت کاربر به صفحه پیگیری زنده
        navigateTo('tracking');
    };

    // ⚡ موتور سفارش مجدد: شارژ مستقیم سبد خرید با داده‌های فاکتور گذشته
    const handleReorder = (cartItems, restaurantObj) => {
        setCart(cartItems);
        setCartRestaurant(restaurantObj);
        setIsCartOpen(true); // باز شدن خودکار سبد خرید برای تجربه کاربری جذاب‌تر
    };

    // باز کردن مودال ثبت نظر برای سفارش خاص
    const handleOpenCommentModal = (order) => {
        setSelectedOrderForComment(order);
        setIsCommentModalOpen(true);
    };

    // ارسال نهایی کامنت ثبت شده
    const handleReviewSubmit = (reviewData) => {
        console.log("ثبت نظر موفقیت‌آمیز:", reviewData);
        alert(`امتیاز ${reviewData.rating} ستاره شما برای این رستوران ثبت شد.`);
        setIsCommentModalOpen(false);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <>
            {/* کلیدهای ناوبری موقت یا هدر بالایی در صورت لزوم برای جابجایی دمو */}
            <div className="bg-white border-b border-gray-100 p-3 flex justify-center gap-4 text-xs font-black" dir="rtl">
                <button onClick={() => navigateTo('home')} className={`cursor-pointer ${currentPage === 'home' ? 'text-brand-pink' : 'text-gray-500'}`}>صفحه اصلی</button>
                <button onClick={() => navigateTo('profile')} className={`cursor-pointer ${currentPage === 'profile' ? 'text-brand-pink' : 'text-gray-500'}`}>پروفایل من 👤</button>
            </div>

            {/* ─── صفحه اصلی خانه ─── */}
            {currentPage === 'home' && (
                <Home
                    user={user}
                    cartCount={cartCount}
                    onCartOpen={() => setIsCartOpen(true)}
                    onAuthClick={() => setIsAuthOpen(true)}
                    onRestaurantSelect={(res) => {
                        const selected = res || {
                            id: 1,
                            name: 'پیتزا هومه (نمونه)',
                            categories: ['pizza'],
                            rating: '۴.۹',
                            time: '۲۵-۳۵ دقیقه',
                            delivery: 'ارسال رایگان',
                            image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600'
                        };
                        setActiveRestaurant(selected);
                        navigateTo('restaurant');
                    }}
                />
            )}

            {/* ─── صفحه منوی اختصاصی رستوران ─── */}
            {currentPage === 'restaurant' && (
                <RestaurantMenu
                    restaurant={activeRestaurant}
                    onBack={() => navigateTo('home')}
                    cart={cart}
                    onAddToCart={(food) => handleAddToCart(food, activeRestaurant)}
                    onRemoveFromCart={handleRemoveFromCart}
                    onCartOpen={() => setIsCartOpen(true)}
                    user={user}
                />
            )}

            {/* ─── صفحه پیگیری زنده سفارش ─── */}
            {currentPage === 'tracking' && (
                <LiveOrderTracker
                    orderDetails={latestOrder}
                    onBackToHome={() => navigateTo('home')}
                />
            )}

            {/* ─── صفحه جامع پروفایل کاربری جدید ─── */}
            {currentPage === 'profile' && (
                <UserProfile
                    user={user}
                    pastOrders={pastOrders}
                    onReorder={handleReorder}
                    onAddComment={handleOpenCommentModal}
                />
            )}

            {/* ─── کشوی سبد خرید جانبی ─── */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                restaurant={cartRestaurant}
                onAdd={(food) => handleAddToCart(food, cartRestaurant)}
                onRemove={handleRemoveFromCart}
                user={user}
                onOpenAuth={() => {
                    setIsCartOpen(false);
                    setIsAuthOpen(true);
                }}
                onGoToCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />

            {/* ─── پنجره تسویه حساب و فرم فاکتور جامع ─── */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                onConfirmOrder={handleConfirmOrder}
            />

            {/* ─── مودال ورود و احراز هویت ─── */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLoginSuccess={(userData) => {
                    setUser(userData);
                    setIsAuthOpen(false);
                }}
            />

            {/* ─── مودال ثبت امتیاز و کامنت فیدبک ─── */}
            <ReviewModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                order={selectedOrderForComment}
                onSubmitReview={handleReviewSubmit}
            />
        </>
    );
}