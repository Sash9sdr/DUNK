
import React from 'react';
import { MenuSectionData } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { motion, Variants } from 'framer-motion';

interface MenuSectionProps {
  section: MenuSectionData;
  index: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const MenuSection: React.FC<MenuSectionProps> = ({ section, index }) => {
  const isChineseTheme = section.id === 'kitay-chay';
  const isSpecialSection = section.id === 'special-cocktails';

  return (
    <motion.section 
      id={section.id} 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative ${isChineseTheme ? 'py-6 px-2 rounded-2xl bg-gradient-to-b from-[#1c0808] to-transparent border border-red-900/30' : ''} ${isSpecialSection ? 'mb-20' : ''}`}
    >
      <div className="mb-6 flex items-center gap-4 pt-4">
        {isChineseTheme ? (
          <>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-amber-700/50"></div>
            <h2 className="text-2xl font-serif font-medium text-amber-500 tracking-widest uppercase px-4 border-x border-amber-900/30">
              {section.title}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-amber-700/50"></div>
          </>
        ) : (
          <>
            <h2 className={`text-2xl sm:text-3xl font-display font-medium tracking-[0.1em] uppercase ${isSpecialSection ? 'text-menu-highlight' : 'text-white'}`}>
              {section.title}
            </h2>
            <div className={`h-px flex-grow bg-gradient-to-r from-menu-highlight/40 to-transparent`}></div>
          </>
        )}
      </div>

      {section.note && (
        <div className={`
          mb-6 p-4 rounded-xl text-sm leading-relaxed border
          ${isChineseTheme 
            ? 'bg-[#2a0e0e]/50 border-amber-900/30 text-amber-100/70 font-serif' 
            : 'bg-menu-surface/30 border-white/5 text-menu-muted/80'
          }
        `}>
          {section.note.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
          ))}
        </div>
      )}

      {section.subHeader && (
        <h3 className="text-[11px] font-semibold text-menu-highlight uppercase tracking-[0.2em] mb-4 mt-8 pl-1">
          {section.subHeader}
        </h3>
      )}

      {/* Special Layout Logic */}
      <motion.div 
        layout 
        className={`grid gap-4 sm:gap-6 ${isSpecialSection ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
      >
        {section.items.map((item, idx) => (
          <motion.div layout key={`${section.id}-${idx}`} variants={itemVariants}>
            <MenuItemCard item={item} specialTheme={isChineseTheme ? 'chinese' : undefined} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
