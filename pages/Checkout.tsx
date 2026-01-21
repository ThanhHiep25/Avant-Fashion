
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Zap, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return total + price * item.quantity;
    }, 0);
    const shipping = 25;
    const taxes = subtotal * 0.08;
    const total = subtotal + shipping + taxes;

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsCompleted(true);
            clearCart();
            setTimeout(() => {
                navigate('/');
            }, 4000);
        }, 2000);
    };

    if (cart.length === 0 && !isCompleted) {
        return (
            <div className="min-h-screen bg-off-white flex flex-col items-center justify-center text-nero">
                <span className="text-6xl mb-4">∅</span>
                <p className="font-mono text-sm uppercase tracking-widest mb-8">Cart is empty</p>
                <Link to="/collection" className="border-b border-nero hover:pb-1 transition-all">Return to Archive</Link>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-neon-green text-nero flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <CheckCircle size={100} strokeWidth={1} />
                </motion.div>
                <h1 className="text-6xl md:text-9xl font-serif italic font-black mt-12 mb-6">ACQUIRED</h1>
                <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
                    Order Ref: #AV-{Math.floor(Math.random() * 10000)}<br />
                    Confirmation sent to secure channel.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-nero text-off-white selection:bg-neon-red selection:text-white pb-20 pt-24 md:pl-24 pl-24 pr-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

                {/* Left Column: Forms */}
                <div className="flex-1">
                    <Link to="/cart" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:gap-4 transition-all mb-12">
                        <ArrowLeft size={12} /> Back
                    </Link>

                    <h1 className="text-[10vw] lg:text-8xl font-serif font-black italic leading-[0.8] mb-12 text-transparent stroke-text-white">
                        CHECKOUT
                    </h1>

                    <div className="space-y-16">
                        {/* Shipping Section */}
                        <section className={`transition-opacity duration-500 ${step !== 'shipping' && 'opacity-40 pointer-events-none grayscale'}`}>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="font-mono text-xs text-neon-red">01</span>
                                <h2 className="text-3xl font-sans font-bold uppercase tracking-tighter">Coordinates</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs uppercase">
                                <div className="space-y-2">
                                    <label className="opacity-60 pl-2">Email Access</label>
                                    <input type="email" placeholder="USER@DOMAIN.COM" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="opacity-60 pl-2">Identity</label>
                                    <input type="text" placeholder="FULL NAME" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                </div>
                                <div className="span-full space-y-2">
                                    <label className="opacity-60 pl-2">Sector / Address</label>
                                    <input type="text" placeholder="STREET, APT, SUITE" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="opacity-60 pl-2">Zone / City</label>
                                    <input type="text" placeholder="CITY" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="opacity-60 pl-2">Code</label>
                                    <input type="text" placeholder="ZIP / POSTAL" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                </div>
                            </div>

                            {step === 'shipping' && (
                                <button
                                    onClick={() => setStep('payment')}
                                    className="mt-12 px-12 py-4 bg-off-white text-nero font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon-red hover:text-white transition-colors"
                                >
                                    Proceed to Protocol 02
                                </button>
                            )}
                        </section>

                        {/* Payment Section */}
                        <section className={`transition-opacity duration-500 ${step !== 'payment' && 'opacity-40 pointer-events-none grayscale'}`}>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="font-mono text-xs text-neon-red">02</span>
                                <h2 className="text-3xl font-sans font-bold uppercase tracking-tighter">Value Transfer</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <button className="p-6 border border-off-white/20 hover:border-neon-red hover:bg-off-white/5 transition-all text-left flex flex-col gap-4 group">
                                    <CreditCard className="text-off-white group-hover:text-neon-red" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">Credit Interface</span>
                                </button>
                                <button className="p-6 border border-off-white/20 hover:border-neon-red hover:bg-off-white/5 transition-all text-left flex flex-col gap-4 group">
                                    <Zap className="text-off-white group-hover:text-neon-red" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">Crypto / Wallet</span>
                                </button>
                            </div>

                            <div className="space-y-8 font-mono text-xs uppercase">
                                <div className="space-y-2">
                                    <label className="opacity-60 pl-2">Card Number</label>
                                    <div className="relative">
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 pr-10 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                        <Lock size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="opacity-60 pl-2">Expiry</label>
                                        <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="opacity-60 pl-2">CVC</label>
                                        <input type="text" placeholder="***" className="w-full bg-transparent border-b border-off-white/20 py-4 px-2 focus:border-neon-red focus:bg-off-white/5 outline-none transition-all placeholder:text-off-white/10" />
                                    </div>
                                </div>
                            </div>

                            {step === 'payment' && (
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="mt-12 w-full md:w-auto px-16 py-5 bg-neon-red text-white font-mono text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-nero transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isProcessing ? (
                                        <>Processing <span className="animate-pulse">_</span></>
                                    ) : (
                                        "Initiate Transfer"
                                    )}
                                </button>
                            )}
                        </section>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:w-96 shrink-0 relative">
                    <div className="sticky top-24 p-8 border border-off-white/10 bg-off-white/5 backdrop-blur-md">
                        <h3 className="font-mono text-xs text-off-white/60 uppercase tracking-[0.3em] mb-8 border-b border-off-white/10 pb-4">
                            Manifest
                        </h3>

                        <div className="space-y-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2 mb-8">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-20 object-cover grayscale opacity-80" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-serif italic truncate">{item.title}</h4>
                                        <p className="font-mono text-[10px] text-off-white/40 uppercase mt-1">
                                            Size: {item.selectedSize} <br />
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="font-sans text-sm font-bold mt-2">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 font-mono text-xs uppercase pt-6 border-t border-off-white/10">
                            <div className="flex justify-between text-off-white/60">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-off-white/60">
                                <span>Logistics</span>
                                <span>${shipping}</span>
                            </div>
                            <div className="flex justify-between text-off-white/60">
                                <span>Tax (8%)</span>
                                <span>${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-off-white pt-4 border-t border-off-white/10">
                                <span>Total</span>
                                <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
