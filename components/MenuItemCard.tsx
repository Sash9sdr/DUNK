
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
    cardStyles = 'bg-menu-card border border-white/5 shadow-2xl overflow-hidden';
    titleClasses = 'text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-none uppercase';
    priceClasses = 'text-3xl sm:text-4xl font-display font-bold text-menu-highlight tracking-tight';
    textClasses = 'text-white/80 text-sm sm:text-base leading-relaxed font-normal';
  } else if (item.isHighlighted) {
    cardStyles = 'bg-menu-surface/80 border border-menu-highlight/30 shadow-lg shadow-menu-highlight/5';
    titleClasses = 'text-white font-display font-semibold tracking-tight';
    priceClasses = 'text-white font-display font-semibold';
  } else {
    cardStyles = 'bg-menu-card/50 border border-white/5 hover:bg-menu-card hover:border-white/10';
    titleClasses = 'text-menu-text font-display font-medium tracking-tight';
    priceClasses = 'text-menu-highlight font-display font-semibold';
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-3xl ${cardStyles} min-h-[500px] max-w-2xl mx-auto group mb-8 flex flex-col transform-gpu will-change-transform`}
      >
        <div className="absolute inset-0 z-0 bg-menu-bg">
          <div className="w-full h-full relative overflow-hidden">
            {/* Aspect ratio box for image stability */}
            <div className="relative pt-[100%] sm:pt-[80%]">
               <img 
                 src={item.image} 
                 alt={item.title}
                 loading="lazy"
                 decoding="async"
                 className="absolute inset-0 w-full h-full object-cover object-center z-10 transform-gpu will-change-transform group-hover:scale-105 transition-transform duration-700 ease-out"
               />
            </div>
          </div>

          {/* Compressed Gradient Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-menu-bg via-menu-bg/80 via-[40%] to-transparent pointer-events-none" />
        </div>

        <div className="mt-auto relative z-30 p-6 sm:p-10 bg-gradient-to-t from-menu-bg via-menu-bg/90 to-transparent">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className="px-2.5 py-1 rounded-md bg-menu-highlight/10 text-menu-highlight text-[9px] font-bold uppercase tracking-widest border border-menu-highlight/20">
                   Specialty
                 </span>
                 {strengthBadge && (
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border border-white/5 ${strengthBadge.bg} ${strengthBadge.text}`}>
                      {strengthBadge.label}
                    </span>
                 )}
              </div>
              <h3 className={titleClasses}>{item.title}</h3>
            </div>

            <div className="max-w-md">
               {renderDescription(item.description || '')}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium mb-1">Dunk Signature</span>
                  <span className={priceClasses}>{price} ₽</span>
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
                    <span className="bg-menu-highlight/20 text-menu-highlight border border-menu-highlight/20 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      Hot
                    </span>
                )}
             </div>
             {weight && <span className="text-[10px] uppercase tracking-widest font-medium text-menu-muted/60">{weight}</span>}
          </div>
          <div className="flex flex-col items-end shrink-0">
             <span className={`text-lg ${priceClasses}`}>
                {price} ₽
             </span>
          </div>
        </div>
        {item.description && (
          <div className="flex-grow">
            <p className={`text-sm leading-relaxed my-2 font-normal ${textClasses}`}>
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
                 className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${selectedVarIndex === idx ? 'bg-menu-highlight/20 text-menu-highlight border-menu-highlight/30 shadow-[0_0_10px_rgba(255,0,51,0.1)]' : 'bg-menu-surface/50 text-menu-muted border-white/5 hover:bg-menu-surface hover:text-white'}`}
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
