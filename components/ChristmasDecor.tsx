
import React, { useEffect, useRef } from 'react';

export const ChristmasDecor: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden will-change-transform transform-gpu">
        <Fireworks />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden will-change-transform transform-gpu">
        <Snow />
      </div>
    </>
  );
};

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const isMobile = width < 768;
    
    class Particle {
      x: number; y: number; vx: number; vy: number;
      alpha: number; color: string; decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isMobile ? 2 : 4) + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= this.decay;
      }
    }

    const launchFirework = () => {
      const x = Math.random() * width;
      const y = Math.random() * (height * 0.4);
      const colors = ['#FFD700', '#C0C0C0', '#ff6b6b', '#4dabf7'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = isMobile ? 20 : 35;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let animationFrameId: number;
    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      if (Math.random() < (isMobile ? 0.008 : 0.015)) launchFirework();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />;
};

const Snow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const particleCount = isMobile ? 25 : 60;
    const particles: { x: number; y: number; r: number; s: number; w: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 1,
        s: Math.random() * 0.8 + 0.4,
        w: Math.random() * 0.4 - 0.2
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        p.y += p.s;
        p.x += p.w;

        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        else if (p.x < 0) p.x = width;
      }

      ctx.fill();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};
