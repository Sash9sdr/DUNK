
import React, { useState, useEffect } from 'react';
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
  
  const currentMenu = activeMenu === 'kitchen' 
    ? KITCHEN_MENU 
    : activeMenu === 'bar' 
      ? BAR_MENU 
      : SPECIAL_MENU;

  // Use a motion value to interpolate themes
  const themeProgress = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 0: Kitchen (Red), 1: Bar (Blue), 2: Special (Green)
    const target = activeMenu === 'kitchen' ? 0 : activeMenu === 'bar' ? 1 : 2;
    
    const controls = animate(themeProgress, target, {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (latest) => {
        let r, g, b;
        
        if (latest <= 1) {
          // Transition Red -> Blue
          r = Math.round(214 + (51 - 214) * latest);
          g = Math.round(64 + (102 - 64) * latest);
          b = Math.round(69 + (255 - 69) * latest);
        } else {
          // Transition Blue -> Green (latest 1 to 2)
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
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-[100dvh] relative flex flex-col bg-[#050505] overflow-x-hidden selection:bg-menu-highlight selection:text-white">
        
        {!isLoading && <ChristmasDecor />}

        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>

           <motion.div 
              initial={false}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
                background: activeMenu === 'kitchen' 
                  ? 'radial-gradient(circle, rgba(214,64,69,0.1) 0%, rgba(0,0,0,0) 70%)'
                  : activeMenu === 'bar'
                    ? 'radial-gradient(circle, rgba(51,102,255,0.1) 0%, rgba(0,0,0,0) 70%)'
                    : 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(0,0,0,0) 70%)'
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[100vw] h-[800px] blur-[80px] will-change-transform" 
           />
           
           <motion.div
              initial={false}
              animate={{
                x: [-20, 20, -20],
                y: [0, 50, 0],
                opacity: [0.15, 0.25, 0.15],
                scale: [1, 1.2, 1],
                backgroundColor: activeMenu === 'kitchen' ? '#500000' : activeMenu === 'bar' ? '#001a4d' : '#064e3b'
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[80px] will-change-transform"
           />

           <motion.div
              initial={false}
              animate={{
                x: [0, -40, 0],
                y: [0, -30, 0],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-menu-highlight/30 rounded-full blur-[100px] will-change-transform"
           />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] supports-[backdrop-filter]:bg-black/60"></div>
          
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10"
            >
              {currentMenu.map((section, index) => (
                <MenuSection key={section.id} section={section} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="relative z-10 py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-menu-highlight/50 to-transparent"></div>
            
            <img 
              src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
              alt="DUNK" 
              className="h-10 w-auto opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out" 
            />
            
            <p className="text-[10px] text-menu-muted/50 uppercase tracking-[0.3em] font-medium">
              © 2025 DUNK MENU
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;