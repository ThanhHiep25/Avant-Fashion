
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Clock, Hash } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Article {
    id: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    author: string;
}

const ARTICLES: Article[] = [
    {
        id: '01',
        title: 'Brutalist Silence',
        category: 'Architecture',
        date: 'OCT 24, 2026',
        excerpt: 'Exploring the quiet power of concrete in modern fashion narratives. How structure dictates emotion in the void of the metropolis.',
        image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=1600&h=1200',
        author: 'Elena V.'
    },
    {
        id: '02',
        title: 'Synthetic Nature',
        category: 'Materiality',
        date: 'NOV 02, 2026',
        excerpt: 'When organic textures meet digital fabrication. The intersection of grown materials and 3D printed structures.',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600&h=1200',
        author: 'Marcus K.'
    },
    {
        id: '03',
        title: 'The Void Gaze',
        category: 'Philosophy',
        date: 'DEC 15, 2026',
        excerpt: 'Analyzing the anti-aesthetic movement in the post-internet era. Why we are drawn to the absence of color.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600&h=1200',
        author: 'Sarah J.'
    },
    {
        id: '04',
        title: 'Analog Future',
        category: 'Technology',
        date: 'JAN 08, 2027',
        excerpt: 'Returning to tactile interfaces in a world of touchscreens. The resurgence of physical switches and dials.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600&h=1200',
        author: 'David L.'
    }
];

const JournalItem: React.FC<{ article: Article; index: number }> = ({ article, index }) => {
    const isEven = index % 2 === 0;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });



    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 mb-32 items-center`}
        >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                <motion.div style={{ y }} className="w-full aspect-[4/5] overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>

                <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-off-white text-nero p-4 rounded-full">
                        <ArrowUpRight size={24} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right text-left items-start'}`}>
                <div className="flex items-center gap-4 mb-6 opacity-60">
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                        <Hash size={12} /> {article.category}
                    </span>
                    <span className="w-1 h-1 bg-off-white rounded-full" />
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-off-white">
                        <Clock size={12} /> {article.date}
                    </span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black italic tracking-tighter mb-8 leading-[0.9] group-hover:text-transparent group-hover:stroke-text-white transition-all duration-500 cursor-pointer">
                    {article.title}
                </h2>

                <div className={`w-20 h-px bg-accent mb-8 ${isEven ? 'origin-left' : 'origin-right'} scale-x-50 group-hover:scale-x-100 transition-transform duration-500`} />

                <p className="font-sans text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-md mb-8">
                    {article.excerpt}
                </p>

                <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-40">
                    Written by {article.author}
                </div>
            </div>
        </motion.div>
    );
}

const JournalPage: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen bg-nero text-off-white selection:bg-accent selection:text-white pt-32 pb-20 md:pl-24 pl-14">
            <Helmet>
                <title>Avant | Journal 🦊</title>
                <meta name="description" content="Read the Avant Journal. Essays on brutalist silence, synthetic nature, and the void gaze." />
            </Helmet>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Header */}
            <header className="px-6 md:px-12 lg:px-24 mb-32 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-mono text-xs text-accent tracking-[0.5em] uppercase block mb-4 ml-1">
                        Editorial
                    </span>
                    <h1 className="text-[12vw] leading-none font-serif font-black uppercase tracking-tighter mix-blend-difference mb-12">
                        The Journal
                    </h1>
                    <div className="w-full h-px bg-off-white/10" />
                </motion.div>

                {/* Decorative big text */}
                <div className="absolute top-0 right-0 -z-10 opacity-[0.03] select-none pointer-events-none overflow-hidden">
                    <span className="text-[30vw] font-black font-sans leading-none tracking-tighter whitespace-nowrap">
                        NEWS
                    </span>
                </div>
            </header>

            {/* Articles List */}
            <main className="px-6 md:px-12 lg:px-24">
                {ARTICLES.map((article, index) => (
                    <JournalItem key={article.id} article={article} index={index} />
                ))}
            </main>

            {/* Footer */}
            <footer className="text-center mt-32 border-t border-off-white/5 pt-20">
                <div className="inline-block relative group cursor-pointer">
                    <p className="font-serif italic text-4xl md:text-6xl text-off-white/40 group-hover:text-off-white transition-colors duration-500">
                        View Archive
                    </p>
                    <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
                </div>
            </footer>
        </div>
    );
};

export default JournalPage;
