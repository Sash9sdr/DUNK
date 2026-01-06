
import React, { useEffect, useRef, useState } from 'react';

interface BeerGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeerGame: React.FC<BeerGameProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'HOME' | 'READY' | 'PLAY' | 'GAMEOVER' | 'WIN'>('HOME');

  // --- Audio System ---
  const audioCtx = useRef<AudioContext | null>(null);
  const initAudio = () => {
    try {
      if (!audioCtx.current) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (AC) audioCtx.current = new AC();
      }
      if (audioCtx.current?.state === 'suspended') {
        audioCtx.current.resume().catch((e) => console.warn("Audio resume failed", e));
      }
    } catch (e) {
      console.warn("Audio init failed", e);
    }
  };

  const playSound = (type: 'start' | 'waka' | 'eat' | 'die' | 'win') => {
    if (!audioCtx.current) return;
    try {
      const ctx = audioCtx.current;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'eat') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === 'waka') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.1);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
      } else if (type === 'die') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 1);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0, t + 1);
        osc.start(t);
        osc.stop(t + 1);
      } else if (type === 'start') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.setValueAtTime(600, t + 0.15);
        osc.frequency.setValueAtTime(300, t + 0.30);
        gain.gain.value = 0.1;
        osc.start(t);
        osc.stop(t + 0.5);
      } else if (type === 'win') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.linearRampToValueAtTime(800, t + 0.5);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.start(t);
        osc.stop(t + 0.5);
      }
    } catch(e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // --- Game Constants & State ---
    const RAW_MAP = [
      "###################",
      "#........#........#",
      "#o##.###.#.###.##o#",
      "#.................#",
      "#.##.#.#####.#.##.#",
      "#....#...#...#....#",
      "####.### # ###.####",
      "   #.#   G   #.#   ",
      "####.# ##=## #.####",
      "     . G G G .     ",
      "####.# ##### #.####",
      "   #.#       #.#   ",
      "####.#.#####.#.####",
      "#........#........#",
      "#.##.###.#.###.##.#",
      "#o.#.....P.....#.o#",
      "##.#.#.#####.#.#.##",
      "#....#...#...#....#",
      "###################"
    ];

    const MAP_W = RAW_MAP[0].length;
    const MAP_H = RAW_MAP.length;
    const TILE = 16; 
    const CANVAS_W = MAP_W * TILE;
    const CANVAS_H = MAP_H * TILE;

    // Set canvas size once
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    // Use alpha: true for better compatibility on some devices
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Game Entities
    let pacman = { x: 9.5, y: 15.5, dir: 0, nextDir: 0, mouth: 0, mouthOpen: false };
    const ghosts = [
      { x: 9.5, y: 7.5, color: '#ff0000', dir: 2, speed: 2.8 },
      { x: 9.5, y: 9.5, color: '#ffb8ae', dir: 1, speed: 2.5 },
      { x: 8.5, y: 9.5, color: '#00ffff', dir: 3, speed: 2.0 },
      { x: 10.5, y: 9.5, color: '#ffb852', dir: 0, speed: 2.2 }
    ];
    let dots: {c: number, r: number, power: boolean}[] = [];
    let particles: {x: number, y: number, vx: number, vy: number, life: number, color: string}[] = [];

    const DX = [1, 0, -1, 0];
    const DY = [0, 1, 0, -1];

    let currentScore = 0;
    let lastTime = performance.now();
    let gameStateLocal = 'HOME'; // Local var to avoid stale state in loop
    let animationFrameId: number;

    const initGame = () => {
      dots = [];
      pacman = { x: 9.5, y: 15.5, dir: 4, nextDir: 4, mouth: 0, mouthOpen: true };
      
      for(let r=0; r<MAP_H; r++){
        for(let c=0; c<MAP_W; c++){
          const ch = RAW_MAP[r][c];
          if(ch === '.' || ch === 'o') {
            dots.push({c: c + 0.5, r: r + 0.5, power: ch === 'o'});
          }
        }
      }
      
      ghosts[0] = { x: 9.5, y: 7.5, color: '#ff0000', dir: Math.floor(Math.random()*4), speed: 2.8 };
      ghosts[1] = { x: 9.5, y: 9.5, color: '#ffb8ae', dir: 3, speed: 2.5 };
      ghosts[2] = { x: 8.5, y: 9.5, color: '#00ffff', dir: 3, speed: 2.2 };
      ghosts[3] = { x: 10.5, y: 9.5, color: '#ffb852', dir: 3, speed: 2.2 };

      currentScore = 0;
      setScore(0);
      particles = [];
    };

    const isWall = (c: number, r: number) => {
      if(c < 0 || c >= MAP_W || r < 0 || r >= MAP_H) return true;
      const cell = RAW_MAP[Math.floor(r)][Math.floor(c)];
      return cell === '#' || cell === '=';
    };

    const getValidDirs = (x: number, y: number, currentDir: number) => {
      const dirs = [];
      const cx = Math.floor(x);
      const cy = Math.floor(y);
      for(let i=0; i<4; i++){
        if((i + 2) % 4 === currentDir) continue; 
        if(!isWall(cx + DX[i], cy + DY[i])) dirs.push(i);
      }
      return dirs;
    };

    const spawnParticles = (x: number, y: number, color: string) => {
        for(let i=0; i<8; i++){
            const a = Math.random() * Math.PI * 2;
            const s = Math.random() * 2;
            particles.push({
                x: x * TILE, y: y * TILE,
                vx: Math.cos(a) * s, vy: Math.sin(a) * s,
                life: 1.0, color
            });
        }
    };

    const update = (dt: number) => {
      if(gameStateLocal !== 'PLAY') return;

      const speed = 4.0 * dt; 
      
      if(pacman.nextDir !== pacman.dir && pacman.nextDir !== 4){
        const cx = Math.floor(pacman.x) + 0.5;
        const cy = Math.floor(pacman.y) + 0.5;
        const dist = Math.abs(pacman.x - cx) + Math.abs(pacman.y - cy);
        
        if(dist < 0.15){ // Increased threshold for easier turning
           if(!isWall(Math.floor(pacman.x) + DX[pacman.nextDir], Math.floor(pacman.y) + DY[pacman.nextDir])){
               pacman.x = cx; pacman.y = cy;
               pacman.dir = pacman.nextDir;
           }
        }
      }

      if(pacman.dir !== 4){
        const nx = pacman.x + DX[pacman.dir] * speed;
        const ny = pacman.y + DY[pacman.dir] * speed;
        
        const centerOffset = 0.48; 
        const checkX = Math.floor(nx + DX[pacman.dir] * centerOffset);
        const checkY = Math.floor(ny + DY[pacman.dir] * centerOffset);
        
        if(!isWall(checkX, checkY)){
            pacman.x = nx; pacman.y = ny;
            
            pacman.mouth += dt * 10;
            if(pacman.mouth > Math.PI/4) pacman.mouthOpen = false;
            if(pacman.mouth < 0) pacman.mouthOpen = true;
            pacman.mouth = pacman.mouthOpen ? pacman.mouth + dt*5 : pacman.mouth - dt*5;
            pacman.mouth = Math.max(0, Math.min(Math.PI/4, pacman.mouth));
            
            if(Math.random() < 0.05) playSound('waka');
        } else {
            pacman.x = Math.floor(pacman.x) + 0.5;
            pacman.y = Math.floor(pacman.y) + 0.5;
        }

        if(pacman.x < 0) pacman.x = MAP_W - 0.5;
        if(pacman.x >= MAP_W) pacman.x = 0.5;
      }

      // Dots
      for(let i = dots.length - 1; i >= 0; i--){
        const d = dots[i];
        const dist = (pacman.x - d.c)**2 + (pacman.y - d.r)**2;
        if(dist < 0.25){
          dots.splice(i, 1);
          currentScore += d.power ? 50 : 10;
          setScore(currentScore);
          playSound('eat');
          if(dots.length === 0){
             gameStateLocal = 'WIN';
             setGameStatus('WIN');
             playSound('win');
          }
        }
      }

      // Ghosts
      ghosts.forEach(g => {
        const gSpeed = g.speed * dt;
        const cx = Math.floor(g.x) + 0.5;
        const cy = Math.floor(g.y) + 0.5;
        const dist = Math.abs(g.x - cx) + Math.abs(g.y - cy);

        if(dist < 0.15){
           g.x = cx; g.y = cy;
           const valids = getValidDirs(g.x, g.y, g.dir);
           if(valids.length > 0){
             if(Math.random() < 0.2){
                g.dir = valids[Math.floor(Math.random() * valids.length)];
             } else {
                let bestDir = valids[0];
                let minD = 99999;
                valids.forEach(d => {
                    const tx = g.x + DX[d];
                    const ty = g.y + DY[d];
                    const md = Math.abs(tx - pacman.x) + Math.abs(ty - pacman.y);
                    if(md < minD) { minD = md; bestDir = d; }
                });
                g.dir = bestDir;
             }
           } else {
             g.dir = (g.dir + 2) % 4;
           }
        }

        g.x += DX[g.dir] * gSpeed;
        g.y += DY[g.dir] * gSpeed;
        
        if(g.x < 0) g.x = MAP_W - 0.5;
        if(g.x >= MAP_W) g.x = 0.5;

        const dToP = (g.x - pacman.x)**2 + (g.y - pacman.y)**2;
        if(dToP < 0.6){
            spawnParticles(pacman.x, pacman.y, '#ffff00');
            gameStateLocal = 'GAMEOVER';
            setGameStatus('GAMEOVER');
            playSound('die');
            const storedHigh = Number(localStorage.getItem('pac_best') || 0);
            if(currentScore > storedHigh){
                localStorage.setItem('pac_best', String(currentScore));
                setHighScore(currentScore);
            }
        }
      });
      
      for(let i=particles.length-1; i>=0; i--){
          const p = particles[i];
          p.x += p.vx; p.y += p.vy;
          p.life -= dt * 2;
          if(p.life <= 0) particles.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw Map Walls
      ctx.fillStyle = '#1919a6';
      for(let r=0; r<MAP_H; r++){
        for(let c=0; c<MAP_W; c++){
          const ch = RAW_MAP[r][c];
          if(ch === '#'){
             ctx.fillRect(c*TILE+1, r*TILE+1, TILE-2, TILE-2);
          } else if(ch === '='){
             ctx.fillStyle = '#ffb8ae';
             ctx.fillRect(c*TILE, r*TILE+6, TILE, 4);
             ctx.fillStyle = '#1919a6';
          }
        }
      }

      // Dots
      dots.forEach(d => {
         if(d.power){
            if(Math.floor(Date.now() / 200) % 2 === 0){
                ctx.fillStyle = '#ffb8ae';
                ctx.beginPath();
                ctx.arc(d.c * TILE, d.r * TILE, 4, 0, Math.PI*2);
                ctx.fill();
            }
         } else {
            ctx.fillStyle = '#ffb8ae';
            ctx.fillRect(d.c * TILE - 1, d.r * TILE - 1, 2, 2);
         }
      });

      // Pacman
      if(gameStateLocal !== 'GAMEOVER' || Math.floor(Date.now()/100)%2===0){
          const px = pacman.x * TILE;
          const py = pacman.y * TILE;
          ctx.fillStyle = '#ffff00';
          ctx.beginPath();
          const rotation = (pacman.dir >= 0 && pacman.dir < 4) 
              ? [0, Math.PI/2, Math.PI, -Math.PI/2][pacman.dir] 
              : 0;
          
          ctx.translate(px, py);
          ctx.rotate(rotation);
          ctx.arc(0, 0, TILE/2 - 1, pacman.mouth, Math.PI * 2 - pacman.mouth);
          ctx.lineTo(0,0);
          ctx.fill();
          ctx.setTransform(1,0,0,1,0,0);
      }

      // Ghosts
      ghosts.forEach(g => {
         const gx = g.x * TILE;
         const gy = g.y * TILE;
         ctx.fillStyle = g.color;
         ctx.beginPath();
         ctx.arc(gx, gy - 2, TILE/2 - 2, Math.PI, 0);
         ctx.lineTo(gx + TILE/2 - 2, gy + TILE/2 - 1);
         for(let i=1; i<=3; i++){
            ctx.lineTo(gx + TILE/2 - 2 - i*(TILE/3), gy + (i%2===0 ? TILE/2 : TILE/2 - 3));
         }
         ctx.lineTo(gx - TILE/2 + 2, gy + TILE/2 - 1);
         ctx.fill();
         
         ctx.fillStyle = '#fff';
         ctx.beginPath();
         ctx.arc(gx - 3, gy - 4, 2.5, 0, Math.PI*2);
         ctx.arc(gx + 3, gy - 4, 2.5, 0, Math.PI*2);
         ctx.fill();
         ctx.fillStyle = '#000';
         const eyeOffX = DX[g.dir];
         const eyeOffY = DY[g.dir];
         ctx.beginPath();
         ctx.arc(gx - 3 + eyeOffX, gy - 4 + eyeOffY, 1, 0, Math.PI*2);
         ctx.arc(gx + 3 + eyeOffX, gy - 4 + eyeOffY, 1, 0, Math.PI*2);
         ctx.fill();
      });

      // Particles
      particles.forEach(p => {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 2, 2);
          ctx.globalAlpha = 1;
      });
    };

    const renderLoop = (time: number) => {
        const dt = Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        update(dt);
        draw();
        animationFrameId = requestAnimationFrame(renderLoop);
    };

    setHighScore(Number(localStorage.getItem('pac_best') || 0));
    initGame();
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(renderLoop);

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
        if (e.cancelable) e.preventDefault(); // Prevent accidental zoom/scrolling
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        if (gameStateLocal === 'HOME' || gameStateLocal === 'GAMEOVER' || gameStateLocal === 'WIN') {
            initAudio();
            gameStateLocal = 'PLAY';
            setGameStatus('PLAY');
            initGame();
            playSound('start');
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
       // CRITICAL: Prevent default scrolling behavior when playing
       if (gameStateLocal === 'PLAY' && e.cancelable) {
           e.preventDefault();
       }
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if(gameStateLocal !== 'PLAY') return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > 10) { 
                pacman.nextDir = dx > 0 ? 0 : 2;
            }
        } else {
            if (Math.abs(dy) > 10) {
                pacman.nextDir = dy > 0 ? 1 : 3;
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (gameStateLocal !== 'PLAY') {
             if(e.code === 'Space' || e.code === 'Enter') {
                initAudio();
                gameStateLocal = 'PLAY';
                setGameStatus('PLAY');
                initGame();
                playSound('start');
             }
             return;
        }
        if (e.key === 'ArrowRight') pacman.nextDir = 0;
        if (e.key === 'ArrowDown') pacman.nextDir = 1;
        if (e.key === 'ArrowLeft') pacman.nextDir = 2;
        if (e.key === 'ArrowUp') pacman.nextDir = 3;
    };

    window.addEventListener('keydown', handleKeyDown);
    // Use passive: false to allow preventing default scroll behavior
    canvas.addEventListener('touchstart', handleTouchStart, {passive: false});
    canvas.addEventListener('touchmove', handleTouchMove, {passive: false});
    canvas.addEventListener('touchend', handleTouchEnd, {passive: false});

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
        if (canvas) {
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black font-pixel select-none overflow-hidden touch-none flex items-center justify-center">
      <style>{`
        .font-pixel { font-family: 'Press Start 2P', monospace; }
        .pixel-text { text-shadow: 2px 2px 0 #000; }
        .scanline {
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
            background-size: 100% 4px;
            pointer-events: none;
        }
      `}</style>
      
      <div className="relative">
          <div className="absolute -top-12 left-0 right-0 flex justify-between px-2 text-white text-[10px] tracking-widest">
              <div className="flex flex-col">
                  <span className="text-red-500">1UP</span>
                  <span>{score}</span>
              </div>
              <div className="flex flex-col items-end">
                  <span className="text-red-500">HIGH SCORE</span>
                  <span>{highScore}</span>
              </div>
          </div>

          <canvas 
            ref={canvasRef} 
            className="block image-rendering-pixelated bg-black shadow-[0_0_20px_rgba(33,33,255,0.3)] border-2 border-[#2121de]"
            style={{ 
                width: 'min(95vw, 400px)', 
                height: 'auto',
                imageRendering: 'pixelated' 
            }}
          />
          
          {gameStatus !== 'PLAY' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  {gameStatus === 'HOME' && (
                      <div className="text-center animate-pulse">
                          <p className="text-[#ffff00] text-[12px] mb-4 pixel-text">PAC-MAN</p>
                          <p className="text-[#ffb8ae] text-[8px] tracking-widest">TAP TO START</p>
                      </div>
                  )}
                  {gameStatus === 'GAMEOVER' && (
                      <div className="text-center">
                          <p className="text-red-500 text-[12px] mb-4 pixel-text">GAME OVER</p>
                          <p className="text-white text-[8px] mb-2">SCORE: {score}</p>
                          <p className="text-[#ffb8ae] text-[6px] tracking-widest animate-pulse">TAP TO RETRY</p>
                      </div>
                  )}
                   {gameStatus === 'WIN' && (
                      <div className="text-center">
                          <p className="text-green-500 text-[12px] mb-4 pixel-text">YOU WIN!</p>
                          <p className="text-[#ffb8ae] text-[6px] tracking-widest animate-pulse">TAP TO PLAY AGAIN</p>
                      </div>
                  )}
              </div>
          )}
          
          <div className="absolute inset-0 scanline z-10 opacity-30"></div>
      </div>

      <button 
        onClick={onClose} 
        className="fixed top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-pixel text-[10px] border-2 border-white shadow-lg active:scale-95 z-50"
      >
        X
      </button>

      {gameStatus === 'PLAY' && (
         <div className="fixed bottom-8 text-white/30 text-[8px] font-pixel text-center w-full pointer-events-none">
             SWIPE TO MOVE
         </div>
      )}
    </div>
  );
};
