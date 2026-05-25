
import React, { useState, useEffect, useMemo } from 'react';
import { KITCHEN_MENU, BAR_MENU, SPECIAL_FOOD_MENU, SPECIAL_BAR_MENU } from './constants';
import { MenuType } from './types';
import { Logo } from './components/Logo';
import { MenuToggle } from './components/MenuToggle';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { LoadingScreen } from './components/LoadingScreen';
import { BeerGame } from './components/BeerGame';
import { FluidBackground } from './components/FluidBackground';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('kitchen');
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const currentMenu = useMemo(() => {
    switch (activeMenu) {
      case 'kitchen': return KITCHEN_MENU;
      case 'bar': return BAR_MENU;
      case 'special-bar': return SPECIAL_BAR_MENU;
      case 'special-food': return SPECIAL_FOOD_MENU;
      default: return KITCHEN_MENU;
    }
  }, [activeMenu]);

  const themeProgress = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let target = 0;
    if (activeMenu === 'kitchen') target = 0;
    else if (activeMenu === 'bar') target = 1;
    else if (activeMenu === 'special-bar') target = 2;
    else if (activeMenu === 'special-food') target = 3;
    
    const controls = animate(themeProgress, target, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1], // spring-like elegant ease
      onUpdate: (latest) => {
        let r, g, b;
        if (latest <= 1) { // Kitchen (Red) -> Bar (Blue)
          r = Math.round(255 + (51 - 255) * latest);
          g = Math.round(0 + (102 - 0) * latest);
          b = Math.round(51 + (255 - 51) * latest);
        } else if (latest <= 2) { // Bar (Blue) -> Special Bar (Purple)
          const p = latest - 1;
          r = Math.round(51 + (147 - 51) * p);
          g = Math.round(102 + (51 - 102) * p);
          b = Math.round(255 + (234 - 255) * p);
        } else { // Special Bar (Purple) -> Special Food (Orange)
          const p = latest - 2;
          r = Math.round(147 + (245 - 147) * p);
          g = Math.round(51 + (110 - 51) * p);
          b = Math.round(234 + (11 - 234) * p);
        }
        document.documentElement.style.setProperty('--highlight-rgb', `${r} ${g} ${b}`);
      }
    });
    
    return () => controls.stop();
  }, [activeMenu, themeProgress]);

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
        {!isMobile && isGameOpen && (
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

      <div className="min-h-[100dvh] relative flex flex-col bg-[#050000] overflow-x-hidden selection:bg-menu-highlight selection:text-white transform-gpu">
        
        {/* Interactive Dynamic Fluid Glass Ambient Background */}
        <FluidBackground activeMenu={activeMenu} isMobile={isMobile} />

        <header className="fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-50 transform-gpu pointer-events-none">
          <div className="relative max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/[0.08] border-t-white/[0.12] border-b-white/[0.02] rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.5)] px-3 sm:px-6 pt-2 pb-1 flex flex-col items-center pointer-events-auto">
            <div className="w-full flex items-center justify-center relative mb-1.5">
               <Logo />
               {/* Game Launch Button */}
               {!isMobile && (
                 <button 
                    onClick={() => setIsGameOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-menu-highlight hover:text-white transition-all duration-300 p-2 opacity-85 hover:opacity-100"
                    aria-label="Play Casino"
                 >
                    <div className="border border-menu-highlight/30 rounded-full px-2.5 py-0.5 font-display font-medium text-[9px] tracking-widest bg-menu-highlight/5 backdrop-blur-md hover:border-menu-highlight/80 hover:bg-menu-highlight/10 transition-all">
                        PACMAN 🕹️
                    </div>
                 </button>
               )}
            </div>
            
            <div className="w-full mb-2">
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
              className="space-y-14"
            >
              <div className="space-y-12">
                {currentMenu.map((section, index) => (
                  <MenuSection key={section.id} section={section} index={index} />
                ))}
              </div>
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
