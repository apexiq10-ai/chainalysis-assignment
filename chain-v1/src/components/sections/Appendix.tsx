"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { a1, a2, a3, a4, appendixList } from "@/content";
// A5 and A6 carry the authored complements to main slides 07 and 09.
import { a5, a6 } from "@/content.authored";
import { Frame, Mark, useDeck, useSection } from "@/components/ui";

const pad2 = (n: number) => String(n).padStart(2, "0");
const col = (c: string, cm?: string) => ({ "--c": c, ...(cm ? { "--cm": cm } : {}) }) as CSSProperties;


type Apx = { title: string; headline: string; narrative: string[]; exhibit: string; implication: string };

function Exhibit({
  id,
  a,
  exhibit,
  aside,
  source,
  exhibitCol = "5 / 13",
  proseCol = "1 / 5",
}: {
  id: string;
  a: Apx;
  exhibit: ReactNode;
  aside?: ReactNode;
  source?: string;
  exhibitCol?: string;
  proseCol?: string;
}) {
  const idx = id.toUpperCase();
  return (
    <div className={`slide ${id}`} key={id}>
      <div className="g ahead">
        <h2 className="t-title" style={col("1 / 11")}>
          {a.headline}
        </h2>
      </div>
      <div className="g body">
        <div className="prose" style={col(proseCol)}>
          <p className="t-label mute">Business narrative</p>
          {a.narrative.map((p) => (
            <p className="t-body" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          {aside}
        </div>
        <figure style={col(exhibitCol)}>
          <figcaption className="xh">
            <span className="t-label">Exhibit · {idx}</span>
            <span className="t-label mute">{a.exhibit}</span>
          </figcaption>
          {exhibit}
        </figure>
      </div>
      <div className="impl">
        <span className="t-label">Implication</span>
        <p className="t-sub lg">{a.implication}</p>
      </div>
      {source && (
        <div className="srcnote">
          <span className="t-label">Source note</span>
          <span className="t-small mute" style={{ maxWidth: "80ch" }}>
            {source}
          </span>
        </div>
      )}
    </div>
  );
}

/* A1 · CATEGORY CONVERGENCE -------------------------------------------- */
function Cell({ v, us }: { v: string; us?: boolean }) {
  if (v === "Yes") return <Mark kind="c">{v}</Mark>;
  if (v === "Public materials do not verify") return <Mark kind="n">{v}</Mark>;
  if (v === "Product dependent") return <span className="mute">{v}</span>;
  return us ? <Mark kind="c">{v}</Mark> : <span>{v}</span>;
}

export function A1() {
  return (
    <Exhibit
      id="a1"
      a={a1}
      source={a1.source}
      exhibit={
        <>
          <div className="tablewrap">
            <table className="tbl convergence">
              <thead>
                <tr>
                  {a1.columns.map((c, k) => (
                    <th key={c} className={`t-label ${k === 3 ? "us" : ""}`} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {a1.rows.map((r) => (
                  <tr key={r.cap} className={r.open ? "open" : ""}>
                    <th scope="row">{r.cap}</th>
                    <td>
                      <Cell v={r.trm} />
                    </td>
                    <td>
                      <Cell v={r.ell} />
                    </td>
                    <td className="us">
                      <Cell v={r.chain} us />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="legend">
            <Mark kind="c">Claimed · stated by the company, not independently demonstrated</Mark>
            <Mark kind="n">Not verified · no public evidence found; does not mean absent</Mark>
          </div>
        </>
      }
    />
  );
}

/* A2 · WORKFLOW PRIORITIZATION ----------------------------------------- */
// Two-by-two: ease of proof on x (Low | High, Medium on the divider),
// expansion potential on y (Lower | High). Bands only; no scores exist.
function Matrix() {
  const [, tracing, sof, le, , autonomous] = a2.points;
  const X0 = 120, X1 = 880, Y0 = 16, Y1 = 380;
  const MX = (X0 + X1) / 2, MY = (Y0 + Y1) / 2;
  return (
    <div className="tablewrap">
      <svg className="mx" viewBox="0 0 900 460" role="img" aria-label="Two-by-two matrix. Alert enrichment plus investigation preparation: high expansion potential, high ease of proof. Complex tracing, source of funds and law-enforcement response: high expansion, medium ease. General research and ad hoc intelligence: lower expansion, high ease. Autonomous disposition: high expansion, low ease." style={{ minWidth: 620 }}>
        {/* quadrants */}
        <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke="var(--ink)" strokeOpacity="0.25" />
        <line className="mid" x1={MX} y1={Y0} x2={MX} y2={Y1} />
        <line className="mid" x1={X0} y1={MY} x2={X1} y2={MY} />
        <line className="ax" x1={X0} y1={Y1} x2={X1} y2={Y1} />
        <line className="ax" x1={X0} y1={Y0} x2={X0} y2={Y1} />

        {/* axis labels */}
        <text x={X0 + (MX - X0) / 2} y={Y1 + 28} textAnchor="middle" fontSize="13">LOW</text>
        <text x={MX} y={Y1 + 28} textAnchor="middle" fontSize="13">MEDIUM</text>
        <text x={MX + (X1 - MX) / 2} y={Y1 + 28} textAnchor="middle" fontSize="13">HIGH</text>
        <text x={MX} y={Y1 + 62} textAnchor="middle" fontSize="14" fontWeight="600">{a2.xAxis.toUpperCase()} →</text>
        <text x={X0 - 14} y={Y0 + (MY - Y0) / 2} textAnchor="end" fontSize="13">HIGH</text>
        <text x={X0 - 14} y={MY + (Y1 - MY) / 2} textAnchor="end" fontSize="13">LOWER</text>
        <text transform={`translate(24 ${MY}) rotate(-90)`} textAnchor="middle" fontSize="14" fontWeight="600">{a2.yAxis.toUpperCase()} →</text>

        {/* wedge */}
        <rect x={MX + 44} y={46} width={16} height={16} className="q-wedge" />
        <rect x={MX + 70} y={30} width={X1 - MX - 84} height={70} className="q-wedge" />
        <text className="pt-label wedge q-wedge-text" x={MX + 84} y={60}>Alert enrichment +</text>
        <text className="pt-label wedge q-wedge-text" x={MX + 84} y={84}>investigation preparation</text>

        {/* medium: on the divider */}
        {[tracing, sof, le].map((p, k) => (
          <g key={p.label}>
            <rect x={MX - 6} y={48 + k * 40} width={12} height={12} fill="var(--ink)" />
            <text className="pt-label" x={MX - 16} y={59 + k * 40} textAnchor="end">{p.label}</text>
          </g>
        ))}

        {/* low ease, high expansion */}
        <rect x={X0 + 40} y={176} width={12} height={12} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <text className="pt-label" x={X0 + 60} y={187}>{autonomous.label}</text>

        {/* high ease, lower expansion */}
        <rect x={MX + 44} y={272} width={12} height={12} fill="var(--ink)" />
        <text className="pt-label" x={MX + 66} y={283}>General research /</text>
        <text className="pt-label" x={MX + 66} y={303}>ad hoc intelligence</text>
      </svg>
    </div>
  );
}

export function A2() {
  return (
    <Exhibit
      id="a2"
      a={a2}
      proseCol="1 / 6"
      exhibitCol="6 / 13"
      exhibit={<Matrix />}
      aside={
        <div style={{ marginTop: 10 }}>
          <p className="t-label" style={{ paddingBottom: 8, borderBottom: "1.5px solid var(--fg)" }}>
            {a2.criteriaTitle}
          </p>
          <table className="tbl criteria">
            <thead className="sr-only">
              <tr>
                <th>Criterion</th>
                <th>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {a2.criteria.map(([c, w]) => (
                <tr key={c}>
                  <td>{c}</td>
                  <td>{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

/* A3 · THE FI BUYING SYSTEM -------------------------------------------- */
export function A3() {
  return (
    <Exhibit
      id="a3"
      a={a3}
      exhibit={
        <div className="buying">
          <div className="side">
            <div className="sh">
              {a3.demandHead.map((h) => (
                <span className="t-label" key={h}>
                  {h}
                </span>
              ))}
            </div>
            {a3.demand.map(([who, v]) => (
              <div className="row" key={who}>
                <b>{who}</b>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="side scale">
            <div className="sh">
              {a3.scaleHead.map((h) => (
                <span className="t-label" key={h}>
                  {h}
                </span>
              ))}
            </div>
            {a3.scale.map(([who, v]) => (
              <div className="row" key={who}>
                <b>{who}</b>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="converge" aria-hidden="true">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M25 0 V4 H50 V10" vectorEffect="non-scaling-stroke" />
              <path d="M75 0 V4 H50" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="deploy">
            <span className="t-label">{a3.converge}</span>
            <p className="t-title">{a3.target}</p>
          </div>
        </div>
      }
    />
  );
}

/* A4 · PILOT ECONOMICS ------------------------------------------------- */
export function A4() {
  return (
    <Exhibit
      id="a4"
      a={a4}
      exhibit={
        <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 14 }}>
          <div className="flows" aria-label="Current state has six steps before human review; the Chain pilot has one.">
            <div className="flow">
              <span className="lbl t-label">{a4.current.label}</span>
              <div className="steps">
                {a4.current.steps.map((s) => (
                  <span key={s}>{s}</span>
                ))}
                <span className="rev t-label">{a4.review}</span>
              </div>
            </div>
            <div className="flow pilot">
              <span className="lbl t-label">{a4.pilot.label}</span>
              <div className="steps">
                <span>{a4.pilot.steps[0]}</span>
                <span className="rev t-label">{a4.review}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="t-label" style={{ paddingBottom: 8, borderBottom: "1.5px solid var(--fg)" }}>
              {a4.metricsTitle}
            </p>
            <div className="tablewrap">
              <table className="tbl metrics" style={{ minWidth: 560 }}>
                <thead>
                  <tr>
                    {a4.metrics.map((m) => (
                      <th key={m.name} className="t-label" scope="col">
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map((r) => (
                    <tr key={r}>
                      {a4.metrics.map((m) => (
                        <td key={m.name}>{m.items[r]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="t-label" style={{ paddingBottom: 8 }}>
              {a4.scaleTitle}
            </p>
            <div className="scalewhen">
              {a4.scaleWhen.map((w, k) => (
                <span key={w} style={{ display: "contents" }}>
                  {k > 0 && <span className="op">+</span>}
                  <span className="t-sub">{w}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

/* A5 · INTEGRATED LAUNCH JOURNEY --------------------------------------- */
export function A5() {
  return (
    <Exhibit
      id="a5"
      a={a5}
      proseCol="1 / 4"
      exhibitCol="4 / 13"
      exhibit={
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div className="tablewrap">
            <table className="tbl journeytbl">
              <thead>
                <tr>
                  {a5.columns.map((c) => (
                    <th key={c} className="t-label" scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {a5.rows.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td style={{ fontWeight: 600 }}>{r[3]}</td>
                    <td>
                      <span className="t-label">{r[4]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="t-label" style={{ paddingBottom: 8, borderBottom: "1.5px solid var(--fg)" }}>
              {a5.cadenceTitle}
            </p>
            <ol className="cadence">
              {a5.cadence.map(([t, what]) => (
                <li key={t} className={`cad ${t === "GA" ? "ga" : ""}`}>
                  <span className="dot" aria-hidden="true" />
                  <span className="t-readout">{t}</span>
                  <span className="t-small">{what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      }
    />
  );
}

/* A6 · GA READINESS ---------------------------------------------------- */
export function A6() {
  const [ga, ...parts] = a6.principle;
  return (
    <Exhibit
      id="a6"
      a={a6}
      proseCol="1 / 6"
      exhibitCol="6 / 13"
      aside={
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        <p className="t-label" style={{ paddingBottom: 8, borderBottom: "1.5px solid var(--fg)" }}>
          {a6.disciplineTitle}
        </p>
        <div className="avoid" aria-hidden="true">
          {a6.avoid.map((w) => (
            <s key={w}>{w}</s>
          ))}
        </div>
        <p className="t-small">{a6.discipline}</p>
        </div>
      }
      exhibit={
        <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 12 }}>
          <div className="ready">
            {a6.columns.map((c) => (
              <div className="rc" key={c.name}>
                <h3>{c.name}</h3>
                <ul>
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="a6-low">
          <div>
            <p className="t-label" style={{ paddingBottom: 8 }}>
              {a6.principleTitle}
            </p>
            <div className="principle">
              <div className="eqn yes">
                <span className="t-title">{ga}</span>
                <span className="op">=</span>
                {parts.map((p, k) => (
                  <span key={p} style={{ display: "contents" }}>
                    {k > 0 && <span className="op">+</span>}
                    <span className="t-title">{p}</span>
                  </span>
                ))}
              </div>
              <div className="eqn no">
                <span className="t-label" style={{ width: "100%" }}>
                  {a6.not}
                </span>
                <span className="t-title struck">{a6.notPrinciple[0]}</span>
                <span className="op">=</span>
                <span className="t-title struck">{a6.notPrinciple[1]}</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      }
    />
  );
}

/* The appendix is one section. Each build is one exhibit; left and right
   (keys, swipe, or the footer) move between them with a hard cut. */
const EXHIBITS = [A1, A2, A3, A4, A5, A6];

export function Appendix() {
  const { step } = useSection();
  const { advance } = useDeck();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const View = EXHIBITS[step];
  const cur = appendixList[step];
  const first = step === 0;
  const last = step === EXHIBITS.length - 1;
  return (
    <Frame className="apx">
      <nav className="apx-nav" aria-label="Appendix pages">
        <button className="apx-btn prev" onClick={() => advance(-1)} disabled={first} aria-disabled={first}>
          <span className="arr" aria-hidden="true">←</span>
          <span>Previous</span>
        </button>
        <p className="apx-pos">
          <span className="t-label">Appendix</span>
          <span className="count">
            {pad2(step + 1)} / {pad2(EXHIBITS.length)}
          </span>
          <span className="t-label title">{cur.title}</span>
        </p>
        <button className="apx-btn next" onClick={() => advance(1)} disabled={last} aria-disabled={last}>
          <span>Next</span>
          <span className="arr" aria-hidden="true">→</span>
        </button>
      </nav>
      <div
        className="track"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) advance(dx < 0 ? 1 : -1);
        }}
      >
        <View key={cur.id} />
      </div>
    </Frame>
  );
}
