import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem, MenuVariation } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, variation?: MenuVariation) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem, variation?: MenuVariation) => {
    // Determine price and weight based on whether a variation is selected
    const priceRaw = variation ? variation.price : item.price;
    const price = typeof priceRaw === 'string' 
      ? parseInt(priceRaw.replace(/\s/g, ''), 10) 
      : (priceRaw || 0);
    
    const weight = variation ? variation.weight : item.weight;
    const variationName = variation ? variation.name : undefined;

    // Create a unique ID for the cart item
    const cartId = `${item.title}-${variationName || 'default'}`;

    setItems(prev => {
      const existing = prev.find(i => i.id === cartId);
      if (existing) {
        return prev.map(i => 
          i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, {
        id: cartId,
        title: item.title,
        price,
        quantity: 1,
        variationName,
        weight
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};