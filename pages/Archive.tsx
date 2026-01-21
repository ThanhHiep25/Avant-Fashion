
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Folder, Grid, List as ListIcon, Search, Eye } from 'lucide-react';

interface ArchiveItem {
    id: string;
    year: string;
    season: string;
    title: string;
    code: string;
    description: string;
    images: string[];
}

const ARCHIVE_DATA: ArchiveItem[] = [
    {
        id: '25-01',
        year: '2025',
        season: 'SS25',
        title: 'Concrete Garden',
        code: 'A-2025-01',
        description: 'Exploring the reclamation of urban spaces by organic forms. Structured tailoring meets fluid drapery.',
        images: [
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800&h=1000',
            'https://images.unsplash.com/photo-1534068590799-09895a701e3e?auto=format&fit=crop&q=80&w=800&h=1000'
        ]
    },
    {
        id: '24-02',
        year: '2024',
        season: 'FW24',
        title: 'Static Noise',
        code: 'A-2024-02',
        description: 'A study in disruption. Digital artifacts translated into knitwear patterns and distressed denim.',
        images: [
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800&h=1000',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800&h=1000'
        ]
    },
    {
        id: '23-01',
        year: '2023',
        season: 'SS23',
        title: 'Zero Point',
        code: 'A-2023-01',
        description: 'The beginning. Minimalist silhouettes focusing purely on the interaction between fabric and light.',
        images: [
            'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800&h=1000',
            'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800&h=1000'
        ]
    }
];

const ArchivePage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.document.title = "Avant | Archive 🦊";
        return () => {
            window.document.title = "AVANT | High-End Fashion";
        }
    }, [])

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const filteredArchive = ARCHIVE_DATA.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.year.includes(searchQuery)
    );

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-off-white text-nero pt-24 pb-20 md:pl-24 pl-14">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-nero origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Header */}
            <header className="px-6 md:px-12 lg:px-24 mb-20">
                <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:items-end justify-between border-b border-nero pb-8">
                    <div>
                        <span className="font-mono text-xs text-nero/60 tracking-[0.4em] uppercase block mb-4">
                            System Database
                        </span>
                        <h1 className="text-6xl md:text-8xl font-sans font-black tracking-tighter uppercase">
                            Archive
                        </h1>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nero/40 group-focus-within:text-nero transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE (CODE, YEAR)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border border-nero/20 rounded-full py-2 pl-10 pr-4 font-mono text-xs w-64 uppercase focus:outline-none focus:border-nero transition-all placeholder:text-nero/30"
                            />
                        </div>

                        <div className="flex gap-4 mb-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-nero text-off-white' : 'bg-transparent text-nero hover:bg-nero/10'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-nero text-off-white' : 'bg-transparent text-nero hover:bg-nero/10'}`}
                            >
                                <Grid size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="px-6 md:px-12 lg:px-24 min-h-[50vh]">
                <AnimatePresence mode='wait'>
                    {filteredArchive.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 opacity-40 font-mono text-sm uppercase tracking-widest"
                        >
                            <p>No records found.</p>
                        </motion.div>
                    ) : viewMode === 'list' ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="hidden md:grid grid-cols-12 gap-4 font-mono text-xs uppercase tracking-widest text-nero/40 border-b border-nero/10 pb-4 mb-4 select-none">
                                <div className="col-span-1">Year</div>
                                <div className="col-span-1">Season</div>
                                <div className="col-span-2">Code</div>
                                <div className="col-span-7">Title</div>
                                <div className="col-span-1 text-right">Access</div>
                            </div>

                            {filteredArchive.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="group relative"
                                >
                                    <div
                                        className={`grid grid-cols-12 gap-x-4 gap-y-2 items-center py-6 border-b border-nero/10 cursor-pointer hover:bg-nero hover:text-off-white transition-colors duration-300 px-4 -mx-4 ${expandedId === item.id ? 'bg-nero text-off-white' : ''}`}
                                        onClick={() => toggleExpand(item.id)}
                                    >
                                        <div className="col-span-3 md:col-span-1 font-mono">{item.year}</div>
                                        <div className="col-span-3 md:col-span-1 font-mono opacity-60">{item.season}</div>
                                        <div className="col-span-6 md:col-span-2 font-mono text-xs text-right md:text-left">{item.code}</div>
                                        <div className="col-span-12 md:col-span-7 font-serif italic text-2xl md:text-3xl mt-2 md:mt-0">{item.title}</div>
                                        <div className="col-span-12 md:col-span-1 flex justify-end mt-4 md:mt-0">
                                            <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedId === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-nero/5"
                                            >
                                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div>
                                                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 block mb-4">Description</span>
                                                        <p className="font-sans text-lg leading-relaxed">{item.description}</p>
                                                    </div>
                                                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                                        {item.images.map((img, i) => (
                                                            <div key={i} className="flex-shrink-0 relative group/img cursor-zoom-in">
                                                                <img src={img} alt={`${item.title} detail ${i + 1}`} className="h-40 md:h-60 object-cover  transition-all duration-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredArchive.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-4 shadow-sm border border-nero/5 cursor-pointer group flex flex-col h-full"
                                    onClick={() => {
                                        // In grid mode, expand just like list mode, or shift to list mode focused
                                        setViewMode('list');
                                        setExpandedId(item.id);
                                    }}
                                >
                                    <div className="aspect-square bg-nero/5 mb-4 overflow-hidden relative group-hover:shadow-inner transition-all">
                                        <div className="absolute inset-0 bg-nero/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                            <span className="bg-nero text-off-white px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                                <Eye size={12} /> Inspect
                                            </span>
                                        </div>
                                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                        <div className="absolute top-2 right-2 bg-off-white z-20 px-2 py-1 font-mono text-[10px] border border-nero/10">{item.year}</div>
                                    </div>
                                    <div className="mt-auto flex justify-between items-end">
                                        <div>
                                            <h3 className="font-serif italic text-2xl mb-1 group-hover:text-neon-red transition-colors">{item.title}</h3>
                                            <span className="font-mono text-xs opacity-40 uppercase tracking-widest block">{item.code}</span>
                                        </div>
                                        <Folder size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="mt-32 px-6 md:px-12 lg:px-24">
                <div className="border-t border-nero pt-8 flex flex-col md:flex-row justify-between items-center opacity-40 font-mono text-xs uppercase tracking-widest gap-4 md:gap-0">
                    <span>Database Status: <span className="text-green-600">Online</span></span>
                    <span>Last Update: 2026.10.24</span>
                </div>
            </footer>
        </div>
    );
};

export default ArchivePage;
