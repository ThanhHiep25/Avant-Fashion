
import React, { useEffect } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDownRight, Globe, Layers, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';




const MANIFESTO_ITEMS = [
    { number: '01', text: 'Anti-Decoration' },
    { number: '02', text: 'Material Truth' },
    { number: '03', text: 'Form Construction' },
    { number: '04', text: 'Silence' }
];

const STATS = [
    { label: 'Founded', value: '2022' },
    { label: 'Ateliers', value: '03' },
    { label: 'Artifacts', value: '142' },
    { label: 'Countries', value: '18' }
];

const AboutPage: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="min-h-screen bg-deep-black text-off-white selection:bg-white selection:text-black pt-24 pb-20 overflow-hidden md:pl-24 pl-14">
            <Helmet>
                <title>Avant | About 🦊</title>
                <meta name="description" content="Learn about Avant's philosophy of anti-decoration, material truth, and form construction. Founded in Paris, 2022." />
            </Helmet>
            {/* Dynamic Progress Bar */}
            <m.div
                className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Header / Intro */}
            <header className="px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col justify-center relative">
                <div className="absolute top-20 right-10 md:right-24 animate-spin-slow">
                    <Globe size={32} className="text-off-white/20" />
                </div>

                <m.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] font-serif font-black leading-[0.8] mb-12 mix-blend-difference z-10"
                >
                    WE ARE <br /> <span className="text-transparent stroke-text-white italic">AVANT</span>
                </m.h1>

                <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start max-w-5xl">
                    <p className="font-mono text-xs uppercase tracking-widest text-off-white/40 pt-2 border-t border-off-white/20 w-32">
                        Est. 2022 <br /> Paris, France
                    </p>
                    <p className="font-sans text-xl md:text-3xl font-light leading-relaxed opacity-80">
                        Avant is a rejection of the temporary. We build garments as architectural structures for the human form. No seasons. No trends. Only the permanent pursuit of silence through silhouette.
                    </p>
                </div>
            </header>

            {/* Manifesto Section */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white text-black relative -mx-4 md:-mx-24 lg:-mx-[calc(6rem+96px)]">
                <div className="md:px-24">
                    <div className="flex items-center gap-6 mb-20">
                        <ArrowDownRight size={40} />
                        <h2 className="text-6xl md:text-8xl font-sans font-black tracking-tighter uppercase">Manifesto</h2>
                    </div>

                    <div className="space-y-0">
                        {MANIFESTO_ITEMS.map((item, index) => (
                            <m.div
                                key={item.number}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex items-baseline gap-8 md:gap-16 border-t border-black/10 py-10 hover:bg-black hover:text-white transition-colors duration-500 px-4 md:px-12 cursor-pointer"
                            >
                                <span className="font-mono text-sm opacity-40">0{index + 1}</span>
                                <span className="text-4xl md:text-7xl font-serif italic group-hover:pl-12 transition-all duration-500">{item.text}</span>
                            </m.div>
                        ))}
                        <div className="border-t border-black/10" />
                    </div>
                </div>
            </section>

            {/* Image & Stats Parallax */}
            <section className="py-40 relative flex flex-col md:flex-row gap-20 items-center justify-between px-6 md:px-12 lg:px-24">
                <div className="w-full md:w-1/2">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-24">
                        {STATS.map((stat) => (
                            <div key={stat.label}>
                                <h3 className="text-5xl md:text-7xl font-sans font-black mb-2">{stat.value}</h3>
                                <div className="h-px w-12 bg-white/20 mb-2" />
                                <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-40">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2 relative h-[60vh] md:h-[80vh] flex items-center justify-center">
                    <m.div
                        style={{ rotate }}
                        className="relative w-full h-full"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200&h=1600"
                            alt="Abstraction"
                            className="w-full h-full object-cover  mix-blend-screen"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200&h=1600"
                            alt="Concrete"
                            className="absolute top-1/4 -left-12 w-2/3 h-2/3 object-cover mix-blend-hard-light"
                        />
                    </m.div>
                </div>
            </section>

            <m.div style={{ x }} className="py-20 overflow-hidden whitespace-nowrap opacity-10 pointer-events-none select-none">
                <h2 className="text-[20vw] leading-none font-black font-sans uppercase">
                    Structure &mdash; Form &mdash; Void &mdash; Structure
                </h2>
            </m.div>
        </div>
    );
};

export default AboutPage;
