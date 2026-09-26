"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { s01, s02, s03, s04, s05, s06, s07, s08, s09 } from "@/content";
import { channelNotes, maturity, personaLabels, personas } from "@/content.authored";
import LedgerCanvas from "@/components/LedgerCanvas";
import { B, Film, Foot, Frame, Mark, Ref, useDeck, useSection, useTick } from "@/components/ui";

const pad2 = (n: number) => String(n).padStart(2, "0");
const pad3 = (n: number) => String(n).padStart(3, "0");

/* 01 · OPEN ------------------------------------------------------------ */
export function S01() {
  const { active, reduced, arrival } = useSection();
  return (
    <Frame
      className="s01"
      media={<LedgerCanvas running={active} reduced={reduced} epoch={arrival} />}
      footer={
        <Foot>
          <Mark kind="u">{s01.motionTag}</Mark>
        </Foot>
      }
    >
      <div className="lines">
        <B n={0} as="h1" className="t-broadcast">
          {s01.line1[0]}
          <br />
          {s01.line1[1]}
        </B>
        <B n={1} as="p" className="t-broadcast hollow">
          {s01.line2[0]}
          <br />
          {s01.line2[1]}
        </B>
      </div>
    </Frame>
  );
}

/* 02 · PRODUCT --------------------------------------------------------- */
/* The whole object turning in greyscale, full bleed, on its own light studio
   ground; the type stays ink. Weight contrast carries the message: a light
   "Blockchain intelligence," against a black "put to work." */
function Arrow({ n }: { n: number }) {
  return (
    <B n={n} v="cut" className="arrow" aria-hidden="true">
      <svg viewBox="0 0 60 22" preserveAspectRatio="none" className="arrow-draw">
        <line x1="0" y1="11" x2="56" y2="11" />
        <path d="M48 4 L57 11 L48 18" />
      </svg>
    </B>
  );
}

export function S02() {
  const { onScreen } = useSection();
  const [ask, create, codify] = s02.steps;
  return (
    <Frame
      className="s02"
      media={
        <div className="film-wrap">
          <Film name="object-specimen" play={onScreen} className="grey" />
          <div className="s02-veil" aria-hidden="true" />
        </div>
      }
      footer={
        <Foot>
          <span className="sp" />
          <Ref to="a1">A1 · Category convergence →</Ref>
        </Foot>
      }
    >
      <div className="reveal">
        <B n={0} as="p" className="meet">
          {s02.title}
        </B>
        <B n={0} as="h2" className="statement">
          <span className="light">{s02.signature[0]}</span>
          <br />
          <span className="heavy">{s02.signature[1]}</span>
        </B>
        <B n={0} as="p" className="t-label sub">
          {s02.sub}
        </B>
      </div>

      <div className="channels">
        <B n={1} className="channel">
          <span className="t-label">01</span>
          <p className="w">{ask.word}</p>
          <p className="t-sub">{ask.line}</p>
          <p className="annot t-label">{s02.annotation}</p>
        </B>
        <Arrow n={2} />
        <B n={2} className="channel">
          <span className="t-label">02</span>
          <p className="w">{create.word}</p>
          <p className="t-sub">{create.line}</p>
        </B>
        <Arrow n={3} />
        <B n={3} className="channel codify">
          <span className="t-label">03</span>
          <p className="w">{codify.word}</p>
          <p className="t-sub">{codify.line}</p>
        </B>
      </div>
    </Frame>
  );
}

/* 03 · THE WEDGE ------------------------------------------------------- */
/* Left: the promise and the five stages of the With Chain column.
   Right: one large surface for the active stage. Nothing advances on its
   own: → or a click moves one stage, and every stage keeps the full frame. */
const OWNER: Record<string, number> = {};
s03.stages.forEach((st, k) => {
  if (Array.isArray(st.takes)) st.takes.forEach((t) => (OWNER[t] = k));
});

function StageButton({ k, step }: { k: number; step: number }) {
  const { setStep } = useDeck();
  const st = s03.stages[k];
  return (
    <button
      className={`stp ${k === step ? "on" : ""} ${k < step ? "past" : ""}`}
      aria-pressed={k === step}
      onClick={() => setStep("s03", k)}
    >
      <span className="t-label">{pad2(k + 1)}</span>
      <span className="nm">{st.name}</span>
    </button>
  );
}

export function S03() {
  const { step } = useSection();
  const st = s03.stages[step];
  const taskState = (t: string) => {
    if (step === 0) return "burden";
    if (step === 4) return "done";
    const owner = OWNER[t];
    if (owner === step) return "now";
    if (owner < step) return "done";
    return "";
  };
  return (
    <Frame
      className="s03"
      footer={
        <Foot>
          <Mark kind="n">{s03.inference}</Mark>
          <span className="sp" />
          <Ref to="a2">A2 · Workflow prioritization →</Ref>
          <Ref to="a4">A4 · Pilot economics →</Ref>
        </Foot>
      }
    >
      <div className="left">
        <p className="t-label">{s03.eyebrow}</p>
        <h2 className="t-broadcast s03-title">{s03.title}</h2>
        <p className="s03-build">
          <span className="dim">{s03.build[0]}</span> {s03.build[1]}
        </p>
      </div>

      <div className="surface" aria-live="polite">
        <p className="t-label kicker">
          {pad2(step + 1)} / {pad2(s03.stages.length)}
        </p>
        <h3 className={`stage-name ${step === 4 ? "long" : ""}`}>{st.name}</h3>
        <div className="lines">
          {st.lines.map((l) => (
            <p key={l} className="t-sub lg">
              {l}
            </p>
          ))}
        </div>
      </div>

      <div className="stages" role="group" aria-label="Workflow stages">
        <StageButton k={0} step={step} />
        <div className="chain-group">
          <span className="t-label glabel">{s03.chainLabel}</span>
          <StageButton k={1} step={step} />
          <StageButton k={2} step={step} />
          <StageButton k={3} step={step} />
        </div>
        <StageButton k={4} step={step} />
      </div>

      <div className="surface body">
        <div className="strip">
          <p className="t-label">{s03.today.label}</p>
          <ol>
            {s03.today.tasks.map((t) => (
              <li key={t} className={taskState(t)}>
                {t}
              </li>
            ))}
            <li className={`dec ${step === 4 ? "now" : ""}`}>{s03.today.decision}</li>
          </ol>
          <p className="t-label takes">
            {Array.isArray(st.takes) ? (
              <>
                <span className="mute">{s03.takesLabel}</span> {st.takes.join(" · ")}
              </>
            ) : (
              " "
            )}
          </p>
        </div>

        <div className="lower">
          <span className="sq" aria-hidden="true" />
          <p className="t-sub">{s03.bottom}</p>
        </div>
      </div>
    </Frame>
  );
}

/* 04 · THE PRODUCT INSIGHT --------------------------------------------- */
function RunField({ on }: { on: boolean }) {
  const { reduced } = useSection();
  const k = useTick(100, on, 60, reduced);
  return (
    <>
      <div className="runfield" role="img" aria-label="One hundred run cells, illustrative">
        {Array.from({ length: 100 }, (_, i) => (
          <i key={i} className={i < k ? (i === 0 ? "r first" : "r") : ""} />
        ))}
      </div>
      <div className="fieldcap">
        <span className="t-label">Fig. 04.1</span>
        <span className="t-label">
          Run <span className="num">{pad3(Math.max(k, 1))}</span> / 100
        </span>
      </div>
    </>
  );
}

export function S04() {
  const { step, onScreen } = useSection();
  return (
    <Frame
      className="s04"
      footer={
        <Foot>
          <Mark kind="c">Claimed · stated by the company, not independently demonstrated</Mark>
          <Mark kind="u">{s04.fieldTag}</Mark>
          <span className="sp" />
          <Ref to="a1">A1 · Category convergence →</Ref>
        </Foot>
      }
    >
      <div className="beats">
        <B n={0} as="h2" className="t-title beat1">
          {s04.beat1[0]}
          <br />
          {s04.beat1[1]}
        </B>
        <B n={1} v="cut" as="p" className="t-title beat2">
          {s04.beat2[0]}
          <br />
          <span className="num">100</span> {s04.beat2[1].replace("100 ", "")}
        </B>
      </div>

      <div className="field-col">
        {/* The clip stays mounted and loaded between visits so build 0 never shows a loading frame. */}
        <div className="specimen" style={step === 0 ? undefined : { display: "none" }}>
          <Film name="first-answer" play={onScreen && step === 0} />
        </div>
        {step === 0 ? (
          <div className="fieldcap">
            <span className="t-label">Fig. 04.1</span>
            <span className="t-label mute">
              Run <span className="num">001</span>
            </span>
          </div>
        ) : (
          <RunField on={step >= 1} />
        )}
      </div>

      <B n={2} className="support">
        <p className="t-sub lg">{s04.support}</p>
        <div className="eq" aria-label="1 case, 1 workflow, 100 runs">
          {s04.equation.map((e, k) => (
            <span key={e.w} style={{ display: "contents" }}>
              {k > 0 && <span className="arr">→</span>}
              <span>
                <span className="t-readout">{e.n}</span>
                <span className="t-label unit">{e.w}</span>
              </span>
            </span>
          ))}
        </div>
      </B>

      <B n={3} className="quiet">
        {s04.quiet.map((q) => (
          <div key={q}>
            <Mark kind="c">Claimed</Mark>
            <p className="t-sub">{q}</p>
          </div>
        ))}
        <B n={4} className="final">
          <p className="t-sub lg" style={{ fontWeight: 700 }}>
            {s04.final[0]}
            <br />
            {s04.final[1]}
          </p>
        </B>
      </B>
    </Frame>
  );
}

/* 05 · BUYERS ---------------------------------------------------------- */
/* V1 builds. Each row's build opens its persona map beneath it; the last
   build closes it for the summary line. A click opens any row at any time. */
function PersonaMap({ k }: { k: number }) {
  const r = s05.roles[k];
  const p = personas[k];
  return (
    <div className="persona">
      <div className="p-col p-who">
        <span className="t-label">{personaLabels.who}</span>
        <p className="p-name">{r.role}</p>
        <p className="t-label mute">{r.stakes}</p>
        <p className="p-buys">{r.buys}</p>
      </div>
      <span className="p-arrow a1" aria-hidden="true">→</span>
      <div className="p-col pains">
        <span className="t-label">{personaLabels.pains}</span>
        <ul>
          {p.pains.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <span className="p-arrow a2" aria-hidden="true">→</span>
      <div className="p-col msg">
        <span className="t-label">{personaLabels.message}</span>
        <ul>
          {p.message.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function S05() {
  const { step, arrival, active } = useSection();
  const [picked, setPicked] = useState<number | null | undefined>(undefined);
  useEffect(() => setPicked(undefined), [step, arrival]);
  // Leaving 05 puts it back on item 1 for the next visit.
  const was = useRef(active);
  useEffect(() => {
    if (was.current && !active) setPicked(undefined);
    was.current = active;
  }, [active]);
  const fromStep = step >= 1 && step <= 4 ? step - 1 : 0;
  const open = picked === undefined ? fromStep : picked;
  return (
    <Frame
      className={`s05 ${open !== null ? "has-open" : ""}`}
      footer={
        <Foot>
          <Mark kind="n">Persona map · hypothesis to validate</Mark>
          <span className="sp" />
          <Ref to="a3">A3 · The FI buying system →</Ref>
        </Foot>
      }
    >
      <B n={0} as="h2" className="t-broadcast">
        {s05.title[0]}
        <br />
        {s05.title[1]}
      </B>
      <ol className="roles">
        {s05.roles.map((r, k) => (
          <B n={k + 1} as="li" key={r.role} className={open === k ? "open" : ""}>
            <button type="button" aria-expanded={open === k} onClick={() => setPicked(open === k ? null : k)}>
              <span className="who">
                <span className="t-label">{pad2(k + 1)}</span>
                <span className="t-label">{r.role}</span>
              </span>
              <span className="q">
                {"“"}
                {r.quote}
                {"”"}
              </span>
              <span className="stakes t-label">{r.stakes}</span>
              <span className="toggle t-label" aria-hidden="true">
                {open === k ? "−" : "+"}
              </span>
            </button>
            {open === k && <PersonaMap k={k} />}
          </B>
        ))}
      </ol>
      <B n={5} as="p" className="footer-line t-sub lg">
        {s05.footer}
      </B>
    </Frame>
  );
}

/* 06 · GTM I: SEQUENCE ------------------------------------------------- */
export function S06() {
  return (
    <Frame
      className="s06"
      footer={
        <Foot>
          <span className="sp" />
          <Ref to="a4">A4 · Pilot economics →</Ref>
          <Ref to="a6">A6 · GA readiness →</Ref>
        </Foot>
      }
    >
      <B n={0} as="h2" className="t-title">
        {s06.title[0]}
        <br />
        {s06.title[1]}
      </B>
      <div className="stairs">
        {s06.phases.map((p, k) => (
          <B n={k + 1} v="rise" key={p.n} className={`stair ${k === 3 ? "reach" : ""}`}>
            <span className="t-readout">{p.n}</span>
            <p className="nm">{p.name}</p>
            <p className="t-sub">{p.line}</p>
            <ul>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </B>
        ))}
      </div>
      <B n={5} className="bottom">
        <p className="t-sub lg">{s06.bottom[0]}</p>
        <p className="t-sub lg" style={{ fontWeight: 700 }}>
          {s06.bottom[1]}
        </p>
      </B>
    </Frame>
  );
}

/* 07 · GTM II: MULTI-CHANNEL ------------------------------------------- */
/* One story, every channel, earned in phases. Five bank buyer-journey
   stages, three prioritized tactics each; the maturity control switches them
   on as evidence grows: few, then more, then the system. Builds 2 to 4 are the three
   phases, so → walks them and a click picks one. Nothing advances alone. */
function PhaseButton({ k, phase }: { k: number; phase: number }) {
  const { setStep } = useDeck();
  const p = maturity.phases[k];
  return (
    <button
      type="button"
      className={`ph ${k === phase ? "on" : ""} ${k < phase ? "past" : ""}`}
      aria-pressed={k === phase}
      onClick={() => setStep("s07", 2 + k)}
    >
      <span className="t-label ph-top">
        <span>{pad2(k + 1)}</span>
        <span>{p.horizon}</span>
      </span>
      <span className="ph-nm">{p.name}</span>
      <span className="t-label ph-ev">
        {p.evidence}
        <br />
        {p.motion}
      </span>
    </button>
  );
}

export function S07() {
  const { step, active, reading } = useSection();
  const { setStep } = useDeck();
  const phase = Math.max(0, Math.min(maturity.phases.length - 1, step - 2));
  const p = maturity.phases[phase];
  const tier = (it: string) => maturity.activates[it] ?? 0;
  const all = maturity.stages.flatMap((st) => st.items);
  const lit = all.filter((it) => tier(it) <= phase).length;
  // Leaving 07 while reading puts it back on Foundational for the next visit.
  const was = useRef(active);
  useEffect(() => {
    if (was.current && !active && reading) setStep("s07", 2);
    was.current = active;
  }, [active, reading, setStep]);
  return (
    <Frame
      className="s07"
      footer={
        <Foot>
          <span className="sp" />
          <Ref to="a5">A5 · Integrated launch journey →</Ref>
        </Foot>
      }
    >
      <div className="head">
        <B n={0} as="h2" className="t-title s07-title">
          {s07.title[0]} {s07.title[1]} <span className="hollow">{s07.sub}</span>
        </B>
        <B n={1} as="p" className="takeaway">
          {s07.bottom.map((l, k) => (
            <span key={l} className={k === 2 ? "strong" : ""}>
              {l}
            </span>
          ))}
        </B>
      </div>
      <B n={2} v="cut" className="maturity">
        <div className="ph-nav" role="group" aria-label={maturity.thesis}>
          <p className="t-label thesis">{maturity.thesis}</p>
          {maturity.phases.map((_, k) => (
            <PhaseButton key={k} k={k} phase={phase} />
          ))}
        </div>
        <div className="ph-sum" aria-live="polite">
          <p className="t-label ph-count">
            <span className="mute">{maturity.activeLabel}</span>{" "}
            <span className="num">{pad2(lit)}</span> / {pad2(all.length)}
          </p>
          <div className="ph-card">
            <p className="ph-hd">{p.headline}</p>
            <p className="ph-body">{p.body}</p>
          </div>
        </div>
      </B>
      <B n={2} v="cut" className="journey" data-phase={phase}>
        <svg className="thread thread-draw" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="6" x2="990" y2="6" vectorEffect="non-scaling-stroke" />
          <path className="tip" d="M986 0 L1000 6 L986 12 Z" />
        </svg>
        {maturity.stages.map((st, k) => (
          <div className="stage" key={st.name}>
            <span className="t-label mute">{pad2(k + 1)}</span>
            <p className="nm">{st.name}</p>
            <p className="t-label">{st.line}</p>
            <ul>
              {st.items.map((it) => {
                const t = tier(it);
                return (
                  <li key={it} className={`${t <= phase ? "on" : "off"} ${t === phase ? "new" : ""} ${t === 0 ? "core" : ""}`}>
                    <span>{it}</span>
                    <span className="tier" aria-label={maturity.phases[t].name}>
                      {pad2(t + 1)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </B>
    </Frame>
  );
}

/* 08 · MEASUREMENT ----------------------------------------------------- */
/* → walks the four channels (USE, VALUE, TRUST, COMMERCIAL); hover previews
   one, click or Tab selects it. The active channel turns cobalt and the white
   panel beneath it always carries its question and what it means. */
export function S08() {
  const { step, onScreen, reading } = useSection();
  const [hover, setHover] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => setPicked(null), [step]);
  const fromStep = step >= 1 && step <= 4 ? step - 1 : reading ? 0 : 3;
  const act = hover ?? picked ?? fromStep;
  const ch = s08.channels[act];
  return (
    <Frame
      className="s08"
      media={
        // The clip stays mounted and loaded between visits so build 0 never shows a loading frame.
        <div className="film-wrap" style={step === 0 ? undefined : { display: "none" }}>
          <Film name="signal-noise" play={onScreen && step === 0} />
        </div>
      }
      footer={
        <Foot>
          <span className="tgt" aria-hidden="true" />
          <span className="t-label mute">Value not set</span>
          <span className="sp" />
          <Ref to="a4">A4 · Baseline metrics →</Ref>
        </Foot>
      }
    >
      <h2 className="t-broadcast applause">
        {s08.beat1[0]}
        <br />
        {s08.beat1[1]}
      </h2>
      <B n={1} v="cut" as="p" className="t-broadcast behavior">
        {s08.beat2[0]}
        <br />
        {s08.beat2[1]}
      </B>
      <B n={1} className="measure" style={{ "--k": act } as CSSProperties}>
        <div className="panel" onMouseLeave={() => setHover(null)}>
          {s08.channels.map((c, k) => (
            <button
              type="button"
              key={c.name}
              className={`chan ${k === 3 ? "commercial" : ""} ${k === act ? "on" : ""}`}
              aria-pressed={k === act}
              onMouseEnter={() => setHover(k)}
              onFocus={() => setPicked(k)}
              onClick={() => setPicked(k)}
            >
              <span className="hd">
                <span className="nm">{c.name}</span>
                <span className="t-label">CH.{k + 1}</span>
              </span>
              {c.items.map((it) => (
                <span className="meter" key={it}>
                  <span>{it}</span>
                  <span className="tgt" role="img" aria-label="Target not set" />
                </span>
              ))}
            </button>
          ))}
        </div>
        <div className="explain" aria-live="polite">
          <span className="t-label">
            CH.{act + 1} · {ch.name}
          </span>
          <p className="q">{s08.questions[act]}</p>
          <p className="d">{channelNotes[act]}</p>
        </div>
      </B>
      <B n={5} className="bottom">
        <p className="t-sub lg mute">{s08.bottom[0]}</p>
        <p className="t-sub lg" style={{ fontWeight: 700 }}>
          {s08.bottom[1]}
        </p>
      </B>
    </Frame>
  );
}

/* 09 · CLOSE ----------------------------------------------------------- */
/* One frame. The city runs from day into night behind it; the wedge and its
   expansion path sit above one dominant statement. */
export function S09() {
  const { onScreen } = useSection();
  return (
    <Frame
      className="s09"
      media={
        <div className="film-wrap">
          <Film name="city-timelapse" play={onScreen} className="grey" />
          <div className="close-veil" aria-hidden="true" />
        </div>
      }
      footer={
        <Foot>
          <span className="sp" />
          <Ref to="a1">Appendix →</Ref>
        </Foot>
      }
    >
      <div className="close">
        <B n={0} className="context">
          <p className="start">{s09.title.join(" ")}</p>
          <ol className="path">
            {s09.ladder.map((l, k) => (
              <li key={l} className={k === 0 ? "first" : ""}>
                {l}
              </li>
            ))}
          </ol>
        </B>
        <B n={1} as="h2" className="t-broadcast earn">
          {s09.earn[0]}
          <br />
          {s09.earn[1]}
        </B>
      </div>
    </Frame>
  );
}
