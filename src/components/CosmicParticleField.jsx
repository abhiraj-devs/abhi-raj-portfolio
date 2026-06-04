import React, { useEffect, useRef } from "react";

/**
 * CosmicParticleField — Interactive 3D Particle Universe
 *
 * Matches the reference image:
 *  • Dense network of glowing blue/purple dots connected by fine lines
 *  • Perspective-like "depth plane" — particles scale by z-depth
 *  • Mouse attraction: nearby particles drift toward the cursor
 *  • Wave undulation sweeping across the field
 *  • Deep navy → midnight blue background
 */

const COLORS = [
  [80,  160, 255],  // bright blue
  [100, 120, 255],  // blue-violet
  [140,  90, 255],  // violet
  [60,  200, 255],  // cyan
  [200, 160, 255],  // lavender
];

function rand(a, b) { return Math.random() * (b - a) + a; }
function pickCol() { return COLORS[Math.floor(Math.random() * COLORS.length)]; }

// Adaptive count based on device performance
function particleCount() {
  const w = window.innerWidth;
  if (w < 480)  return 350;
  if (w < 768)  return 550;
  if (w < 1280) return 900;
  return 1400;
}

function connectionDist() {
  return window.innerWidth < 768 ? 90 : 130;
}

class Dot {
  constructor(w, h) { this.init(w, h); }

  init(w, h) {
    this.x  = rand(0, w);
    this.y  = rand(0, h);
    this.z  = rand(0.1, 1.0);           // depth: 0.1=far, 1=near
    this.r  = rand(0.8, 2.2) * this.z;
    this.vx = rand(-0.18, 0.18) * this.z;
    this.vy = rand(-0.12, 0.18) * this.z;
    this.wf = rand(0.0005, 0.0022);     // wave frequency
    this.wp = rand(0, Math.PI * 2);     // wave phase
    this.wa = rand(0.2, 0.9) * this.z; // wave amplitude
    this.rgb = pickCol();
    this.alpha = rand(0.35, 0.85) * (0.4 + this.z * 0.6);
  }

  update(w, h, mx, my, t) {
    const waveX = Math.sin(t * this.wf + this.wp) * this.wa;
    const waveY = Math.cos(t * this.wf * 1.4 + this.wp) * this.wa * 0.6;

    this.x += this.vx + waveX;
    this.y += this.vy + waveY;

    // Soft attraction toward mouse (not repulsion — closer to reference)
    if (mx !== null && my !== null) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const d2 = dx * dx + dy * dy;
      const R  = 180;
      if (d2 < R * R) {
        const d = Math.sqrt(d2);
        const f = ((R - d) / R) * 0.018 * this.z;
        this.x += dx * f;
        this.y += dy * f;
      }
    }

    // Wrap edges
    if (this.x < -4)    this.x = w + 4;
    if (this.x > w + 4) this.x = -4;
    if (this.y < -4)    this.y = h + 4;
    if (this.y > h + 4) this.y = -4;
  }

  draw(ctx) {
    const [r, g, b] = this.rgb;
    // Core dot
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
    ctx.fill();

    // Glow halo for foreground particles
    if (this.z > 0.55) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.r * 3
      );
      grad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 0.3})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }
}

const CosmicParticleField = () => {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: null, y: null });
  const stateRef  = useRef({ particles: [], w: 0, h: 0, t: 0, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;

    const resize = () => {
      S.w = canvas.width  = window.innerWidth;
      S.h = canvas.height = window.innerHeight;
      const n = particleCount();
      S.particles = Array.from({ length: n }, () => new Dot(S.w, S.h));
    };
    resize();

    const onMove  = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = ()  => { mouse.current.x = null;      mouse.current.y = null; };
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",     resize);

    /* ── Background ─────────────────────────────────────────── */
    const drawBg = (w, h) => {
      // Primary deep space gradient
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0,    "#010614");   // top-left: near black
      bg.addColorStop(0.45, "#020b24");   // centre: deep navy
      bg.addColorStop(1,    "#010514");   // bottom-right: near black
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebula glow blobs (static, repainted each frame for nebula shift)
      const nebula = (cx, cy, rad, r, g, b, a) => {
        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        gr.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      };

      nebula(w * 0.5,  h * 0.5,  w * 0.55, 20, 40, 130, 0.22);  // central blue glow
      nebula(w * 0.15, h * 0.3,  w * 0.3,  40, 20, 160, 0.12);  // left purple
      nebula(w * 0.85, h * 0.6,  w * 0.3,  20, 60, 180, 0.12);  // right blue
      nebula(w * 0.5,  h * 0.85, w * 0.28, 60, 20, 140, 0.09);  // bottom violet
    };

    /* ── Connections ────────────────────────────────────────── */
    const drawEdges = (particles, connDist) => {
      const dsq = connDist * connDist;
      const n   = particles.length;

      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b   = particles[j];
          const dx  = a.x - b.x;
          const dy  = a.y - b.y;
          const d2  = dx * dx + dy * dy;
          if (d2 > dsq) continue;

          const d     = Math.sqrt(d2);
          const ratio = 1 - d / connDist;
          // Depth-weighted opacity — closer particles make brighter lines
          const op  = ratio * ratio * 0.55 * Math.min(a.z, b.z);

          // Colour: blend the two particle colours
          const [ar, ag, ab] = a.rgb;
          const [br, bg, bb] = b.rgb;
          const mr = (ar + br) >> 1;
          const mg = (ag + bg) >> 1;
          const mb = (ab + bb) >> 1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${mr},${mg},${mb},${op})`;
          ctx.lineWidth   = ratio * 1.1 * Math.min(a.z, b.z);
          ctx.stroke();
        }
      }
    };

    /* ── Main loop ──────────────────────────────────────────── */
    const loop = () => {
      S.t++;
      const { w, h, particles, t } = S;
      const mx  = mouse.current.x;
      const my  = mouse.current.y;
      const cDist = connectionDist();

      ctx.clearRect(0, 0, w, h);
      drawBg(w, h);

      for (const p of particles) p.update(w, h, mx, my, t);
      drawEdges(particles, cDist);
      for (const p of particles) p.draw(ctx);

      S.raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(S.raf);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default CosmicParticleField;
