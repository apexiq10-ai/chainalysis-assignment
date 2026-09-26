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
// direction. The channel matrix itself stays the approved s07.stages in
// content.ts: no tactic is added, renamed or removed. This file only says
// when each existing tactic is switched on, and why.
export const maturity = {
  thesis: "You earn channel complexity",
  focusLabel: "Focus",
  activeLabel: "Active plays",
  phases: [
    {
      name: "Foundational",
      horizon: "0 to 3 months",
      evidence: "Lower evidence",
      motion: "Focused distribution",
      headline: "Prove the wedge.",
      body: "Start with the channels closest to product truth, the buyer and the field. The goal is learning and credible proof, not maximum reach.",
      focus: "Prove the buyer problem, equip the field, create evidence.",
    },
    {
      name: "Advancing",
      horizon: "3 to 12 months",
      evidence: "More evidence",
      motion: "Selective expansion",
      headline: "Expand what works.",
      body: "Add distribution around the messages, audiences and motions already producing signal. Turn individual wins into a repeatable engine.",
      focus: "Repeat proven motions, add reach, build compounding proof.",
    },
    {
      name: "Mature",
      horizon: "12+ months",
      evidence: "Repeatable evidence",
      motion: "Orchestrated scale",
      headline: "Compound the system.",
      body: "Orchestrate the full channel system around behavioral signals, customer proof and repeatable plays. Scale precision, not activity.",
      focus: "Scale proven plays, personalize by signal, compound institutional proof.",
    },
  ],
  // The phase (0 Foundational, 1 Advancing, 2 Mature) in which each existing
  // tactic switches on, keyed by its exact label in s07.stages. The filter for
  // phase 0: does it prove the wedge or learn directly from the buyer?
  activates: {
    // Discover
    "Launch film / hero demo": 1,
    "PR + trade media": 1,
    "Executive POV": 0,
    "Organic + paid social": 2,
    "Product / web": 2,
    // Understand
    "Thought leadership": 1,
    "SME content": 2,
    "Webinar / live demo": 1,
    "Customer voice": 1,
    "Analyst relations": 2,
    // Evaluate
    "Seller story": 0,
    "ROI model": 1,
    "Customer proof": 1,
    "Governance package": 0,
    "Technical validation": 0,
    // Pilot
    "ABM": 1,
    "Executive briefing": 0,
    "Workshop": 0,
    "Chain on Your SOP": 0,
    "Solutions + CS": 1,
    // Expand
    "Workflow library": 2,
    "Customer success": 1,
    "Account expansion": 2,
    "Customer advocacy": 2,
    "Events": 2,
  } as Record<string, number>,
};
