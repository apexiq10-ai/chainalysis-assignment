// Copy integrity check.
// 1. Every string in src/content.ts must appear in the approved content file
//    (case-insensitive; curly quotes and whitespace normalised), unless it is
//    listed below as system language (evidence grammar, labels, ids).
// 2. No em or en dashes anywhere in src/ or the exported page.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const approved = readFileSync(path.resolve(root, "../Chainalysis_Chain_GTM_Presentation_Content.txt"), "utf8");
const content = readFileSync(path.resolve(root, "src/content.ts"), "utf8");

const norm = (t) =>
  t
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

const corpus = norm(approved);

// System language: evidence grammar, ids, modes, and labels that are not narrative copy.
const SYSTEM = new Set(
  [
    "Illustrative motion · not transaction data",
    "Illustrative · run cells, not run data",
    "night", "record", "broadcast", "control", "main", "appendix", "buffer", "apx",
    "High", "Medium", "Low", "Lower",
    // evidence grammar on 03: the step mapping is an inference, labelled as such
    "Takes on", "Inference · step mapping",
  ].map(norm),
);

const strings = [...content.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const misses = [];
for (const raw of strings) {
  const s = norm(raw);
  if (s.length < 3 || !/[a-z]/.test(s)) continue;
  if (/^(s\d\d|a\d|end|[a-z]\d)$/.test(s)) continue;
  if (SYSTEM.has(s)) continue;
  if (corpus.includes(s)) continue;
  // Cells of the source's fixed-width tables wrap onto a second line; accept
  // a string only if it splits once into two parts that both appear verbatim.
  const w = s.split(" ");
  let wrapped = false;
  for (let i = 1; i < w.length && !wrapped; i++) {
    const a = w.slice(0, i).join(" ");
    const b = w.slice(i).join(" ");
    if (corpus.includes(a) && corpus.includes(b) && (i > 1 || w.length - i > 1)) wrapped = true;
  }
  if (!wrapped) misses.push(raw);
}

// dash scan
const dashHits = [];
const scan = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) scan(p);
    else if (/\.(tsx?|css|html|md)$/.test(f)) {
      readFileSync(p, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/[—–]/.test(line)) dashHits.push(`${path.relative(root, p)}:${i + 1}`);
        });
    }
  }
};
scan(path.join(root, "src"));
if (existsSync(path.join(root, "out/index.html"))) {
  const html = readFileSync(path.join(root, "out/index.html"), "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  if (/[—–]/.test(html)) dashHits.push("out/index.html (rendered markup)");
}

console.log(`Checked ${strings.length} strings from content.ts against the approved source.`);
if (misses.length) {
  console.log(`\nNot found verbatim in the approved source (${misses.length}):`);
  misses.forEach((m) => console.log("  · " + m));
} else console.log("All narrative strings match the approved source.");
if (dashHits.length) {
  console.log(`\nEm/en dashes found:`);
  dashHits.forEach((d) => console.log("  · " + d));
} else console.log("No em or en dashes in src/ or the exported page.");
process.exit(misses.length || dashHits.length ? 1 : 0);
