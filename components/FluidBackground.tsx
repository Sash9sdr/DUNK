import React, { useEffect, useRef } from 'react';
import { MenuType } from '../types';

interface FluidBackgroundProps {
  activeMenu: MenuType;
  isMobile: boolean;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  targetColor: string;
  currentColor: string;
}

export const FluidBackground: React.FC<FluidBackgroundProps> = ({ activeMenu, isMobile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Fetch color palette based on selected menu
  const getThemePalette = (menu: MenuType): { primary: string; secondary: string; dark: string } => {
    switch (menu) {
      case 'kitchen':
        return {
          primary: 'rgba(255, 0, 51, 0.45)', // Crimson Red
          secondary: 'rgba(180, 0, 20, 0.35)', // Deep Red
          dark: 'rgba(60, 2, 8, 0.25)', // Auburn
        };
      case 'bar':
        return {
          primary: 'rgba(0, 102, 255, 0.45)', // Sapphire Blue
          secondary: 'rgba(0, 50, 180, 0.35)', // Ultramarine
          dark: 'rgba(2, 10, 60, 0.25)', // Deep Navy
        };
      case 'special-bar':
        return {
          primary: 'rgba(147, 51, 234, 0.45)', // Dreamy Violet
          secondary: 'rgba(217, 70, 239, 0.35)', // Cyber Pink
          dark: 'rgba(50, 5, 80, 0.25)', // Dark Purple
        };
      case 'special-food':
        return {
          primary: 'rgba(249, 115, 22, 0.45)', // Mandarin Orange
          secondary: 'rgba(245, 158, 11, 0.35)', // Amber Gold
          dark: 'rgba(80, 20, 2, 0.25)', // Burnt Sienna
        };
      default:
        return {
          primary: 'rgba(255, 0, 51, 0.45)',
          secondary: 'rgba(180, 0, 20, 0.35)',
          dark: 'rgba(60, 2, 8, 0.25)',
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement inside window
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial mouse center position
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;

    const palette = getThemePalette(activeMenu);

    // Initialize bubble objects
    const totalBubbles = isMobile ? 3 : 5;
    const bubbles: Bubble[] = [];

    for (let i = 0; i < totalBubbles; i++) {
      const radius = isMobile 
        ? Math.random() * 120 + 130 
        : Math.random() * 200 + 250;
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      const vx = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8);
      const vy = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8);

      // Select target color initially
      const colorType = i % 3;
      const targetColor = colorType === 0 
        ? palette.primary 
        : colorType === 1 
          ? palette.secondary 
          : palette.dark;

      bubbles.push({
        x,
        y,
        vx,
        vy,
        radius,
        color: targetColor,
        targetColor,
        currentColor: targetColor,
      });
    }

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentPalette = getThemePalette(activeMenu);

      bubbles.forEach((b, idx) => {
        // Handle menu-dependent transition
        const colorType = idx % 3;
        const targetColor = colorType === 0 
          ? currentPalette.primary 
          : colorType === 1 
            ? currentPalette.secondary 
            : currentPalette.dark;

        // Smooth transition of bubble colors
        b.color = targetColor;

        // Move bubble physics
        b.x += b.vx;
        b.y += b.vy;

        // Boundary bounce with ease
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -1;
        } else if (b.x + b.radius > width) {
          b.x = width - b.radius;
          b.vx *= -1;
        }

        if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy *= -1;
        } else if (b.y + b.radius > height) {
          b.y = height - b.radius;
          b.vy *= -1;
        }

        // Extremely elegant mouse gravitation
        if (!isMobile) {
          const dx = mouseRef.current.x - b.x;
          const dy = mouseRef.current.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 700) {
            // Very light suction pull to create interactive organic touch
            const force = (700 - distance) / 38000;
            b.vx += (dx / distance) * force;
            b.vy += (dy / distance) * force;

            // Speed limit cap
            const currentSpeed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            const maxSpeed = 1.5;
            if (currentSpeed > maxSpeed) {
              b.vx = (b.vx / currentSpeed) * maxSpeed;
              b.vy = (b.vy / currentSpeed) * maxSpeed;
            }
          }
        }

        // Draw ambient liquid gradient
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(0.5, b.color.replace(/[\d\.]+\)$/, '0.15)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Add a subtle secondary procedural flow
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMenu, isMobile]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* High-Performance Canvas for rendering gorgeous liquid light blobs */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-[0.9] absolute inset-0 transform-gpu"
        style={{ filter: 'blur(35px)' }}
      />
      {/* Deep frosted glass blurs layered on top to create heavy high-index diffusion */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[100px] sm:backdrop-blur-[130px]" 
        style={{ mixBlendMode: 'normal' }}
      />
      {/* Real analog noise texture overlay to break digital sterility */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Professional top-down dark ambient shadow mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020000]/60 via-[#010000]/25 to-[#010000]/90" />
    </div>
  );
};
