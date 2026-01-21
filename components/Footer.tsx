
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nero text-off-white py-20 pl-20 md:pl-32 pr-10 md:pr-26 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
        <div className="md:w-1/3">
          <h4 className="font-serif italic text-4xl mb-6 text-electric-blue">Manifesto</h4>
          <p className="font-sans font-light text-lg opacity-60 leading-relaxed">
            We exist at the intersection of architectural discipline and human emotion.
            Each piece is a dialogue between the wearer and the space they inhabit.
          </p>
        </div>

        <div className="flex flex-wrap gap-20">
          <div>
            <h5 className="font-sans uppercase tracking-widest text-xs mb-8 opacity-40">Contact</h5>
            <ul className="flex flex-col gap-4 font-sans text-xl">
              <li><a href="#" className="hover:text-electric-blue transition-colors">studio@avant.fr</a></li>
              <li><a href="#" className="hover:text-electric-blue transition-colors">+33 1 45 67 89 00</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-sans uppercase tracking-widest text-xs mb-8 opacity-40">Locations</h5>
            <ul className="flex flex-col gap-4 font-sans text-xl">
              <li>Paris</li>
              <li>Tokyo</li>
              <li>New York</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mt-20 pt-20 border-t border-off-white/10">
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[15vw] md:text-[20vw] font-serif font-black leading-none opacity-20 hover:opacity-100 transition-opacity duration-1000 select-none cursor-default"
        >
          AVANT-GARDE
        </motion.div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-[10px] uppercase tracking-[0.5em] opacity-40">
          <p>© 6 AVANT STUDIO ALL RIGHTS RESERVED</p>
          <div className="flex gap-10">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
