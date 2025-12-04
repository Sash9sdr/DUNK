
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  // Removed image state logic
  
  const isHighlighted = item.isHighlighted;

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

  return (
    <div className={`
      relative group flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden isolate
      /* OPTIMIZATION: Removed backdrop-blur-md to prevent lag on phones. Used solid transparent color instead. */
      ${isHighlighted 
        ? 'bg-[#1a0505]/95 shadow-[0_8px_32px_0_rgba(214,64,69,0.15)]' 
        : 'bg-[#121212]/90 hover:bg-[#1a1a1a]/95 shadow-[0_4px_20px_0_rgba(0,0,0,0.4)]'
      }
    `}>
      {/* 3D Glass Border Effect */}
      <div className={`absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-300
        ${isHighlighted ? 'border-menu-highlight/40' : 'border-white/5 group-hover:border-white/10'}
      `} />
      
      {/* Top Gloss/Reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      
      {/* Content Container */}
      <div className="p-5 flex flex-col h-full z-10 relative">
        
        {/* Header: Title, Controls and Main Price */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-col gap-1 flex-1">
             <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-display font-bold text-lg leading-tight transition-colors ${isHighlighted ? 'text-white' : 'text-menu-text group-hover:text-white'}`}>
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
             {weight && <span className="text-[10px] text-menu-muted uppercase tracking-wider font-medium">{weight}</span>}
          </div>

          <div className="flex items-center gap-3 shrink-0">
             {/* Price */}
             <AnimatePresence mode="wait">
                <motion.span 
                  key={price}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`font-display font-bold text-lg tracking-tight drop-shadow-sm ${isHighlighted ? 'text-white' : 'text-menu-highlight'}`}
                >
                  {price} ₽
                </motion.span>
             </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-menu-muted/90 font-normal leading-relaxed my-3">
            {item.description}
          </p>
        )}

        {/* Interactive Variation Selector (Mobile Friendly) */}
        {/* Only show selector if there are MORE THAN 1 variation to choose from */}
        {item.variations && item.variations.length > 1 && (
          <div className="mt-auto pt-3 border-t border-white/5">
             {/* Label */}
             {item.variations[0].name && (
               <p className="text-[10px] uppercase tracking-widest text-menu-muted/60 mb-2 font-bold">Выберите опцию:</p>
             )}
             
             {/* Chips Scroll Container */}
             <div className="flex flex-wrap gap-2">
               {item.variations.map((v, idx) => {
                 const isSelected = selectedVarIndex === idx;
                 return (
                   <button
                     key={idx}
                     onClick={() => setSelectedVarIndex(idx)}
                     className={`
                       px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                       ${isSelected 
                         ? 'bg-menu-highlight text-white border-menu-highlight shadow-[0_0_10px_rgba(214,64,69,0.3)]' 
                         : 'bg-white/5 text-menu-muted border-white/10 hover:bg-white/10 hover:text-white'
                       }
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
