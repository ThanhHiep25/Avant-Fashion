
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Notifications: React.FC = () => {
    const { notifications, removeNotification } = useCart();

    return (
        <div className="fixed top-24 right-6 z-[200] flex flex-col gap-4 pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        layout
                        className="pointer-events-auto min-w-[300px] bg-nero/90 backdrop-blur-md text-off-white p-4 shadow-2xl flex items-start gap-3 border border-off-white/10"
                    >
                        {notification.type === 'success' && <CheckCircle className="text-neon-green shrink-0" size={20} />}
                        {notification.type === 'info' && <Info className="text-accent shrink-0" size={20} />}
                        {notification.type === 'error' && <AlertCircle className="text-neon-red shrink-0" size={20} />}

                        <div className="flex-1 pt-[2px]">
                            <p className="font-mono text-xs uppercase tracking-wider">{notification.message}</p>
                        </div>

                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-off-white/40 hover:text-off-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
