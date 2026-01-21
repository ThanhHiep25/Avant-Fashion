
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Home, Menu, X } from 'lucide-react';

const MotionLink = m(Link);

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Collection', 'Journal', 'Studio', 'About', 'Archive'];

  return (
    <>
      <nav className="fixed top-0 left-0 h-screen w-16 md:w-24 border-r border-nero/10 z-50 bg-off-white flex flex-col justify-between py-10 items-center">
        <m.div
          initial={{ rotate: -90 }}
          className="text-2xl font-serif font-black tracking-tighter"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-black tracking-tighter">AVANT</Link>
        </m.div>

        <m.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-nero text-off-white rounded-none hover:bg-black/20 hover:backdrop-blur-xl transition-colors duration-500"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </m.button>

        <div className="flex flex-col gap-8">
          <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.4em] font-sans font-bold">Paris 2026</span>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-40 bg-nero flex items-center justify-center pl-24"
          >

            <div className="flex flex-col gap-4 text-center">
              <Link to="/"
                onClick={() => setIsOpen(false)}
                className="p-3 mx-auto
                 bg-nero bg-white/20
                  backdrop-blur-sm rounded-full hover:bg-electric-blue transition-colors duration-500">
                <Home size={40} color="white" />
              </Link>
              {menuItems.map((item, i) => (
                <MotionLink
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  to={`/${item.toLowerCase()}`}
                  className="text-off-white text-5xl md:text-9xl font-serif italic hover:text-electric-blue transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </MotionLink>
              ))}
            </div>

            <div className="absolute bottom-12 right-12 text-off-white/40 font-sans uppercase tracking-[0.5em] text-xs">
              Beyond Boundaries
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
