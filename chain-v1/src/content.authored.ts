// AUTHORED COPY. Not in the approved content source.
// Written in the recovery pass at Arthur's direction (persona maps on 05,
// measurement descriptions on 08). Every line is grounded in approved
// material: the slide 05 and 08 speaker notes, and appendices A3 and A4.
// It makes no product, performance or numerical claim.
// `npm run check:copy` checks src/content.ts only; this file is reviewed by hand.

export const personaLabels = {
  who: "Who",
  pains: "What makes the job hard",
  message: "How we message Chain",
};

// Same order as s05.roles in content.ts.
export const personas = [
  {
    // Investigator · "Get me to the decision faster."
    pains: [
      "Too much time assembling context before judgment begins",
      "Repeated manual research across fragmented sources",
      "Pressure to move quickly without losing evidentiary rigor",
    ],
    message: [
      "Bring relevant blockchain intelligence into the investigation earlier",
      "Reduce repetitive preparation work",
      "Keep the investigator as the decision-maker",
      "Make supporting evidence easier to inspect and reuse",
    ],
  },
  {
    // Head of Financial Crime · "Help my team absorb more."
    pains: [
      "Rising alert volume and operational pressure",
      "Throughput that cannot come at the expense of controls",
      "Preparation that varies from analyst to analyst",
    ],
    message: [
      "Standardize repeatable investigative preparation",
      "Create more consistent evidence packages",
      "Absorb more volume while the team keeps the judgment",
      "Improve the operating model around analyst judgment",
    ],
  },
  {
    // CCO / Risk · "Let me see how we got there."
    pains: [
      "Showing how a decision was reached",
      "Concern that AI introduces new governance risk",
      "Testing the control over time",
    ],
    message: [
      "Preserve human review and governance",
      "Automate preparation, not the decision",
      "Show how the workflow operates and where model reasoning occurs",
      "Give the second line something it can review and test",
    ],
  },
  {
    // Digital Assets · "Don't let controls cap growth."
    pains: [
      "Controls that do not scale with custody, stablecoin, tokenization and payments growth",
      "Skilled analysts consumed by repetitive preparation",
      "Pressure to demonstrate measurable operational value",
    ],
    message: [
      "Grow without letting operational controls become the bottleneck",
      "Apply intelligence where it reduces operational friction",
      "Measure time-to-decision and repeatable workflow value",
      "Earn expansion through measurable proof",
    ],
  },
];

// Same order as s08.channels in content.ts. The approved question for each
// channel leads the panel; this is the sentence beneath it.
export const channelNotes = [
  "Active users, workflow runs and repeat usage show whether Chain has entered the daily work, not whether people saw the launch.",
  "Reduce the repetitive work between an alert and informed human judgment. The measure is not whether AI produced an answer, but whether investigators reach the relevant context faster and can inspect the evidence behind it.",
  "Corrections and overrides show where the output still needs a human; consistency and continued use show whether the team relies on it. A fast workflow that requires routine correction does not create institutional value.",
  "Connect faster, more consistent investigations to outcomes the institution can defend: capacity, risk management, and the ability to scale the operating model without sacrificing control.",
];

// 07 · GTM MATURITY MODEL. Written in the final refinement pass at Arthur's
// direction. The stages follow how a bank or FSI compliance buyer actually
// moves: see the exposure, justify it internally, clear model, vendor and
// security review, prove it on their own alerts, then earn the next workflow.
// Three tactics per stage, in priority order, each an existing label from the
// approved s07 matrix (the full matrix stays in appendix A5).
export const maturity = {
  thesis: "You earn channel complexity",
  activeLabel: "Active plays",
  stages: [
    { name: "Recognize", line: "Name the digital-asset exposure", items: ["Executive POV", "PR + trade media", "Analyst relations"] },
    { name: "Justify", line: "Arm the buying committee", items: ["Seller story", "Executive briefing", "ROI model"] },
    { name: "Validate", line: "Clear vendor and model risk", items: ["Governance package", "Technical validation", "Customer proof"] },
    { name: "Pilot", line: "Prove it on their own alerts", items: ["Chain on Your SOP", "Workshop", "Solutions + CS"] },
    { name: "Scale", line: "Earn the next workflow", items: ["Customer success", "Workflow library", "Customer advocacy"] },
  ],
  phases: [
    {
      name: "Foundational",
      horizon: "0 to 3 months",
      evidence: "Lower evidence",
      motion: "Focused distribution",
      headline: "Prove the wedge.",
      body: "Start with the channels closest to product truth, the buyer and the field. The goal is learning and credible proof, not maximum reach.",
    },
    {
      name: "Advancing",
      horizon: "3 to 12 months",
      evidence: "More evidence",
      motion: "Selective expansion",
      headline: "Expand what works.",
      body: "Add distribution around the messages, audiences and motions already producing signal. Turn individual wins into a repeatable engine.",
    },
    {
      name: "Mature",
      horizon: "12+ months",
      evidence: "Repeatable evidence",
      motion: "Orchestrated scale",
      headline: "Compound the system.",
      body: "Orchestrate the full channel system around behavioral signals, customer proof and repeatable plays. Scale precision, not activity.",
    },
  ],
  // The phase (0 Foundational, 1 Advancing, 2 Mature) in which each tactic
  // switches on. Priority sets the pace: each stage's first tactic runs from
  // day one, its second joins in Advancing, its third in Mature (5, 10, 15).
  activates: {
    // Recognize
    "Executive POV": 0,
    "PR + trade media": 1,
    "Analyst relations": 2,
    // Justify
    "Seller story": 0,
    "Executive briefing": 1,
    "ROI model": 2,
    // Validate
    "Governance package": 0,
    "Technical validation": 1,
    "Customer proof": 2,
    // Pilot
    "Chain on Your SOP": 0,
    "Workshop": 1,
    "Solutions + CS": 2,
    // Scale
    "Customer success": 0,
    "Workflow library": 1,
    "Customer advocacy": 2,
  } as Record<string, number>,
};
