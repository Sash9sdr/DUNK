
import React from 'react';
import { MenuType } from '../types';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  activeMenu: MenuType;
  onToggle: (type: MenuType) => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ activeMenu, onToggle }) => {
  return (
    <div className="relative p-1 rounded-xl flex w-full max-w-[360px] mx-auto bg-menu-card/80 backdrop-blur-md border border-white/5 shadow-inner transform-gpu">
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg shadow-[0_2px_10px_rgba(255,0,51,0.3)] bg-menu-highlight"
        layoutId="toggleHighlight"
        initial={false}
        animate={{
          left: activeMenu === 'kitchen' ? '4px' : activeMenu === 'bar' ? '33.33%' : 'calc(66.66% - 4px)',
          width: 'calc(33.33%)'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg" />
      </motion.div>
      
      <button
        onClick={() => onToggle('kitchen')}
        className={`flex-1 relative z-10 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'kitchen' ? 'text-white' : 'text-menu-muted hover:text-white'
        }`}
      >
        Кухня
      </button>
      
      <button
        onClick={() => onToggle('bar')}
        className={`flex-1 relative z-10 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'bar' ? 'text-white' : 'text-menu-muted hover:text-white'
        }`}
      >
        Бар
      </button>

      <button
        onClick={() => onToggle('special')}
        className={`flex-1 relative z-10 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'special' ? 'text-white' : ''
        }`}
      >
        <span className={`${activeMenu !== 'special' ? 'animate-special-blink' : 'text-white font-bold'}`}>
          Special
        </span>
      </button>
    </div>
  );
};
