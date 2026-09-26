# SOURCE MAP

Inventory of `~/Desktop/CHAINALYSIS ASSIGN` and the authority each source holds in V1.

## Canonical files

| Authority | Source | Location | Governs in V1 |
|---|---|---|---|
| 1. Content | `Chainalysis_Chain_GTM_Presentation_Content.txt` ("Approved content source") | project root | Every headline, line of body copy, section order, speaker notes, appendix A1 to A6, exhibits, claim discipline |
| 2. Build | `RUN IT TWICE BRIEF.rtf` | project root | Stack (Next.js, TypeScript, static export, self-hosted fonts via `next/font`), one scrolling page of full-screen sections, arrow-key/clicker navigation, content in one `content.ts`, source tags on every factual line, hard cuts instead of fades, reduced-motion behavior, `noindex`, offline `npx serve out` |
| 3. Visual identity | "Chain Lab Broadcast" artifact (claude.ai/artifact/LmRwZs1K6uXb5Grs42vvv1), read in full via the Artifact tool | remote | Tokens, three type families and seven styles, 12-column printed grid, four modes (record / broadcast / control / night), evidence grammar (solid / outline / dashed), chrome bar, motion verbs (cut, trace, tick) |
| 4. Media | seven Canva MP4 exports (`download*.mp4`) | project root | See inventory below |
| 5. Reference only | Section narratives inside the identity artifact and the brief (buyer's calendar, GENIUS dates, TRM/Elliptic claim matrix, "Run It Twice" simulation) | artifact, brief | Not used as copy |

## Visual tokens adopted exactly from the identity artifact

- Paper `#E8EAE4`, Paper 2 `#DADDD5`, Ink `#0E1013`, Graphite `#51565D`, Signal (orange) `#FF5B14`, Control (cobalt) `#2A36F5`
- Archivo (wdth 62 to 125, wght 300 to 900) display; Instrument Sans body; Martian Mono labels, readouts, run records
- Styles: Broadcast, Title, Sub, Body, Small, Label, Readout. Mixing rule: numbers inside a headline switch to Martian Mono.
- Evidence marks: solid square = verified, outline square = claimed by the company, dashed square = not verified in public materials. Dashed box = assumption or unset value.
- Motion: Cut (0 ms mode swaps), Trace (scaleX / clip 0 to 1, 600 ms, cubic-bezier(.2,0,0,1)), Tick (numerals step in 12 frames). No fades.

## Media inventory

All seven files: H.264, 1920x1080, no audio track, exported from canva.com. Each clip was reviewed in colour and again in greyscale, because the system allows it only as art-directed material: greyscale, cropped, and blended into a Lab Broadcast mode (screen into cobalt, multiply into orange or paper, screen onto ink). No clip is used in its original colours. Each appears in exactly one beat, as punctuation, and cuts away when the argument moves on. Every clip plays whenever its section is on screen (muted, looping, preloaded, with a watchdog that resumes it if power saving pauses it). Re-encoded copies live in `public/media` (`npm run media` rebuilds them from the originals).

| File | Duration | Size | Content | Treatment → Where | V1 |
|---|---|---|---|---|---|
| `download (6).mp4` | 12.0 s | 22.5 MB | NYC skyline time-lapse, day to night, light-trails | Greyscale, full bleed, veil only under the type → **09 Close**, the skyline running into night behind the final statement | **Used** · 5.1 MB |
| `download (4).mp4` | 15.0 s | 34.6 MB | Black-and-white glitch / signal noise | Screen onto ink, low opacity → **08**, first beat only ("Don't measure the applause"). Hard cut to the paper instrument panel removes it | **Used** · 7.8 MB |
| `download (3).mp4` | 10.0 s | 5.9 MB | Macro of a segmented object with metal nodes | Own colour (steel blue and copper sit inside the palette), full bleed, light veil behind the type → **01 Chain lockup** | **Used** · 1.5 MB |
| `download (2).mp4` | 10.0 s | 4.6 MB | The same segmented object, whole, opening and closing on a studio ground | Greyscale, feathered specimen in the right third over a matched studio ground → **02 Meet Chain** | **Used** · 0.9 MB |
| `download.mp4` | 8.4 s | 6.9 MB | Single point of light with orbit trails on black | Greyscale, framed specimen on ink → **04**, first beat only ("The magic isn't the first answer"); the cut to cobalt replaces it with 100 run cells | **Used** · 1.1 MB |
| `download (5).mp4` | 10.0 s | 8.2 MB | Flowing vertical bands | Greyscale, multiplied into the orange field → **07**, throughout (stronger on the title beats) | **Used** · 1.0 MB |
| `download (1).mp4` | 13.0 s | 10.7 MB | Soft pink/mint gradient blob | Tested in greyscale and duotone: it stays a formless soft-edged smudge with no structure to crop to. It contradicts the hard-edge grammar and carries no argument | **Omitted** |

No photography, diagrams, screenshots, citations file, or prior code were supplied. Slide 01's approved execution note says "subtle transactional motion, not a video", so the opening ledger is drawn in code; video enters 01 only at the product signature.

## Obsolete / duplicate files

- `.DS_Store`: system file.
- No duplicate content drafts exist. There is one approved content file.

## Genuine conflicts and how V1 resolves them

1. **Narrative of the brief and the identity artifact vs. the approved content.** Both the brief ("Run It Twice", eight sections, GENIUS calendar, claim matrix naming TRM/Elliptic claims, USDC simulation) and the identity artifact's Part B (ten sections, buyer's calendar, five roles, owners) tell a different story from the approved content file. Resolution: all copy and order come from the approved content file only. The brief supplies mechanics; the artifact supplies the design system. None of their dates, statistics, competitor claims, or simulated records appear in V1.
2. **Colour.** The brief proposes oxide red and match green. The identity artifact replaces these with Signal orange and Control cobalt. Resolution: identity artifact wins (visual authority).
3. **Mono face.** The brief names IBM Plex Mono; the identity artifact names Martian Mono. Resolution: Martian Mono.
4. **Tone of the main deck.** The content file describes the main deck as "dark, cinematic, sparse" and the appendix as "light, analytical". Lab Broadcast defines four modes. Resolution: the main deck runs on Night with hard cuts to Signal and Control floods; the appendix runs on Record (paper). Both use the same grid, chrome and type.
5. **Appendices.** The brief cuts appendices; the approved content contains A1 to A6. Resolution: content authority wins, all six are built.
6. **Presenter tooling.** The brief cuts presenter view and hotkeys. The approved content contains builds ("Build second line", "Beat") and speaker notes. Resolution: builds are driven by the same arrow keys that move between sections, and speaker notes sit in a hidden drawer (N). No separate presenter window.
7. **"Q&A".** The close's speaker notes end with "Black. Q&A." These are stage directions, not on-screen copy.
8. **The close (recovery pass, at Arthur's direction).** Approved SLIDE 09 builds the expansion ladder, then "clear the screen", returns to the opening lines, and ends on the CHAIN lockup. Arthur directed one close frame with no brand repetition and no interstitials. Resolution: one frame keeps "Start with one alert.", the full expansion path and "Earn the right to change the institution."; the return to the opening lines now lives in the speaker notes; the CHAIN lockup appears once, in 01. The close goes straight into the appendix.
9. **Terminology Arthur used in feedback.** "ASK / CREATE / DEPLOY" and "LESS PREPARATION, MORE JUDGMENT." Resolution: the approved terms stay on screen: CODIFY, and "Less preparation. More judgment." as two sentences.
10. **Authored copy.** The 05 persona maps and the 08 channel descriptions are not in the approved source; Arthur asked for them. They live in `src/content.authored.ts`, grounded in the slide 05 and 08 speaker notes and appendices A3 and A4, with no product, performance or numerical claims. The persona map carries a "hypothesis to validate" mark on screen.
