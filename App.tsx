import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Customizer } from './components/Customizer';
import { CartSidebar } from './components/CartSidebar';
import { Notifications } from './components/Notifications';
import { CartProvider } from './context/CartContext';
import { LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import HomePage from './pages/Home';
import CollectionPage from './pages/Collection';
import JournalPage from './pages/Journal';
import StudioPage from './pages/Studio';
import AboutPage from './pages/About';
import ArchivePage from './pages/Archive';
import CheckoutPage from './pages/Checkout';

const App: React.FC = () => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [settings, setSettings] = useState({
    accent: 'neon-red',
    bg: 'off-white',
    fontMode: 'serif',
    grain: 5,
    radius: 0
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const bgClass = settings.bg === 'deep-black' ? 'bg-deep-black' :
    settings.bg === 'sand' ? 'bg-sand' : 'bg-off-white';

  const textClass = settings.bg === 'deep-black' ? 'text-off-white' : 'text-nero';

  const fontClass = settings.fontMode === 'sans' ? 'font-sans' : 'font-serif';

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <CartProvider>
          <div className={`relative min-h-screen transition-all duration-1000 ${bgClass} ${textClass} ${fontClass} selection:bg-accent selection:text-white`}>
            {/* ... rest of the code ... */}
            <m.div
              className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100] transition-colors duration-500"
              style={{ scaleX }}
            />

            <CustomCursor />
            <Navigation />
            <CartSidebar />
            <Notifications />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>

            <Customizer
              settings={settings}
              setSettings={setSettings}
              isOpen={isCustomizerOpen}
              setIsOpen={setIsCustomizerOpen}
            />
            <Footer />
          </div>
        </CartProvider>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
