import React, { useEffect, useRef } from "react";

const InteractiveCyberGrid = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Responsive Canvas Resizing
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d', { alpha: false });

    const resizeCanvas = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      bgCanvas.width = w;
      bgCanvas.height = h;

      // Pre-draw static background to bgCanvas
      const bgGrad = bgCtx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#030412");   // Midnight primary
      bgGrad.addColorStop(0.5, "#06091f"); // Midnight secondary
      bgGrad.addColorStop(1, "#161a31");   // Navy
      bgCtx.fillStyle = bgGrad;
      bgCtx.fillRect(0, 0, w, h);

      // Draw futuristic digital grid lines (Perspective)
      bgCtx.strokeStyle = "rgba(92, 51, 204, 0.07)"; // Royal purple grid
      bgCtx.lineWidth = 1;
      
      const gridSpacing = 80;
      const vanishingPointY = h * 0.3; // Perspective vanishing point

      // Vertical perspective lines
      const lineCount = 20;
      for (let i = -lineCount; i <= lineCount; i++) {
        bgCtx.beginPath();
        const startX = w / 2 + (i * gridSpacing);
        const endX = w / 2 + (i * gridSpacing * 3.5);
        bgCtx.moveTo(startX, vanishingPointY);
        bgCtx.lineTo(endX, h);
        bgCtx.stroke();
      }

      // Horizontal lines (closer as they approach the horizon)
      let currentY = vanishingPointY;
      let gap = 10;
      while (currentY < h) {
        bgCtx.beginPath();
        bgCtx.moveTo(0, currentY);
        bgCtx.lineTo(w, currentY);
        bgCtx.stroke();
        gap *= 1.25; // exponential gap for depth perspective
        currentY += gap;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class definition
    class Particle {
      constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
        this.color = Math.random() > 0.5 ? "#33c2cc" : "#ea4884"; // Cyan or Pink
        this.pulseSpeed = Math.random() * 0.05 + 0.01;
        this.pulseAngle = Math.random() * Math.PI;
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Pulse size
        this.pulseAngle += this.pulseSpeed;
      }

      draw(context) {
        const radiusPulse = this.radius + Math.sin(this.pulseAngle) * 0.5;
        context.beginPath();
        context.arc(this.x, this.y, radiusPulse, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowBlur = 8;
        context.shadowColor = this.color;
        context.fill();
        context.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 36000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    // Main draw loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Draw cached background and grid
      ctx.drawImage(bgCanvas, 0, 0);

      // Update and draw connections (lines)
      const maxDistance = 120;
      const mouseMaxDistance = 165;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(w, h);
        p1.draw(ctx);

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(122, 87, 219, ${alpha})`; // Lavender lines
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouseRef.current.active && mouseRef.current.x !== null) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseMaxDistance) {
            const malpha = (1 - mdist / mouseMaxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(51, 194, 204, ${malpha})`; // Cyan neon lines to mouse
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Pull particle slightly toward/away from mouse for interactivity
            const force = (mouseMaxDistance - mdist) / mouseMaxDistance;
            p1.x += (mdx / mdist) * force * 0.8;
            p1.y += (mdy / mdist) * force * 0.8;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Clean up
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
      style={{ zIndex: -50 }}
    />
  );
};

export default InteractiveCyberGrid;
