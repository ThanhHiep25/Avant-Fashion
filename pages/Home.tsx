
import React from 'react';
import { Hero } from '../components/Hero';
import { Collection } from '../components/Collection';
import { Studio } from '../components/Studio';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bell, ShoppingBag, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

const Marquee: React.FC = () => {
    return (
        <div className="bg-nero py-12 overflow-hidden whitespace-nowrap border-y border-white/5 relative z-10">
            <div className="inline-block animate-marquee flex items-center">
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        <span className="text-off-white text-6xl md:text-8xl font-serif italic mx-12">AVANT-GARDE</span>
                        <span className="text-accent text-6xl md:text-8xl font-sans font-black mx-12 transition-colors duration-500">2026</span>
                        <span className="text-off-white/20 text-6xl md:text-8xl font-serif mx-12">EDITORIAL</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};



const HomePage: React.FC = () => {
    const { setIsCartOpen, cart, addNotification } = useCart();
    const { scrollYProgress } = useScroll();
    const quoteOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
    const quoteScale = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0.8, 1, 1.2]);

    return (
        <main className="relative z-10 md:pl-24">
            <Helmet>
                <title>Avant | High-End Fashion Experience</title>
                <meta name="description" content="Welcome to AVANT. Explore our avant-garde collection and editorial." />
            </Helmet>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
                className="fixed top-6 right-6 gap-6 w-auto h-14 px-6 py-2 bg-nero/30 backdrop-blur-xl rounded-full flex items-center justify-center z-50 border border-white/10 shadow-2xl"
            >
                <div onClick={() => addNotification('No new notifications', 'info')}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-off-white hover:text-accent transition-colors cursor-pointer relative"
                    >
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-red rounded-full" />
                    </motion.div>
                </div>

                <div className="w-[1px] h-4 bg-white/20" />

                <div onClick={() => setIsCartOpen(true)}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-off-white hover:text-accent transition-colors cursor-pointer relative"
                    >
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-neon-red rounded-full flex items-center justify-center text-[8px] font-bold text-white">
                                {cart.length}
                            </span>
                        )}
                    </motion.div>
                </div>

                <div className="w-[1px] h-4 bg-white/20" />

                <Link to="/store">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-off-white hover:text-accent transition-colors cursor-pointer"
                    >
                        <Store size={20} />
                    </motion.div>
                </Link>


            </motion.div>
            <Hero />

            <Marquee />

            <Studio />

            <div className="relative h-screen flex items-center justify-center overflow-hidden bg-nero">
                <motion.div
                    style={{ opacity: quoteOpacity, scale: quoteScale }}
                    className="text-center z-10 px-6"
                >
                    <span className="text-accent font-sans uppercase tracking-[1.5em] text-[10px] mb-8 block transition-colors duration-500">Inquiry into form</span>
                    <h2 className="text-off-white text-4xl md:text-9xl font-serif italic leading-[0.9] tracking-tighter">
                        "Structure dictates<br />emotion."
                    </h2>
                    <div className="mt-12 flex justify-center items-center gap-10">
                        <div className="h-[1px] w-20 bg-white/20" />
                        <span className="text-off-white/40 font-sans uppercase tracking-[0.5em] text-[8px]">The New Narrative</span>
                        <div className="h-[1px] w-20 bg-white/20" />
                    </div>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-[40vw] font-serif font-black text-white italic">A</span>
                </div>
            </div>

            <Collection />

            <section className="min-h-[70vh] flex flex-col items-center justify-center bg-nero text-off-white px-10 md:pl-0 pl-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <p className="font-sans text-xs uppercase tracking-[0.8em] mb-12 text-accent font-bold transition-colors duration-500">Join the Movement</p>
                    <h3 className="text-5xl md:text-9xl font-serif mb-16 italic tracking-tighter text-outline opacity-100">Newsletter</h3>
                    <div className="w-full max-w-2xl relative group">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="w-full bg-transparent border-b border-white/20 py-8 font-sans text-xl md:text-3xl tracking-[0.2em] focus:outline-none focus:border-accent transition-all duration-500 uppercase placeholder:text-white/10"
                        />
                        <button className="absolute right-0 bottom-8 font-sans text-xs font-black tracking-widest hover:text-accent transition-colors flex items-center gap-2 group">
                            SUBSCRIBE <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default HomePage;
