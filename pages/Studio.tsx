
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Layers, PenTool, Scissors, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PROCESS_STEPS = [
    {
        icon: <PenTool size={32} />,
        title: "Ideation",
        description: "Chaos before order. We begin with raw emotion and abstract concepts, sketching in the dark to find lines of light."
    },
    {
        icon: <Layers size={32} />,
        title: "Materiality",
        description: "Sourcing fabrics that challenge the skin. We look for friction, weight, and history in every thread."
    },
    {
        icon: <Scissors size={32} />,
        title: "Deconstruction",
        description: "Breaking traditional patterns. We cut, slash, and reassemble forms to create new silhouettes for the modern body."
    }
];

const TEAM_MEMBERS = [
    {
        name: "Alexei V.",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
        name: "Sasha K.",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
        name: "Ren M.",
        role: "Lead Architect",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=800"
    }
];

const StudioPage: React.FC = () => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <div className="min-h-screen bg-sand text-nero selection:bg-neon-red selection:text-white pt-24 pb-20 pl-24 overflow-hidden">
            <Helmet>
                <title>Avant | Studio 🦊</title>
                <meta name="description" content="Inside the Avant Atelier. Where form meets silence and materiality intersects with rebellion." />
            </Helmet>
            {/* Dynamic Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-neon-red origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="px-6 md:px-12 lg:px-24 min-h-[80vh] flex flex-col justify-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10"
                >
                    <span className="font-mono text-xs text-neon-red tracking-[0.5em] uppercase block mb-6">
                        The Laboratory
                    </span>
                    <h1 className="text-[12vw] leading-[0.8] font-serif font-black uppercase tracking-tighter mb-8">
                        ATELIER <span className="opacity-20 italic">AVANT</span>
                    </h1>
                    <p className="max-w-xl font-sans text-xl md:text-2xl font-light leading-relaxed border-l-2 border-nero pl-8 mb-12">
                        A space where silence is crafted into form. We operate at the intersection of architectural discipline and textile rebellion.
                    </p>
                    <div className="w-16 h-16 rounded-full border border-nero/20 flex items-center justify-center animate-bounce">
                        <ArrowDown size={24} />
                    </div>
                </motion.div>

                <div className="absolute right-0 top-20 w-1/2 h-full opacity-10 pointer-events-none select-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                    >
                        <Sparkles size={600} strokeWidth={0.5} />
                    </motion.div>
                </div>
            </section>

            {/* Image Parallax Section */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden my-20">
                <motion.div style={{ y, rotate }} className="absolute inset-0 scale-110">
                    <img
                        src="https://images.unsplash.com/photo-1596204561858-a90372f4405a?auto=format&fit=crop&q=80&w=2000&h=1200"
                        alt="Studio Workspace"
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-nero/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-[8vw] font-sans font-black text-off-white tracking-widest mix-blend-overlay uppercase">
                        Creation
                    </h2>
                </div>
            </section>

            {/* Process Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 bg-nero text-off-white mx-4 md:mx-12 lg:mx-20 rounded-lg shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    {PROCESS_STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="w-16 h-16 rounded-full bg-off-white/10 flex items-center justify-center mb-8 text-neon-red group-hover:bg-neon-red group-hover:text-off-white transition-all duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-3xl font-serif italic mb-4">{step.title}</h3>
                            <p className="font-sans text-sm opacity-60 leading-relaxed group-hover:opacity-90 transition-opacity">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="absolute top-0 right-0 p-40 opacity-5 pointer-events-none">
                    <span className="text-[20rem] font-serif leading-none">01</span>
                </div>
            </section>

            {/* Team Section */}
            <section className="px-6 md:px-12 lg:px-24 py-40">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tighter">
                        The <span className="text-neon-red">Architects</span>
                    </h2>
                    <p className="max-w-sm text-right font-mono text-xs uppercase tracking-widest opacity-60 pb-4">
                        The minds behind the silhouette. <br /> United by a vision of future form.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative cursor-pointer"
                        >
                            <div className="overflow-hidden aspect-[3/4] mb-6">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <h3 className="text-2xl font-bold uppercase tracking-wide">{member.name}</h3>
                            <span className="font-mono text-xs text-neon-red tracking-widest uppercase">{member.role}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer/Contact */}
            <footer className="text-center pb-20 pt-20 border-t border-nero/10 mx-12">
                <h2 className="text-[5vw] font-serif italic mb-8">Join the Process</h2>
                <button className="px-12 py-4 bg-nero text-off-white font-sans font-bold uppercase tracking-[0.2em] hover:bg-neon-red transition-colors duration-300">
                    Apply for Internship
                </button>
            </footer>
        </div>
    );
};

export default StudioPage;
