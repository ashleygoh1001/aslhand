# Build Buddy @ Dartmouth

A multi-page site to help Dartmouth students build a 3D-printed robotic hand that listens through a microphone and signs the alphabet in American Sign Language fingerspelling.

## Pages

| Route | Content |
|-------|---------|
| `/` | Home / project overview |
| `/demo` | Demo video |
| `/how-it-works` | System explainer |
| `/build-manual` | Scrollable instruction manual (page-turn) + build phases |
| `/resources` | Dartmouth Resources — 3D printing help & campus map |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion

## Editing content

All manual text, tables, parts lists, and placeholder links live in **`src/data/manual.ts`**. Update that file to change copy without touching components.

### Instruction manual slides

The Build Manual tab includes a scroll-driven book built from PNGs in **`public/manual-book/`** (44 slides). To replace them after editing the PowerPoint, put `Instructions.pptx` in your Downloads folder (or pass a path) and run:

```bash
node scripts/export-manual-slides.mjs
```

### TODO placeholders to fill in

| Location | What to add |
|----------|-------------|
| `demoVideo.src` | Path to demo video in `public/` (default: `demo.mov`) |
| `manualParts` parts 4–7 | Full assembly, tendon, software, and calibration text |
| `partsList[].href` | Vendor purchase links |
| `stlFiles` / `pdfManual` | STL Google Drive link; PDF at `public/instructions-manual.pdf` |
| `downloads[].href` | GitHub repo (code download still TODO) |
| `getHelp.href` / `getHelp.email` | Dartmouth makerspace contact |

## Build for production

```bash
npm run build
npm run preview
```

Static output goes to `dist/`.
