import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import RestaurantMenu from './pages/RestaurantMenu.jsx';
import LiveOrderTracker from './pages/OrderTracking.jsx';
import UserProfile from './pages/UserProfile.jsx';
import CartDrawer from './components/Home/CartDrawer.jsx';
import AuthModal from './components/Home/AuthModal.jsx';
import CheckoutModal from './components/checkout/CheckoutModal.jsx';
import ReviewModal from './components/profile/ReviewModal.jsx';
import Header from './components/Home/Header.jsx';

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
    const [currentPage, setCurrentPage] = useState('home');
    const [activeRestaurant, setActiveRestaurant] = useState(null);
    const [user, setUser] = useState({ name: 'محمد حسن ضیغمی', phone: '۰۹۱۲۳۴۵۶۷۸۹' });
    const [cart, setCart] = useState([]);
    const [cartRestaurant, setCartRestaurant] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [latestOrder, setLatestOrder] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ province: 'تهران', city: 'تهران' });

    const [pastOrders, setPastOrders] = useState(INITIAL_PAST_ORDERS);
    const [selectedOrderForComment, setSelectedOrderForComment] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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

    const handleConfirmOrder = (checkoutData) => {
        const orderId = 'SF-' + Math.floor(1000 + Math.random() * 9000);
        const newOrderObj = {
            id: orderId,
            restaurant: cartRestaurant,
            cart: cart,
            ...checkoutData
        };

        setLatestOrder(newOrderObj);

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

        setIsCheckoutOpen(false);
        setCart([]);
        setCartRestaurant(null);
        navigateTo('tracking');
    };

    const handleReorder = (cartItems, restaurantObj) => {
        setCart(cartItems);
        setCartRestaurant(restaurantObj);
        setIsCartOpen(true);
    };

    const handleOpenCommentModal = (order) => {
        setSelectedOrderForComment(order);
        setIsCommentModalOpen(true);
    };

    const handleReviewSubmit = (reviewData) => {
        alert(`امتیاز ${reviewData.rating} ستاره شما برای این رستوران ثبت شد.`);
        setIsCommentModalOpen(false);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <>
            {/* هدر ثابت با قابلیت ناوبری هوشمند */}
            {currentPage !== 'tracking' && (
                <Header
                    user={user}
                    cartCount={cartCount}
                    onCartOpen={() => setIsCartOpen(true)}
                    onAuthClick={() => setIsAuthOpen(true)}
                    onNavigate={navigateTo}
                    currentLocation={currentLocation}
                    onLocationChange={setCurrentLocation}
                />
            )}

            {/* صفحه اصلی خانه */}
            {currentPage === 'home' && (
                <Home
                    user={user}
                    currentLocation={currentLocation}
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

            {/* صفحه منوی اختصاصی رستوران */}
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

            {/* صفحه پیگیری زنده سفارش */}
            {currentPage === 'tracking' && (
                <LiveOrderTracker
                    orderDetails={latestOrder}
                    onBackToHome={() => navigateTo('home')}
                />
            )}

            {/* صفحه جامع پروفایل کاربری */}
            {currentPage === 'profile' && (
                <div className="min-h-screen bg-gray-50 py-6">
                    <UserProfile
                        user={user}
                        pastOrders={pastOrders}
                        onReorder={handleReorder}
                        onAddComment={handleOpenCommentModal}
                    />
                </div>
            )}

            {/* کشوها و مودال‌ها */}
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

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                onConfirmOrder={handleConfirmOrder}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLoginSuccess={(userData) => {
                    setUser(userData);
                    setIsAuthOpen(false);
                }}
            />

            <ReviewModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                order={selectedOrderForComment}
                onSubmitReview={handleReviewSubmit}
            />
        </>
    );
}