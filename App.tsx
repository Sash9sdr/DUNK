
import React, { useState, useEffect, useMemo } from 'react';
import { KITCHEN_MENU, BAR_MENU, SPECIAL_MENU } from './constants';
import { MenuType } from './types';
import { Logo } from './components/Logo';
import { MenuToggle } from './components/MenuToggle';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { LoadingScreen } from './components/LoadingScreen';
import { ChristmasDecor } from './components/ChristmasDecor';
import { BeerGame } from './components/BeerGame';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('kitchen');
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  
  const currentMenu = useMemo(() => {
    return activeMenu === 'kitchen' 
      ? KITCHEN_MENU 
      : activeMenu === 'bar' 
        ? BAR_MENU 
        : SPECIAL_MENU;
  }, [activeMenu]);

  const themeProgress = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (type: MenuType) => {
    if (type === activeMenu) return;
    setActiveMenu(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Overlay */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[200]"
          >
             <BeerGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-[100dvh] relative flex flex-col bg-menu-bg overflow-x-hidden selection:bg-menu-highlight selection:text-white transform-gpu">
        
        {!isLoading && <ChristmasDecor />}

        {/* Deep Red/Black Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu bg-menu-bg">
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

           <motion.div 
              initial={false}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] blur-[100px] transform-gpu bg-[radial-gradient(circle_at_50%_0%,_rgba(255,0,51,0.2)_0%,_rgba(0,0,0,0)_70%)]" 
           />
           
           <motion.div
              initial={false}
              animate={{
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] transform-gpu bg-[#ff0033]"
           />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 transform-gpu">
          <div className="absolute inset-0 bg-menu-bg/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-3">
            <div className="w-full flex items-center justify-center relative mb-2">
               <Logo />
               {/* Game Launch Button */}
               <button 
                  onClick={() => setIsGameOpen(true)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-menu-highlight hover:text-white transition-colors p-2"
                  aria-label="Play Casino"
               >
                  <div className="border border-current rounded px-1.5 py-0.5 font-display font-bold text-[10px] tracking-widest bg-menu-highlight/10 backdrop-blur-sm">
                      777
                  </div>
               </button>
            </div>
            
            <div className="w-full px-4 mb-4">
               <MenuToggle activeMenu={activeMenu} onToggle={handleToggle} />
            </div>
            <CategoryNav sections={currentMenu} />
          </div>
        </header>

        <main className="flex-grow relative z-10 max-w-4xl mx-auto w-full px-4 pt-[240px] pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-12"
            >
              {currentMenu.map((section, index) => (
                <MenuSection key={section.id} section={section} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="relative z-10 py-16 border-t border-white/5 bg-black text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-px bg-menu-highlight/10"></div>
            <p className="text-[9px] text-menu-muted/30 uppercase tracking-[0.4em] font-bold">
              © 2025 DUNK Digital Menu
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
