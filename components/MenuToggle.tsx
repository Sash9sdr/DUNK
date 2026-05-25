
import React from 'react';
import { MenuType } from '../types';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  activeMenu: MenuType;
  onToggle: (type: MenuType) => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ activeMenu, onToggle }) => {
  return (
    <div className="relative p-1 rounded-[16px] flex w-full mx-auto bg-white/[0.02] backdrop-blur-md border border-white/[0.06] shadow-[inset_0_1px_3px_rgba(255,255,255,0.02),0_4px_16px_rgba(0,0,0,0.5)] transform-gpu overflow-hidden">
      <motion.div
        className="absolute top-1 bottom-1 rounded-[12px] bg-gradient-to-r from-menu-highlight/90 to-menu-highlight border border-menu-highlight/40 shadow-[0_4px_12px_rgba(var(--highlight-rgb),0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]"
        layoutId="toggleHighlight"
        initial={false}
        animate={{
          left: activeMenu === 'kitchen' ? '4px' :
                activeMenu === 'bar' ? '25%' :
                activeMenu === 'special-bar' ? '50%' :
                'calc(75% - 4px)',
          width: 'calc(25%)'
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[12px] mix-blend-overlay" />
      </motion.div>
      
      <button
        onClick={() => onToggle('kitchen')}
        className={`flex-1 relative z-10 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
           activeMenu === 'kitchen' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Кухня
      </button>
      
      <button
        onClick={() => onToggle('bar')}
        className={`flex-1 relative z-10 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
           activeMenu === 'bar' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Бар
      </button>

      <button
        onClick={() => onToggle('special-bar')}
        className={`flex-1 relative z-10 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
          activeMenu === 'special-bar' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        <span className={activeMenu !== 'special-bar' ? 'animate-flash-red' : ''}>
          Sp. Bar
        </span>
      </button>

      <button
        onClick={() => onToggle('special-food')}
        className={`flex-1 relative z-10 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
          activeMenu === 'special-food' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        <span className={activeMenu !== 'special-food' ? 'animate-flash-red' : ''}>
          Sp. Food
        </span>
      </button>
    </div>
  );
};
