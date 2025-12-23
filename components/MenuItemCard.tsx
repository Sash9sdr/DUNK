
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemCardProps {
  item: MenuItem;
  specialTheme?: 'chinese';
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, specialTheme }) => {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  
  const isHighlighted = item.isHighlighted;
  const isChinese = specialTheme === 'chinese';
  const hasImage = !!item.image;

  // Determine current display values based on selection or defaults
  const currentVariation = item.variations ? item.variations[selectedVarIndex] : null;
  const price = currentVariation ? currentVariation.price : item.price;
  const weight = currentVariation ? currentVariation.weight : item.weight;

  // Helper to get strength badge config
  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'light':
        return { label: 'Лёгкий', bg: 'bg-emerald-500/20', text: 'text-emerald-300' };
      case 'medium':
        return { label: 'Средний', bg: 'bg-amber-500/20', text: 'text-amber-300' };
      case 'strong':
        return { label: 'Крепкий', bg: 'bg-red-500/20', text: 'text-red-300' };
      default:
        return null;
    }
  };

  const strengthBadge = item.alcoholStrength ? getStrengthBadge(item.alcoholStrength) : null;

  // Dynamic Styles based on theme
  let cardStyles = '';
  let titleClasses = '';
  let priceClasses = '';
  let textClasses = 'text-menu-muted/90';

  if (isChinese) {
    cardStyles = 'bg-gradient-to-br from-[#1a0505] to-[#2c0b0b] border border-amber-900/40 shadow-2xl';
    titleClasses = 'text-amber-500/90 font-serif tracking-wide';
    priceClasses = 'text-amber-500';
    textClasses = 'text-amber-100/60 font-serif';
  } else if (hasImage) {
    // Cinematic Feature Layout for Special items
    cardStyles = 'bg-black border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,1)] overflow-hidden';
    titleClasses = 'text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-none uppercase drop-shadow-xl';
    priceClasses = 'text-3xl sm:text-4xl font-black text-green-500 tracking-tighter italic drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]';
    textClasses = 'text-white/80 text-sm sm:text-base leading-relaxed';
  } else if (isHighlighted) {
    cardStyles = 'bg-[#1a0505]/95 border border-menu-highlight/40 shadow-xl';
    titleClasses = 'text-white font-display font-bold';
    priceClasses = 'text-white';
  } else {
    cardStyles = 'bg-menu-card border border-white/5 hover:border-white/10 shadow-lg';
    titleClasses = 'text-menu-text font-display font-bold';
    priceClasses = 'text-menu-highlight';
  }

  const renderDescription = (desc: string) => {
    const paragraphs = desc.split('\n\n');
    return paragraphs.map((paragraph, idx) => (
      <p key={idx} className={`${hasImage ? 'text-sm sm:text-base' : 'text-sm'} leading-relaxed my-0.5 ${textClasses}`}>
        {paragraph}
      </p>
    ));
  };

  if (hasImage) {
    // RENDER SPECIAL FEATURE ITEM (MAXIMIZED PHOTO & LOWERED TEXT)
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-[3rem] ${cardStyles} min-h-[680px] max-w-2xl mx-auto group mb-12 flex flex-col`}
      >
        {/* PHOTOGRAPH SECTION - DOMINANT */}
        <div className="absolute inset-0 z-0 bg-black">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Subtle light spill for depth */}
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[40%] bg-green-500/5 blur-[100px] rounded-full pointer-events-none opacity-50" />
            
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-[90%] object-contain object-top pt-8 transform transition-transform duration-1200 z-10 relative px-4 sm:px-8"
            />
          </motion.div>

          {/* COMPRESSED GRADIENT OVERLAY - Only bottom 20-25% */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/90 via-black/20 via-[20%] to-transparent pointer-events-none" />
        </div>

        {/* TEXT CONTENT - PUSHED TO EXTREME BOTTOM */}
        <div className="mt-auto relative z-30 p-8 sm:p-12 pb-8 sm:pb-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                 <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-[0.25em] border border-green-500/40">
                   Specialty
                 </span>
                 {strengthBadge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-[0.25em] border border-white/10 ${strengthBadge.bg} ${strengthBadge.text}`}>
                      {strengthBadge.label}
                    </span>
                 )}
              </div>
              <h3 className={titleClasses}>{item.title}</h3>
            </div>

            <div className="max-w-md drop-shadow-lg">
               {renderDescription(item.description || '')}
            </div>

            <div className="pt-4 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-white/20 text-[8px] uppercase tracking-widest font-bold mb-0.5">Premium Cocktails</span>
                  <span className={priceClasses}>{price} ₽</span>
               </div>
               
               {/* Decorative subtle pulse */}
               <motion.div 
                 animate={{ opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="hidden sm:block text-white/10"
               >
                  <div className="w-12 h-12 border border-current rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-current rounded-full" />
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // RENDER STANDARD ITEM
  return (
    <div className={`relative group flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden isolate ${cardStyles}`}>
      <div className="absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-300 border-white/5" />
      <div className="p-5 flex flex-col h-full z-10 relative">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-col gap-1 flex-1">
             <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-lg leading-tight transition-colors ${titleClasses}`}>
                  {item.title}
                </h3>
                {item.isSpicy && (
                    <span className="inline-flex items-center justify-center bg-menu-highlight text-white rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider align-middle">
                      Hot
                    </span>
                )}
             </div>
             {weight && <span className={`text-[10px] uppercase tracking-wider font-medium text-menu-muted`}>{weight}</span>}
          </div>
          <div className="flex flex-col items-end shrink-0">
             <span className={`font-display font-bold text-lg tracking-tight drop-shadow-sm ${priceClasses}`}>
                {price} ₽
             </span>
          </div>
        </div>
        {item.description && (
          <div className="flex-grow">
            <p className={`text-sm leading-relaxed my-3 ${textClasses}`}>
              {item.description}
            </p>
          </div>
        )}
        {item.variations && item.variations.length > 1 && (
          <div className="mt-auto pt-3 border-t border-white/5">
             <div className="flex flex-wrap gap-2">
               {item.variations.map((v, idx) => {
                 const isSelected = selectedVarIndex === idx;
                 return (
                   <button
                     key={idx}
                     onClick={() => setSelectedVarIndex(idx)}
                     className={`
                       px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                       ${isSelected ? 'bg-menu-highlight text-white border-menu-highlight' : 'bg-white/5 text-menu-muted border-white/10'}
                     `}
                   >
                     {v.name || 'Стандарт'}
                   </button>
                 );
               })}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
