
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const isHighlighted = item.isHighlighted;
  const hasImage = !!item.image;

  // Determine current display values based on selection or defaults
  const currentVariation = item.variations ? item.variations[selectedVarIndex] : null;
  const price = currentVariation ? currentVariation.price : item.price;
  const weight = currentVariation ? currentVariation.weight : item.weight;

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
             <h3 className={`font-display font-bold text-lg leading-tight transition-colors ${isHighlighted ? 'text-white' : 'text-menu-text group-hover:text-white'}`}>
               {item.title}
               {item.isSpicy && (
                  <span className="inline-flex items-center justify-center ml-2 bg-menu-highlight text-white rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider align-middle shadow-[0_0_10px_rgba(214,64,69,0.5)]">
                    Hot
                  </span>
               )}
             </h3>
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

        {/* EXPANDABLE IMAGE SECTION */}
        <AnimatePresence>
          {showImage && hasImage && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }} // smooth ease-out-quart
              className="overflow-hidden rounded-xl mb-2"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/20 shadow-inner border border-white/5">
                {/* Loader Placeholder */}
                <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="relative z-10 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Inner Shadow overlay */}
                <div className="absolute inset-0 z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description */}
        {item.description && (
          <p className={`text-sm text-menu-muted/90 font-normal leading-relaxed my-3 ${hasImage ? 'pr-10' : ''}`}>
            {item.description}
          </p>
        )}

        {/* Interactive Variation Selector (Mobile Friendly) */}
        {item.variations && item.variations.length > 0 && (
          <div className="mt-auto pt-3 border-t border-white/5">
             {/* Label */}
             {item.variations[0].name && (
               <p className="text-[10px] uppercase tracking-widest text-menu-muted/60 mb-2 font-bold">Выберите опцию:</p>
             )}
             
             {/* Chips Scroll Container */}
             <div className={`flex flex-wrap gap-2 ${hasImage ? 'pr-10' : ''}`}>
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

      {/* FLOATING ACTION BUTTON FOR IMAGE (Bottom Right) */}
      {hasImage && (
        <button 
            onClick={(e) => {
                e.stopPropagation();
                setShowImage(!showImage);
            }}
            className={`
                absolute bottom-4 right-4 z-30
                flex items-center justify-center w-10 h-10 rounded-full 
                shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 transform active:scale-90
                ${showImage 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-menu-highlight text-white hover:brightness-110 shadow-[0_0_15px_rgba(214,64,69,0.4)]'
                }
            `}
        >
            {showImage ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                   <line x1="18" y1="6" x2="6" y2="18"></line>
                   <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                   <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                   <circle cx="12" cy="13" r="4"></circle>
                </svg>
            )}
            
            {/* Pulse Ring (only when closed) */}
            {!showImage && (
                <span className="absolute inset-0 rounded-full animate-ping bg-menu-highlight opacity-40 pointer-events-none"></span>
            )}
        </button>
      )}
    </div>
  );
};
