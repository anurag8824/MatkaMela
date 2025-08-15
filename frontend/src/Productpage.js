// import React, { useEffect, useRef, useState } from "react";

// // Default export: drop this into any React app and render <CarRoadGame />
// // Styling uses Tailwind utility classes (optional). No assets required.

// export default function CarRoadGame() {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const lastTimeRef = useRef(0);

//   // World state
//   const [isRunning, setIsRunning] = useState(true);
//   const [showHUD, setShowHUD] = useState(true);

//   // Input state
//   const inputRef = useRef({ left: false, right: false, up: false, down: false });

//   // Car state (mutable for perf inside RAF)
//   const carRef = useRef({
//     x: 0, // will be centered on mount
//     y: 0,
//     vx: 0,
//     speed: 0, // forward speed (world scroll speed)
//   });

//   // Road/World config (constants)
//   const cfg = useRef({
//     lanes: 3,
//     laneWidth: 120, // in world px (will scale to canvas)
//     roadMargin: 40,
//     roadColor: "#2e2e2e",
//     shoulderColor: "#3a3a3a",
//     grassColor: "#0f5d2f",
//     lineColor: "#f0f0f0",
//     carColor: "#2dd4bf",
//     carShadow: "rgba(0,0,0,0.35)",

//     maxSpeed: 900, // px/sec
//     accel: 850, // px/sec^2
//     brakeDecel: 1400, // px/sec^2
//     friction: 400, // px/sec^2 natural slowdown
//     turnAccel: 2200, // px/sec^2 lateral
//     turnFriction: 1800, // px/sec^2 lateral damp

//     dashLength: 40,
//     dashGap: 30,
//   });

//   // Resize canvas to device pixel ratio for crisp rendering
//   const resizeCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const parent = canvas.parentElement;
//     const dpr = Math.min(window.devicePixelRatio || 1, 2);
//     const width = parent.clientWidth;
//     const height = parent.clientHeight;
//     canvas.style.width = width + "px";
//     canvas.style.height = height + "px";
//     canvas.width = Math.floor(width * dpr);
//     canvas.height = Math.floor(height * dpr);
//   };

//   useEffect(() => {
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, []);

//   // Input handlers
//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (["ArrowLeft", "a", "A"].includes(e.key)) inputRef.current.left = true;
//       if (["ArrowRight", "d", "D"].includes(e.key)) inputRef.current.right = true;
//       if (["ArrowUp", "w", "W"].includes(e.key)) inputRef.current.up = true;
//       if (["ArrowDown", "s", "S"].includes(e.key)) inputRef.current.down = true;

//       if (e.key === " ") {
//         // space toggles pause
//         setIsRunning((r) => !r);
//       }
//     };
//     const onKeyUp = (e) => {
//       if (["ArrowLeft", "a", "A"].includes(e.key)) inputRef.current.left = false;
//       if (["ArrowRight", "d", "D"].includes(e.key)) inputRef.current.right = false;
//       if (["ArrowUp", "w", "W"].includes(e.key)) inputRef.current.up = false;
//       if (["ArrowDown", "s", "S"].includes(e.key)) inputRef.current.down = false;
//     };
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("keyup", onKeyUp);
//     return () => {
//       window.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("keyup", onKeyUp);
//     };
//   }, []);

//   // Touch buttons helpers
//   const press = (dir, v) => {
//     inputRef.current[dir] = v;
//   };

//   // Initialize car position after first paint
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const dpr = Math.min(window.devicePixelRatio || 1, 2);
//     const w = canvas.width / dpr;
//     const h = canvas.height / dpr;

//     const totalRoadWidth = cfg.current.lanes * cfg.current.laneWidth;
//     const roadLeft = (w - totalRoadWidth) / 2;
//     carRef.current.x = roadLeft + totalRoadWidth / 2; // center lane
//     carRef.current.y = h * 0.78;
//     carRef.current.vx = 0;
//     carRef.current.speed = 0;
//   }, []);

//   // Main loop
//   useEffect(() => {
//     const loop = (t) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const ctx = canvas.getContext("2d");
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       const w = canvas.width / dpr;
//       const h = canvas.height / dpr;

//       // delta seconds
//       let dt = 0;
//       if (lastTimeRef.current) dt = Math.min((t - lastTimeRef.current) / 1000, 0.033);
//       lastTimeRef.current = t;

//       // Update physics only if running
//       if (isRunning) {
//         const car = carRef.current;
//         const C = cfg.current;

//         // Forward speed
//         if (inputRef.current.up) {
//           car.speed += C.accel * dt;
//         } else if (inputRef.current.down) {
//           car.speed -= C.brakeDecel * dt;
//         } else {
//           // natural friction
//           if (car.speed > 0) car.speed = Math.max(0, car.speed - C.friction * dt);
//           else car.speed = Math.min(0, car.speed + C.friction * dt);
//         }
//         car.speed = Math.max(0, Math.min(C.maxSpeed, car.speed));

//         // Lateral movement (x)
//         const targetAx = (inputRef.current.left ? -1 : 0) + (inputRef.current.right ? 1 : 0);
//         car.vx += targetAx * C.turnAccel * dt;
//         // apply lateral friction
//         if (car.vx > 0) car.vx = Math.max(0, car.vx - C.turnFriction * dt);
//         else if (car.vx < 0) car.vx = Math.min(0, car.vx + C.turnFriction * dt);

//         car.x += car.vx * dt;

//         // Keep car on road
//         const totalRoadWidth = C.lanes * C.laneWidth;
//         const roadLeft = (w - totalRoadWidth) / 2;
//         const minX = roadLeft + C.roadMargin;
//         const maxX = roadLeft + totalRoadWidth - C.roadMargin;
//         if (car.x < minX) {
//           car.x = minX;
//           car.vx = 0;
//         }
//         if (car.x > maxX) {
//           car.x = maxX;
//           car.vx = 0;
//         }
//       }

//       // Render
//       drawScene(ctx, w, h, dpr);

//       rafRef.current = requestAnimationFrame(loop);
//     };

//     rafRef.current = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [isRunning]);

//   const drawScene = (ctx, w, h, dpr) => {
//     const C = cfg.current;
//     const car = carRef.current;

//     // scale to handle HiDPI
//     ctx.save();
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     // background grass
//     ctx.fillStyle = C.grassColor;
//     ctx.fillRect(0, 0, w, h);

//     const totalRoadWidth = C.lanes * C.laneWidth;
//     const roadLeft = (w - totalRoadWidth) / 2;

//     // shoulders
//     ctx.fillStyle = C.shoulderColor;
//     ctx.fillRect(roadLeft - C.roadMargin, 0, totalRoadWidth + 2 * C.roadMargin, h);

//     // road
//     ctx.fillStyle = C.roadColor;
//     ctx.fillRect(roadLeft, 0, totalRoadWidth, h);

//     // lane markers (moving to simulate forward motion)
//     ctx.strokeStyle = C.lineColor;
//     ctx.lineWidth = 6;
//     ctx.setLineDash([C.dashLength, C.dashGap]);
//     const offset = (performance.now() / 1000) * (car.speed * 0.6); // scroll speed
//     ctx.lineDashOffset = -offset;
//     for (let i = 1; i < C.lanes; i++) {
//       const x = roadLeft + i * C.laneWidth;
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, h);
//       ctx.stroke();
//     }

//     // center line solid at edges
//     ctx.setLineDash([]);
//     ctx.lineWidth = 8;
//     ctx.strokeStyle = "#d9d9d9";
//     ctx.beginPath();
//     ctx.moveTo(roadLeft, 0);
//     ctx.lineTo(roadLeft, h);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(roadLeft + totalRoadWidth, 0);
//     ctx.lineTo(roadLeft + totalRoadWidth, h);
//     ctx.stroke();

//     // draw car
//     drawCar(ctx, car.x, car.y, C);

//     // HUD
//     if (showHUD) drawHUD(ctx, w, h, car, C);

//     ctx.restore();
//   };

//   const drawCar = (ctx, cx, cy, C) => {
//     const carW = 56;
//     const carH = 96;

//     // shadow
//     ctx.save();
//     ctx.translate(cx, cy);
//     ctx.fillStyle = C.carShadow;
//     ctx.beginPath();
//     roundedRectPath(ctx, -carW / 2 + 6, -carH / 2 + 10, carW, carH, 14);
//     ctx.fill();

//     // body
//     ctx.fillStyle = C.carColor;
//     ctx.beginPath();
//     roundedRectPath(ctx, -carW / 2, -carH / 2, carW, carH, 14);
//     ctx.fill();

//     // windshield & details
//     ctx.fillStyle = "#073b4c";
//     roundedRect(ctx, -carW * 0.32, -carH * 0.34, carW * 0.64, carH * 0.28, 10);

//     // lights
//     ctx.fillStyle = "#ffd166";
//     roundedRect(ctx, -carW * 0.36, -carH * 0.5 + 6, carW * 0.28, 10, 4);
//     roundedRect(ctx, carW * 0.08, -carH * 0.5 + 6, carW * 0.28, 10, 4);

//     // wheels
//     ctx.fillStyle = "#1f2937";
//     roundedRect(ctx, -carW / 2 - 6, -carH * 0.30, 12, 30, 6);
//     roundedRect(ctx, -carW / 2 - 6, carH * 0.10, 12, 30, 6);
//     roundedRect(ctx, carW / 2 - 6, -carH * 0.30, 12, 30, 6);
//     roundedRect(ctx, carW / 2 - 6, carH * 0.10, 12, 30, 6);

//     ctx.restore();
//   };

//   const drawHUD = (ctx, w, h, car, C) => {
//     ctx.save();
//     ctx.globalAlpha = 0.9;

//     const pad = 16;
//     const hudW = 196;
//     const hudH = 88;

//     // card bg
//     ctx.fillStyle = "rgba(17,24,39,0.7)"; // slate-900/70
//     roundedRectPath(ctx, pad, pad, hudW, hudH, 14);
//     ctx.fill();

//     // text
//     ctx.fillStyle = "white";
//     ctx.font = "600 16px Inter, ui-sans-serif, system-ui";
//     ctx.fillText("SPEED", pad + 14, pad + 26);

//     const kmh = Math.round(car.speed * 0.36); // px/s -> km/h-ish
//     ctx.font = "700 28px Inter, ui-sans-serif, system-ui";
//     ctx.fillText(`${kmh} km/h`, pad + 14, pad + 56);

//     ctx.font = "500 12px Inter, ui-sans-serif, system-ui";
//     ctx.fillText("Arrows/WASD to drive", pad + 14, pad + 76);

//     // right tip
//     const rpad = 16;
//     const tip = "SPACE = Pause/Resume";
//     const textW = ctx.measureText(tip).width;
//     ctx.fillStyle = "rgba(17,24,39,0.7)";
//     roundedRectPath(ctx, w - textW - 40 - rpad, pad, textW + 40, 36, 12);
//     ctx.fill();
//     ctx.fillStyle = "white";
//     ctx.font = "600 14px Inter, ui-sans-serif, system-ui";
//     ctx.fillText(tip, w - textW - 20 - rpad, pad + 24);

//     ctx.restore();
//   };

//   // Helpers
//   function roundedRectPath(ctx, x, y, w, h, r) {
//     const rr = Math.min(r, w / 2, h / 2);
//     ctx.beginPath();
//     ctx.moveTo(x + rr, y);
//     ctx.arcTo(x + w, y, x + w, y + h, rr);
//     ctx.arcTo(x + w, y + h, x, y + h, rr);
//     ctx.arcTo(x, y + h, x, y, rr);
//     ctx.arcTo(x, y, x + w, y, rr);
//     ctx.closePath();
//   }
//   function roundedRect(ctx, x, y, w, h, r) {
//     roundedRectPath(ctx, x, y, w, h, r);
//     ctx.fill();
//   }

//   return (
//     <div className="relative w-full h-[80vh] sm:h-[86vh] md:h-[92vh] bg-black overflow-hidden select-none">
//       {/* Canvas */}
//       <canvas ref={canvasRef} className="block w-full h-full" />

//       {/* Top controls */}
//       <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
//         <button
//           onClick={() => setIsRunning((v) => !v)}
//           className="px-3 py-1.5 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 hover:bg-white/20 transition"
//         >
//           {isRunning ? "Pause" : "Resume"}
//         </button>
//         <button
//           onClick={() => setShowHUD((v) => !v)}
//           className="px-3 py-1.5 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 hover:bg-white/20 transition"
//         >
//           {showHUD ? "Hide HUD" : "Show HUD"}
//         </button>
//         <button
//           onClick={() => {
//             // reset
//             const canvas = canvasRef.current;
//             if (!canvas) return;
//             const dpr = Math.min(window.devicePixelRatio || 1, 2);
//             const w = canvas.width / dpr;
//             const h = canvas.height / dpr;
//             const totalRoadWidth = cfg.current.lanes * cfg.current.laneWidth;
//             const roadLeft = (w - totalRoadWidth) / 2;
//             carRef.current.x = roadLeft + totalRoadWidth / 2;
//             carRef.current.y = h * 0.78;
//             carRef.current.vx = 0;
//             carRef.current.speed = 0;
//           }}
//           className="px-3 py-1.5 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 hover:bg-white/20 transition"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Mobile Controls */}
//       <div className="absolute bottom-4 inset-x-0 px-4 flex items-end justify-between z-10">
//         {/* Left/Right */}
//         <div className="flex gap-3">
//           <button
//             onPointerDown={() => press("left", true)}
//             onPointerUp={() => press("left", false)}
//             onPointerCancel={() => press("left", false)}
//             className="w-16 h-16 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 active:scale-95 transition flex items-center justify-center"
//             aria-label="Left"
//           >
//             ◀
//           </button>
//           <button
//             onPointerDown={() => press("right", true)}
//             onPointerUp={() => press("right", false)}
//             onPointerCancel={() => press("right", false)}
//             className="w-16 h-16 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 active:scale-95 transition flex items-center justify-center"
//             aria-label="Right"
//           >
//             ▶
//           </button>
//         </div>

//         {/* Up/Down */}
//         <div className="flex gap-3">
//           <button
//             onPointerDown={() => press("down", true)}
//             onPointerUp={() => press("down", false)}
//             onPointerCancel={() => press("down", false)}
//             className="w-20 h-16 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 active:scale-95 transition flex items-center justify-center"
//             aria-label="Brake"
//           >
//             Brake
//           </button>
//           <button
//             onPointerDown={() => press("up", true)}
//             onPointerUp={() => press("up", false)}
//             onPointerCancel={() => press("up", false)}
//             className="w-20 h-16 rounded-2xl bg-white/10 text-white backdrop-blur border border-white/20 active:scale-95 transition flex items-center justify-center"
//             aria-label="Accelerate"
//           >
//             Boost
//           </button>
//         </div>
//       </div>

//       {/* Instructions banner (desktop hint) */}
//       <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 text-white/80 text-sm sm:text-base z-10">
//         Use <span className="font-semibold">← →</span> to steer, <span className="font-semibold">↑</span> to accelerate, <span className="font-semibold">↓</span> to brake. <span className="font-semibold">Space</span> to pause.
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";

// Drop-in component: <ParticleCursorTrail />
// - Smooth particle trail that follows the cursor
// - HiDPI crisp rendering, pooling for performance, configurable props
// - Works with mouse + touch (multitouch spawns trails for each touch)

export default function ParticleCursorTrail({
  maxParticles = 500,
  spawnPerMove = 10,
  sizeRange = [2, 6],
  lifeRange = [0.6, 1.6], // seconds
  speedRange = [40, 220], // px/sec
  fadePower = 1.6, // higher -> longer visible tail at end of life
  additiveBlend = true, // pretty glow
  colors = ["#60a5fa", "#22d3ee", "#34d399", "#f59e0b", "#f472b6"],
  className = "w-full h-[70vh] bg-zinc-950 rounded-2xl overflow-hidden",
} = {}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dprRef = useRef(1);
  const pointerRef = useRef({ x: 0, y: 0, active: false, moved: false });
  const [stats, setStats] = useState({ fps: 0, count: 0 });

  // Particle pool
  const poolRef = useRef([]); // inactive
  const liveRef = useRef([]); // active
  const hueShiftRef = useRef(0);

  // Utils
  const rand = (a, b) => a + Math.random() * (b - a);
  const choice = (arr) => arr[(Math.random() * arr.length) | 0];

  const resize = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const parent = cvs.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    cvs.style.width = w + "px";
    cvs.style.height = h + "px";
    cvs.width = Math.floor(w * dpr);
    cvs.height = Math.floor(h * dpr);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Pointer handling (mouse + touch)
  useEffect(() => {
    const root = canvasRef.current?.parentElement ?? window;

    const onMove = (x, y) => {
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.moved = true;
      pointerRef.current.active = true;
    };

    const onMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      onMove(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onMouseLeave = () => (pointerRef.current.active = false);

    const onTouch = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      for (const t of e.touches) {
        onMove(t.clientX - rect.left, t.clientY - rect.top);
      }
    };

    root.addEventListener("mousemove", onMouseMove, { passive: true });
    root.addEventListener("mouseleave", onMouseLeave, { passive: true });
    root.addEventListener("touchstart", onTouch, { passive: true });
    root.addEventListener("touchmove", onTouch, { passive: true });
    root.addEventListener("touchend", onMouseLeave, { passive: true });

    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("mouseleave", onMouseLeave);
      root.removeEventListener("touchstart", onTouch);
      root.removeEventListener("touchmove", onTouch);
      root.removeEventListener("touchend", onMouseLeave);
    };
  }, []);

  // Create a particle object
  const makeParticle = (x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = rand(speedRange[0], speedRange[1]);
    const life = rand(lifeRange[0], lifeRange[1]);
    const size = rand(sizeRange[0], sizeRange[1]);
    const col = choice(colors);
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      age: 0,
      size,
      color: col,
    };
  };

  const spawnAt = (x, y, count) => {
    for (let i = 0; i < count; i++) {
      let p = poolRef.current.pop();
      if (!p) p = makeParticle(x, y);
      else Object.assign(p, makeParticle(x, y));
      liveRef.current.push(p);
      if (liveRef.current.length > maxParticles) {
        poolRef.current.push(liveRef.current.shift());
      }
    }
  };

  useEffect(() => {
    let fpsTimer = 0;

    const tick = (t) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext("2d");
      const dpr = dprRef.current;
      const w = cvs.width / dpr;
      const h = cvs.height / dpr;

      let dt = 0;
      if (lastTimeRef.current) dt = Math.min((t - lastTimeRef.current) / 1000, 0.033);
      lastTimeRef.current = t;

      // Spawn on movement (also slowly when idle & active)
      if (pointerRef.current.active) {
        const base = pointerRef.current.moved ? spawnPerMove : Math.max(1, spawnPerMove >> 2);
        spawnAt(pointerRef.current.x, pointerRef.current.y, base);
        pointerRef.current.moved = false;
      }

      // Physics update
      const friction = 0.98; // slight slowdown per frame
      for (let i = liveRef.current.length - 1; i >= 0; i--) {
        const p = liveRef.current[i];
        p.age += dt;
        if (p.age >= p.life) {
          poolRef.current.push(liveRef.current.splice(i, 1)[0]);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= friction;
        p.vy *= friction;
      }

      // Render
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Motion blur-ish trail: slight alpha clear
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      // Optional additive glow
      ctx.globalCompositeOperation = additiveBlend ? "lighter" : "source-over";

      for (let i = 0; i < liveRef.current.length; i++) {
        const p = liveRef.current[i];
        const tnorm = Math.min(1, p.age / p.life);
        const alpha = 1 - Math.pow(tnorm, fadePower);
        ctx.globalAlpha = Math.max(0, alpha);

        // Soft circle
        const r = p.size * (1 + (1 - tnorm) * 0.4);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, withAlpha(p.color, 0.9));
        g.addColorStop(1, withAlpha(p.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // UI stats (1/sec)
      fpsTimer += dt;
      if (fpsTimer > 1) {
        setStats({ fps: Math.round(1 / dt), count: liveRef.current.length });
        fpsTimer = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [additiveBlend, spawnPerMove, fadePower, colors.join(",")]);

  const withAlpha = (hex, a) => {
    // accepts #rgb, #rrggbb — returns rgba(r,g,b,a)
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full"/>

      {/* Minimal overlay controls (optional) */}
      <div className="absolute top-3 right-3 text-white/90 text-xs sm:text-sm px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur border border-white/10 flex items-center gap-3">
        <span className="hidden sm:inline">Particles: {stats.count}</span>
        <span>{stats.fps} FPS</span>
      </div>

      {/* Helper text */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 text-white/70 text-xs sm:text-sm">
        Move mouse or touch to paint particles ✨
      </div>
    </div>
  );
}
