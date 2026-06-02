# Voice-Controlled ASL Fingerspelling Hand

A multi-page site to help Dartmouth students build a 3D-printed robotic hand that listens through a microphone and signs the alphabet in American Sign Language fingerspelling.

## Pages

| Route | Content |
|-------|---------|
| `/` | Home / project overview |
| `/demo` | Demo video |
| `/how-it-works` | System explainer |
| `/build-manual` | Step-by-step build guide |
| `/resources` | Parts, tools, downloads |

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

### TODO placeholders to fill in

| Location | What to add |
|----------|-------------|
| `demoVideo.youtubeId` | Real YouTube video ID |
| `manualParts` parts 4–7 | Full assembly, tendon, software, and calibration text |
| `partsList[].href` | Vendor purchase links |
| `downloads[].href` | STL zip, GitHub repo, PDF manual |
| `getHelp.href` / `getHelp.email` | Dartmouth makerspace contact |

## Build for production

```bash
npm run build
npm run preview
```

Static output goes to `dist/`.
