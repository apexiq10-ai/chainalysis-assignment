// Re-encodes the two supplied clips used in V1 for presentation reliability:
// smaller files, no audio track, faststart (plays before full download), plus poster frames.
// Source files stay untouched in the parent folder.
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import path from "node:path";

const SRC = path.resolve(process.cwd(), "..");
const OUT = path.resolve(process.cwd(), "public/media");

const clips = [
  // NYC day-to-night time-lapse: 09 Return, under the opening line.
  { src: "download (6).mp4", out: "city-timelapse", width: 1920, crf: 27, poster: 9 },
  // Black-and-white signal noise: 08 "Don't measure the applause."
  { src: "download (4).mp4", out: "signal-noise", width: 1280, crf: 30, poster: 3 },
  // Macro of the segmented object: the Chain lockup (01 and 09), screened into cobalt.
  { src: "download (3).mp4", out: "object-macro", width: 1920, crf: 28, poster: 4 },
  // The whole segmented object on a studio ground: 02 specimen plate, greyscale on paper.
  { src: "download (2).mp4", out: "object-specimen", width: 1920, crf: 27, poster: 2 },
  // Single point of light: 04 "the first answer" specimen, greyscale on ink.
  { src: "download.mp4", out: "first-answer", width: 1920, crf: 27, poster: 3 },
  // Flowing bands: 07 title beat, multiplied into the orange ledger field.
  { src: "download (5).mp4", out: "ledger-flow", width: 1280, crf: 30, poster: 2 },
];

for (const c of clips) {
  const input = path.join(SRC, c.src);
  execFileSync(ffmpeg, ["-y", "-v", "error", "-i", input, "-an", "-vf", `${c.vf ? c.vf + "," : ""}scale=${c.width}:-2,format=yuv420p`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(c.crf), "-movflags", "+faststart",
    path.join(OUT, `${c.out}.mp4`)], { stdio: "inherit" });
  execFileSync(ffmpeg, ["-y", "-v", "error", "-ss", String(c.poster), "-i", input, "-frames:v", "1",
    "-vf", `${c.vf ? c.vf + "," : ""}scale=${c.width}:-2`, "-q:v", "4", path.join(OUT, `${c.out}.jpg`)], { stdio: "inherit" });
  console.log("encoded", c.out);
}
