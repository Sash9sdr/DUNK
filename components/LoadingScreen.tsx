import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 blur-[100px] rounded-full animate-pulse"></div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Pulsing Rings */}
            <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-red-500/30"
            />
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 rounded-full border border-red-500/50"
            />
            
            <img 
                src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
                alt="Loading..." 
                className="w-24 h-auto object-contain relative z-20 drop-shadow-[0_0_15px_rgba(214,64,69,0.5)]"
            />
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#ef4444]"
            />
        </div>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium"
        >
            Loading Experience
        </motion.p>
      </div>
    </div>
  );
};