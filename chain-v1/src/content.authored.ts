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
    { name: "Validate", line: "Clear vendor and model risk", items: ["Technical validation", "Governance package", "Customer proof"] },
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
  // switches on: 6, then 11, then all 15. Scale waits for Advancing, once
  // there is a first customer to grow.
  activates: {
    // Recognize
    "Executive POV": 0,
    "PR + trade media": 1,
    "Analyst relations": 2,
    // Justify
    "Seller story": 0,
    "Executive briefing": 0,
    "ROI model": 2,
    // Validate
    "Technical validation": 0,
    "Governance package": 1,
    "Customer proof": 1,
    // Pilot
    "Chain on Your SOP": 0,
    "Workshop": 0,
    "Solutions + CS": 2,
    // Scale
    "Customer success": 1,
    "Workflow library": 1,
    "Customer advocacy": 2,
  } as Record<string, number>,
};

// A5 · A6 COMPLEMENTS. Written at Arthur's direction so the appendix backs up
// main slides 07 and 09 instead of restating an earlier version of them.
// A5 is the detail behind 07: the same five buyer stages, the same fifteen
// plays in the same priority order, and the phase each one switches on in
// (01 Foundational, 02 Advancing, 03 Mature, as tagged on 07).
// A6 is the gate behind 09: GA is earned on one alert workflow, and the same
// four readiness tests earn each next rung of the 09 expansion path.
// Same shapes as a5 / a6 in content.ts, so the exhibit layouts do not change.
// Titles stay as they were: the 07 footer links to "A5 · Integrated launch journey".
export const a5 = {
  title: "Integrated launch journey",
  headline:
    "The launch should earn channel complexity: six plays at GA, fifteen at maturity, one story and one next action throughout.",
  narrative: [
    "Chainalysis should not switch every channel on at launch. A bank or FSI compliance buyer moves through five stages: recognize the digital-asset exposure, justify it internally, clear vendor and model risk, prove it on their own alerts, then earn the next workflow. The launch should activate channels in three phases as evidence accumulates. The Foundational phase, in the first three months, runs the six plays closest to product truth, the buyer and the field: executive POV, seller story, executive briefing, technical validation, Chain on Your SOP and the workshop.",
    "The Advancing phase, from three to twelve months, adds five plays around the messages, audiences and motions already producing signal: PR and trade media, the governance package, customer proof, customer success and the workflow library. Analyst relations, the ROI model, Solutions + CS and customer advocacy join in the Mature phase, after twelve months, bringing the system to fifteen plays. At every phase, each channel tells the same workflow story and moves the buyer toward one next action: trying Chain on their own alerts.",
  ],
  exhibit: "Channel maturity by buyer stage",
  columns: ["Stage", "Buyer job", "Plays in priority order · phase on", "Core asset", "Primary signal"],
  rows: [
    ["Recognize", "Name the digital-asset exposure", "Executive POV 01 · PR + trade media 02 · Analyst relations 03", "Hero story", "Qualified engagement"],
    ["Justify", "Arm the buying committee", "Seller story 01 · Executive briefing 01 · ROI model 03", "Seller story", "Intent"],
    ["Validate", "Clear vendor and model risk", "Technical validation 01 · Governance package 02 · Customer proof 02", "Governance package", "Evaluation"],
    ["Pilot", "Prove it on their own alerts", "Chain on Your SOP 01 · Workshop 01 · Solutions + CS 03", "Chain on Your SOP", "Pilot start"],
    ["Scale", "Earn the next workflow", "Customer success 02 · Workflow library 02 · Customer advocacy 03", "New workflow play", "Expansion"],
  ] as string[][],
  cadenceTitle: "Operating cadence · you earn channel complexity",
  cadence: [
    ["Pre-GA", "Design partners prove the wedge on their own alerts"],
    ["GA", "Foundational: 6 plays. Prove the wedge."],
    ["+3 mo", "Advancing: 11 plays. Expand what works."],
    ["+12 mo", "Mature: 15 plays. Compound the system."],
    ["Next", "Each proven workflow earns the next one"],
  ] as [string, string][],
  implication:
    "One story. Every channel. One next action. Add a channel only when the evidence to support it exists.",
};

export const a6 = {
  title: "GA readiness",
  headline:
    "GA should be earned on one alert workflow; the same four readiness tests then earn each next workflow.",
  narrative: [
    "Chain should reach GA on a single workflow: alert enrichment and investigation preparation. A credible financial-institution launch requires four forms of readiness to converge on that workflow. The product must perform it reliably and expose enough evidence to support review. Design partners must show measured improvement and repeat use on their own alerts. The second line must receive enough documentation to evaluate the operating model. The field must be able to explain, demonstrate and pilot that one workflow consistently.",
    "The same four tests then govern expansion. Investigations, monitoring, source of funds, due diligence and broader digital-asset operations each earn a place in the launch claim only when product, customer, governance and field evidence exist for that workflow. If one dimension remains materially incomplete, Chainalysis should narrow the claim to the workflow it has proven instead of asking Marketing to compensate for missing proof. That is how Chain earns the right to change the institution.",
  ],
  exhibit: "Readiness gate for every workflow",
  columns: [
    { name: "Product", items: ["Alert workflow performs", "Chain provides run evidence", "Chain defines the human boundary", "Telemetry supports review", "Team understands change behavior"] },
    { name: "Customer", items: ["Design partners active on their own alerts", "Measured improvement against baseline", "Customers repeat use", "Referenceable proof", "Signal for the next workflow"] },
    { name: "Governance", items: ["Validation guide", "Model-use disclosure", "Sample run record", "Security / TPRM package", "Change-management guidance"] },
    { name: "Field", items: ["Seller story", "Executive briefing", "Technical validation", "Chain on Your SOP", "Workshop"] },
  ],
  principleTitle: "Release principle · first workflow, then every next one",
  principle: ["GA", "Product", "Customer", "Governance", "Field"],
  not: "Not:",
  notPrinciple: ["GA", "Announcement ready"],
  disciplineTitle: "Claim discipline",
  discipline:
    "Avoid claims such as “court-ready AI,” “regulator-approved,” “no hallucinations,” or unverified performance gains. When Chainalysis discusses judicial acceptance, it should explicitly attach that claim to the underlying data and methodology, not to conclusions that Chain generates.",
  avoid: ["court-ready AI", "regulator-approved", "no hallucinations", "unverified performance gains"],
  implication: "Start with one alert. Earn each next workflow the same way.",
};
