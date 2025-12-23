import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart: React.FC = () => {
  const { items, totalPrice, totalItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);

  // If items are 0 and cart is open, maybe close it, but let's leave user control
  // If items > 0, show FAB

  const handleCheckout = () => {
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setIsCartOpen(false);
    clearCart();
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isCartOpen && totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-menu-highlight text-white pl-4 pr-5 py-3 rounded-full shadow-[0_0_20px_rgba(214,64,69,0.5)] border border-white/10 backdrop-blur-md"
          >
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-white text-menu-highlight text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            </div>
            <span className="font-display font-bold text-lg">{totalPrice} ₽</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Modal / Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />

            {/* Slide Up Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-[#121212] border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:max-w-md md:left-auto md:right-0 md:h-full md:rounded-none md:border-l"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#121212] sticky top-0 z-10 rounded-t-3xl md:rounded-none">
                <h2 className="text-xl font-display font-bold text-white">Ваш заказ</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-menu-muted">
                    <svg className="w-12 h-12 mb-4 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-white text-sm">{item.title}</h3>
                          <span className="font-bold text-menu-highlight text-sm">{item.price * item.quantity} ₽</span>
                        </div>
                        {item.variationName && (
                          <p className="text-xs text-menu-muted mb-2">{item.variationName}</p>
                        )}
                        
                        <div className="flex items-center gap-3 mt-2">
                           <button 
                             onClick={() => updateQuantity(item.id, -1)}
                             className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors ${item.quantity === 1 ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-white/10 text-white bg-white/5'}`}
                           >
                             {item.quantity === 1 ? (
                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                             ) : (
                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                             )}
                           </button>
                           <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/10"
                           >
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                           </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Actions */}
              {items.length > 0 && (
                <div className="p-6 bg-[#121212] border-t border-white/5 space-y-4 sticky bottom-0 z-10 safe-area-bottom">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-menu-muted">Итого</span>
                    <span className="text-white text-xl">{totalPrice} ₽</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-menu-highlight hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(214,64,69,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Оформить заказ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-sm bg-white text-black p-0 overflow-hidden shadow-2xl rounded-sm"
              style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}
            >
                {/* Receipt Paper Edge Top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(circle,transparent_4px,white_4px)] bg-[length:16px_16px] -mt-2"></div>
                
                <div className="p-8 flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-1">DUNK</h2>
                    <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">Электронный чек</p>
                    
                    <div className="w-full border-t-2 border-dashed border-gray-300 my-2"></div>
                    
                    <div className="w-full space-y-3 font-mono text-sm my-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div className="flex gap-2">
                                    <span>{item.quantity}x</span>
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        {item.variationName && <span className="text-xs text-gray-500">{item.variationName}</span>}
                                    </div>
                                </div>
                                <span>{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="w-full border-t-2 border-dashed border-gray-300 my-2"></div>
                    
                    <div className="w-full flex justify-between font-bold text-xl mt-4">
                        <span>ИТОГО</span>
                        <span>{totalPrice} ₽</span>
                    </div>
                    
                    <div className="mt-10 text-center space-y-4 w-full">
                        <button 
                            onClick={handleCloseReceipt}
                            className="w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            Закрыть
                        </button>
                        <p className="text-[10px] text-gray-400 font-mono">
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Receipt Paper Edge Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[radial-gradient(circle,white_4px,transparent_4px)] bg-[length:16px_16px] -mb-2"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};