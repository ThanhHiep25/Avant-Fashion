
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return total + price * item.quantity;
    }, 0);

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-nero/50 backdrop-blur-md text-off-white z-[160] shadow-2xl flex flex-col border-l border-off-white/10"
                    >
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-off-white/10">
                            <h2 className="font-serif text-3xl italic">Cart <span className="font-mono text-sm not-italic opacity-40 ml-2">({cart.length})</span></h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-off-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-off-white/40">
                                    <span className="text-6xl mb-4">∅</span>
                                    <p className="font-mono text-xs uppercase tracking-widest text-center">Your cart is empty.</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cart.map((item) => (
                                        <motion.div
                                            layout
                                            key={`${item.id}-${item.selectedSize}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex gap-4 group"
                                        >
                                            <div className="w-24 aspect-[3/4] bg-off-white/5 overflow-hidden shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-serif italic text-xl pr-4">{item.title}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-off-white/20 hover:text-neon-red transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="font-mono text-[10px] uppercase tracking-widest text-off-white/40 mb-1">
                                                        {item.category} / {item.selectedSize}
                                                    </p>
                                                    <p className="font-sans font-bold">{item.price}</p>
                                                </div>

                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex items-center border border-off-white/20">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-off-white/10 transition-colors"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="font-mono text-xs w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-off-white/10 transition-colors"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 md:p-8 border-t border-off-white/10 bg-nero">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="font-mono text-xs uppercase tracking-widest text-off-white/40">Total (Excl. Tax)</span>
                                    <span className="font-serif text-4xl italic">${subtotal.toLocaleString()}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-off-white text-nero font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-4 group"
                                >
                                    <span>Checkout</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
