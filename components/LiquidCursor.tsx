"use client";
import { useEffect, useRef } from "react";

export function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const target = { x: W / 2, y: H / 2 };

    // Main body — follows at 0.08
    const pos   = { x: W / 2, y: H / 2 };
    // Trailing pool — follows much slower for the watery drip lag
    const trail = { x: W / 2, y: H / 2 };

    // Velocity tracking for directional stretch
    let prevX = W / 2, prevY = H / 2;

    let rafId = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const t = (now - start) * 0.001;

      // ── Lerp positions ───────────────────────────────────────────────
      pos.x   += (target.x - pos.x)   * 0.08;
      pos.y   += (target.y - pos.y)   * 0.08;
      trail.x += (pos.x   - trail.x)  * 0.032; // much slower — watery lag
      trail.y += (pos.y   - trail.y)  * 0.032;

      // ── Velocity → directional stretch ───────────────────────────────
      const velX  = pos.x - prevX;
      const velY  = pos.y - prevY;
      prevX = pos.x; prevY = pos.y;
      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX);
      // Stretch up to 55% in travel direction, compress perpendicularly
      const sX = 1 + Math.min(speed * 0.018, 0.55);
      const sY = Math.max(1 / sX, 0.55);

      // ── Organic sine distortion ──────────────────────────────────────
      const distX = Math.sin(t * 0.65 + 1.0) * 28;
      const distY = Math.cos(t * 0.48 + 2.2) * 22;
      const bx = pos.x + distX;
      const by = pos.y + distY;

      // ── Breathing radius (much larger now) ──────────────────────────
      const r = 170 + Math.sin(t * 0.9) * 22;

      ctx.clearRect(0, 0, W, H);

      // ════════════════════════════════════════════════════════════════
      // LAYER 1 — Trailing watery pool (slow-following, very spread out)
      // ════════════════════════════════════════════════════════════════
      ctx.save();
      ctx.filter = "blur(80px)";
      const tGrad = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, r * 2.8);
      tGrad.addColorStop(0,    "rgba(0, 0, 0, 0.55)");
      tGrad.addColorStop(0.3,  "rgba(0, 0, 0, 0.28)");
      tGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.08)");
      tGrad.addColorStop(1,    "rgba(0, 0, 0, 0)");
      ctx.fillStyle = tGrad;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ════════════════════════════════════════════════════════════════
      // LAYER 2 — Main blob, stretched in movement direction
      // ════════════════════════════════════════════════════════════════
      ctx.save();
      ctx.filter = "blur(65px)";
      ctx.translate(bx, by);
      ctx.rotate(angle);
      ctx.scale(sX, sY);

      const mainGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.0);
      mainGrad.addColorStop(0,    "rgba(0, 0, 0, 0.90)");
      mainGrad.addColorStop(0.25, "rgba(0, 0, 0, 0.60)");
      mainGrad.addColorStop(0.55, "rgba(0, 0, 0, 0.22)");
      mainGrad.addColorStop(0.80, "rgba(0, 0, 0, 0.06)");
      mainGrad.addColorStop(1,    "rgba(0, 0, 0, 0)");

      ctx.fillStyle = mainGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ════════════════════════════════════════════════════════════════
      // LAYER 3 — Inner concentrated core (tighter, sharper dark centre)
      // ════════════════════════════════════════════════════════════════
      ctx.save();
      ctx.filter = "blur(22px)";
      const coreGrad = ctx.createRadialGradient(bx, by, 0, bx, by, r * 0.7);
      coreGrad.addColorStop(0,   "rgba(0, 0, 0, 0.95)");
      coreGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.45)");
      coreGrad.addColorStop(1,   "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ════════════════════════════════════════════════════════════════
      // LAYER 4 — Blue edge glow (screen blend, wide radius)
      // ════════════════════════════════════════════════════════════════
      const gx = pos.x + Math.cos(t * 0.85 + 0.5) * 32;
      const gy = pos.y + Math.sin(t * 1.05 + 1.2) * 26;
      const gr = r * 4.2;

      ctx.save();
      ctx.filter = "blur(100px)";
      ctx.globalCompositeOperation = "screen";
      const glowGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      glowGrad.addColorStop(0,    "rgba(44, 62, 168, 0.50)");
      glowGrad.addColorStop(0.35, "rgba(44, 62, 168, 0.28)");
      glowGrad.addColorStop(0.65, "rgba(44, 62, 168, 0.10)");
      glowGrad.addColorStop(1,    "rgba(44, 62, 168, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 30, pointerEvents: "none" }}
    />
  );
}
