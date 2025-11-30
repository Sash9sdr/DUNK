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
      staggerChildren: 0.05
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
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const MenuSection: React.FC<MenuSectionProps> = ({ section, index }) => {
  return (
    <motion.section 
      id={section.id} 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative"
    >
      <div className="mb-6 flex items-center gap-4 pt-4">
        <h2 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase">
          {section.title}
        </h2>
        <div className="h-px flex-grow bg-gradient-to-r from-menu-highlight/50 to-transparent"></div>
      </div>

      {section.note && (
        <div className="mb-6 p-4 bg-menu-card/50 rounded-lg border-l-2 border-menu-highlight text-sm text-menu-muted leading-relaxed italic">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, idx) => (
          <motion.div key={`${section.id}-${idx}`} variants={itemVariants}>
            <MenuItemCard item={item} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};