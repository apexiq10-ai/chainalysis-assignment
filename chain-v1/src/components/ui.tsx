"use client";

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import type { Mode } from "@/content";

/* ------------------------------------------------------------ contexts */

export type SectionState = {
  i: number;
  id: string;
  part: "main" | "appendix";
  label: string;
  step: number;
  mode: Mode;
  active: boolean; // this section holds the viewport
  reading: boolean; // scroll-driven (microsite) rather than key-driven (presentation)
  reduced: boolean;
  stills: boolean; // ?stills: every clip shows its poster frame
  arrival: number; // increments each time the presenter lands here
  register: (el: HTMLElement | null) => void;
};

export const SectionContext = createContext<SectionState | null>(null);
export type DeckApi = {
  goToId: (id: string) => void;
  advance: (d: 1 | -1) => void;
  // Set a section's build directly (clicks on 03 stages, 05 rows, 08 channels).
  setStep: (id: string, step: number) => void;
};
export const DeckContext = createContext<DeckApi>({ goToId: () => {}, advance: () => {}, setStep: () => {} });

export function useSection(): SectionState {
  const c = useContext(SectionContext);
  if (!c) throw new Error("useSection outside a section");
  return c;
}
export const useDeck = () => useContext(DeckContext);

/* -------------------------------------------------------------- frame */

export function Guides() {
  return (
    <div className="guides" aria-hidden="true">
      {Array.from({ length: 12 }, (_, k) => (
        <i key={k} />
      ))}
    </div>
  );
}

export function Frame({
  className = "",
  children,
  media,
  overlay,
  footer,
  guides = true,
}: {
  className?: string;
  children: ReactNode;
  media?: ReactNode;
  overlay?: ReactNode;
  footer?: ReactNode;
  guides?: boolean;
}) {
  const s = useSection();
  return (
    <section
      id={s.id}
      ref={s.register}
      className={`sec ${s.part === "main" ? "main" : ""} ${s.part === "appendix" ? "apx" : ""} ${className}`}
      data-mode={s.mode}
      data-at={s.step}
      aria-label={s.label}
    >
      {media}
      <div className="wrap">
        {guides && <Guides />}
        <div className="frame">{children}</div>
        {footer}
      </div>
      {overlay}
    </section>
  );
}

/* -------------------------------------------------------------- build
   A build lands when the section's step reaches n. It either cuts in or
   traces in (clip wipe). Space is always reserved. */

type BProps = {
  n: number;
  v?: "wipe" | "drop" | "cut" | "rise";
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [k: string]: unknown;
};

export function B({ n, v = "wipe", as: Tag = "div", className = "", children, ...rest }: BProps) {
  const { step } = useSection();
  const on = step >= n;
  return (
    <Tag className={`b ${on ? "on" : "off"} ${className}`} data-v={v} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------ evidence marks */

export function Mark({ kind, children }: { kind: "v" | "c" | "n" | "u"; children: ReactNode }) {
  return <span className={`st ${kind}`}>{children}</span>;
}

/* ------------------------------------------------------ footer + refs */

export function Foot({ children }: { children?: ReactNode }) {
  return <div className="foot">{children}</div>;
}

export function Ref({ to, children }: { to: string; children: ReactNode }) {
  const { goToId } = useDeck();
  return (
    <a
      href={`#${to}`}
      className="t-label"
      onClick={(e) => {
        e.preventDefault();
        goToId(to);
      }}
    >
      {children}
    </a>
  );
}

/* --------------------------------------------------------------- tick
   Readout numerals step to their value in 12 frames. */

export function useTick(target: number, on: boolean, frames = 12, reduced = false) {
  const [v, setV] = useState(on ? target : 0);
  useEffect(() => {
    if (!on) {
      setV(0);
      return;
    }
    if (reduced) {
      setV(target);
      return;
    }
    let f = 0;
    let raf = 0;
    const loop = () => {
      f += 1;
      setV(Math.round((target * f) / frames));
      if (f < frames) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [on, target, frames, reduced]);
  return v;
}

/* --------------------------------------------------------------- film
   Ambient footage. Always loaded, muted, looping, no chrome. It plays while
   its section holds the screen, and a watchdog resumes it if power saving or
   a stalled loop ever pauses it. `?stills` is the only way to get a poster. */

export function Film({ name, play, className = "" }: { name: string; play: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { stills } = useSection();
  const run = play && !stills;
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    if (!run) {
      v.pause();
      return;
    }
    const start = () => {
      if (!v.paused && !v.ended) return;
      const p = v.play();
      if (p) p.catch(() => {});
    };
    start();
    v.addEventListener("canplay", start);
    v.addEventListener("ended", start);
    document.addEventListener("visibilitychange", start);
    const watchdog = window.setInterval(start, 1200);
    return () => {
      window.clearInterval(watchdog);
      v.removeEventListener("canplay", start);
      v.removeEventListener("ended", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [run]);
  return (
    <video
      ref={ref}
      className={`film ${className}`}
      src={stills ? undefined : `/media/${name}.mp4`}
      poster={`/media/${name}.jpg`}
      autoPlay={run}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
