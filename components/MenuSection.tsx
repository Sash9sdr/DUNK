
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
      staggerChildren: 0.01, // Almost instant stagger for bulk appearance
      delayChildren: 0
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 }, // Reduced movement distance
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.25, // Snappy, fast transition
      ease: "easeOut"
    }
  }
};

export const MenuSection: React.FC<MenuSectionProps> = ({ section, index }) => {
  // Check if this is the Chinese Tea section to apply special styling
  const isChineseTheme = section.id === 'kitay-chay';

  return (
    <motion.section 
      id={section.id} 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "400px" }}
      className={`relative ${isChineseTheme ? 'py-6 px-2 rounded-2xl bg-gradient-to-b from-[#1c0808] to-transparent border border-red-900/30' : ''}`}
    >
      <div className="mb-6 flex items-center gap-4 pt-4">
        {isChineseTheme ? (
          // Special Chinese Header
          <>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-amber-700"></div>
            <h2 className="text-2xl font-serif font-medium text-amber-500 tracking-widest uppercase px-4 border-x border-amber-900/50">
              {section.title}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-amber-700"></div>
          </>
        ) : (
          // Standard Header
          <>
            <h2 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase">
              {section.title}
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-menu-highlight/50 to-transparent"></div>
          </>
        )}
      </div>

      {section.note && (
        <div className={`
          mb-6 p-4 rounded-lg text-sm leading-relaxed italic border-l-2
          ${isChineseTheme 
            ? 'bg-[#2a0e0e] border-amber-700 text-amber-100/70 font-serif' 
            : 'bg-menu-card/50 border-menu-highlight text-menu-muted'
          }
        `}>
          {section.note.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
          ))}
        </div>
      )}

      {section.subHeader && (
        <h3 className="text-xs font-bold text-menu-highlight uppercase tracking-[0.15em] mb-4 mt-8 pl-1">
          {section.subHeader}
        </h3>
      )}

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, idx) => (
          <motion.div layout key={`${section.id}-${idx}`} variants={itemVariants}>
            <MenuItemCard item={item} specialTheme={isChineseTheme ? 'chinese' : undefined} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
