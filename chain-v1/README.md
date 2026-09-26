# Chain · Lab Broadcast · V1.2

One browser experience for the Chain GTM narrative, used two ways:

- **Presentation mode.** Drive it live at 16:9 with the keyboard or a clicker. Every build is one press.
- **Microsite mode.** Scroll it. Each section arrives in its resting state; nothing advances on a timer except the 01 title sequence.

Two kinds of motion, never mixed: background video always runs on its own; content (builds, stages, personas, channels) only moves when someone presses a key or clicks.

Both modes share the same page, content and design system.

## Run it

Requires Node 20.9 or newer.

```bash
npm install
npm run dev            # http://localhost:3000
```

Production build (static export into `out/`):

```bash
npm run build
npm start              # serves out/ on http://localhost:3000 (works offline once built)
```

## Present it

Open `http://localhost:3000/?present` (or the deployed URL with `?present`). The flag starts the deck in presenter mode, so nothing plays until you press a key. Go full screen with the browser (⌃⌘F on macOS).

| Key | Action |
|---|---|
| → Space PageDown Enter (clicker "next") | Next build, then next section. In the appendix: next exhibit |
| ← PageUp Backspace (clicker "back") | Previous build, then previous section. In the appendix: previous exhibit |
| ↓ ↑ | Same as → and ←, except inside a section taller than the screen (a dense appendix exhibit on a small display), where they scroll it first |
| Home | Opening, reset to its first build (the ledger restarts from one point) |
| End | The close (09) |
| 1 to 9 | Jump to slide 01 to 09 |
| A | Appendix (A1) |
| I | Index of every section; click to jump |
| N | Speaker notes drawer, with the current build count (same screen: keep it closed if the display is mirrored) |
| Esc | Close overlays |

The appendix is one screen that behaves like a deck. A bar across the top reads **← PREVIOUS · APPENDIX 03 / 06 · title · NEXT →**; the buttons, ← → keys and a swipe on phones all move one page. From the close, → goes straight to A1. Every section has a URL anchor (`#s01` … `#s09`, `#a1` … `#a6`). Evidence footers link straight into the relevant exhibit, so you can answer a challenge and come back with ←.

Interactive slides take the same two inputs, a press or a click, and never move on their own:

- **03** · five stages from the approved With Chain column (Alert · Enrich · Investigate · Prepare · Human review + decision). → moves one stage; any stage can be clicked.
- **05** · each row's build opens that buyer's persona map (who, what makes the job hard, how we message Chain); the last build closes it for the summary line. Click any row to open or close its map.
- **08** · → walks USE, VALUE, TRUST, COMMERCIAL. Hover previews a channel, click or Tab selects it; the white panel always shows its question and meaning.

**Video.** Every clip is muted, looping, preloaded, and plays whenever its section is on screen; a watchdog resumes it if the browser's power saving ever pauses it. `?stills` is the only way to get poster frames instead (a manual fallback for a venue machine that struggles with video). Reduced-motion settings only remove the wipe animations; they never stop the footage.

## Deploy (Vercel)

The project is a static export with no backend, environment variables or runtime.

```bash
npx vercel            # preview
npx vercel --prod     # production
```

Vercel detects Next.js and serves `out/`. Pages are `noindex`. Use Vercel Deployment Protection if the URL must be private. Any static host also works: upload `out/`.

## Edit copy

Approved copy lives in [`src/content.ts`](src/content.ts), transcribed verbatim from `../Chainalysis_Chain_GTM_Presentation_Content.txt`. Copy written in the recovery pass at Arthur's direction (the 05 persona maps and the 08 channel descriptions) lives separately in [`src/content.authored.ts`](src/content.authored.ts), so it can never be mistaken for approved text. Layout never contains narrative copy. After editing, run:

```bash
npm run check:copy
```

It checks every string in `content.ts` against the approved source and fails on any em or en dash in `src/` or the exported page. `content.authored.ts` is reviewed by hand.

## Rebuild media

```bash
npm run media
```

Re-encodes the supplied clips in the parent folder into `public/media/` (H.264, no audio, faststart, poster frames). See `SOURCE_MAP.md` for which clip goes where and why one was omitted.

## Architecture

```
src/
  content.ts                 approved copy, speaker notes, section registry (id, builds, mode per build)
  content.authored.ts        copy authored at Arthur's direction (05 persona maps, 08 channel notes)
  app/layout.tsx             fonts (Archivo, Instrument Sans, Martian Mono via next/font, self-hosted), metadata
  app/globals.css            Lab Broadcast tokens, 7 type styles, 12-column grid, evidence marks, section styles
  components/Deck.tsx        controller: builds, keyboard, click-driven steps, reading mode, chrome, index, notes, URL
  components/ui.tsx          primitives: Frame, B (build), Mark, Foot, Ref, Film, useTick
  components/LedgerCanvas.tsx  the opening ledger (1 → 10 → 100 points)
  components/sections/Main.tsx      01 to 09 (09 is the single close)
  components/sections/Appendix.tsx  A1 to A6 exhibits inside one section, top navigation bar
scripts/encode-media.mjs     media pipeline
scripts/check-copy.mjs       copy integrity check
```

Builds never fade. Each one either cuts in or traces in with a clip wipe, and its space is reserved so layouts never jump. Colour modes (night, record, broadcast, control) are set per build in `content.ts`, and the fixed chrome bar cuts with them.

Source hierarchy, media audit and conflicts: [`SOURCE_MAP.md`](SOURCE_MAP.md). Section-by-section treatment: [`CONTENT_MAP.md`](CONTENT_MAP.md).
