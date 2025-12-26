
import React, { useEffect, useRef } from 'react';

interface BeerGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeerGame: React.FC<BeerGameProps> = ({ isOpen, onClose }) => {
  // --- Refs for DOM Elements ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const distRef = useRef<HTMLElement>(null);
  const bestRef = useRef<HTMLElement>(null);
  const boostRef = useRef<HTMLElement>(null);
  const boostChipRef = useRef<HTMLDivElement>(null);
  const btnMuteRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const btnStartRef = useRef<HTMLButtonElement>(null);
  const btnRetryRef = useRef<HTMLButtonElement>(null);
  const btnBackRef = useRef<HTMLButtonElement>(null);
  const endRowRef = useRef<HTMLDivElement>(null);
  const ovTitleRef = useRef<HTMLDivElement>(null);
  const ovSubRef = useRef<HTMLDivElement>(null);

  // --- Game Logic Effect ---
  useEffect(() => {
    if (!isOpen) return;

    // --- References to DOM ---
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })!;
    
    // UI Elements (using refs)
    const $dist = distRef.current!;
    const $best = bestRef.current!;
    const $boost = boostRef.current!;
    const $boostChip = boostChipRef.current!;
    const $btnMute = btnMuteRef.current!;
    const $overlay = overlayRef.current!;
    const $btnStart = btnStartRef.current!;
    const $btnRetry = btnRetryRef.current!;
    const $btnBack = btnBackRef.current!;
    const $endRow = endRowRef.current!;
    const $ovTitle = ovTitleRef.current!;
    const $ovSub = ovSubRef.current!;

    // --- Dynamic Canvas Config ---
    // Increased from 180 to 240 to "zoom out" and make content appear smaller/fit better
    const LOW_H = 240; 
    let LOW_W = 320;   // Dynamic width based on aspect ratio
    const PX_PER_M = 10;
    
    // --- Low Res Canvas Buffer ---
    const low = document.createElement('canvas');
    low.width = LOW_W;
    low.height = LOW_H;
    const lctx = low.getContext('2d', { alpha: false, desynchronized: true })!;
    lctx.imageSmoothingEnabled = false;

    // Physics - REDUCED SPEED AS REQUESTED
    const GRAVITY = 14.6;
    const DRAG = 0.014;

    // Boost system - Slower
    const START_BOOST_SEC = 5.0;
    const BOOST_FORWARD = 18; // Was 26
    const BOOST_LIFT = 58;    
    const BOOST_TAP_UP = 11;
    const BOOST_TAP_FWD = 2;  // Was 3
    const MAX_VY = 34;
    const MAX_VX = 42;        // Was 55

    // Ceiling
    const TOP_HAZE_H_PX = 26;
    const CAM_Y_MAX = 8.0;
    const CEILING_LINE_PX = TOP_HAZE_H_PX + 10;
    const CEILING_WORLD_Y = CAM_Y_MAX + ((LOW_H - 24 - CEILING_LINE_PX) / PX_PER_M);

    const GLIDE_BUFF_GRAVITY_MUL = 0.70;

    const State = { HOME: 0, READY: 1, FLY: 2, END: 3 };
    let state = State.HOME;

    // --- State Variables ---
    const cam = { x: 0, y: 0 };
    let vSmooth = 0;
    let barYSm = 0;

    const heroBody = {
      x: 0, y: 0.8, vx: 0, vy: 0, r: 0.55, spin: 0,
    };

    let boostLeft = START_BOOST_SEC;
    let boosting = false;
    let distance = 0;
    let glideBuff = 0;
    let best = Number(localStorage.getItem('champagne_best_m') || 0);
    $best.textContent = best.toFixed(1) + ' m';

    // Objects
    const boosters: any[] = [];
    const BoosterType = { SPEED: 0, UP: 1, TIME: 2 };
    const particles: any[] = [];
    const MAX_PARTICLES = 220;

    // --- Assets ---
    const HERO_IDLE_URL = 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/GmDunk/%D0%B41.png';
    const HERO_FLY_URL  = 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/GmDunk/%D0%B42.png';
    const HERO_END_URL  = 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/GmDunk/%D0%B43.png';
    const BAR_BG_REMOTE = 'https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/GmDunk/ChatGPT%20Image%2026%20%D0%B4%D0%B5%D0%BA.%202025%20%D0%B3.,%2016_06_57.png';

    const hero: any = { idle: null, fly: null, end: null, okIdle: false, okFly: false, okEnd: false };

    function cacheBust(url: string){ return url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now(); }

    function loadSpriteMulti(sources: string[], setOk: (v: boolean) => void) {
      const img = new Image();
      img.decoding = 'async';
      let i = 0;
      const tryNext = () => {
        if(i >= sources.length){ setOk(false); return; }
        img.src = cacheBust(sources[i++]);
      };
      img.onload = () => setOk(true);
      img.onerror = () => { setOk(false); tryNext(); };
      tryNext();
      return img;
    }

    hero.idle = loadSpriteMulti([HERO_IDLE_URL], (v) => hero.okIdle = v);
    hero.fly  = loadSpriteMulti([HERO_FLY_URL], (v) => hero.okFly = v);
    hero.end  = loadSpriteMulti([HERO_END_URL], (v) => hero.okEnd = v);

    // Gen Hero Fallback
    const genHero = (() => {
      const s = document.createElement('canvas');
      s.width = 24; s.height = 24;
      const g = s.getContext('2d')!;
      g.imageSmoothingEnabled = false;
      g.clearRect(0,0,24,24);
      g.fillStyle = '#ffd54a'; g.fillRect(14,4,4,4);
      g.fillStyle = '#9db1ff'; g.fillRect(12,8,6,8);
      g.fillStyle = '#e8efff'; g.fillRect(17,10,4,2);
      g.fillStyle = '#ff2b55'; g.fillRect(12,16,2,5); g.fillRect(15,16,2,5);
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(12,8,1,8);
      return s;
    })();

    // Bar Background
    const barImg = new Image();
    let barReady = false;
    const barTex = document.createElement('canvas');
    const barCtx = barTex.getContext('2d', { alpha: false, desynchronized: true })!;
    barCtx.imageSmoothingEnabled = false;

    barImg.onload = () => {
        barTex.height = LOW_H;
        barTex.width = Math.max(1, Math.round(barImg.width * (LOW_H / barImg.height)));
        barCtx.clearRect(0, 0, barTex.width, barTex.height);
        barCtx.drawImage(barImg, 0, 0, barTex.width, barTex.height);
        barReady = true;
    };
    barImg.src = BAR_BG_REMOTE;

    // --- Audio ---
    let audio: AudioContext | null = null;
    let muted = false;
    function audioInit() {
        if(audio) return;
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if(!AC) return;
        audio = new AC();
    }
    function setMuted(v: boolean) {
        muted = v;
        if ($btnMute) $btnMute.textContent = muted ? '🔇' : '🔊';
    }
    
    function sfx(type: string) {
        if(!audio || muted) return;
        if(audio.state === 'suspended') audio.resume();
        const t = audio.currentTime;
        const master = audio.createGain();
        master.gain.value = 0.55;
        master.connect(audio.destination);

        const env = (g: GainNode, peak: number, d: number, r: number) => {
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(peak, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.01 + d + r);
        };

        if(type === 'start'){
            const o = audio.createOscillator();
            const g = audio.createGain();
            o.type = 'square';
            o.frequency.setValueAtTime(320, t);
            o.frequency.exponentialRampToValueAtTime(90, t + 0.12);
            env(g, 0.7, 0.10, 0.10);
            o.connect(g); g.connect(master);
            o.start(t); o.stop(t + 0.24);
        } else if(type === 'boost'){
            const o = audio.createOscillator();
            const g = audio.createGain();
            o.type = 'sawtooth';
            o.frequency.setValueAtTime(150, t);
            o.frequency.exponentialRampToValueAtTime(220, t + 0.06);
            env(g, 0.22, 0.06, 0.04);
            o.connect(g); g.connect(master);
            o.start(t); o.stop(t + 0.12);
        } else if(type === 'speed'){
            const o1 = audio.createOscillator();
            const o2 = audio.createOscillator();
            const g = audio.createGain();
            o1.type = 'triangle'; o2.type = 'square';
            o1.frequency.setValueAtTime(740, t);
            o2.frequency.setValueAtTime(1110, t);
            env(g, 0.55, 0.12, 0.10);
            o1.connect(g); o2.connect(g); g.connect(master);
            o1.start(t); o2.start(t);
            o1.stop(t + 0.24); o2.stop(t + 0.24);
        } else if(type === 'up'){
            const n = audio.createBufferSource();
            const dur = 0.18;
            const buf = audio.createBuffer(1, audio.sampleRate * dur, audio.sampleRate);
            const data = buf.getChannelData(0);
            for(let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * (1 - i/data.length);
            n.buffer = buf;
            const f = audio.createBiquadFilter();
            f.type = 'highpass';
            f.frequency.setValueAtTime(700, t);
            const g = audio.createGain();
            env(g, 0.5, 0.10, 0.08);
            n.connect(f); f.connect(g); g.connect(master);
            n.start(t);
        } else if(type === 'time'){
            const o = audio.createOscillator();
            const g = audio.createGain();
            o.type = 'square';
            o.frequency.setValueAtTime(520, t);
            o.frequency.exponentialRampToValueAtTime(1040, t + 0.10);
            env(g, 0.45, 0.10, 0.10);
            o.connect(g); g.connect(master);
            o.start(t); o.stop(t + 0.22);
        } else if(type === 'end'){
            const o = audio.createOscillator();
            const g = audio.createGain();
            o.type = 'square';
            o.frequency.setValueAtTime(140, t);
            o.frequency.exponentialRampToValueAtTime(55, t + 0.14);
            env(g, 0.55, 0.14, 0.12);
            o.connect(g); g.connect(master);
            o.start(t); o.stop(t + 0.28);
        }
    }

    // --- Helpers ---
    function rand(){ return Math.random(); }
    function clamp(v: number,a: number,b: number){ return Math.max(a, Math.min(b, v)); }
    function len(x: number,y: number){ return Math.sqrt(x*x + y*y); }
    function pxX(m: number){ return m * PX_PER_M; }
    function pxY(m: number){ return (LOW_H - 24) - (m - cam.y) * PX_PER_M; }
    function mod(a: number,m: number){ return ((a % m) + m) % m; }

    // --- Game Functions ---
    function resetWorld(){
        boosters.length = 0;
        particles.length = 0;
        const total = 120;
        let x = 16;
        for(let i=0;i<total;i++){
            x += 7 + Math.random()*10;
            const y = 2.0 + Math.random()*10.5;
            const r = 0.42 + Math.random()*0.12;
            const t = (Math.random() < 0.42) ? BoosterType.SPEED : (Math.random() < 0.72 ? BoosterType.UP : BoosterType.TIME);
            boosters.push({ x, y, r, type:t, spin: Math.random()*6.28, alive:true });
        }
    }

    function spawnParticle(x: number,y: number,vx: number,vy: number,life: number,kind: string){
        if(particles.length >= MAX_PARTICLES) return;
        particles.push({x,y,vx,vy,life,age:0,kind});
    }

    function burst(x: number,y: number,kind: string){
        const n = kind === 'spark' ? 18 : 14;
        for(let i=0;i<n;i++){
            const a = Math.random()*Math.PI*2;
            const s = (kind==='spark'? 3.2: 2.2) + Math.random()*2.4;
            spawnParticle(x,y, Math.cos(a)*s, Math.sin(a)*s, 0.45 + Math.random()*0.35, kind);
        }
    }

    function drawParticles(dt: number){
        for(let i=particles.length-1; i>=0; i--){
            const p = particles[i];
            p.age += dt;
            if(p.age >= p.life){ particles.splice(i,1); continue; }
            p.vy -= 0.6 * dt;
            p.vx *= (1 - 0.12*dt);
            p.vy *= (1 - 0.12*dt);
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            const sx = pxX(p.x - cam.x);
            const sy = pxY(p.y);
            const k = 1 - p.age/p.life;
            if(p.kind === 'boost'){
                lctx.globalAlpha = 0.65 * k;
                lctx.fillStyle = 'rgba(255,43,85,1)';
                lctx.fillRect(sx|0, sy|0, 2, 2);
                lctx.fillStyle = 'rgba(255,213,74,1)';
                lctx.fillRect((sx+2)|0, (sy+1)|0, 1, 1);
            } else if(p.kind === 'spark'){
                lctx.globalAlpha = 0.75 * k;
                lctx.fillStyle = 'rgba(255,213,74,1)';
                lctx.fillRect(sx|0, sy|0, 2, 2);
            } else {
                lctx.globalAlpha = 0.45 * k;
                lctx.fillStyle = 'rgba(157,177,255,1)';
                lctx.fillRect(sx|0, sy|0, 1, 1);
            }
            lctx.globalAlpha = 1;
        }
    }

    // --- Pixel overlays ---
    const d2 = document.createElement('canvas'); d2.width = 2; d2.height = 2;
    const d2c = d2.getContext('2d')!;
    d2c.clearRect(0,0,2,2); d2c.fillStyle = 'rgba(0,0,0,0.22)'; d2c.fillRect(0,0,1,1); d2c.fillRect(1,1,1,1);
    const ditherPat = lctx.createPattern(d2, 'repeat');

    const s2 = document.createElement('canvas'); s2.width = 1; s2.height = 2;
    const s2c = s2.getContext('2d')!;
    s2c.clearRect(0,0,1,2); s2c.fillStyle = 'rgba(0,0,0,0.16)'; s2c.fillRect(0,0,1,1);
    const scanPat = lctx.createPattern(s2, 'repeat');

    function drawNeonSky(t: number, v: number){
        lctx.globalAlpha = 0.12;
        lctx.fillStyle = 'rgba(16,26,58,1)';
        for(let y=0; y<LOW_H; y+=4) lctx.fillRect(0,y,LOW_W,1);
        lctx.globalAlpha = 1;

        lctx.globalAlpha = 0.18;
        lctx.fillStyle = 'rgba(157,177,255,1)';
        const tt1 = (t*14 + cam.x*2.0) | 0;
        const tt2 = (t*8) | 0;
        for(let i=0;i<26;i++){
            const x = ((i*37 + tt1) % LOW_W) | 0;
            const y = ((i*53 + tt2) % 88) | 0;
            if(((x+y+i)&2)===0) lctx.fillRect(x,y,1,1);
        }
        lctx.globalAlpha = 1;

        const sp = 10 + 28*v;
        const drift = ((t*sp + cam.x*PX_PER_M*0.70) % (LOW_W + 90)) - 90;
        lctx.globalCompositeOperation = 'lighter';
        lctx.globalAlpha = 0.05 + 0.09*v;
        lctx.fillStyle = 'rgba(255,43,85,1)';
        for(let k=0;k<7;k++){
            const x = (drift + k*24) | 0;
            const y = (118 + (k&1)*2) | 0;
            lctx.fillRect(x, y, 20, 1);
        }
        lctx.globalCompositeOperation = 'source-over';
        lctx.globalAlpha = 1;

        lctx.globalAlpha = 0.28;
        lctx.fillStyle = 'rgba(0,0,0,1)';
        lctx.fillRect(0,0,LOW_W,LOW_H);
        lctx.globalAlpha = 1;
    }

    function drawBarLayer(t: number, v: number){
        if(!barReady) return;
        const tw = barTex.width | 0;
        const offX = mod((cam.x*PX_PER_M*0.35) + t*(2 + 3*v), tw);
        const liftTarget = clamp(cam.y*PX_PER_M*0.75, 0, LOW_H*1.25);
        barYSm += (liftTarget - barYSm) * 0.08;
        const y = (barYSm|0);

        for(let i=-2;i<Math.ceil(LOW_W/tw)+3;i++){
            const x = (i*tw - offX) | 0;
            lctx.drawImage(barTex, x, y);
        }

        const vis = clamp(1 - y/(LOW_H*1.05), 0, 1);
        if(vis > 0.001){
            const flick = 0.6 + 0.4*Math.sin(t*7.2);
            lctx.globalCompositeOperation = 'lighter';
            lctx.globalAlpha = (0.05 + 0.08*flick) * vis;
            lctx.fillStyle = 'rgba(255,43,85,1)';
            lctx.fillRect(0, (96+y)|0, LOW_W, 18);
            lctx.globalAlpha = (0.03 + 0.05*flick) * vis;
            lctx.fillStyle = 'rgba(255,213,74,1)';
            lctx.fillRect(0, (104+y)|0, LOW_W, 10);
            lctx.globalCompositeOperation = 'source-over';
            lctx.globalAlpha = 1;
        }
    }

    function drawTopHaze(){
        const H = TOP_HAZE_H_PX;
        lctx.fillStyle = 'rgba(0,0,0,0.70)';
        lctx.fillRect(0,0,LOW_W,H);
        let a = 0.32;
        for(let i=0;i<14;i++){
            lctx.globalAlpha = a;
            lctx.fillStyle = 'rgba(0,0,0,1)';
            lctx.fillRect(0, H+i, LOW_W, 1);
            a *= 0.82;
        }
        lctx.globalAlpha = 1;
    }

    function drawBackground(t: number){
        lctx.fillStyle = '#070912';
        lctx.fillRect(0,0,LOW_W,LOW_H);
        const targetV = clamp((heroBody.vx - 10) / 35, 0, 1);
        vSmooth += (targetV - vSmooth) * 0.08;
        const v = vSmooth;

        drawNeonSky(t, v);
        if(barReady) drawBarLayer(t, v);
        else {
            lctx.globalAlpha = 0.22;
            lctx.fillStyle = 'rgba(29,59,143,1)';
            lctx.fillRect(0, 120, LOW_W, 60);
            lctx.globalAlpha = 1;
        }
        drawTopHaze();

        lctx.globalAlpha = 0.22;
        if(ditherPat) lctx.fillStyle = ditherPat;
        lctx.fillRect(0,0,LOW_W,LOW_H);
        
        lctx.globalAlpha = 0.12;
        if(scanPat) lctx.fillStyle = scanPat;
        lctx.fillRect(0,0,LOW_W,LOW_H);

        lctx.globalAlpha = 0.16;
        lctx.fillStyle = 'rgba(0,0,0,1)';
        lctx.fillRect(0,0,LOW_W,LOW_H);
        lctx.globalAlpha = 1;
    }

    function drawBooster(b: any){
        const sx = pxX(b.x - cam.x);
        const sy = pxY(b.y);
        if(b.type === BoosterType.SPEED){
            lctx.save(); lctx.translate(sx, sy); lctx.rotate(b.spin);
            lctx.fillStyle = 'rgba(255,213,74,.75)'; lctx.fillRect(-7,-7,14,14); lctx.clearRect(-5,-5,10,10);
            lctx.fillStyle = 'rgba(255,213,74,.32)'; lctx.fillRect(-9,-1,18,2); lctx.restore();
        } else if(b.type === BoosterType.UP){
            lctx.save(); lctx.translate(sx, sy); lctx.rotate(-b.spin*0.5);
            lctx.fillStyle = 'rgba(157,177,255,.60)'; lctx.fillRect(-6,-6,12,12);
            lctx.fillStyle = 'rgba(232,239,255,.35)'; lctx.fillRect(-3,-4,2,2);
            lctx.fillStyle = 'rgba(60,255,143,.22)'; lctx.fillRect(-2,6,4,2); lctx.restore();
        } else {
            lctx.save(); lctx.translate(sx, sy); lctx.rotate(b.spin*0.2);
            lctx.fillStyle = 'rgba(60,255,143,.72)'; lctx.fillRect(-7,-7,14,14);
            lctx.fillStyle = 'rgba(0,0,0,.35)'; lctx.fillRect(-5,-5,10,10);
            lctx.fillStyle = 'rgba(60,255,143,.72)'; lctx.fillRect(-1,-3,2,6); lctx.fillRect(-1,0,5,2); lctx.restore();
        }
    }

    function currentHeroSprite() {
      if(state === State.END) return hero.okEnd ? hero.end : genHero;
      if(state === State.FLY) return hero.okFly ? hero.fly : genHero;
      return hero.okIdle ? hero.idle : genHero;
    }

    function drawHero(t: number){
        const sx = pxX(heroBody.x - cam.x);
        const sy = pxY(heroBody.y);
        const img = currentHeroSprite();

        const baseAng = (state === State.FLY) ? Math.atan2(-heroBody.vy, heroBody.vx) : 0;
        const v = clamp(len(heroBody.vx, heroBody.vy) / 46, 0, 1);
        const wobble = (state === State.FLY)
            ? Math.sin(t*9.5 + heroBody.x*0.7) * (0.05 + 0.05*v)
            : Math.sin(t*2.2) * 0.03;
        const ang = clamp(baseAng + wobble + heroBody.spin, -1.35, 0.95);

        const targetH = 32;
        const sc = (img && img.height) ? (targetH / img.height) : 1;
        const dw = Math.max(1, Math.round((img.width || 24) * sc));
        const dh = Math.max(1, Math.round((img.height || 24) * sc));

        lctx.save();
        lctx.translate(sx|0, sy|0);
        lctx.globalAlpha = 0.18; lctx.fillStyle = '#000';
        lctx.fillRect((-dw*0.35)|0, (dh*0.12)|0, (dw*0.7)|0, 3);
        lctx.globalAlpha = 1;

        if(state === State.FLY) lctx.rotate(ang);

        const breath = (state === State.FLY) ? (1 + Math.sin(t*12.0)*0.02) : (1 + Math.sin(t*2.6)*0.015);
        lctx.scale(breath, breath);

        lctx.drawImage(img, (-dw/2)|0, (-dh/2)|0, dw, dh);
        lctx.restore();

        if(state === State.FLY){
            const spd = len(heroBody.vx, heroBody.vy);
            const emit = (boosting && boostLeft > 0) ? 4 : (spd > 10 ? 2 : 1);
            for(let i=0;i<emit;i++){
                const dir = Math.atan2(heroBody.vy, heroBody.vx);
                const backX = heroBody.x - Math.cos(dir) * 0.22;
                const backY = heroBody.y - Math.sin(dir) * 0.22;
                const jitter = (Math.random()-0.5)*0.08;
                const pvx = -heroBody.vx*0.08 + (Math.random()-0.5)*1.2;
                const pvy = -heroBody.vy*0.08 + (Math.random()-0.5)*1.2;
                spawnParticle(backX + jitter, backY + jitter, pvx, pvy, 0.45 + Math.random()*0.25, (boosting && boostLeft>0) ? 'boost':'trail');
            }
        }
    }

    // --- Physics ---
    function collideBoosters(){
        for(const b of boosters){
            if(!b.alive) continue;
            if(b.x < cam.x - 6) { b.alive = false; continue; }
            const dx = b.x - heroBody.x; const dy = b.y - heroBody.y;
            const rr = (b.r + heroBody.r);
            if(dx*dx + dy*dy <= rr*rr){
                b.alive = false;
                if(b.type === BoosterType.SPEED){
                    heroBody.vx += 12 + Math.random()*5; heroBody.vy += (Math.random()-0.5)*2; heroBody.spin += (Math.random()-0.5)*0.08;
                    burst(heroBody.x, heroBody.y, 'spark'); sfx('speed');
                } else if(b.type === BoosterType.UP){
                    heroBody.vy += 10 + Math.random()*4; glideBuff = Math.max(glideBuff, 1.4 + Math.random()*1.0);
                    burst(heroBody.x, heroBody.y, 'trail'); sfx('up');
                } else {
                    const add = 0.8 + Math.random()*1.5; boostLeft = clamp(boostLeft + add, 0, 9.5);
                    burst(heroBody.x, heroBody.y, 'spark'); sfx('time');
                }
            }
        }
    }

    const FIXED_DT = 1/120;
    let accumulator = 0;
    function physicsStep(dt: number){
        accumulator += Math.min(0.05, dt);
        while(accumulator >= FIXED_DT){
            stepFixed(FIXED_DT);
            accumulator -= FIXED_DT;
        }
    }

    function stepFixed(dt: number){
        if(state !== State.FLY) return;
        if(glideBuff > 0) glideBuff -= dt;
        if(boosting && boostLeft > 0){
            heroBody.vx += BOOST_FORWARD * dt;
            heroBody.vy += BOOST_LIFT * dt;
            heroBody.vx = Math.min(heroBody.vx, MAX_VX);
            heroBody.vy = Math.min(heroBody.vy, MAX_VY);
            boostLeft -= dt;
            if(Math.random() < 0.18) sfx('boost');
        }
        const gMul = (glideBuff > 0) ? GLIDE_BUFF_GRAVITY_MUL : 1;
        heroBody.vy -= (GRAVITY * gMul) * dt;
        const speed = len(heroBody.vx, heroBody.vy);
        const drag = DRAG * speed;
        heroBody.vx *= (1 - drag * dt);
        heroBody.vy *= (1 - drag * dt);
        heroBody.x += heroBody.vx * dt;
        heroBody.y += heroBody.vy * dt;

        if(heroBody.y + heroBody.r >= CEILING_WORLD_Y){
            heroBody.y = CEILING_WORLD_Y - heroBody.r;
            if(heroBody.vy > 0) heroBody.vy = 0;
            heroBody.spin *= 0.6; heroBody.vx *= 0.996;
            if(Math.random() < 0.25) burst(heroBody.x, heroBody.y, 'spark');
        }
        heroBody.spin *= (1 - 2.5*dt);
        if(heroBody.y <= 0.02){ heroBody.y = 0.02; endGame(); }
        distance = Math.max(distance, heroBody.x);
        
        // --- Responsive Camera ---
        const targetScreenX = LOW_W * 0.25; 
        const desiredCamX = heroBody.x - (targetScreenX / PX_PER_M);
        cam.x = Math.max(-2, desiredCamX);
        
        const targetY = heroBody.y - 7.8;
        cam.y += (targetY - cam.y) * 0.06;
        cam.y = clamp(cam.y, 0, CAM_Y_MAX);
        
        collideBoosters();
    }

    // --- Pixel Text ---
    const font: any = {
        map: {
            'A':[2,5,7,5,5], 'B':[6,5,6,5,6], 'C':[3,4,4,4,3], 'D':[6,5,5,5,6], 'E':[7,4,6,4,7], 'F':[7,4,6,4,4], 'G':[3,4,5,5,3], 'H':[5,5,7,5,5], 'I':[7,2,2,2,7], 'J':[1,1,1,5,2], 'K':[5,5,6,5,5], 'L':[4,4,4,4,7], 'M':[5,7,7,5,5], 'N':[5,7,7,7,5], 'O':[2,5,5,5,2], 'P':[6,5,6,4,4], 'Q':[2,5,5,7,3], 'R':[6,5,6,5,5], 'S':[3,4,2,1,6], 'T':[7,2,2,2,2], 'U':[5,5,5,5,7], 'V':[5,5,5,5,2], 'W':[5,5,7,7,5], 'X':[5,5,2,5,5], 'Y':[5,5,2,2,2], 'Z':[7,1,2,4,7], '0':[7,5,5,5,7], '1':[2,6,2,2,7], '2':[6,1,7,4,7], '3':[6,1,7,1,6], '4':[5,5,7,1,1], '5':[7,4,6,1,6], '6':[3,4,7,5,7], '7':[7,1,2,4,4], '8':[7,5,7,5,7], '9':[7,5,7,1,6], ':':[0,2,0,2,0], '.':[0,0,0,2,0], '-':[0,0,7,0,0], ' ':[0,0,0,0,0],
        }
    };
    function pixelText(x: number, y: number, str: string, color: string, scale = 1){
        lctx.save(); lctx.fillStyle = color; let cx = x;
        str = String(str).toUpperCase();
        for(const ch of str){
            const rows = font.map[ch] || font.map[' '];
            for(let ry=0; ry<5; ry++){
                const row = rows[ry];
                for(let rx=0; rx<3; rx++){
                    if(row & (1 << (2-rx))) lctx.fillRect(cx + rx*scale, y + ry*scale, scale, scale);
                }
            }
            cx += (4 * scale);
        }
        lctx.restore();
    }

    function drawBoostBar(){
        const maxW = 160;
        const w = Math.min(maxW, LOW_W - 40); // responsive width
        const h = 8; 
        const x = (LOW_W - w)/2; 
        const y = LOW_H - 16;
        
        lctx.fillStyle = 'rgba(0,0,0,.35)'; lctx.fillRect(x-2, y-2, w+4, h+4);
        lctx.fillStyle = 'rgba(157,177,255,.22)'; lctx.fillRect(x-2, y-2, w+4, 1);
        lctx.fillStyle = 'rgba(157,177,255,.20)'; lctx.fillRect(x, y, w, h);
        const p = clamp(boostLeft / START_BOOST_SEC, 0, 1);
        const fill = Math.floor(w * p);
        lctx.fillStyle = 'rgba(255,43,85,.85)'; lctx.fillRect(x, y, fill, h);
        lctx.fillStyle = 'rgba(255,213,74,.75)'; lctx.fillRect(x, y, Math.min(fill, 3), h);
    }

    function draw(t: number, dt: number){
        lctx.clearRect(0,0,LOW_W,LOW_H);
        drawBackground(t);
        for(const b of boosters){
            if(!b.alive) continue;
            const sx = pxX(b.x - cam.x);
            if(sx < -20 || sx > LOW_W+20) continue;
            b.spin += 2.2*(1/60);
            drawBooster(b);
        }
        drawHero(t);
        const groundY = Math.round(pxY(0) + 2);
        lctx.fillStyle = 'rgba(255,43,85,.22)'; lctx.fillRect(0, groundY, LOW_W, 1);
        if(state === State.FLY) drawBoostBar();
        if(state === State.READY){
             // Center text horizontally based on dynamic LOW_W
             // Scale 1 for smaller letters as requested
            const txt = 'TAP TO LAUNCH';
            // Scale 1 width = char(3px) + space(1px) = 4px per char. 13 chars * 4 = 52px
            pixelText((LOW_W - 52)/2, LOW_H - 48, txt, '#e8efff', 1);
            const sub = 'HOLD = BOOST';
            pixelText((LOW_W - (sub.length*4))/2, LOW_H - 34, sub, '#9db1ff', 1);
        }
        if(state === State.END){
            const w = 212; const h = 44; const x = (LOW_W - w)/2;
            lctx.fillStyle = 'rgba(0,0,0,.36)'; lctx.fillRect(x, 70, w, h);
            lctx.fillStyle = 'rgba(157,177,255,.20)'; lctx.fillRect(x, 70, w, 1); lctx.fillRect(x, 113, w, 1);
            
            const txt1 = 'DIST ' + distance.toFixed(1) + ' M';
            // Use scale 2 for results to keep them legible, or 1 if preferred small. 
            // Keeping 2 for main results, can change if needed.
            pixelText((LOW_W - (txt1.length*8))/2, 86, txt1, '#3cff8f', 2);
            const txt2 = 'PRESS RETRY';
            pixelText((LOW_W - (txt2.length*8))/2, 100, txt2, '#ffd54a', 2);
        }
        drawParticles(dt);

        const w = canvas.width; const h = canvas.height;
        // Simple scaling to cover
        ctx.fillStyle = '#000'; ctx.fillRect(0,0,w,h);
        ctx.drawImage(low, 0,0,LOW_W,LOW_H, 0,0,w,h);
    }

    // --- UI helpers ---
    function setOverlay(mode: 'hide' | 'home' | 'end'){
        if(mode === 'hide'){
            if($overlay) $overlay.classList.add('hidden');
            return;
        }
        if($overlay) $overlay.classList.remove('hidden');
        if(mode === 'home'){
            if($ovTitle) $ovTitle.textContent = 'DUNK FLIGHT';
            if($ovSub) $ovSub.innerHTML = 'Нажми <b>Start</b>, персонаж встанет на старт. Затем <b>тап</b> по экрану — полёт. <b>Удерживай</b> — ускорение.';
            if($btnStart) $btnStart.style.display = '';
            if($endRow) $endRow.style.display = 'none';
        }
        if(mode === 'end'){
            if($ovTitle) $ovTitle.textContent = 'FLIGHT COMPLETE';
            if($ovSub) $ovSub.innerHTML = 'Дистанция: <b>' + distance.toFixed(1) + ' м</b> — попробуешь ещё раз?';
            if($btnStart) $btnStart.style.display = 'none';
            if($endRow) $endRow.style.display = 'flex';
        }
    }
    function setHud(){
        if($boostChip) $boostChip.style.display = (state === State.FLY) ? '' : 'none';
    }

    // --- Lifecycle ---
    function goHome(){
        state = State.HOME; boosting = false; setOverlay('home'); setHud();
        cam.x = -2; cam.y = 0; heroBody.x = 1.8; heroBody.y = 1.2; heroBody.vx = 0; heroBody.vy = 0; heroBody.spin = 0;
        distance = 0; boostLeft = START_BOOST_SEC; glideBuff = 0; vSmooth = 0; barYSm = 0; accumulator = 0;
        resetWorld();
    }
    function prepareReady(){
        state = State.READY; boosting = false; setOverlay('hide'); setHud();
        heroBody.x = 0; heroBody.y = 0.85; heroBody.vx = 0; heroBody.vy = 0; heroBody.spin = 0;
        boostLeft = START_BOOST_SEC; distance = 0; glideBuff = 0; cam.x = -2; cam.y = 0; vSmooth = 0; barYSm = 0; accumulator = 0;
        resetWorld();
    }
    function beginFlight(){
        state = State.FLY; setHud();
        heroBody.x = 0; heroBody.y = 0.85; heroBody.vx = 10; heroBody.vy = 7; heroBody.spin = 0;
        heroBody.vy = Math.min(MAX_VY, heroBody.vy + BOOST_TAP_UP);
        heroBody.vx = Math.min(MAX_VX, heroBody.vx + BOOST_TAP_FWD);
        burst(0.2, 0.9, 'spark'); sfx('start');
    }
    function endGame(){
        if(state !== State.FLY) return;
        state = State.END; boosting = false; setHud(); sfx('end');
        if(distance > best){
            best = distance; localStorage.setItem('champagne_best_m', String(best));
            if($best) $best.textContent = best.toFixed(1) + ' m';
        }
        setOverlay('end');
    }

    function unlockAudio(){
        audioInit();
        if(audio && audio.state === 'suspended') audio.resume();
    }
    function onPress(){
        unlockAudio();
        if(state === State.READY){ boosting = true; beginFlight(); return; }
        if(state === State.FLY){
            boosting = true;
            if(boostLeft > 0){
                heroBody.vy = Math.min(MAX_VY, heroBody.vy + BOOST_TAP_UP);
                heroBody.vx = Math.min(MAX_VX, heroBody.vx + BOOST_TAP_FWD);
                heroBody.spin += (Math.random()-0.5)*0.06;
                burst(heroBody.x, heroBody.y, 'spark'); sfx('boost');
            }
        }
    }
    function onRelease(){ boosting = false; }

    // --- Inputs ---
    const handleDown = (e: any) => { 
        if(e.target.tagName === 'BUTTON') return;
        e.preventDefault(); onPress(); 
    };
    canvas.addEventListener('pointerdown', handleDown, { passive:false });
    window.addEventListener('pointerup', onRelease, { passive:true });
    window.addEventListener('pointercancel', onRelease, { passive:true });

    const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Set physical size
        canvas.width = Math.floor(w * window.devicePixelRatio);
        canvas.height = Math.floor(h * window.devicePixelRatio);
        ctx.imageSmoothingEnabled = false;

        // Set logical low-res size based on aspect ratio
        // Maintain a vertical logic height of ~180px, adjust width
        LOW_W = Math.ceil(LOW_H * (w / h));
        low.width = LOW_W;
        low.height = LOW_H;
        lctx.imageSmoothingEnabled = false;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Button Listeners
    if($btnStart) $btnStart.onclick = () => { unlockAudio(); prepareReady(); };
    if($btnRetry) $btnRetry.onclick = () => { unlockAudio(); prepareReady(); };
    if($btnBack) $btnBack.onclick = () => { goHome(); };
    if($btnMute) $btnMute.onclick = () => { unlockAudio(); setMuted(!muted); };

    // --- Loop ---
    let last = performance.now();
    let animId: number;
    const loop = (now: number) => {
        const dt = (now - last)/1000;
        last = now;
        if(state === State.HOME || state === State.READY){
            const baseY = (state === State.HOME) ? 1.2 : 0.85;
            const bob = Math.sin(now/520) * 0.05;
            heroBody.y = baseY + bob; heroBody.vx = 0; heroBody.vy = 0;
            
            // Adjust camera for Home screen centering
            cam.x = Math.max(-2, heroBody.x - (LOW_W*0.25)/PX_PER_M);
            cam.y += (0 - cam.y) * 0.08; cam.y = clamp(cam.y, 0, CAM_Y_MAX);
        }
        if(state === State.FLY) physicsStep(dt);

        if($dist) $dist.textContent = distance.toFixed(1) + ' m';
        if($boost) $boost.textContent = clamp(boostLeft, 0, 99).toFixed(2) + ' s';

        draw(now/1000, Math.min(0.033, dt));
        animId = requestAnimationFrame(loop);
    };
    
    // Init with slight delay to settle DOM
    setMuted(false);
    
    setTimeout(() => {
        goHome();
        animId = requestAnimationFrame(loop);
    }, 100);

    return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('pointerdown', handleDown);
        window.removeEventListener('pointerup', onRelease);
        window.removeEventListener('pointercancel', onRelease);
        cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#070912] font-pixel select-none overflow-hidden touch-none">
      <style>{`
        :root{ --text:#e8efff; --panel: #121c3d; --border: #3c5096; --shadow: #000; }
        .pixelated { image-rendering: pixelated; }
        .font-pixel { font-family: 'Press Start 2P', monospace; }
        .hud{ position:fixed; top:12px; left:12px; right:12px; display:flex; justify-content:space-between; gap:10px; pointer-events:none; z-index:5; }
        .group{ display:flex; gap:8px; align-items:flex-start; }
        .chip{ pointer-events:none; background: var(--panel); border:2px solid var(--border); box-shadow: 4px 4px 0 var(--shadow); border-radius: 0; padding:4px 6px; display:flex; gap:6px; align-items:baseline; font-size: 8px; color: var(--text); }
        .chip .k{ color: #8a9bbd; font-size:6px; font-weight:700; margin-right: 2px; }
        .chip b{ font-size:8px; font-family: 'Press Start 2P', monospace; }
        
        .btn-game{ pointer-events:auto; appearance:none; border:2px solid var(--border); background: #1a2652; color: #fff; border-radius: 0; padding:8px 10px; box-shadow: 4px 4px 0 var(--shadow); cursor:pointer; font-size:10px; font-family: 'Press Start 2P', monospace; text-transform: uppercase; }
        .btn-game:active{ transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--shadow); }
        
        .overlay{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; padding:16px; background: rgba(0,0,0,0.6); z-index:10; }
        .overlay.hidden{ display:none; }
        .card{ width:min(340px, 92vw); background: var(--panel); border: 4px solid var(--border); box-shadow: 8px 8px 0 var(--shadow); border-radius: 0; padding: 24px 16px; text-align:center; color: var(--text); }
        .title{ font-size: 16px; margin: 0 0 16px; color: #ffd54a; text-shadow: 2px 2px 0 #000; }
        .subtitle{ color: #aab8d6; font-size: 8px; line-height:1.8; margin: 0 0 20px; font-family: 'Press Start 2P', monospace; }
        .subtitle b { color: #fff; }
        
        .big{ width:100%; padding: 14px 16px; font-size: 14px; background: #ff2b55; border-color: #ff85a1; margin-bottom: 8px; color: #fff; }
        .row{ display:flex; gap:10px; margin-top:10px; }
        .row .btn-game{ flex:1; padding:12px 6px; font-size:10px; }
        .close-x { position:fixed; top:12px; right:12px; z-index:100; width:32px; height:32px; border-radius:0; background: #ff2b55; border:2px solid #fff; box-shadow: 4px 4px 0 #000; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; font-family: 'Press Start 2P', monospace; }
        .close-x:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; }
      `}</style>

      <canvas ref={canvasRef} className="block w-full h-full pixelated" style={{touchAction: 'none'}} />

      <button onClick={onClose} className="close-x">X</button>

      <div className="hud" aria-hidden="true">
        <div className="group">
          <div className="chip"><span className="k">DIST</span><b ref={distRef}>0.0 m</b></div>
          <div className="chip" style={{opacity:0.85}}><span className="k">BEST</span><b ref={bestRef}>0.0 m</b></div>
        </div>
        <div className="group">
          <div className="chip" ref={boostChipRef}><span className="k">BOOST</span><b ref={boostRef}>5.00 s</b></div>
          <button className="btn-game" ref={btnMuteRef} aria-label="Mute or unmute">🔊</button>
        </div>
      </div>

      <div className="overlay" ref={overlayRef} id="overlay">
        <div className="card">
          <div className="title" ref={ovTitleRef}>DUNK FLIGHT</div>
          <p className="subtitle" ref={ovSubRef}>Нажми <b>Start</b>, персонаж встанет на старт. Затем <b>тап</b> по экрану — полёт. <b>Удерживай</b> — ускорение.</p>
          <button className="btn-game big" ref={btnStartRef}>START</button>
          <div className="row" ref={endRowRef} style={{display:'none'}}>
            <button className="btn-game" ref={btnRetryRef}>RETRY</button>
            <button className="btn-game" ref={btnBackRef}>BACK</button>
          </div>
        </div>
      </div>
    </div>
  );
};
