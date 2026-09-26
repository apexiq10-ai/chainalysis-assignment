"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { appendixList, sections, type Mode } from "@/content";
import { DeckContext, SectionContext, type SectionState } from "@/components/ui";
import { S01, S02, S03, S04, S05, S06, S07, S08, S09 } from "@/components/sections/Main";
import { Appendix } from "@/components/sections/Appendix";

const VIEWS: Record<string, ComponentType> = { s01: S01, s02: S02, s03: S03, s04: S04, s05: S05, s06: S06, s07: S07, s08: S08, s09: S09, apx: Appendix };

const N = sections.length;
const MAX = sections.map((s) => s.steps);
const APX = sections.findIndex((s) => s.part === "appendix");
const LAST_MAIN = sections.filter((s) => s.part === "main").length;
const MAIN = sections.slice(0, LAST_MAIN);

// Reading mode (scrolling) never advances content on a timer. Each section
// simply shows its resting state: every build in, except 03, whose stages
// wait for a click. The one exception is the 01 title sequence, which runs
// once like a film open. Background video is always automatic.
const READ = sections.map((s) => (s.id === "s03" || s.part === "appendix" ? 0 : s.steps));
const OPEN_MS = [1600];
// Where a jump (index, header ticks, deep link) lands in a section.
const jumpStep = (i: number) => (i === 0 ? 0 : READ[i]);

const modeAt = (i: number, step: number): Mode => {
  const m = sections[i].modes;
  return m[Math.min(step, m.length - 1)];
};

// URL anchor for a section at a build: appendix builds are a1 to a6.
const anchorFor = (i: number, step: number) => (i === APX ? `a${step + 1}` : sections[i].id);
const parseAnchor = (hash: string): [number, number] | null => {
  const m = /^a([1-6])$/.exec(hash);
  if (m) return [APX, Number(m[1]) - 1];
  const close = sections.findIndex((s) => s.id === "s09");
  if (hash === "end" || hash === "buffer" || hash === "s10") return [close, MAX[close]];
  const i = sections.findIndex((s) => s.id === hash);
  return i >= 0 ? [i, jumpStep(i)] : null;
};

type Driver = "scroll" | "key";

export default function Deck() {
  const [steps, setSteps] = useState<number[]>(() => sections.map(() => 0));
  const [arrivals, setArrivals] = useState<number[]>(() => sections.map(() => 0));
  const [cur, setCur] = useState(0);
  const [driver, setDriver] = useState<Driver>("scroll");
  const [indexOpen, setIndexOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [stills, setStills] = useState(false);
  const [ready, setReady] = useState(false);

  const els = useRef<(HTMLElement | null)[]>([]);
  const stepsRef = useRef(steps);
  const curRef = useRef(cur);
  const driverRef = useRef(driver);
  useEffect(() => {
    stepsRef.current = steps;
    curRef.current = cur;
    driverRef.current = driver;
  });

  const scrollTop = (i: number) => {
    const el = els.current[i];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" as ScrollBehavior });
  };

  // The ref updates synchronously so fast clicker presses never read a stale step.
  const setStepAt = useCallback((i: number, s: number) => {
    const v = Math.max(0, Math.min(MAX[i], s));
    if (stepsRef.current[i] === v) return;
    const next = stepsRef.current.slice();
    next[i] = v;
    stepsRef.current = next;
    setSteps(next);
  }, []);

  const goTo = useCallback(
    (i: number, step: number) => {
      const idx = Math.max(0, Math.min(N - 1, i));
      setStepAt(idx, step);
      setArrivals((prev) => {
        const next = prev.slice();
        next[idx] += 1;
        return next;
      });
      setCur(idx);
      curRef.current = idx;
      scrollTop(idx);
    },
    [setStepAt],
  );

  const goToId = useCallback(
    (id: string) => {
      const t = parseAnchor(id);
      if (t) {
        setIndexOpen(false);
        goTo(t[0], t[1]);
      }
    },
    [goTo],
  );

  /* Forward. `scrollFirst` (down keys) moves through a tall section before
     leaving it; right keys and swipes cut straight to the next build. */
  const next = useCallback(
    (scrollFirst: boolean) => {
      const i = curRef.current;
      const s = stepsRef.current[i];
      const apx = i === APX;
      const el = els.current[i];
      if (scrollFirst && (apx || s >= MAX[i]) && el) {
        const r = el.getBoundingClientRect();
        if (r.bottom > window.innerHeight + 8) {
          window.scrollBy({ top: Math.min(r.bottom - window.innerHeight, window.innerHeight * 0.8), behavior: "instant" as ScrollBehavior });
          return;
        }
      }
      if (s < MAX[i]) {
        setStepAt(i, s + 1);
        if (apx) scrollTop(i);
        return;
      }
      if (i < N - 1) goTo(i + 1, 0);
    },
    [goTo, setStepAt],
  );

  const prev = useCallback(
    (scrollFirst: boolean) => {
      const i = curRef.current;
      const s = stepsRef.current[i];
      const apx = i === APX;
      const el = els.current[i];
      if (scrollFirst && el) {
        const r = el.getBoundingClientRect();
        if (r.top < -8) {
          window.scrollBy({ top: Math.max(r.top, -window.innerHeight * 0.8), behavior: "instant" as ScrollBehavior });
          return;
        }
      }
      if (s > 0) {
        setStepAt(i, s - 1);
        if (apx) scrollTop(i);
        return;
      }
      if (apx) return;
      if (i > 0) goTo(i - 1, i - 1 === APX ? 0 : MAX[i - 1]);
    },
    [goTo, setStepAt],
  );

  const advance = useCallback((d: 1 | -1) => (d > 0 ? next(false) : prev(false)), [next, prev]);

  /* ---- mount: reduced motion, deep links, presenter flag */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);

    const params = new URLSearchParams(window.location.search);
    if (params.has("present")) setDriver("key");
    if (params.has("stills")) setStills(true);
    const target = parseAnchor(window.location.hash.replace("#", ""));
    // A timer, not rAF: rAF never fires in a background tab, and the deck
    // must be ready when the presenter switches to it.
    const t = window.setTimeout(() => {
      if (target && target[0] > 0) goTo(target[0], target[1]);
      setReady(true);
    }, 0);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", apply);
    };
  }, [goTo]);

  /* ---- which section holds the viewport: the one crossing its midline */
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      const i = els.current.findIndex((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      if (i >= 0 && i !== curRef.current) {
        // Scrolling into the appendix always opens it on its first page.
        if (i === APX) setStepAt(APX, 0);
        curRef.current = i;
        setCur(i);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setStepAt]);

  /* ---- keep the URL on the current section (and appendix exhibit) */
  useEffect(() => {
    if (!ready) return;
    const id = anchorFor(cur, steps[cur]);
    if (window.location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  }, [cur, steps, ready]);

  /* ---- reading mode: sections arrive in their resting state; only the 01 title sequence is timed */
  useEffect(() => {
    if (driver !== "scroll" || !ready) return;
    const i = cur;
    const s = steps[i];
    if (i === 0) {
      if (s >= MAX[0]) return;
      const t = window.setTimeout(() => setStepAt(0, s + 1), OPEN_MS[s]);
      return () => window.clearTimeout(t);
    }
    if (s < READ[i]) setStepAt(i, READ[i]);
  }, [cur, steps, driver, ready, setStepAt]);

  /* ---- input: wheel/touch hand control to the reader; keys to the presenter */
  useEffect(() => {
    const toScroll = () => driverRef.current !== "scroll" && setDriver("scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const k = e.key;
      if (k === "Escape") {
        setIndexOpen(false);
        return;
      }
      if (k === "i" || k === "I") return setIndexOpen((v) => !v);
      const right = k === "ArrowRight" || k === "PageDown" || k === "Enter" || (k === " " && !e.shiftKey);
      const down = k === "ArrowDown";
      const left = k === "ArrowLeft" || k === "PageUp" || k === "Backspace" || (k === " " && e.shiftKey);
      const up = k === "ArrowUp";
      const nav = right || down || left || up || ["Home", "End", "a", "A"].includes(k) || /^[1-9]$/.test(k);
      if (!nav) return;
      if (k === "Enter" && t && (t.tagName === "BUTTON" || t.tagName === "A")) return;
      e.preventDefault();
      setIndexOpen(false);
      setDriver("key");
      driverRef.current = "key";
      if (right) return next(false);
      if (down) return next(true);
      if (left) return prev(false);
      if (up) return prev(true);
      if (k === "Home") return goTo(0, 0);
      if (k === "End") return goTo(LAST_MAIN - 1, MAX[LAST_MAIN - 1]);
      if (k === "a" || k === "A") return goTo(APX, 0);
      if (/^[1-9]$/.test(k)) {
        const i = sections.findIndex((s) => s.index === `0${k}`);
        if (i >= 0) goTo(i, 0);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", toScroll, { passive: true });
    window.addEventListener("touchmove", toScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", toScroll);
      window.removeEventListener("touchmove", toScroll);
    };
  }, [next, prev, goTo]);

  const registers = useMemo(() => sections.map((_, i) => (el: HTMLElement | null) => (els.current[i] = el)), []);
  const setStep = useCallback(
    (id: string, step: number) => {
      const i = sections.findIndex((s) => s.id === id);
      if (i >= 0) setStepAt(i, step);
    },
    [setStepAt],
  );
  const deck = useMemo(() => ({ goToId, advance, setStep }), [goToId, advance, setStep]);

  const meta = sections[cur];
  const chromeMode = modeAt(cur, steps[cur]);
  const apxStep = steps[APX];
  const position = cur === APX ? `A${apxStep + 1} / A6` : `${meta.index} / 09`;
  const subject = cur === APX ? appendixList[apxStep].title : meta.subject;

  return (
    <DeckContext.Provider value={deck}>
      <header className="chrome" data-mode={chromeMode}>
        <div className="wrap">
          <div className="cell mark t-label">
            <b>C</b>
            <span>Chain</span>
          </div>
          <div className="cell opt t-label">
            <span>{position}</span>
          </div>
          <div className="cell t-label">
            <span className="subj">{subject}</span>
          </div>
          <div className="cell opt">
            <nav className="ticks" aria-label="Sections">
              {MAIN.map((s, i) => (
                <button key={s.id} aria-label={`${s.index} ${s.subject}`} aria-current={i === cur} onClick={() => goTo(i, jumpStep(i))} />
              ))}
              <span className="sep" aria-hidden="true" />
              {appendixList.map((a, k) => (
                <button key={a.id} aria-label={`${a.index} ${a.title}`} aria-current={cur === APX && apxStep === k} onClick={() => goTo(APX, k)} />
              ))}
            </nav>
          </div>
          <div className="cell" style={{ paddingInline: 0 }}>
            <button className="btn t-label" onClick={() => setIndexOpen((v) => !v)} aria-expanded={indexOpen}>
              Index<kbd>I</kbd>
            </button>
          </div>
        </div>
      </header>

      <main>
        {sections.map((s, i) => {
          const View = VIEWS[s.id];
          const state: SectionState = {
            i,
            id: s.id,
            part: s.part,
            label: `${s.index} ${s.subject}`,
            step: steps[i],
            mode: modeAt(i, steps[i]),
            active: i === cur,
            reading: driver === "scroll",
            reduced,
            stills,
            arrival: arrivals[i],
            register: registers[i],
          };
          return (
            <SectionContext.Provider key={s.id} value={state}>
              <View />
            </SectionContext.Provider>
          );
        })}
      </main>

      {indexOpen && (
        <div className="overlay" data-mode="night" role="dialog" aria-label="Index">
          <div className="wrap">
            <p className="idx-part t-label mute">Narrative</p>
            <ol className="idx-list" style={{ paddingBlock: 0 }}>
              {MAIN.map((s, i) => (
                <li key={s.id}>
                  <button
                    aria-current={i === cur}
                    onClick={() => {
                      setIndexOpen(false);
                      goTo(i, jumpStep(i));
                    }}
                  >
                    <span className="t-label">{s.index}</span>
                    <span className="t-sub">{s.subject}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="idx-part t-label mute">Appendix</p>
            <ol className="idx-list" style={{ paddingBlock: 0 }}>
              {appendixList.map((a, k) => (
                <li key={a.id}>
                  <button
                    aria-current={cur === APX && apxStep === k}
                    onClick={() => {
                      setIndexOpen(false);
                      goTo(APX, k);
                    }}
                  >
                    <span className="t-label">{a.index}</span>
                    <span className="t-sub">{a.title}</span>
                    <span className="hd t-small mute">{a.headline}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

    </DeckContext.Provider>
  );
}
