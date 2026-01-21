
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Filter, ArrowUpRight, X, Sparkles, Search, ArrowRight, Link, Bell, ShoppingBag, Store } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

// Extended Mock Data for the full collection page
const ALL_PRODUCTS: Product[] = [
    { id: '1', title: 'Monolith Coat', category: 'Outerwear', price: '$2,400', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800&h=1200', size: 'tall' },
    { id: '2', title: 'Void Trousers', category: 'Basics', price: '$850', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800&h=800', size: 'medium' },
    { id: '3', title: 'Fractured Knit', category: 'Knitwear', price: '$1,100', image: '/imageproduct/img_6158_5b6152f132344474971fd2379833cddd_master.png', size: 'small' },
    { id: '4', title: 'ALDO', category: 'Footwear', price: '$1,800', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800&h=600', size: 'large' },
    { id: '5', title: 'Glass Veil', category: 'Accessories', price: '$400', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800&h=1200', size: 'tall' },
    { id: '6', title: 'NIKE FOOTBALL', category: 'Footwear', price: '$550', image: '/imageproduct/LP_NIKE_FOOTBALL_MB_KV.webp', size: 'medium' },
    { id: '7', title: 'Cyber Shell', category: 'Outerwear', price: '$3,200', image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800&h=1200', size: 'medium' },
    { id: '8', title: 'Obsidian Boot', category: 'Footwear', price: '$950', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800&h=1000', size: 'large' },
    { id: '9', title: 'Liquid Silk', category: 'Basics', price: '$1,200', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800&h=1000', size: 'small' },
];

const CATEGORIES = ['All', 'Outerwear', 'Basics', 'Knitwear', 'Footwear', 'Accessories'];

const ProductCard: React.FC<{ product: Product; index: number; onClick: () => void }> = ({ product, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col gap-4 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden aspect-[3/4] bg-off-white/5">
                <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 mix-blend-overlay" />

                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-off-white rounded-full flex items-center justify-center">
                        <ArrowUpRight size={20} className="text-nero" />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[10px] font-mono text-off-white uppercase tracking-widest bg-nero/50 backdrop-blur-sm px-2 py-1">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-start border-t border-off-white/10 pt-4">
                <div>
                    <h3 className="text-2xl font-serif text-off-white italic group-hover:text-accent transition-colors duration-300">{product.title}</h3>
                    <span className="text-[10px] font-mono text-off-white/40 uppercase tracking-[0.2em]">Ref. 2026-{product.id}</span>
                </div>
                <span className="text-lg font-sans font-bold text-off-white">{product.price}</span>
            </div>
        </motion.div>
    );
};

const CollectionPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();
    const { setIsCartOpen, cart, addNotification } = useCart();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (selectedProduct) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [selectedProduct]);

    const filteredProducts = ALL_PRODUCTS.filter(p => {
        const matchesCategory = filter === 'All' || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen relative bg-nero text-off-white selection:bg-accent selection:text-white pt-24 md:pl-24 pl-16 pb-20">
            <Helmet>
                <title>Avant | Collection 🦊</title>
                <meta name="description" content="Explore the AVANT collection. High-end fashion artifacts constructed for the modern nomad." />
            </Helmet>
            {/* Dynamic Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
                style={{ scaleX }}
            />

            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
                className="fixed top-2 right-6 gap-6 w-auto h-14 px-6 py-2 bg-nero/30 backdrop-blur-xl rounded-full flex items-center justify-center z-30 border border-white/10 shadow-2xl"
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

                <Link to="/notication">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-off-white hover:text-accent transition-colors cursor-pointer"
                    >
                        <Store size={20} />
                    </motion.div>
                </Link>


            </motion.div>

            {/* Header Section */}
            <header className="px-6 md:px-12 lg:px-24 mb-24 relative min-h-[50vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-20 relative"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Sparkles size={16} className="text-accent animate-pulse" />
                        <span className="font-mono text-xs text-accent tracking-[0.4em] uppercase">Season 2026 // Future Archive</span>
                    </div>

                    <h1 className="text-[15vw] leading-[0.8] font-serif font-black italic tracking-tighter text-transparent stroke-text-white opacity-20 relative z-0 select-none">
                        ARCHIVE
                    </h1>
                    <div className="absolute md:top-[30%] top-[10%] left-6 md:left-0 z-10">
                        <h1 className="text-5xl md:text-9xl font-sans font-black tracking-tighter text-off-white mb-4">
                            FULL<br /><span className="text-accent italic font-serif">COLLECTION</span>
                        </h1>
                        <p className="max-w-md font-mono text-xs md:text-sm text-off-white/60 leading-relaxed uppercase tracking-widest mt-8 border-l-2 border-accent pl-6">
                            Constructing identity through fabric and form. <br />
                            Explore the complete inventory of radical self-expression.
                        </p>
                    </div>
                </motion.div>
            </header>

            {/* Sticky Filter & Search Bar */}
            <div className="sticky top-0 z-20 bg-nero/80 backdrop-blur-xl border-y border-off-white/5 py-6 mb-20">
                <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Filter Group */}
                    <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-3 text-off-white/40 shrink-0">
                            <Filter size={16} />
                            <span className="font-mono text-[10px] uppercase tracking-widest hidden md:inline">Category</span>
                        </div>
                        <div className="flex gap-6">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`relative font-sans text-sm md:text-base font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${filter === cat ? 'text-accent' : 'text-off-white/40 hover:text-off-white'
                                        }`}
                                >
                                    {cat}
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search & Count */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className={`flex items-center gap-2 transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64 bg-off-white/5 px-4 py-2 rounded-full' : 'w-auto'}`}>
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-off-white hover:text-accent transition-colors">
                                <Search size={20} />
                            </button>
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.input
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "100%", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        type="text"
                                        placeholder="SEARCH ARTIFACTS..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent border-none outline-none font-mono text-xs text-off-white placeholder:text-off-white/20 ml-2 w-full uppercase tracking-wider"
                                        autoFocus
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="font-mono text-[10px] text-off-white/40 uppercase tracking-widest shrink-0">
                            {filteredProducts.length} Items
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <main className="px-6 md:px-12 lg:px-24 min-h-[50vh]">
                <AnimatePresence mode='wait'>
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={filter + searchQuery} // Re-animate on filter change
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16"
                        >
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onClick={() => setSelectedProduct(product)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center opacity-40"
                        >
                            <span className="text-6xl mb-4">∅</span>
                            <p className="font-mono text-sm uppercase tracking-widest">No artifacts found in this sector.</p>
                            <button
                                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                                className="mt-6 text-accent hover:underline font-mono text-xs uppercase cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
                    >
                        <div
                            className="absolute inset-0 bg-nero/95 backdrop-blur-xl"
                            onClick={() => setSelectedProduct(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-6xl bg-off-white flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-3xl text-nero"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-nero text-white hover:bg-accent transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-full md:w-1/2 h-[40vh] md:h-auto overflow-hidden bg-nero relative">
                                <img
                                    src={selectedProduct.image}
                                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                                    alt={selectedProduct.title}
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="font-mono text-[10px] text-accent font-bold tracking-[0.3em] uppercase">Artifact Selection</span>
                                        <div className="h-px flex-1 bg-nero/5" />
                                    </div>
                                    <h3 className="text-4xl lg:text-7xl font-serif font-black tracking-tighter mb-6 leading-none">{selectedProduct.title}</h3>

                                    <div className="space-y-6 text-base md:text-lg font-light opacity-70 leading-relaxed italic border-l-2 border-accent/20 pl-6">
                                        <p>"A manifesto of architectural silence and textile subversion. Crafted for the modern nomad to traverse the concrete void."</p>
                                        <div className="grid grid-cols-2 gap-4 md:gap-8 pt-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[9px] uppercase opacity-40 block">Availability</span>
                                                <span className="font-sans font-bold text-sm md:text-base">01 of 12 Units</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[9px] uppercase opacity-40 block">Origin</span>
                                                <span className="font-sans font-bold text-sm md:text-base">Studio Tokyo</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-nero/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-center sm:text-left">
                                        <span className="font-mono text-[10px] opacity-40 uppercase block mb-1 tracking-widest text-nero">Acquisition Value</span>
                                        <span className="text-4xl md:text-5xl font-serif italic font-black">{selectedProduct.price}</span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(selectedProduct, selectedProduct.size || 'M');
                                            setSelectedProduct(null);

                                        }}
                                        className="group flex items-center gap-4 px-10 py-4 bg-nero text-white font-mono uppercase tracking-[0.4em] text-[10px] hover:bg-accent transition-all duration-500 w-full sm:w-auto justify-center overflow-hidden relative"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            Add to Cart <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Note */}
            <footer className="mt-40 text-center pb-12">
                <p className="font-serif italic text-off-white/20 text-2xl md:text-4xl">
                    "Form follows fiction."
                </p>
            </footer>
        </div>
    );
};

export default CollectionPage;