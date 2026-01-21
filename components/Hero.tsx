
import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateX = useTransform(scrollY, [0, 1000], [0, 15]);

  const distortionScale = useMotionValue(0);
  const smoothDistortionScale = useSpring(distortionScale, {
    stiffness: 60,
    damping: 15
  });

  const handleMouseEnter = () => animate(distortionScale, 15, {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1]
  });

  const handleMouseLeave = () => animate(distortionScale, 0, {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  });

  const title = "ESSENCE";

  const floatingImageVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const innerImageVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: -5,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center pl-16 md:pl-24 bg-transparent overflow-hidden">
      {/* SVG Distortion Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="hero-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.015"
              numOctaves="2"
              result="noise"
            />
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={smoothDistortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-[-10%] text-[25vw] font-serif font-black opacity-[0.02] select-none pointer-events-none italic"
      >
        MANIFESTO
      </motion.div>

      {/* Main Imagery with refined distortion on hover */}
      <motion.div
        style={{ rotateX }}
        className="relative w-full md:w-1/2 flex justify-center z-10 p-10 perspective-[1000px]"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md aspect-[3/4] overflow-hidden bg-nero interactive-item shadow-[40px_40px_80px_rgba(0,0,0,0.1)] group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            style={{
              scale: 1.2,
              y: y2,
              filter: "url(#hero-distortion)  brightness(90%)",
            }}
            whileHover={{
              scale: 1.25,
              filter: "url(#hero-distortion) grayscale(0%) contrast(110%) brightness(100%)"
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800&h=1200"
            className="w-full h-full object-cover transition-[filter] duration-700"
          />
          <div className="absolute top-8 left-8 p-1 bg-accent text-off-white font-sans text-[8px] uppercase tracking-[0.4em] z-20 transition-colors duration-500">
            Series 01
          </div>
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          initial="initial"
          whileHover="hover"
          variants={floatingImageVariants}
          className="absolute -bottom-10 -right-5 md:right-0 w-32 md:w-72 aspect-square border-[1px] border-nero/10 shadow-2xl overflow-hidden z-20 interactive-item cursor-pointer bg-white p-2"
        >
          <motion.img
            variants={innerImageVariants}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600&h=600"
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Floating Label Widget */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-0 md:-left-20 z-30 p-6 bg-nero text-off-white font-sans text-[10px] uppercase tracking-[0.5em] flex flex-col gap-2 border border-white/10"
        >
          <span>Archive Label</span>
          <span className="text-accent font-bold transition-colors duration-500">LTD Edition</span>
        </motion.div>
      </motion.div>

      {/* Hero Text */}
      <div className="w-full md:w-1/2 px-10 md:px-20 z-20 relative">
        <div className="overflow-hidden mb-6">
          <div className="flex flex-wrap">
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-8xl md:text-[13rem] font-serif font-black leading-none block mr-2"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex gap-8 items-start"
        >
          <div className="w-12 h-[1px] bg-accent mt-4 flex-shrink-0 transition-colors duration-500" />
          <p className="max-w-md font-sans text-lg md:text-xl font-light leading-relaxed mb-10 opacity-80">
            A radical synthesis of brutalist form and ethereal texture.
            Crafting the next generation of visual narratives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex gap-4"
        >
          <button className="group relative px-8 py-5 border border-current overflow-hidden uppercase font-sans font-bold tracking-[0.3em] text-[10px] interactive-item bg-nero text-off-white border-nero">
            <span className="relative z-10 group-hover:text-nero transition-colors duration-500">Shop Now</span>
            <motion.div className="absolute top-0 left-0 w-full h-full bg-off-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          <button className="px-8 py-5 border border-current/10 uppercase font-sans font-bold tracking-[0.3em] text-[10px] interactive-item hover:bg-accent hover:text-white transition-all duration-500">
            The Journal
          </button>
        </motion.div>
      </div>
    </section>
  );
};
