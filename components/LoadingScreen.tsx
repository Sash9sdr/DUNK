import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-menu-bg overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff0033]/10 blur-[120px] rounded-full animate-pulse"></div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Pulsing Rings */}
            <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-menu-highlight/30"
            />
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute inset-0 rounded-full border border-menu-highlight/50"
            />
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute inset-0 rounded-full border border-menu-highlight/80"
            />
            
            <img 
                src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
                alt="Loading..." 
                className="w-20 h-auto object-contain relative z-20 drop-shadow-[0_0_20px_rgba(255,0,51,0.3)]"
            />
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-menu-highlight/50 to-menu-highlight shadow-[0_0_10px_#ff0033]"
            />
        </div>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-medium font-display"
        >
            Loading Experience
        </motion.p>
      </div>
    </div>
  );
};