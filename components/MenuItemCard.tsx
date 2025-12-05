
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
  let bgClasses = '';
  let borderClasses = '';
  let titleClasses = '';
  let priceClasses = '';
  let textClasses = 'text-menu-muted/90';

  if (isChinese) {
    // Chinese Theme Styles
    bgClasses = 'bg-gradient-to-br from-[#1a0505] to-[#2c0b0b] shadow-[0_4px_20px_0_rgba(0,0,0,0.6)]';
    borderClasses = 'border-amber-900/40 group-hover:border-amber-700/60';
    titleClasses = 'text-amber-500/90 font-serif tracking-wide';
    priceClasses = 'text-amber-500';
    textClasses = 'text-amber-100/60 font-serif';
  } else if (isHighlighted) {
    // Highlighted Styles
    bgClasses = 'bg-[#1a0505]/95 shadow-[0_8px_32px_0_rgba(214,64,69,0.15)]';
    borderClasses = 'border-menu-highlight/40';
    titleClasses = 'text-white font-display font-bold';
    priceClasses = 'text-white';
  } else {
    // Default Styles
    bgClasses = 'bg-[#121212]/90 hover:bg-[#1a1a1a]/95 shadow-[0_4px_20px_0_rgba(0,0,0,0.4)]';
    borderClasses = 'border-white/5 group-hover:border-white/10';
    titleClasses = 'text-menu-text group-hover:text-white font-display font-bold';
    priceClasses = 'text-menu-highlight';
  }

  return (
    <div className={`
      relative group flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden isolate
      ${bgClasses}
    `}>
      {/* 3D Glass Border Effect */}
      <div className={`absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-300 ${borderClasses}`} />
      
      {/* Top Gloss/Reflection */}
      <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 ${isChinese ? 'hidden' : ''}`} />
      
      {/* Content Container */}
      <div className="p-5 flex flex-col h-full z-10 relative">
        
        {/* Header: Title, Controls and Main Price */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-col gap-1 flex-1">
             <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-lg leading-tight transition-colors ${titleClasses}`}>
                  {item.title}
                </h3>
                {item.isSpicy && (
                    <span className="inline-flex items-center justify-center bg-menu-highlight text-white rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider align-middle shadow-[0_0_10px_rgba(214,64,69,0.5)]">
                      Hot
                    </span>
                )}
                {strengthBadge && (
                    <span className={`inline-flex items-center justify-center rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider align-middle border border-white/5 ${strengthBadge.bg} ${strengthBadge.text}`}>
                      {strengthBadge.label}
                    </span>
                )}
             </div>
             {weight && <span className={`text-[10px] uppercase tracking-wider font-medium ${isChinese ? 'text-amber-500/50' : 'text-menu-muted'}`}>{weight}</span>}
          </div>

          <div className="flex items-center gap-3 shrink-0">
             {/* Price */}
             <AnimatePresence mode="wait">
                <motion.span 
                  key={price}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`font-display font-bold text-lg tracking-tight drop-shadow-sm ${priceClasses}`}
                >
                  {price} ₽
                </motion.span>
             </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className={`text-sm font-normal leading-relaxed my-3 ${textClasses}`}>
            {item.description}
          </p>
        )}

        {/* Interactive Variation Selector (Mobile Friendly) */}
        {/* Only show selector if there are MORE THAN 1 variation to choose from */}
        {item.variations && item.variations.length > 1 && (
          <div className={`mt-auto pt-3 border-t ${isChinese ? 'border-amber-900/20' : 'border-white/5'}`}>
             {/* Label */}
             {item.variations[0].name && (
               <p className={`text-[10px] uppercase tracking-widest mb-2 font-bold ${isChinese ? 'text-amber-700' : 'text-menu-muted/60'}`}>Выберите опцию:</p>
             )}
             
             {/* Chips Scroll Container */}
             <div className="flex flex-wrap gap-2">
               {item.variations.map((v, idx) => {
                 const isSelected = selectedVarIndex === idx;
                 
                 // Dynamic Chip Styles
                 let chipClasses = '';
                 if (isChinese) {
                    chipClasses = isSelected
                        ? 'bg-amber-900/80 text-amber-100 border-amber-700 shadow-[0_0_10px_rgba(180,83,9,0.3)]'
                        : 'bg-black/20 text-amber-700 border-amber-900/30';
                 } else {
                    chipClasses = isSelected 
                        ? 'bg-menu-highlight text-white border-menu-highlight shadow-[0_0_10px_rgba(214,64,69,0.3)]' 
                        : 'bg-white/5 text-menu-muted border-white/10 hover:bg-white/10 hover:text-white';
                 }

                 return (
                   <button
                     key={idx}
                     onClick={() => setSelectedVarIndex(idx)}
                     className={`
                       px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                       ${chipClasses}
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
