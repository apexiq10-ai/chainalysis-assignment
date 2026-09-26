"use client";

import { useEffect, useRef } from "react";

/* The opening ledger. One point crosses the grid, then ten, then one
   hundred (approved execution note for slide 01). Hard square marks and
   straight trails: instrumentation, not particles. Illustrative only. */

const SIGNAL = "#FF5B14";
const HAIR = "rgba(232,234,228,0.10)";
const PHASES = [
  { at: 0, count: 1 },
  { at: 2.1, count: 10 },
  { at: 4.3, count: 100 },
];

type Dot = { lane: number; x: number; v: number; trail: number; live: boolean };

function rand(seed: number) {
  // deterministic so every rehearsal looks the same
  const x = Math.sin(seed * 999.13) * 43758.5453;
  return x - Math.floor(x);
}

export default function LedgerCanvas({ running, reduced, epoch }: { running: boolean; reduced: boolean; epoch: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const state = useRef({ t: 0, dots: [] as Dot[], w: 0, h: 0, lanes: 16, top: 0, bottom: 0 });

  // reset the sequence on every arrival
  useEffect(() => {
    state.current.t = 0;
    state.current.dots.forEach((d) => (d.live = false));
  }, [epoch]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = state.current;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      s.w = r.width;
      s.h = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.lanes = r.width < 700 ? 10 : 16;
      s.top = r.height * 0.1;
      s.bottom = r.height * (r.width < 700 ? 0.36 : 0.42);
      if (s.dots.length === 0) {
        s.dots = Array.from({ length: 100 }, (_, k) => ({
          lane: k === 0 ? Math.floor(s.lanes / 2) : Math.floor(rand(k + 1) * s.lanes),
          x: -20,
          v: k === 0 ? 0.42 : 0.28 + rand(k + 7) * 0.9, // fraction of width per second
          trail: 18 + rand(k + 3) * 70,
          live: false,
        }));
      }
    };

    const laneY = (lane: number) => s.top + ((lane + 0.5) / s.lanes) * (s.bottom - s.top);

    const draw = () => {
      ctx.clearRect(0, 0, s.w, s.h);
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      for (let l = 0; l < s.lanes; l++) {
        const y = Math.round(laneY(l)) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(s.w, y);
        ctx.stroke();
      }
      for (const d of s.dots) {
        if (!d.live) continue;
        const y = Math.round(laneY(d.lane));
        ctx.fillStyle = "rgba(255,91,20,0.35)";
        ctx.fillRect(d.x - d.trail, y - 0.5, d.trail, 1.5);
        ctx.fillStyle = SIGNAL;
        ctx.fillRect(Math.round(d.x) - 2, y - 2, 5, 5);
      }
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);

    if (reduced) {
      s.dots.forEach((d, k) => {
        d.live = true;
        d.x = rand(k + 11) * s.w;
      });
      draw();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (running) {
        s.t += dt;
        const count = PHASES.reduce((c, p) => (s.t >= p.at ? p.count : c), 1);
        s.dots.forEach((d, k) => {
          if (k < count && !d.live) {
            d.live = true;
            d.x = -rand(k + 5) * s.w * 0.35;
          }
          if (d.live) {
            d.x += d.v * s.w * dt;
            if (d.x - d.trail > s.w) d.x = -rand(k + s.t) * 60;
          }
        });
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    draw();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [running, reduced]);

  return <canvas ref={ref} className="ledger" aria-hidden="true" />;
}
