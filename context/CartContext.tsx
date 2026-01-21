
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
}

interface Notification {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
}

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    addToCart: (product: Product, size?: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    notifications: Notification[];
    addNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
    removeNotification: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const addToCart = (product: Product, size: string = 'medium') => {
        const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);

        if (existingItem) {
            addNotification(`Increased quantity of ${product.title}`);
            setCart(prev => prev.map(item =>
                item.id === product.id && item.selectedSize === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            addNotification(`Added ${product.title} to cart`);
            setCart(prev => [...prev, { ...product, quantity: 1, selectedSize: size }]);
        }

        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
        addNotification('Item removed from cart', 'info');
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
        addNotification('Cart cleared', 'info');
    };

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            notifications,
            addNotification,
            removeNotification
        }}>
            {children}
        </CartContext.Provider>
    );
};
