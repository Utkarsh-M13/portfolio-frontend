import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const DOT = 2;
const GAP = 14;

const AMP = 12;           // per-source displacement (px)
const SIGMA = 36;          // influence radius (px) — tighter
const PERIOD_S = 6;       // slower global “breathing” (s)
const TAU_SMOOTH = 1.2;    // more floaty

const MIN_SOURCES = 200;    // never fewer than this
const MAX_SOURCES = 240;    // upper cap
const LIFE_MIN = 6;       // s
const LIFE_MAX = 10;       // s
const SPAWN_MIN = 2.5;     // s
const SPAWN_MAX = 4.0;     // s
const DRIFT = 0.05;        // rad/s (slower direction drift)

const BASE_AMP = 0.3;      // px (smaller)
const BASE_ROT = 0.02;     // rad/s



const DPR_CAP = 2;

type Source = { x: number; y: number; born: number; life: number; angle0: number };

export default function AmorphousBackdropSynced() {
  const {theme} = useTheme()
  const BG = !theme ? '#FFFFFF' : "#101010";

  

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const prevMsRef = useRef<number>(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const set = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    set();
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
    };
  }, []);

  useEffect(() => {

    const COLOURS: string[] = theme ? [
      "#5D5D5D", "#868686", "#999191", "#F7F4F4",
      "#181818", "#181818", "#181818", "#181818",
    ] :[
      "#5D5D5D", "#868686", "#999191", "#F7F4F4",
      "#EEEEEE", "#EEEEEE", "#EEEEEE", "#EEEEEE",
    ]
    const canvas = canvasRef.current;
    if (!canvas || !size.w || !size.h) return;

    const dpr = Math.min(DPR_CAP, Math.max(1, window.devicePixelRatio || 1));
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;

    const ctx = canvas.getContext("2d", { alpha: false })!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const step = DOT + GAP;
    const cols = Math.ceil(size.w / step) + 2;
    const rows = Math.ceil(size.h / step) + 2;
    const count = cols * rows;

    const xs = new Float32Array(count);
    const ys = new Float32Array(count);
    let k = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, k++) {
        xs[k] = c * step + 4;
        ys[k] = r * step + 4;
      }
    }

    // Stable per-dot colors
    const colorIdx = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      colorIdx[i] = Math.floor(Math.random() * COLOURS.length);
    }

    // Smoothed offsets
    const offX = new Float32Array(count);
    const offY = new Float32Array(count);

    // Sources
    const sources: Source[] = [];
    let lastSpawn = -1e9;

    const inv2Sigma2 = 1 / (2 * SIGMA * SIGMA);
    const randBetween = (a: number, b: number) => a + Math.random() * (b - a);

    function spawn(t: number, born?: number) {
      sources.push({
        x: Math.random() * size.w,
        y: Math.random() * size.h,
        born: born ?? t,
        life: randBetween(LIFE_MIN, LIFE_MAX),
        angle0: Math.random() * Math.PI * 2,
      });
      if (sources.length > MAX_SOURCES) sources.shift();
    }

    function frame(nowMs: number) {
      const t = nowMs / 1000;
      const prev = prevMsRef.current || nowMs;
      const dt = Math.max(0.001, (nowMs - prev) / 1000);
      prevMsRef.current = nowMs;

      // Global synced “breathing”
      const phase = 2 * Math.PI * (t / PERIOD_S + 0.25);
      const globalAmp = 0.5 * (1 - Math.cos(phase));

      //Prune expired
      for (let i = sources.length - 1; i >= 0; i--) {
        if (t - sources[i].born > sources[i].life) sources.splice(i, 1);
      }

      // Top up to MIN_SOURCES
      while (sources.length < MIN_SOURCES) {
        const age = Math.random() * (LIFE_MIN * 0.7);
        spawn(t, t - age);
        lastSpawn = t;
      }

      if (sources.length < MAX_SOURCES && (t - lastSpawn) > randBetween(SPAWN_MIN, SPAWN_MAX)) {
        spawn(t);
        lastSpawn = t;
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, size.w, size.h);

      const alpha = 1 - Math.exp(-dt / TAU_SMOOTH);

      const baseAngle = BASE_ROT * t;
      const baseUx = Math.cos(baseAngle), baseUy = Math.sin(baseAngle);
      const baseTx = BASE_AMP * baseUx;
      const baseTy = BASE_AMP * baseUy;

      // Draw
      const half = DOT * 0.5;
      for (let i = 0; i < count; i++) {
        const x0 = xs[i], y0 = ys[i];

        // Target offsets (subtle)
        let tx = baseTx, ty = baseTy;

        for (let s = 0; s < sources.length; s++) {
          const src = sources[s];
          const lifeProgress = Math.min(1, Math.max(0, (t - src.born) / src.life));

          const srcStrength = (0.25 + 0.75 * globalAmp) * Math.sin(lifeProgress * Math.PI);

          const dx = x0 - src.x, dy = y0 - src.y;
          const dist2 = dx * dx + dy * dy;
          const w = Math.exp(-dist2 * inv2Sigma2) * srcStrength;
          if (w < 1e-4) continue;

          const angle = src.angle0 + DRIFT * (t - src.born);
          const ux = Math.cos(angle), uy = Math.sin(angle);

          tx += AMP * w * ux;
          ty += AMP * w * uy;
        }

        offX[i] += (tx - offX[i]) * alpha;
        offY[i] += (ty - offY[i]) * alpha;

        ctx.fillStyle = COLOURS[colorIdx[i]];
        ctx.fillRect(x0 + offX[i] - half, y0 + offY[i] - half, DOT, DOT);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [size.w, size.h, BG, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: BG,
        opacity: theme ? 0.6 : 0.9,
      }}
    />
  );
}
