// All copy in this file is transcribed verbatim from
// Chainalysis_Chain_GTM_Presentation_Content.txt (the approved content source).
// Edit wording here only. Layout lives in src/components.

export type Mode = "night" | "record" | "broadcast" | "control";

export type SectionMeta = {
  id: string;
  index: string; // chrome label, e.g. "03" or "A2"
  subject: string;
  part: "main" | "appendix";
  steps: number; // number of builds after arrival (0 = static)
  modes: Mode[]; // mode at each step; the last entry repeats
  notes?: string[];
};

/* ---------------------------------------------------------------- MAIN DECK */

export const s01 = {
  line1: ["Money moves at", "machine speed."],
  line2: ["Financial intelligence", "has to keep up."],
  name: "Chain",
  signature: "Blockchain intelligence, put to work.",
  motionTag: "Illustrative motion · not transaction data",
};

export const s02 = {
  title: "Meet Chain.",
  sub: "From question to execution.",
  steps: [
    { word: "Ask", line: "Understand what happened." },
    { word: "Create", line: "Make the work." },
    { word: "Codify", line: "Make what works repeatable." },
  ],
  signature: ["Blockchain intelligence,", "put to work."],
  annotation: "Ask maps to Chainalysis “Converse.”",
};

export const s03 = {
  eyebrow: "Where I would start",
  title: "One alert.",
  build: ["Less preparation.", "More judgment."],
  today: {
    label: "Today",
    tasks: ["Research", "Trace", "Context", "Entities", "Procedure", "Evidence", "Case prep"],
    decision: "Human decision",
  },
  chainLabel: "Chain",
  // The With Chain column of the approved slide, one stage per press or click.
  // Every line is a verbatim sentence from the slide 02 and 03 speaker notes.
  // `takes` maps a stage to the Today steps it takes on: an inference from the
  // two approved columns, marked as such on screen.
  stages: [
    {
      name: "Alert",
      lines: [
        "The strongest initial FI wedge is alert enrichment and investigation preparation.",
        "It contains repetitive work. We can establish a baseline.",
      ],
      takes: "all",
    },
    {
      name: "Enrich.",
      lines: ["Ask a question against Chainalysis intelligence."],
      takes: ["Research", "Context", "Entities"],
    },
    {
      name: "Investigate.",
      lines: ["Create the investigation, report, graph, or artifact around it."],
      takes: ["Trace", "Procedure", "Evidence"],
    },
    {
      name: "Prepare.",
      lines: ["It needs to bring the investigator to the moment of judgment faster and with better preparation."],
      takes: ["Case prep"],
    },
    {
      name: "Human review + decision",
      lines: [
        "Most importantly, the human retains the material judgment.",
        "Chain does not need to replace the investigator to create substantial value.",
      ],
      takes: "decision",
    },
  ],
  takesLabel: "Takes on",
  inference: "Inference · step mapping",
  bottom: "Alert enrichment + investigation preparation",
};

export const s04 = {
  beat1: ["The magic isn’t", "the first answer."],
  beat2: ["It’s the next", "100 runs."],
  support: "Codify turns a proven procedure into a repeatable, evidenced workflow.",
  equation: [
    { n: "1", w: "case" },
    { n: "1", w: "workflow" },
    { n: "100", w: "runs" },
  ],
  quiet: [
    "Chain preserves the procedure",
    "Chain records inputs + sources + actions",
    "Human review remains visible",
  ],
  final: ["From assistance", "to operating model."],
  fieldTag: "Illustrative · run cells, not run data",
};

export const s05 = {
  title: ["Same Chain.", "Different stakes."],
  roles: [
    { role: "Investigator", quote: "Get me to the decision faster.", stakes: "Case complexity / backlog", buys: "The investigator buys time and better preparation." },
    { role: "Head of Financial Crime", quote: "Help my team absorb more.", stakes: "Volume / capacity / consistency", buys: "The Financial Crime leader buys capacity and consistency." },
    { role: "CCO / Risk", quote: "Let me see how we got there.", stakes: "Governance / audit / defensibility", buys: "Risk buys visibility and reviewability." },
    { role: "Digital Assets", quote: "Don’t let controls cap growth.", stakes: "Custody / stablecoins / tokenization / payments", buys: "The digital-assets leader buys the ability to grow without allowing operational controls to become the bottleneck." },
  ],
  footer: "One product story. Four buying consequences.",
};

export const s06 = {
  title: ["Build belief", "before you buy reach."],
  phases: [
    {
      n: "01", name: "Design", line: "Eligible FI accounts",
      items: ["3 to 5 design partners", "High-volume workflow", "Named workflow owner", "Second-line participation"],
    },
    {
      n: "02", name: "Prove", line: "Chain on a real SOP",
      items: ["Baseline", "Pilot", "Replay", "Customer economics", "Governance review"],
    },
    {
      n: "03", name: "Launch", line: "Turn proof into market evidence",
      items: ["Named partner voices", "Hero workflow demo", "Customer proof", "ROI story", "Governance package", "Seller readiness"],
    },
    {
      n: "04", name: "Scale", line: "Surround the market",
      items: ["ABM", "Events", "PR / earned", "Owned content", "Paid / retargeting", "Executive programs", "Customer advocacy"],
    },
  ],
  bottom: ["The pilot creates the proof.", "The proof powers the launch."],
};

export const s07 = {
  title: ["Make it impossible", "to miss."],
  sub: "And easy to try.",
  stages: [
    { name: "Discover", line: "Create the market moment", items: ["Launch film / hero demo", "PR + trade media", "Executive POV", "Organic + paid social", "Product / web"] },
    { name: "Understand", line: "Teach the use case", items: ["Thought leadership", "SME content", "Webinar / live demo", "Customer voice", "Analyst relations"] },
    { name: "Evaluate", line: "Arm the buying committee", items: ["Seller story", "ROI model", "Customer proof", "Governance package", "Technical validation"] },
    { name: "Pilot", line: "Convert interest into evidence", items: ["ABM", "Executive briefing", "Workshop", "Chain on Your SOP", "Solutions + CS"] },
    { name: "Expand", line: "Create the next use case", items: ["Workflow library", "Customer success", "Account expansion", "Customer advocacy", "Events"] },
  ],
  bottom: ["One story.", "Every channel.", "One next action."],
};

export const s08 = {
  beat1: ["Don’t measure", "the applause."],
  beat2: ["Measure", "the behavior."],
  channels: [
    { name: "Use", items: ["Active users", "Workflow runs", "Repeat usage"] },
    { name: "Value", items: ["Prep time", "Analyst touches", "Rework", "Evidence completeness"] },
    { name: "Trust", items: ["Corrections", "Overrides", "Consistency", "Continued use"] },
    { name: "Commercial", items: ["Pilot → production", "Expansion", "Opportunity progression", "Sales cycle", "Pipeline / revenue"] },
  ],
  // Speaker-note questions, verbatim, one per channel.
  questions: [
    "Are people using it?",
    "Did the work actually improve?",
    "Do they trust it enough to repeat the workflow?",
    "Does that customer behavior lead to production deployment, expansion, and commercial movement?",
  ],
  bottom: ["Reach tells us people saw Chain.", "Behavior tells us whether Chain mattered."],
};

export const s09 = {
  title: ["Start with", "one alert."],
  ladder: ["Alert preparation", "Investigations", "Monitoring", "Source of funds", "Due diligence", "Digital-asset operations"],
  earn: ["Earn the right", "to change the institution."],
};

/* ----------------------------------------------------------- SPEAKER NOTES */

export const notes: Record<string, string[]> = {
  s01: [
    "Digital assets increasingly operate on infrastructure that never closes: stablecoins, tokenized assets, custody, payments, and activity that crosses chains and jurisdictions.",
    "But human-paced investigation and control processes still shape how institutions understand that activity.",
    "So I would build the launch around one simple tension:",
    "Money moves at machine speed. Financial intelligence has to keep up.",
    "Chain can help solve that problem.",
  ],
  s02: [
    "Chainalysis describes the product through Converse, Create, and Codify. For the customer story, I would simplify Converse to Ask.",
    "Ask a question against Chainalysis intelligence.",
    "Create the investigation, report, graph, or artifact around it.",
    "When a process works, Codify turns that process into something repeatable.",
    "That last step becomes particularly important for financial institutions.",
  ],
  s03: [
    "I would resist launching every use case at once.",
    "The strongest initial FI wedge is alert enrichment and investigation preparation.",
    "It contains repetitive work. We can establish a baseline. Most importantly, the human retains the material judgment.",
    "Chain does not need to replace the investigator to create substantial value.",
    "It needs to bring the investigator to the moment of judgment faster and with better preparation.",
  ],
  s04: [
    "This is where I think the FI story becomes more interesting than another AI assistant.",
    "One useful answer helps one investigator once.",
    "But if the institution can take a successful procedure and turn it into a repeatable workflow, we begin changing the operating model.",
    "That is why I would put disproportionate weight behind Codify for financial institutions.",
    "Ask and Create remain important because they create immediate utility.",
    "But Codify is where Chain can potentially move from individual productivity into institutional leverage.",
  ],
  s05: [
    "The message changes because the job changes.",
    "The investigator buys time and better preparation.",
    "The Financial Crime leader buys capacity and consistency.",
    "Risk buys visibility and reviewability.",
    "The digital-assets leader buys the ability to grow without allowing operational controls to become the bottleneck.",
    "I would build one coherent product narrative, then express the consequence differently for each member of the buying committee.",
  ],
  s06: [
    "I would sequence the launch around evidence.",
    "First, select eligible financial institutions with a real workflow and an internal sponsor.",
    "Second, prove the value against an established baseline.",
    "Third, convert what we learn into launch assets, customer evidence, the field story, and the governance package.",
    "Only then do we turn up the volume.",
    "The pilot does not happen before Marketing begins.",
    "The pilot manufactures the evidence Marketing needs.",
  ],
  s07: [
    "This is not a single announcement. It is a connected buyer journey.",
    "The launch creates the moment.",
    "Content and customer voices build understanding.",
    "Sales, governance, and technical materials help the buying group evaluate.",
    "The pilot converts belief into evidence.",
    "Then customer success and the account motion turn the first workflow into the second and third.",
    "I would make the channels behave like one system instead of running events, demand, and seller enablement as separate activities.",
  ],
  s08: [
    "I would establish the customer baseline before the pilot.",
    "Then I want four kinds of evidence.",
    "Are people using it?",
    "Did the work actually improve?",
    "Do they trust it enough to repeat the workflow?",
    "Does that customer behavior lead to production deployment, expansion, and commercial movement?",
    "An announcement does not make a launch successful. Changes in customer and field behavior do.",
  ],
  s09: [
    "The wedge is narrow by design.",
    "We start with a workflow where we can prove that Chain changes the economics and quality of the work.",
    "Then we earn the next workflow.",
    "And the next team.",
    "Ultimately, we earn a broader role in how the institution operates digital assets.",
    "Money moves at machine speed. Financial intelligence has to keep up.",
    "That is the opportunity I would build the Chain launch around.",
    "Q&A.",
  ],
};

/* ---------------------------------------------------------------- APPENDIX */

export const appendixIntro =
  "AWS-style presentation approach: light, analytical, information-rich, and conclusion-led. Each slide uses business prose to explain the reasoning and an exhibit to make the argument easy to inspect.";

export const a1 = {
  title: "Category convergence",
  headline:
    "AI investigation assistance is becoming a category requirement; Chain should differentiate on repeatable institutional workflow.",
  narrative: [
    "AI-assisted investigation no longer creates a distinctive position on its own. TRM, Elliptic, and Chainalysis all publicly describe capabilities that combine natural-language interaction, investigative assistance, evidence, and human oversight. These capabilities remain important, but they increasingly define the minimum bar for the category rather than a durable market position.",
    "Chain’s stronger financial-institution opportunity begins after the first answer. Codify allows a successful procedure to become a repeatable workflow, while Chain records the inputs, sources, and actions associated with each run. The launch should test whether repeatable workflow execution, evidenced runs, and Chainalysis intelligence produce superior workflow economics and institutional adoption. Marketing should treat this proposition as a hypothesis to prove with customers, not an exclusivity claim to assert.",
  ],
  exhibit: "Category convergence",
  columns: ["Capability", "TRM", "Elliptic", "Chain"],
  rows: [
    { cap: "Conversational investigation", trm: "Yes", ell: "Yes", chain: "Yes" },
    { cap: "Human oversight", trm: "Yes", ell: "Yes", chain: "Yes" },
    { cap: "Evidence / traceability", trm: "Yes", ell: "Yes", chain: "Yes" },
    { cap: "Investigation assistance", trm: "Yes", ell: "Yes", chain: "Yes" },
    { cap: "Artifact creation", trm: "Product dependent", ell: "Product dependent", chain: "Create" },
    { cap: "Repeatable workflow execution", trm: "Public materials do not verify", ell: "Public materials do not verify", chain: "Codify", open: true },
    { cap: "Code-based deterministic workflow claim", trm: "Public materials do not verify", ell: "Public materials do not verify", chain: "Chainalysis makes this claim publicly", open: true },
  ],
  implication: "Do not lead with “AI + evidence.” Lead with the operating-model change Chain can potentially enable.",
  source:
    "The team reviewed public company materials in September 2026. The absence of a public competitor claim does not establish the absence of a capability.",
};

export const a2 = {
  title: "Workflow prioritization",
  headline:
    "Alert enrichment and investigation preparation provide the fastest path to proving Chain’s broader financial-institution value.",
  narrative: [
    "The initial FI use case should optimize for proof, not breadth. Alert enrichment and investigation preparation combine repetitive analyst work, a measurable current-state baseline, a clearly bounded human decision, and a natural path into adjacent workflows. That combination allows Chainalysis to test the product under meaningful operating conditions without asking the customer to delegate the final compliance judgment to an agent.",
    "The account team should begin the pilot by documenting the current workflow: elapsed time, analyst touches, research steps, evidence assembly, corrections, and handoffs. The team can then evaluate Chain against that baseline. If the workflow demonstrates material improvement while maintaining trusted human review, Chainalysis will gain the evidence required to expand into complex tracing, source-of-funds work, law-enforcement response, monitoring, and other digital-asset operations.",
  ],
  exhibit: "Workflow prioritization",
  yAxis: "Expansion potential",
  xAxis: "Ease of proving customer value",
  // Placement exactly as given in the source; bands, not numeric scores.
  points: [
    { label: "Alert enrichment + investigation preparation", expansion: "High", ease: "High", wedge: true },
    { label: "Complex tracing", expansion: "High", ease: "Medium" },
    { label: "Source of funds", expansion: "High", ease: "Medium" },
    { label: "Law-enforcement response", expansion: "High", ease: "Medium" },
    { label: "General research / ad hoc intelligence", expansion: "Lower", ease: "High" },
    { label: "Autonomous disposition", expansion: "High", ease: "Low" },
  ],
  criteriaTitle: "Launch criteria",
  criteria: [
    ["Frequent", "Improvement compounds with volume"],
    ["Measurable", "Enables credible before-and-after evidence"],
    ["Bounded", "Keeps human accountability explicit"],
    ["Replayable", "Supports validation and control testing"],
    ["Expandable", "Creates a natural second and third workflow"],
  ],
  implication: "Start where Chain can earn the right to expand.",
};

export const a3 = {
  title: "The FI buying system",
  headline:
    "Production adoption requires both user demand and second-line permission; the launch must sell to both systems simultaneously.",
  narrative: [
    "A financial institution does not adopt Chain through a single buyer. Investigators and Financial Crime teams may create user pull because they experience the workflow friction directly. Digital Assets and Operations leaders may sponsor adoption because they need controls to scale with business growth. But none of those constituencies can move the product into production alone.",
    "The second line evaluates a different proposition. Compliance, AI Governance, Internal Audit, Information Security, and Third-Party Risk need to understand how the workflow operates, where model reasoning occurs, what evidence Chain retains, how human review works, and how the institution can test the control over time. The FI launch should answer two questions in parallel: Why should my team use Chain? Why should my institution permit Chain to scale?",
  ],
  exhibit: "The FI buying system",
  demandHead: ["Creates demand", "Primary value"],
  scaleHead: ["Permits scale", "Primary requirement"],
  demand: [
    ["Investigator", "Faster case preparation"],
    ["Head of Financial Crime", "Capacity + consistency"],
    ["Digital Assets Leader", "Growth without control bottlenecks"],
    ["Operations / COO", "Reduced operating friction"],
  ],
  scale: [
    ["Compliance / Risk", "Reviewability"],
    ["AI Governance", "Defined automation boundaries"],
    ["Internal Audit", "Testability"],
    ["InfoSec / TPRM", "Security + vendor controls"],
  ],
  converge: "Both sides converge on:",
  target: "Production deployment",
  implication: "Customer proof without governance proof produces interest, not adoption.",
};

export const a4 = {
  title: "Pilot economics",
  headline:
    "The pilot should establish measurable workflow economics before Marketing turns operational improvement into a market claim.",
  narrative: [
    "The pilot serves as the evidence engine for the launch. Before the account team introduces Chain into the workflow, it should establish a current-state baseline across the steps that precede human judgment. The team should not simply prove that Chain produces an answer faster. It should determine whether the workflow becomes materially more efficient, consistent, and usable under real operating conditions.",
    "The pilot team should assess success across four dimensions: efficiency, quality, trust, and repeatability. A fast workflow that requires routine correction does not create institutional value. A workflow that produces strong results once but fails to attract repeat use also fails the test. The launch should scale only when customers demonstrate measurable improvement, repeat behavior, and confidence in the evidence Chain produces.",
  ],
  exhibit: "Before / after workflow",
  current: {
    label: "Current state",
    steps: ["Context gathering", "tracing", "entity research", "procedure review", "evidence assembly", "case preparation"],
  },
  pilot: { label: "Chain pilot", steps: ["Chain enrichment + preparation"] },
  review: "Human review",
  metricsTitle: "Baseline metrics",
  metrics: [
    { name: "Efficiency", items: ["Elapsed time", "Analyst touches", "Handoffs"] },
    { name: "Quality", items: ["Evidence completeness", "Rework", "Consistency"] },
    { name: "Trust", items: ["Correction rate", "Override rate", "User confidence"] },
    { name: "Adoption", items: ["Repeat usage", "Workflow reuse", "Production decision"] },
  ],
  scaleTitle: "Scale when",
  scaleWhen: ["Material improvement", "trusted output", "repeated use", "governance acceptance"],
  implication: "Build the ROI story from measured customer behavior, not retrospective assumptions.",
};

export const a5 = {
  title: "Integrated launch journey",
  headline:
    "The launch should move from proof to reach to conversion, with every channel reinforcing the same workflow story.",
  narrative: [
    "The market launch begins before GA with design partners, workflow validation, and customer evidence. Once the proof becomes strong enough, Marketing can create the external moment through a differentiated product story, named customer voices where available, an executive point of view, and a hero workflow demonstration. Thought leadership, SME programming, webinars, demonstrations, and customer evidence must then convert that attention into understanding.",
    "Enterprise evaluation requires a different set of assets. Sales needs a first-call narrative, workflow demo, ROI model, governance package, technical validation materials, and a clear pilot offer. ABM, executive briefings, and a “Chain on Your SOP” workshop can convert qualified interest into a bounded evaluation. After launch, customer success, field teams, events, and a growing workflow library should create expansion and a continuous stream of new proof.",
  ],
  exhibit: "Integrated launch journey",
  columns: ["Stage", "Customer job", "Primary channels", "Core asset", "Primary signal"],
  rows: [
    ["Discover", "Understand why this matters now", "PR, launch, paid and organic social, web, executive POV", "Hero story", "Qualified engagement"],
    ["Understand", "See how Chain changes the workflow", "Thought leadership, webinars, events, SMEs, customer voice", "Workflow demo", "Intent"],
    ["Evaluate", "Determine whether Chain fits the institution", "Sales, ABM, technical sessions, executive briefing", "ROI + governance package", "Evaluation"],
    ["Pilot", "Prove value in our environment", "Workshop, Solutions, CS, account team", "Chain on Your SOP", "Pilot start"],
    ["Expand", "Apply the proven model elsewhere", "QBRs, customer advisory, workflow library, events", "New workflow play", "Expansion"],
  ],
  cadenceTitle: "Operating cadence",
  cadence: [
    ["Pre-GA", "Design partners + proof"],
    ["GA", "Product reveal + customer evidence + field readiness"],
    ["+30", "Targeted demand + workshops"],
    ["+60", "First pilot evidence + workflow content"],
    ["+90", "Expansion stories + customer advocacy"],
  ],
  implication:
    "The channels do not operate as separate campaigns. They advance the customer through successive steps in one buying journey.",
};

export const a6 = {
  title: "GA readiness",
  headline: "GA should be a business-readiness decision, not a communications date.",
  narrative: [
    "A credible financial-institution launch requires four forms of readiness to converge. The product must perform the target workflow reliably and expose enough evidence to support review. Design partners must demonstrate measurable customer value and repeat use. The second line must receive enough documentation to understand and evaluate the operating model. The field must also know how to discover, explain, demonstrate, pilot, and defend the product consistently.",
    "This approach creates a more useful GA gate than a communications calendar alone. If one of these dimensions remains materially incomplete, Chainalysis should narrow the launch claim or delay the corresponding market motion instead of asking Marketing to compensate for missing proof. The goal extends beyond announcing Chain. Chainalysis should enter the FI market with enough product, customer, governance, and field evidence to let Sales move directly from launch attention into credible evaluation.",
  ],
  exhibit: "GA readiness model",
  columns: [
    { name: "Product", items: ["Workflow performs", "Chain provides run evidence", "Chain defines the human boundary", "Telemetry supports review", "Team understands change behavior"] },
    { name: "Customer", items: ["Design partners active", "Customers show measured improvement", "Customers repeat use", "Customers provide referenceable proof", "Customers show an expansion signal"] },
    { name: "Governance", items: ["Validation guide", "Model-use disclosure", "Sample run record", "Security / TPRM package", "Change-management guidance"] },
    { name: "Field", items: ["First-call story", "Demo", "Discovery guide", "ROI model", "Pilot play"] },
  ],
  principleTitle: "Release principle",
  principle: ["GA", "Product", "Customer", "Governance", "Field"],
  not: "Not:",
  notPrinciple: ["GA", "Announcement ready"],
  disciplineTitle: "Claim discipline",
  discipline:
    "Avoid claims such as “court-ready AI,” “regulator-approved,” “no hallucinations,” or unverified performance gains. When Chainalysis discusses judicial acceptance, it should explicitly attach that claim to the underlying data and methodology, not to conclusions that Chain generates.",
  avoid: ["court-ready AI", "regulator-approved", "no hallucinations", "unverified performance gains"],
  implication: "PMM should own the market claim only after the supporting evidence exists.",
};

/* --------------------------------------------------------------- REGISTRY */

export const sections: SectionMeta[] = [
  { id: "s01", index: "01", subject: "Open", part: "main", steps: 1, modes: ["night"], notes: notes.s01 },
  { id: "s02", index: "02", subject: "Product", part: "main", steps: 3, modes: ["record"], notes: notes.s02 },
  { id: "s03", index: "03", subject: "The wedge", part: "main", steps: 4, modes: ["night"], notes: notes.s03 },
  { id: "s04", index: "04", subject: "The product insight", part: "main", steps: 4, modes: ["night", "control"], notes: notes.s04 },
  { id: "s05", index: "05", subject: "Buyers", part: "main", steps: 5, modes: ["broadcast"], notes: notes.s05 },
  { id: "s06", index: "06", subject: "GTM I: Sequence", part: "main", steps: 5, modes: ["night"], notes: notes.s06 },
  { id: "s07", index: "07", subject: "GTM II: Multi-channel", part: "main", steps: 4, modes: ["broadcast"], notes: notes.s07 },
  { id: "s08", index: "08", subject: "Measurement", part: "main", steps: 5, modes: ["night", "record"], notes: notes.s08 },
  { id: "s09", index: "09", subject: "Close", part: "main", steps: 1, modes: ["night"], notes: notes.s09 },
  // One section; each build is one appendix exhibit (A1 to A6).
  { id: "apx", index: "A", subject: "Appendix", part: "appendix", steps: 5, modes: ["record"] },
];

export const appendixList = [a1, a2, a3, a4, a5, a6].map((a, i) => ({
  id: `a${i + 1}`,
  index: `A${i + 1}`,
  title: a.title,
  headline: a.headline,
}));
