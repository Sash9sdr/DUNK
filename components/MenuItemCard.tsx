import React, { useState } from 'react';
import { MenuItem } from '../types';
import { motion } from 'framer-motion';

interface MenuItemCardProps {
  item: MenuItem;
  specialTheme?: 'chinese';
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, specialTheme }) => {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [selectedNoodle, setSelectedNoodle] = useState<'гречневая' | 'удон'>('удон');
  
  const isChinese = specialTheme === 'chinese';
  const hasImage = !!item.image;

  const currentVariation = item.variations ? item.variations[selectedVarIndex] : null;
  const price = currentVariation ? currentVariation.price : item.price;
  const weight = currentVariation ? currentVariation.weight : item.weight;
  const description = currentVariation && currentVariation.description ? currentVariation.description : item.description;

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'light':
        return { label: 'Лёгкий', bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-300' };
      case 'medium':
        return { label: 'Средний', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-300' };
      case 'strong':
        return { label: 'Крепкий', bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-300' };
      default:
        return null;
    }
  };

  const strengthBadge = item.alcoholStrength ? getStrengthBadge(item.alcoholStrength) : null;

  let cardStyles = '';
  let titleClasses = '';
  let priceClasses = '';
  let textClasses = '';

  if (isChinese) {
    cardStyles = 'bg-gradient-to-br from-[#180606]/90 via-[#0a0101]/95 to-[#1c0808]/90 border border-amber-900/30 border-t-amber-500/20';
    titleClasses = 'text-amber-500 font-serif tracking-[0.05em] font-medium';
    priceClasses = 'text-amber-400 font-serif font-medium';
    textClasses = 'text-amber-100/60 font-serif text-[13px] leading-relaxed';
  } else if (hasImage) {
    // Elegant floating look lookbook format for special dishes
    cardStyles = 'bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden';
    titleClasses = 'text-2xl sm:text-3.5xl font-display font-medium text-white tracking-wide uppercase';
    priceClasses = 'text-2xl sm:text-3xl font-display font-medium text-menu-highlight';
    textClasses = 'text-white/60 text-sm leading-relaxed font-light';
  } else if (item.isHighlighted) {
    // Beautiful glossy hot pink/red outline reflecting glass
    cardStyles = 'bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent border border-menu-highlight/40 border-t-menu-highlight/60 border-b-white/[0.02] shadow-[0_4px_30px_rgba(var(--highlight-rgb),0.04)]';
    titleClasses = 'text-white font-display font-semibold tracking-wide text-lg';
    priceClasses = 'text-menu-highlight font-display font-semibold text-lg';
    textClasses = 'text-white/70 font-light text-sm leading-relaxed';
  } else {
    // Sandmatted frosted glass style
    cardStyles = 'bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.01] border border-white/10 border-t-white/15 border-b-white/[0.02] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]';
    titleClasses = 'text-white/95 font-display font-medium tracking-wide text-lg';
    priceClasses = 'text-menu-highlight font-display font-medium text-lg';
    textClasses = 'text-white/60 font-light text-sm leading-relaxed';
  }

  const renderDescription = (desc: string) => {
    return desc.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className={`${hasImage ? 'text-xs sm:text-sm' : 'text-sm'} leading-relaxed my-0.5 ${textClasses}`}>
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-[24px] ${cardStyles} min-h-[480px] max-w-2xl mx-auto group mb-8 flex flex-col transform-gpu will-change-transform shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-shadow duration-500`}
      >
        <div className="absolute inset-0 z-0 bg-menu-bg">
          <div className="w-full h-full relative overflow-hidden">
            <div className="relative pt-[100%] sm:pt-[70%]">
               <img 
                 src={item.image} 
                 alt={item.title}
                 loading="lazy"
                 decoding="async"
                 className="absolute inset-0 w-full h-full object-cover object-center z-10 transform-gpu will-change-transform group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
               />
            </div>
          </div>
          {/* Sinks the image nicely in the dark atmosphere */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />
        </div>

        {/* Floating Specular Glass Info Tray on top of visual */}
        <div className="mt-auto relative z-30 m-4 sm:m-6 p-5 sm:p-8 bg-black/45 backdrop-blur-2xl border border-white/[0.08] rounded-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                 <span className="px-2 py-0.5 rounded-full bg-menu-highlight/15 text-menu-highlight text-[8px] font-bold uppercase tracking-widest border border-menu-highlight/20 shadow-[0_0_8px_rgba(255,0,51,0.1)]">
                   ШедеврDunk
                 </span>
                 {strengthBadge && (
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${strengthBadge.bg} ${strengthBadge.text}`}>
                      {strengthBadge.label}
                    </span>
                 )}
              </div>
              <h3 className={titleClasses}>{item.title}</h3>
            </div>

            <div className="max-w-md">
               {renderDescription(description || '')}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-white/30 text-[9px] uppercase tracking-widest font-semibold mb-0.5">Dunk Signature</span>
                  <span className={priceClasses}>{price} ₽</span>
               </div>
            </div>
          </div>
        </div>

        {/* Sleek specular light sheen sliding on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none z-40" />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col h-full rounded-[20px] transition-all duration-300 overflow-hidden isolate transform-gpu group hover:translate-y-[-4px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${cardStyles}`}
    >
      <div className="p-5 sm:p-6 flex flex-col h-full z-10 relative">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex flex-col gap-0.5 flex-1">
             <div className="flex flex-wrap items-center gap-1.5">
                <h3 className={`text-base sm:text-lg leading-snug font-medium tracking-wide ${titleClasses}`}>
                  {item.title}
                </h3>
                {item.isSpicy && (
                    <span className="bg-menu-highlight/15 text-menu-highlight border border-menu-highlight/25 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider shadow-[0_0_6px_rgba(255,0,51,0.15)]">
                      Spicy
                    </span>
                )}
                {item.isHighlighted && !isChinese && (
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider">
                      Popular
                    </span>
                )}
             </div>
             {weight && <span className="text-[10px] uppercase tracking-widest font-medium text-white/30">{weight}</span>}
          </div>
          <div className="flex flex-col items-end shrink-0">
             <span className={`text-base sm:text-lg font-medium ${priceClasses}`}>
                {price} ₽
             </span>
          </div>
        </div>

        {description && (
          <div className="flex-grow my-1.5">
            <p className={textClasses}>
              {description}
            </p>
          </div>
        )}

        {item.variations && item.variations.length > 1 && (
          <div className="mt-4 pt-3 border-t border-white/[0.03] flex flex-wrap gap-1.5">
             {item.variations.map((v, idx) => (
               <button
                 key={idx}
                 onClick={() => setSelectedVarIndex(idx)}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition-all border ${
                   selectedVarIndex === idx 
                     ? 'bg-menu-highlight/15 text-white border-menu-highlight/35 shadow-[0_0_8px_rgba(255,0,51,0.12)]' 
                     : 'bg-white/[0.02] text-white/50 border-white/5 hover:bg-white/[0.05] hover:text-white'
                 }`}
               >
                 {v.name || 'Default'}
               </button>
             ))}
          </div>
        )}

        {item.title === 'Пад тай' && (
          <div className="mt-3 pt-3 border-t border-white/[0.03]">
            <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1.5 font-semibold">Вариант лапши</span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {['гречневая', 'удон'].map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNoodle(n as 'гречневая' | 'удон')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all border ${
                    selectedNoodle === n
                      ? 'bg-menu-highlight/15 text-white border-menu-highlight/35 shadow-[0_0_8px_rgba(255,0,51,0.12)]'
                      : 'bg-white/[0.02] text-white/40 border-white/5 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {n === 'удон' ? 'Пшеничная Удон 🍜' : 'Гречневая Соба 🌾'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sleek specular light sheen sliding on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none z-0" />
    </motion.div>
  );
};
