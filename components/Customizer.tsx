
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Palette, Type, Layout, Sliders } from 'lucide-react';

interface CustomizerProps {
  settings: any;
  setSettings: (settings: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Customizer: React.FC<CustomizerProps> = ({ settings, setSettings, isOpen, setIsOpen }) => {
  const accents = [
    { name: 'Neon Red', color: '#FF003C', id: 'neon-red' },
    { name: 'Electric Blue', color: '#001AFF', id: 'electric-blue' },
    { name: 'Acid Green', color: '#DFFF00', id: 'acid-green' },
    { name: 'Hot Pink', color: '#FF1493', id: 'hot-pink' },
  ];

  const backgrounds = [
    { name: 'Canvas', id: 'off-white' },
    { name: 'Sand', id: 'sand' },
    { name: 'Onyx', id: 'deep-black' },
  ];

  const fonts = [
    { name: 'Editorial (Serif)', id: 'serif' },
    { name: 'Technical (Sans)', id: 'sans' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-5 z-[100] bg-nero text-off-white p-5 rounded-full shadow-2xl interactive-item group hover:scale-110 transition-transform border border-white/10"
      >
        <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-nero/50 backdrop-blur-md text-off-white z-[110] shadow-2xl p-10 border-l border-white/10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif italic tracking-tighter">Control Center</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-10 overflow-y-auto pr-2 custom-scrollbar pb-10">
              {/* Accent Color */}
              <section>
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <Palette size={14} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Accent Color</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {accents.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setSettings({ ...settings, accent: acc.id });
                        document.documentElement.style.setProperty('--accent-color', acc.color);
                      }}
                      className={`aspect-square rounded-full border-2 transition-all ${settings.accent === acc.id ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: acc.color }}
                      title={acc.name}
                    />
                  ))}
                </div>
              </section>

              {/* Surface Texture */}
              <section>
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <Layout size={14} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Surface Texture</span>
                </div>
                <div className="flex flex-col gap-2">
                  {backgrounds.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setSettings({ ...settings, bg: bg.id })}
                      className={`w-full py-3 text-left px-6 border font-sans text-xs uppercase tracking-widest transition-all ${settings.bg === bg.id ? 'bg-white text-nero border-white' : 'border-white/10 hover:border-white/40'}`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Typography */}
              <section>
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <Type size={14} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Primary Font</span>
                </div>
                <div className="flex gap-2">
                  {fonts.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSettings({ ...settings, fontMode: f.id })}
                      className={`flex-1 py-3 border font-sans text-[10px] uppercase tracking-widest transition-all ${settings.fontMode === f.id ? 'bg-white text-nero border-white' : 'border-white/10 hover:border-white/40'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Advanced Sliders */}
              <section>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <Sliders size={14} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Advanced Parameters</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-3 opacity-60">
                      <span>Grain Intensity</span>
                      <span>{settings.grain || 5}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={settings.grain || 5}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setSettings({ ...settings, grain: val });
                        document.documentElement.style.setProperty('--grain-opacity', (val / 100).toString());
                      }}
                      className="w-full h-1 bg-white/10 appearance-none rounded-full cursor-pointer accent-accent"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-3 opacity-60">
                      <span>Corner Radius</span>
                      <span>{settings.radius || 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="2"
                      value={settings.radius || 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setSettings({ ...settings, radius: val });
                        document.documentElement.style.setProperty('--radius', `${val}px`);
                      }}
                      className="w-full h-1 bg-white/10 appearance-none rounded-full cursor-pointer accent-accent"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 opacity-20 text-[8px] uppercase tracking-[0.5em] text-center">
              AVANT CONFIG v1.1.0
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
