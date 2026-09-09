import React, { useEffect, useRef } from 'react';

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  drag: number;
  gravity: number;
  sparkType: 'streak' | 'ember' | 'star';
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  life: number;
  maxLife: number;
}

const SPARK_COLORS = [
  '#2CF598', // Latverian Neon Emerald
  '#FFFFFF', // White hot core
  '#6EE7B7', // Radiant Mint
  '#A7F3D0', // Electric Green
  '#B8BAB7', // Fractured Armor Silver
  '#5EEAD4', // High-energy Teal
];

export const SparkCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isMouseDown = false;

    // Track particles
    const sparks: SparkParticle[] = [];
    const rings: ShockwaveRing[] = [];

    // Scale canvas to device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Helper: spawn explosion burst on touch / click
    const createSparkBurst = (x: number, y: number, count: number = 32) => {
      // Primary shockwave energy ring
      rings.push({
        x,
        y,
        radius: 4,
        maxRadius: 55 + Math.random() * 20,
        color: '#2CF598',
        life: 0,
        maxLife: 24,
      });

      // Secondary faint outer shockwave
      rings.push({
        x,
        y,
        radius: 2,
        maxRadius: 75 + Math.random() * 25,
        color: '#5EEAD4',
        life: 0,
        maxLife: 30,
      });

      // Add high-velocity large sparks
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9.5 + 3.5;
        const maxLife = Math.floor(Math.random() * 28 + 20);
        const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
        const sparkType: SparkParticle['sparkType'] =
          Math.random() > 0.3 ? 'streak' : Math.random() > 0.45 ? 'star' : 'ember';

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4.5 + 2.8,
          color,
          life: 0,
          maxLife,
          drag: 0.945,
          gravity: 0.16,
          sparkType,
        });
      }
    };

    // Helper: spawn trailing micro-sparks on move
    const createTrailSparks = (x: number, y: number, count: number = 4) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.0 + 1.0;
        const maxLife = Math.floor(Math.random() * 18 + 12);
        const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
          size: Math.random() * 3.0 + 1.8,
          color,
          life: 0,
          maxLife,
          drag: 0.92,
          gravity: 0.1,
          sparkType: Math.random() > 0.35 ? 'streak' : 'ember',
        });
      }
    };

    // Pointer events
    const handlePointerDown = (e: PointerEvent) => {
      isMouseDown = true;
      createSparkBurst(e.clientX, e.clientY, 36);
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    let lastMoveTime = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      // Throttle trail slightly for smooth 60fps performance
      if (now - lastMoveTime > 20) {
        lastMoveTime = now;
        // If mouse is held down, spawn more sparks
        createTrailSparks(e.clientX, e.clientY, isMouseDown ? 8 : 3);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Render shockwave rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life++;
        const progress = ring.life / ring.maxLife;
        const currentRadius = ring.radius + (ring.maxRadius - ring.radius) * progress;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.lineWidth = Math.max(0.8, 3.2 * (1 - progress));
        ctx.shadowBlur = 14;
        ctx.shadowColor = ring.color;
        ctx.stroke();
        ctx.restore();

        if (ring.life >= ring.maxLife) {
          rings.splice(i, 1);
        }
      }

      // Render sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        const progress = s.life / s.maxLife;
        const alpha = Math.max(0, 1 - progress);

        // Apply physics
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= s.drag;
        s.vy *= s.drag;
        s.vy += s.gravity;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.strokeStyle = s.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color;

        if (s.sparkType === 'streak') {
          // Elongated spark pointing along velocity vector
          const velocityLength = Math.hypot(s.vx, s.vy);
          const streakLength = Math.min(velocityLength * 3.2, 32);
          ctx.lineWidth = s.size * (1 - progress * 0.4);
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          if (velocityLength > 0.1) {
            ctx.lineTo(
              s.x - (s.vx / velocityLength) * streakLength,
              s.y - (s.vy / velocityLength) * streakLength
            );
          } else {
            ctx.lineTo(s.x, s.y);
          }
          ctx.stroke();
        } else if (s.sparkType === 'star') {
          // 4-point glowing star cross
          const rad = s.size * (1 - progress * 0.3);
          ctx.beginPath();
          ctx.moveTo(s.x - rad * 2.4, s.y);
          ctx.lineTo(s.x + rad * 2.4, s.y);
          ctx.moveTo(s.x, s.y - rad * 2.4);
          ctx.lineTo(s.x, s.y + rad * 2.4);
          ctx.lineWidth = Math.max(1.5, rad * 0.7);
          ctx.lineCap = 'round';
          ctx.stroke();

          // Central white hotspot
          ctx.beginPath();
          ctx.arc(s.x, s.y, rad * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        } else {
          // Circular glowing ember with radiant core
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (1 - progress * 0.4), 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.45 * (1 - progress * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }

        ctx.restore();

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  );
};
