
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '@/context/CartContext';

const PRODUCTS: Product[] = [
  { id: '1', title: 'Monolith Coat', category: 'Outerwear', price: '$2,400', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800&h=1200', size: 'tall' },
  { id: '2', title: 'Void Trousers', category: 'Basics', price: '$850', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800&h=800', size: 'medium' },
  { id: '3', title: 'Fractured Knit', category: 'Knitwear', price: '$1,100', image: '/imageproduct/img_6158_5b6152f132344474971fd2379833cddd_master.png', size: 'small' },
  { id: '4', title: 'ALDO', category: 'Footwear', price: '$1,800', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800&h=600', size: 'large' },
  { id: '5', title: 'Glass Veil', category: 'Accessories', price: '$400', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800&h=1200', size: 'tall' },
  { id: '6', title: 'NIKE FOOTBALL', category: 'Footwear', price: '$550', image: '/imageproduct/LP_NIKE_FOOTBALL_MB_KV.webp', size: 'medium' },
];

const CollectionItem: React.FC<{ product: Product, index: number, onClick: () => void }> = ({ product, index, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  // Parallax offsets: more subtle for mobile to avoid performance/jitter issues
  const yShift = [-40, 30, -20, 50, -30, 40];
  const y = useTransform(scrollYProgress, [0, 1], [0, yShift[index % yShift.length]]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.4, 1, 1, 0.4]);

  // Responsive Grid Mapping:
  // Mobile: 1 col, alternating subtle horizontal padding
  // Tablet: 2 col (md:grid-cols-2), staggered via mt
  // Desktop: 12 col (lg:grid-cols-12), editorial spans
  const gridClasses = [
    "lg:col-span-7 md:col-span-1 lg:ml-0",                 // 0: Large Hero
    "lg:col-span-4 md:col-span-1 lg:mt-32 md:mt-24 lg:ml-auto", // 1: Offset side
    "lg:col-span-5 md:col-span-1 lg:-mt-16 md:mt-0 lg:ml-12",   // 2: Low-left
    "lg:col-span-6 md:col-span-2 lg:mt-12 md:mt-20 lg:mr-0",   // 3: Mid full width
    "lg:col-span-4 md:col-span-1 lg:-mt-12 md:mt-10 lg:ml-auto", // 4: Small offset
    "lg:col-span-8 md:col-span-2 lg:mt-8 md:mt-16 lg:mx-auto", // 5: Final focus
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group cursor-pointer mb-20 md:mb-0 ${gridClasses[index % gridClasses.length]} ${index % 2 === 1 ? 'px-4 md:px-0' : 'px-0'}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-nero/5 aspect-[4/5] lg:aspect-[3/4] max-h-[50vh] md:max-h-[60vh] lg:max-h-[75vh] shadow-xl md:shadow-2xl transition-shadow duration-500 group-hover:shadow-3xl">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover  brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
        />

        {/* Editorial Metadata */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none md:bottom-8 md:left-8">
          <span className="font-mono text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em] block">ID_{product.id} // V.25</span>
        </div>

        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-off-white rounded-full flex items-center justify-center text-nero shadow-xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-out">
            <Plus size={24} strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="flex-1">
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest opacity-30 block mb-1">{product.category}</span>
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter group-hover:text-accent transition-colors duration-500 leading-none truncate">
            {product.title}
          </h3>
        </div>
        <div className="shrink-0">
          <span className="font-mono text-lg md:text-2xl font-bold italic tracking-tighter">{product.price}</span>
        </div>
      </div>
      <div className="h-px w-full bg-nero/5 mt-4 group-hover:bg-accent/30 transition-colors duration-500" />
    </motion.div>
  );
};

export const Collection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { setIsCartOpen, cart, addNotification, addToCart } = useCart();

  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProduct]);

  return (
    <section className="relative min-h-screen py-20 px-20 md:py-32 md:px-16 lg:px-32 bg-off-white overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none overflow-hidden">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="text-[60vw] font-serif font-black italic tracking-tighter whitespace-nowrap"
        >
          AVANT GARDE
        </motion.span>
      </div>

      <div className="relative z-10 mb-16 md:mb-32 lg:mb-48">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <div className="h-px w-12 md:w-20 bg-accent" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent font-bold">Chronicle Series 01</span>
        </motion.div>

        <h2 className="text-6xl md:text-[10rem] lg:text-[14rem] font-serif font-black leading-[0.8] tracking-tighter italic mb-8 md:mb-12">
          Featured <br className="hidden md:block" /> <span className="text-outline !text-nero/10">Collection</span>
        </h2>

        <p className="max-w-xl md:max-w-2xl font-sans text-lg md:text-2xl font-light opacity-60 italic leading-relaxed">
          A careful dialogue between structural mass and spatial absence. We provide the architectural framework; you provide the character.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-24 relative z-10">
        {PRODUCTS.map((product, idx) => (
          <CollectionItem
            key={product.id}
            product={product}
            index={idx}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 pl-10 md:pl-32"
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
              className="relative w-full max-w-6xl bg-off-white flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-3xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-nero text-white hover:bg-accent transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[40vh] md:h-auto overflow-hidden bg-nero">
                <img
                  src={selectedProduct.image}
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 ease-in-out"
                  alt={selectedProduct.title}
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-accent font-bold tracking-[0.3em] uppercase">Artifact Selection</span>
                    <div className="h-px flex-1 bg-nero/5" />
                  </div>
                  <h3 className="text-5xl lg:text-8xl font-serif font-black tracking-tighter mb-6 leading-none">{selectedProduct.title}</h3>

                  <div className="space-y-6 text-base md:text-lg font-light opacity-70 leading-relaxed italic border-l border-accent/20 pl-6">
                    <p>"A manifesto of architectural silence and textile subversion. Crafted for the modern nomad."</p>
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
                    <span className="font-mono text-[10px] opacity-40 uppercase block mb-1 tracking-widest">Acquisition Value</span>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-black">{selectedProduct.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct)
                      setSelectedProduct(null)
                      setIsCartOpen(true)

                    }}
                    className="group flex items-center gap-4 px-10 py-4 md:px-12 md:py-5 bg-nero text-white font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-accent transition-all duration-500 w-full sm:w-auto justify-center overflow-hidden relative">
                    <span className="relative z-10 flex items-center gap-3">
                      Add to Cart <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
