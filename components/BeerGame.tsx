
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
  
  const statusRef = useRef<'HOME' | 'READY' | 'PLAY' | 'GAMEOVER' | 'WIN'>('HOME');
  const audioCtx = useRef<AudioContext | null>(null);

  const initAudio = () => {
    try {
      if (!audioCtx.current) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (AC) audioCtx.current = new AC();
      }
      if (audioCtx.current?.state === 'suspended') audioCtx.current.resume();
    } catch (e) {}
  };

  const playSound = (type: 'start' | 'eat' | 'die' | 'win') => {
    if (!audioCtx.current || audioCtx.current.state !== 'running') return;
    try {
      const ctx = audioCtx.current;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);

      if (type === 'eat') {
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.exponentialRampToValueAtTime(900, t + 0.04);
        gain.gain.setValueAtTime(0.04, t);
        osc.start(t); osc.stop(t + 0.04);
      } else if (type === 'die') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(20, t + 0.6);
        gain.gain.setValueAtTime(0.1, t);
        osc.start(t); osc.stop(t + 0.6);
      } else if (type === 'start') {
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(440, t + 0.1);
        gain.gain.value = 0.05;
        osc.start(t); osc.stop(t + 0.3);
      }
    } catch(e) {}
  };

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const RAW_MAP = [
      "###################",
      "#........#........#",
      "#.##.###.#.###.##.#",
      "#.................#",
      "#.##.#.#####.#.##.#",
      "#....#   #   #....#",
      "####.### # ###.####",
      "   #.#   G   #.#   ",
      "####.# ##=## #.####",
      "     . G G G .     ",
      "####.# ##### #.####",
      "   #.#       #.#   ",
      "####.#.#####.#.####",
      "#........#........#",
      "#.##.###.#.###.##.#",
      "#. #.....P.....# .#",
      "##.#.#.#####.#.#.##",
      "#....#   #   #....#",
      "###################"
    ];

    const TILE = 20;
    const MAP_W = RAW_MAP[0].length;
    const MAP_H = RAW_MAP.length;
    canvas.width = MAP_W * TILE;
    canvas.height = MAP_H * TILE;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const DX = [1, 0, -1, 0];
    const DY = [0, 1, 0, -1];

    let pacman = { x: 9.5, y: 15.5, dir: 4, nextDir: 4, mouth: 0 };
    const ghosts = [
      { x: 9.5, y: 7.5, color: '#ff0000', dir: 0, speed: 4.0, type: 'stalker' },
      { x: 9.5, y: 9.5, color: '#ffb8ae', dir: 3, speed: 3.5, type: 'ambush' },
      { x: 8.5, y: 9.5, color: '#00ffff', dir: 3, speed: 3.0, type: 'random' },
      { x: 10.5, y: 9.5, color: '#ffb852', dir: 3, speed: 2.8, type: 'random' }
    ];
    let dots: {c: number, r: number, char: string}[] = [];
    let lastTime = performance.now();
    let animationFrameId: number;

    const isWall = (c: number, r: number, isGhost = false) => {
      const ic = Math.floor(c); const ir = Math.floor(r);
      if (ic < 0 || ic >= MAP_W || ir < 0 || ir >= MAP_H) return true;
      const cell = RAW_MAP[ir][ic];
      if (cell === '#') return true;
      if (cell === '=' && !isGhost) return true; // Пакмен не проходит, призраки проходят
      return false;
    };

    const initGame = () => {
      dots = [];
      const chars = ['D', 'U', 'N', 'K'];
      let idx = 0;
      for (let r = 0; r < MAP_H; r++) {
        for (let c = 0; c < MAP_W; c++) {
          if (RAW_MAP[r][c] === '.' && (r + c) % 4 === 0) {
            dots.push({ c: c + 0.5, r: r + 0.5, char: chars[idx % 4] });
            idx++;
          }
        }
      }
      pacman = { x: 9.5, y: 15.5, dir: 4, nextDir: 4, mouth: 0 };
      ghosts[0].x = 9.5; ghosts[0].y = 7.5;
      ghosts[1].x = 9.5; ghosts[1].y = 9.5;
      ghosts[2].x = 8.5; ghosts[2].y = 9.5;
      ghosts[3].x = 10.5; ghosts[3].y = 9.5;
      setScore(0);
    };

    const getDist = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt((x1-x2)**2 + (y1-y2)**2);

    const update = (dt: number) => {
      if (statusRef.current !== 'PLAY') return;

      const pSpeed = 6.5 * dt;
      
      // Пакмен: выбор поворота в центре клетки
      const pcx = Math.floor(pacman.x) + 0.5;
      const pcy = Math.floor(pacman.y) + 0.5;
      if (pacman.nextDir !== 4 && pacman.nextDir !== pacman.dir) {
        if (getDist(pacman.x, pacman.y, pcx, pcy) < 0.2) {
          if (!isWall(pcx + DX[pacman.nextDir], pcy + DY[pacman.nextDir], false)) {
            pacman.x = pcx; pacman.y = pcy;
            pacman.dir = pacman.nextDir;
          }
        }
      }

      // Пакмен: движение
      if (pacman.dir !== 4) {
        const nx = pacman.x + DX[pacman.dir] * pSpeed;
        const ny = pacman.y + DY[pacman.dir] * pSpeed;
        if (!isWall(nx + DX[pacman.dir] * 0.4, ny + DY[pacman.dir] * 0.4, false)) {
          pacman.x = nx; pacman.y = ny;
          pacman.mouth = (Math.sin(performance.now() * 0.02) + 1) * 0.4;
        } else {
          pacman.x = pcx; pacman.y = pcy;
        }
        if (pacman.x < 0) pacman.x = MAP_W - 0.5;
        if (pacman.x >= MAP_W) pacman.x = 0.5;
      }

      // Поедание
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        if (getDist(pacman.x, pacman.y, d.c, d.r) < 0.5) {
          dots.splice(i, 1);
          setScore(s => s + 10);
          playSound('eat');
          if (dots.length === 0) {
            statusRef.current = 'WIN';
            setGameStatus('WIN');
          }
        }
      }

      // Призраки: обновленная логика AI
      ghosts.forEach(g => {
        const gSpeed = g.speed * dt;
        const gcx = Math.floor(g.x) + 0.5;
        const gcy = Math.floor(g.y) + 0.5;

        // Когда призрак в центре клетки, он решает куда идти дальше
        if (getDist(g.x, g.y, gcx, gcy) < 0.15) {
          g.x = gcx; g.y = gcy;
          let possibleDirs = [];
          for (let i = 0; i < 4; i++) {
            // Не идем назад
            if ((i + 2) % 4 === g.dir) continue;
            if (!isWall(g.x + DX[i], g.y + DY[i], true)) {
              possibleDirs.push(i);
            }
          }

          if (possibleDirs.length > 0) {
            if (g.type === 'stalker' || g.type === 'ambush') {
              // Цель: преследование
              let targetX = pacman.x;
              let targetY = pacman.y;
              
              if (g.type === 'ambush' && pacman.dir !== 4) {
                targetX += DX[pacman.dir] * 2;
                targetY += DY[pacman.dir] * 2;
              }

              let bestDir = possibleDirs[0];
              let minDist = Infinity;
              possibleDirs.forEach(d => {
                const dist = getDist(g.x + DX[d], g.y + DY[d], targetX, targetY);
                if (dist < minDist) {
                  minDist = dist;
                  bestDir = d;
                }
              });
              g.dir = bestDir;
            } else {
              // Случайное движение для остальных
              g.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            }
          } else {
            // Если тупик (не должно быть в этом лабиринте), разворачиваемся
            g.dir = (g.dir + 2) % 4;
          }
        }

        g.x += DX[g.dir] * gSpeed;
        g.y += DY[g.dir] * gSpeed;

        if (g.x < 0) g.x = MAP_W - 0.5;
        if (g.x >= MAP_W) g.x = 0.5;

        // Столкновение
        if (getDist(g.x, g.y, pacman.x, pacman.y) < 0.7) {
          statusRef.current = 'GAMEOVER';
          setGameStatus('GAMEOVER');
          playSound('die');
        }
      });
    };

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Отрисовка лабиринта
      ctx.strokeStyle = '#1a1a8a';
      ctx.lineWidth = 2;
      for (let r = 0; r < MAP_H; r++) {
        for (let c = 0; c < MAP_W; c++) {
          if (RAW_MAP[r][c] === '#') ctx.strokeRect(c * TILE + 2, r * TILE + 2, TILE - 4, TILE - 4);
          if (RAW_MAP[r][c] === '=') { 
            ctx.fillStyle = '#ffb8ae'; 
            ctx.fillRect(c * TILE, r * TILE + TILE/2 - 2, TILE, 4); 
          }
        }
      }

      // Буквы DUNK
      ctx.font = `bold ${TILE * 0.75}px 'Press Start 2P'`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      dots.forEach(d => {
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 10; ctx.shadowColor = '#ff0000';
        ctx.fillText(d.char, d.c * TILE, d.r * TILE);
      });
      ctx.shadowBlur = 0;

      // Пакмен
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      const rot = [0, Math.PI / 2, Math.PI, -Math.PI / 2][pacman.dir] || 0;
      ctx.translate(pacman.x * TILE, pacman.y * TILE);
      ctx.rotate(rot);
      ctx.arc(0, 0, TILE / 2 - 1, pacman.mouth, Math.PI * 2 - pacman.mouth);
      ctx.lineTo(0, 0); ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Призраки
      ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        const gx = g.x * TILE, gy = g.y * TILE;
        ctx.beginPath();
        ctx.arc(gx, gy - 2, TILE / 2 - 2, Math.PI, 0);
        ctx.lineTo(gx + TILE/2 - 2, gy + TILE/2 - 1);
        ctx.lineTo(gx - TILE/2 + 2, gy + TILE/2 - 1);
        ctx.fill();
        // Глаза
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(gx-3, gy-4, 2, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(gx+3, gy-4, 2, 0, 7); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(gx-3 + DX[g.dir], gy-4 + DY[g.dir], 1, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(gx+3 + DX[g.dir], gy-4 + DY[g.dir], 1, 0, 7); ctx.fill();
      });
    };

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      update(dt);
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    initGame();
    animationFrameId = requestAnimationFrame(loop);

    const handleInteraction = () => {
      initAudio();
      if (statusRef.current !== 'PLAY') {
        initGame();
        statusRef.current = 'PLAY';
        setGameStatus('PLAY');
        playSound('start');
      }
    };

    const kd = (e: KeyboardEvent) => {
      handleInteraction();
      if (e.key === 'ArrowRight') pacman.nextDir = 0;
      if (e.key === 'ArrowDown') pacman.nextDir = 1;
      if (e.key === 'ArrowLeft') pacman.nextDir = 2;
      if (e.key === 'ArrowUp') pacman.nextDir = 3;
    };

    let startX = 0, startY = 0;
    const ts = (e: TouchEvent) => { 
      startX = e.touches[0].clientX; 
      startY = e.touches[0].clientY; 
      handleInteraction(); 
    };
    const te = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) pacman.nextDir = dx > 0 ? 0 : 2;
      else pacman.nextDir = dy > 0 ? 1 : 3;
    };

    window.addEventListener('keydown', kd);
    canvas.addEventListener('touchstart', ts, { passive: false });
    canvas.addEventListener('touchend', te, { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', kd);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-pixel touch-none select-none">
      <div className="mb-6 text-white text-[10px] flex gap-12 uppercase tracking-widest">
        <span>Score: <span className="text-yellow-400">{score}</span></span>
        <span className="text-red-600 animate-pulse">Dunk Pac</span>
      </div>

      <div 
        className="relative border-4 border-[#1a1a8a] bg-black cursor-pointer shadow-[0_0_60px_rgba(26,26,138,0.5)] overflow-hidden" 
        onClick={() => !audioCtx.current && initAudio()}
      >
        <canvas ref={canvasRef} style={{ width: 'min(90vw, 380px)', height: 'auto', imageRendering: 'pixelated' }} />
        
        {gameStatus !== 'PLAY' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm">
            <h2 className={`text-xl mb-6 tracking-tighter ${gameStatus === 'GAMEOVER' ? 'text-red-600' : 'text-yellow-400'}`}>
              {gameStatus === 'GAMEOVER' ? 'GAME OVER' : gameStatus === 'WIN' ? 'LEVEL CLEAR' : 'DUNK PAC'}
            </h2>
            <p className="text-white text-[10px] animate-pulse tracking-widest mb-10">TAP TO START</p>
            <div className="text-[7px] text-white/30 space-y-2 uppercase leading-relaxed">
              <p>Swipe to change direction</p>
              <p>Avoid ghosts • Eat red DUNK letters</p>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={onClose} 
        className="mt-12 px-10 py-4 bg-red-600 text-white border-2 border-white text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-red-700 active:scale-95 transition-all"
      >
        Exit Game
      </button>
    </div>
  );
};
