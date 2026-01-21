
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Studio: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], [0, -200]);
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [1, 1.1]);

  return (
    <section className="relative min-h-screen bg-sand py-40 overflow-hidden pl-16 md:pl-24 pr-10 md:pr-20">
      <div className="absolute top-0 right-0 p-10 hidden md:block">
        <span className="font-sans text-[10px] uppercase tracking-[1em] text-nero/20">Studio Philosophy</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Asymmetrical Text Column */}
        <div className="md:col-span-5 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[10rem] font-serif font-black leading-[0.85] mb-12"
          >
            The <br /> <span className="text-neon-red">Vision</span> <br /> Space
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-sm space-y-6"
          >
            <p className="font-sans text-lg font-light leading-relaxed text-nero/70">
              Our studio operates as a laboratory of form. We don't just design garments; we construct emotional landscapes that challenge the static nature of fashion.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-px w-20 bg-nero" />
              <button className="font-sans text-xs font-bold uppercase tracking-widest hover:text-electric-blue transition-colors interactive-item">
                Our Process
              </button>
            </div>
          </motion.div>
        </div>

        {/* Overlapping Image Column */}
        <div className="md:col-span-7 relative">
          <motion.div
            style={{ x, scale }}
            className="relative w-full aspect-[16/10] overflow-hidden bg-nero shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200&h=800"
              className="w-full h-full object-cover opacity-80"
              alt="Studio Interior"
            />
            {/* Absolute overlaying text */}
            <div className="absolute bottom-10 left-10 text-off-white font-serif italic text-4xl md:text-6xl tracking-tighter opacity-100">
              Materials that breathe.
            </div>
          </motion.div>

          {/* Floating detail card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-20 -left-10 md:left-20 bg-nero text-off-white p-12 max-w-xs shadow-2xl hidden md:block interactive-item border border-white/10"
          >
            <div className="flex flex-col gap-6">
              <span className="text-neon-red font-sans text-[10px] uppercase tracking-widest font-bold">Concept 2026</span>
              <h4 className="text-3xl font-serif">Brutal Softness</h4>
              <p className="text-xs font-light opacity-60 leading-relaxed">
                Exploring the tension between raw industrial finishes and the delicate curvature of the human body.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background oversized vertical text */}
      <motion.div
        style={{ y: x }}
        className="absolute bottom-20 right-20 text-[15vw] font-serif font-black text-outline opacity-[0.05] pointer-events-none select-none uppercase -rotate-90 origin-bottom-right"
      >
        Structure
      </motion.div>
    </section>
  );
};
