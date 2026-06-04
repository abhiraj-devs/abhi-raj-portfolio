import React, { useEffect, useRef } from "react";

const FuturisticGalaxy = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, targetX: null, targetY: null, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Center coordinates and tracking
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let targetCenterX = centerX;
    let targetCenterY = centerY;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      targetCenterX = canvas.width / 2;
      targetCenterY = canvas.height / 2;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class representing stars in the galaxy
    class Star {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        // Randomly assign to one of the 3 spiral arms
        this.arm = Math.floor(Math.random() * 3);
        
        // Distribution of stars relative to canvas dimensions (more near core)
        const rand = Math.random();
        this.orbitFraction = init 
          ? rand * 0.45
          : Math.pow(rand, 2.5) * 0.45;
        
        // Base spiral angle + offset scatter
        const armAngle = (this.arm * 2 * Math.PI) / 3;
        const spiralFactor = 3.2;
        this.angle = armAngle + (this.orbitFraction * spiralFactor * 4) + (Math.random() - 0.5) * 0.35;
        
        // Keplerian-like orbit velocity: faster closer to center
        this.speed = (0.0006 + (1 / (this.orbitFraction * 600 + 10)) * 0.06) * (0.85 + Math.random() * 0.3);
        
        // Size and brightness (slightly larger for premium visibility)
        this.size = Math.random() * 2.0 + 0.6;
        
        // Select color matching galaxy theme
        const colorRand = Math.random();
        if (colorRand < 0.4) {
          this.color = "#33c2cc"; // Electric Aqua
        } else if (colorRand < 0.7) {
          this.color = "#ca2f8c"; // Futuristic Fuchsia
        } else if (colorRand < 0.92) {
          this.color = "#7a57db"; // Cosmic Lavender
        } else {
          this.color = "#ffffff"; // Bright Starlight
        }
        
        // Glow pulse
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseAngle = Math.random() * Math.PI;
      }

      update() {
        // Increment orbit angle
        this.angle += this.speed;
        this.pulseAngle += this.pulseSpeed;
        
        // Slow outward drift
        this.orbitFraction += 0.00008;
        if (this.orbitFraction > 0.52) {
          this.reset(false);
        }
      }

      draw(context, cx, cy, w, h) {
        // Compute absolute radius from relative fraction
        const radius = this.orbitFraction * Math.min(w, h);
        const x = cx + Math.cos(this.angle) * radius;
        const y = cy + Math.sin(this.angle) * radius;

        // Size pulsing
        const sizePulse = this.size * (0.75 + Math.sin(this.pulseAngle) * 0.25);

        context.beginPath();
        context.arc(x, y, sizePulse, 0, Math.PI * 2);
        context.fillStyle = this.color;
        
        // Draw subtle glow on brighter stars
        if (this.size > 1.5) {
          context.shadowBlur = 8;
          context.shadowColor = this.color;
        }
        
        context.fill();
        context.shadowBlur = 0; // Reset
      }
    }

    // Initialize Stars
    const starCount = 450;
    const stars = Array.from({ length: starCount }, () => new Star());

    // Mouse Tracking Event Handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      
      mouseRef.current.targetX = mx;
      mouseRef.current.targetY = my;
      mouseRef.current.active = true;

      // Parallax effect: Shift target center of galaxy slightly towards mouse position
      const deltaX = mx - canvas.width / 2;
      const deltaY = my - canvas.height / 2;
      targetCenterX = canvas.width / 2 + deltaX * 0.12;
      targetCenterY = canvas.height / 2 + deltaY * 0.12;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetCenterX = canvas.width / 2;
      targetCenterY = canvas.height / 2;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Easing galaxy center position toward targets (lerp parallax)
      centerX += (targetCenterX - centerX) * 0.04;
      centerY += (targetCenterY - centerY) * 0.04;

      // Semi-transparent overlay to draw orbit trails
      ctx.fillStyle = "rgba(3, 4, 18, 0.16)"; // Very dark space navy
      ctx.fillRect(0, 0, w, h);

      // Render glowing core gradient (nebula black hole center)
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(w, h) * 0.18);
      coreGlow.addColorStop(0, "rgba(92, 51, 204, 0.38)");  // Deep royal core glow
      coreGlow.addColorStop(0.3, "rgba(202, 47, 140, 0.18)"); // Fuchsia cloud
      coreGlow.addColorStop(0.7, "rgba(51, 194, 204, 0.06)");  // Aqua ring edge
      coreGlow.addColorStop(1, "rgba(3, 4, 18, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(w, h) * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Render star dust clouds along the arms (broad nebula arcs)
      for (let arm = 0; arm < 3; arm++) {
        const armAngle = (arm * 2 * Math.PI) / 3;
        ctx.save();
        ctx.beginPath();
        const steps = 30;
        const maxRad = Math.min(w, h) * 0.42;
        for (let i = 0; i <= steps; i++) {
          const r = (i / steps) * maxRad;
          const theta = armAngle + (r * 0.005 * 3.2);
          const x = centerX + Math.cos(theta) * r;
          const y = centerY + Math.sin(theta) * r;
          
          const cloudGrad = ctx.createRadialGradient(x, y, 0, x, y, 15 + r * 0.08);
          const cloudColor = arm === 0 ? "rgba(51, 194, 204, 0.015)" : arm === 1 ? "rgba(202, 47, 140, 0.012)" : "rgba(122, 87, 219, 0.015)";
          cloudGrad.addColorStop(0, cloudColor);
          cloudGrad.addColorStop(1, "rgba(3, 4, 18, 0)");
          
          ctx.fillStyle = cloudGrad;
          ctx.beginPath();
          ctx.arc(x, y, 20 + r * 0.1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Update and Draw Stars
      stars.forEach(star => {
        star.update();
        star.draw(ctx, centerX, centerY, w, h);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default FuturisticGalaxy;
