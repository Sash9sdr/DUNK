import React, { useState, useEffect, useMemo } from 'react';
import { KITCHEN_MENU, BAR_MENU, SPECIAL_MENU } from './constants';
import { MenuType } from './types';
import { Logo } from './components/Logo';
import { MenuToggle } from './components/MenuToggle';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { LoadingScreen } from './components/LoadingScreen';
import { ChristmasDecor } from './components/ChristmasDecor';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('kitchen');
  const [isLoading, setIsLoading] = useState(true);
  
  const currentMenu = useMemo(() => {
    return activeMenu === 'kitchen' 
      ? KITCHEN_MENU 
      : activeMenu === 'bar' 
        ? BAR_MENU 
        : SPECIAL_MENU;
  }, [activeMenu]);

  const themeProgress = useMotionValue(0);

  useEffect(() => {
    // Slashed artificial delay to 600ms. It's fast enough to feel responsive 
    // but keeps the brand intro logic.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const target = activeMenu === 'kitchen' ? 0 : activeMenu === 'bar' ? 1 : 2;
    
    const controls = animate(themeProgress, target, {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (latest) => {
        let r, g, b;
        if (latest <= 1) {
          r = Math.round(214 + (51 - 214) * latest);
          g = Math.round(64 + (102 - 64) * latest);
          b = Math.round(69 + (255 - 69) * latest);
        } else {
          const p = latest - 1;
          r = Math.round(51 + (34 - 51) * p);
          g = Math.round(102 + (197 - 102) * p);
          b = Math.round(255 + (94 - 255) * p);
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

      <div className="min-h-[100dvh] relative flex flex-col bg-[#050505] overflow-x-hidden selection:bg-menu-highlight selection:text-white transform-gpu">
        
        {!isLoading && <ChristmasDecor />}

        {/* Optimized Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
           <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay will-change-transform"></div>

           <motion.div 
              initial={false}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1],
                background: activeMenu === 'kitchen' 
                  ? 'radial-gradient(circle, rgba(214,64,69,0.1) 0%, rgba(0,0,0,0) 70%)'
                  : activeMenu === 'bar'
                    ? 'radial-gradient(circle, rgba(51,102,255,0.1) 0%, rgba(0,0,0,0) 70%)'
                    : 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(0,0,0,0) 70%)'
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[100vw] h-[80vh] blur-[100px] will-change-transform transform-gpu" 
           />
           
           <motion.div
              initial={false}
              animate={{
                x: [-10, 10, -10],
                y: [0, 30, 0],
                opacity: [0.1, 0.15, 0.1],
                backgroundColor: activeMenu === 'kitchen' ? '#400000' : activeMenu === 'bar' ? '#001033' : '#043629'
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[5%] -left-[15%] w-[70vw] h-[70vw] rounded-full blur-[120px] will-change-transform transform-gpu"
           />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 transform-gpu">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-2">
            <Logo />
            <div className="w-full px-4 mb-3">
               <MenuToggle activeMenu={activeMenu} onToggle={handleToggle} />
            </div>
            <CategoryNav sections={currentMenu} />
          </div>
        </header>

        <main className="flex-grow relative z-10 max-w-4xl mx-auto w-full px-4 pt-[220px] pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {currentMenu.map((section, index) => (
                <MenuSection key={section.id} section={section} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="relative z-10 py-16 border-t border-white/5 bg-black text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-px bg-menu-highlight/20"></div>
            <img 
              src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
              alt="DUNK" 
              className="h-8 w-auto opacity-20 grayscale" 
              loading="lazy"
            />
            <p className="text-[9px] text-menu-muted/40 uppercase tracking-[0.4em]">
              © 2025 DUNK Digital Menu
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;