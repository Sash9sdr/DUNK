import React from 'react';
import { MenuType } from '../types';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  activeMenu: MenuType;
  onToggle: (type: MenuType) => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ activeMenu, onToggle }) => {
  return (
    <div className="relative p-1 rounded-full flex w-full max-w-[280px] mx-auto bg-black/40 backdrop-blur-sm border border-white/10 shadow-inner">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full shadow-[0_2px_10px_rgba(214,64,69,0.4)] bg-menu-highlight"
        layoutId="toggleHighlight"
        initial={false}
        animate={{
          left: activeMenu === 'kitchen' ? '4px' : '50%',
          width: 'calc(50% - 4px)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Liquid shine on toggle */}
        <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
      </motion.div>
      
      <button
        onClick={() => onToggle('kitchen')}
        className={`flex-1 relative z-10 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'kitchen' ? 'text-white text-shadow-sm' : 'text-white/40 hover:text-white'
        }`}
      >
        Кухня
      </button>
      
      <button
        onClick={() => onToggle('bar')}
        className={`flex-1 relative z-10 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
          activeMenu === 'bar' ? 'text-white text-shadow-sm' : 'text-white/40 hover:text-white'
        }`}
      >
        Бар
      </button>
    </div>
  );
};