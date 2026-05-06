
import React from 'react';
import { MenuType } from '../types';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  activeMenu: MenuType;
  onToggle: (type: MenuType) => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ activeMenu, onToggle }) => {
  return (
    <div className="relative p-1 rounded-xl flex w-full mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 transform-gpu overflow-hidden">
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-menu-highlight/80 backdrop-blur-md border border-menu-highlight/40"
        layoutId="toggleHighlight"
        initial={false}
        animate={{
          left: activeMenu === 'kitchen' ? '4px' :
                activeMenu === 'bar' ? '25%' :
                activeMenu === 'special-bar' ? '50%' :
                'calc(75% - 4px)',
          width: 'calc(25%)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-lg mix-blend-overlay" />
      </motion.div>
      
      <button
        onClick={() => onToggle('kitchen')}
        className={`flex-1 relative z-10 py-2.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
           activeMenu === 'kitchen' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Кухня
      </button>
      
      <button
        onClick={() => onToggle('bar')}
        className={`flex-1 relative z-10 py-2.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
           activeMenu === 'bar' ? 'text-white' : 'text-white/40 hover:text-white'
        }`}
      >
        Бар
      </button>

      <button
        onClick={() => onToggle('special-bar')}
        className={`flex-1 relative z-10 py-2.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
          activeMenu === 'special-bar' ? 'text-white' : 'text-white/40 hover:text-white animate-flash-red'
        }`}
      >
        <span>
          Sp. Bar
        </span>
      </button>

      <button
        onClick={() => onToggle('special-food')}
        className={`flex-1 relative z-10 py-2.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
          activeMenu === 'special-food' ? 'text-white' : 'text-white/40 hover:text-white animate-flash-red'
        }`}
      >
        <span>
          Sp. Food
        </span>
      </button>
    </div>
  );
};
