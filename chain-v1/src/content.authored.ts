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
