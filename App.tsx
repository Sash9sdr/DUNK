
import React, { useState, useEffect, useMemo } from 'react';
import { KITCHEN_MENU, BAR_MENU, SPECIAL_FOOD_MENU, SPECIAL_BAR_MENU } from './constants';
import { MenuType } from './types';
import { Logo } from './components/Logo';
import { MenuToggle } from './components/MenuToggle';
import { CategoryNav } from './components/CategoryNav';
import { MenuSection } from './components/MenuSection';
import { LoadingScreen } from './components/LoadingScreen';
import { BeerGame } from './components/BeerGame';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('kitchen');
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  
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

      <div className="min-h-[100dvh] relative flex flex-col bg-[#050000] overflow-x-hidden selection:bg-menu-highlight selection:text-white transform-gpu">
        
        {/* Voluminous Red Cloud Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
           <div className="absolute inset-0 opacity-[0.15] md:opacity-[0.25] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           
           <motion.div 
             className="absolute w-[180vw] h-[100vh] md:w-[140vw] top-[10%] opacity-70 blur-[40px] md:blur-[80px] will-change-transform"
             animate={{ 
               x: ['-10%', '10%', '-10%'],
               y: ['-5%', '5%', '-5%'],
               scale: [1, 1.05, 1],
               rotate: [0, 2, 0]
             }}
             transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
             style={{
               background: 'radial-gradient(circle at center, rgba(255, 10, 60, 0.6) 0%, rgba(180, 0, 20, 0.2) 40%, rgba(0,0,0,0) 70%)',
             }}
           ></motion.div>
           
           <motion.div 
             className="absolute w-[160vw] h-[80vh] md:w-[120vw] bottom-[-10%] opacity-60 blur-[30px] md:blur-[70px] will-change-transform"
             animate={{ 
               x: ['10%', '-10%', '10%'],
               y: ['5%', '-5%', '5%'],
               scale: [1, 1.1, 1],
               rotate: [0, -3, 0]
             }}
             transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
             style={{
               background: 'radial-gradient(circle at center, rgba(255, 50, 80, 0.5) 0%, rgba(120, 0, 20, 0.15) 50%, rgba(0,0,0,0) 70%)',
             }}
           ></motion.div>

           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/30 to-[#000000]/90"></div>
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 transform-gpu">
          <div className="absolute inset-0 bg-menu-bg/60 backdrop-blur-2xl border-b border-white/5"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-3">
            <div className="w-full flex items-center justify-center relative mb-2">
               <Logo />
               {/* Game Launch Button */}
               <button 
                  onClick={() => setIsGameOpen(true)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-menu-highlight hover:text-white transition-all duration-300 p-2 opacity-80 hover:opacity-100"
                  aria-label="Play Casino"
               >
                  <div className="border border-menu-highlight/30 rounded-full px-2 py-0.5 font-display font-medium text-[10px] tracking-widest bg-menu-highlight/5 backdrop-blur-md">
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
