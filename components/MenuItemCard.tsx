import React, { useState } from 'react';
import { MenuItem } from '../types';
import { motion } from 'framer-motion';

interface MenuItemCardProps {
  item: MenuItem;
  specialTheme?: 'chinese';
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, specialTheme }) => {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  
  const isChinese = specialTheme === 'chinese';
  const hasImage = !!item.image;

  const currentVariation = item.variations ? item.variations[selectedVarIndex] : null;
  const price = currentVariation ? currentVariation.price : item.price;
  const weight = currentVariation ? currentVariation.weight : item.weight;

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

  let cardStyles = '';
  let titleClasses = '';
  let priceClasses = '';
  let textClasses = 'text-menu-muted/90';

  if (isChinese) {
    cardStyles = 'bg-gradient-to-br from-[#1a0505] to-[#2c0b0b] border border-amber-900/40';
    titleClasses = 'text-amber-500/90 font-serif tracking-wide';
    priceClasses = 'text-amber-500';
    textClasses = 'text-amber-100/60 font-serif';
  } else if (hasImage) {
    cardStyles = 'bg-black border border-white/10 shadow-2xl overflow-hidden';
    titleClasses = 'text-3xl sm:text-4xl font-display font-black text-white tracking-tighter leading-none uppercase drop-shadow-2xl';
    priceClasses = 'text-3xl sm:text-4xl font-black text-green-500 tracking-tighter italic';
    textClasses = 'text-white/80 text-sm sm:text-base leading-relaxed font-medium';
  } else if (item.isHighlighted) {
    cardStyles = 'bg-[#1a0505]/95 border border-menu-highlight/40 shadow-xl';
    titleClasses = 'text-white font-display font-bold';
    priceClasses = 'text-white';
  } else {
    cardStyles = 'bg-menu-card border border-white/5 hover:border-white/10';
    titleClasses = 'text-menu-text font-display font-bold';
    priceClasses = 'text-menu-highlight';
  }

  const renderDescription = (desc: string) => {
    return desc.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className={`${hasImage ? 'text-sm sm:text-base' : 'text-sm'} leading-relaxed my-0.5 ${textClasses}`}>
        {paragraph}
      </p>
    ));
  };

  if (hasImage) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[3rem] ${cardStyles} min-h-[650px] max-w-2xl mx-auto group mb-12 flex flex-col transform-gpu`}
      >
        <div className="absolute inset-0 z-0 bg-[#050505]">
          <motion.div
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full relative"
          >
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[30%] bg-green-500/5 blur-[120px] rounded-full opacity-40 pointer-events-none" />
            
            <img 
              src={item.image} 
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="w-full h-[92%] object-contain object-top pt-6 z-10 relative px-4 sm:px-12 transform-gpu will-change-transform"
            />
          </motion.div>

          {/* Optimized 20% Gradient Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/95 via-black/10 via-[22%] to-transparent pointer-events-none" />
        </div>

        <div className="mt-auto relative z-30 p-8 sm:p-12 pb-10 sm:pb-12">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                 <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-[0.3em] border border-green-500/30">
                   House Special
                 </span>
                 {strengthBadge && (
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] border border-white/5 ${strengthBadge.bg} ${strengthBadge.text}`}>
                      {strengthBadge.label}
                    </span>
                 )}
              </div>
              <h3 className={titleClasses}>{item.title}</h3>
            </div>

            <div className="max-w-md drop-shadow-xl">
               {renderDescription(item.description || '')}
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-white/20 text-[8px] uppercase tracking-widest font-black mb-1">Signature Selection</span>
                  <span className={priceClasses}>{price} ₽</span>
               </div>
               
               <div className="hidden sm:block">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden isolate transform-gpu ${cardStyles}`}>
      <div className="p-5 flex flex-col h-full z-10 relative">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-col gap-1 flex-1">
             <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-lg leading-tight ${titleClasses}`}>
                  {item.title}
                </h3>
                {item.isSpicy && (
                    <span className="bg-red-600 text-white rounded-full px-2 py-[2px] text-[9px] font-black uppercase tracking-tighter">
                      Hot
                    </span>
                )}
             </div>
             {weight && <span className="text-[10px] uppercase tracking-widest font-bold text-menu-muted/60">{weight}</span>}
          </div>
          <div className="flex flex-col items-end shrink-0">
             <span className={`font-display font-black text-lg tracking-tight ${priceClasses}`}>
                {price} ₽
             </span>
          </div>
        </div>
        {item.description && (
          <div className="flex-grow">
            <p className={`text-sm leading-relaxed my-3 font-medium ${textClasses}`}>
              {item.description}
            </p>
          </div>
        )}
        {item.variations && item.variations.length > 1 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
             {item.variations.map((v, idx) => (
               <button
                 key={idx}
                 onClick={() => setSelectedVarIndex(idx)}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedVarIndex === idx ? 'bg-menu-highlight text-white border-menu-highlight' : 'bg-white/5 text-menu-muted border-white/5 hover:bg-white/10'}`}
               >
                 {v.name || 'Default'}
               </button>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};