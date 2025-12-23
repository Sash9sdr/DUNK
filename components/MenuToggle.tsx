
import React from 'react';
import { MenuType } from '../types';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  activeMenu: MenuType;
  onToggle: (type: MenuType) => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ activeMenu, onToggle }) => {
  return (
    <div className="relative p-1 rounded-full flex w-full max-w-[340px] mx-auto bg-black/40 backdrop-blur-sm border border-white/10 shadow-inner transform-gpu">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full shadow-[0_2px_15px_rgba(var(--highlight-rgb),0.5)] bg-menu-highlight"
        layoutId="toggleHighlight"
        initial={false}
        animate={{
          left: activeMenu === 'kitchen' ? '4px' : activeMenu === 'bar' ? '33.33%' : '66.66%',
          width: 'calc(33.33% - 4px)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
      </motion.div>
      
      <button
        onClick={() => onToggle('kitchen')}
        className={`flex-1 relative z-10 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'kitchen' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Кухня
      </button>
      
      <button
        onClick={() => onToggle('bar')}
        className={`flex-1 relative z-10 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'bar' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Бар
      </button>

      <button
        onClick={() => onToggle('special')}
        className={`flex-1 relative z-10 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'special' ? 'text-white' : ''
        }`}
      >
        <span className={`${activeMenu !== 'special' ? 'animate-special-blink' : 'text-white font-black'}`}>
          Special
        </span>
      </button>
    </div>
  );
};
