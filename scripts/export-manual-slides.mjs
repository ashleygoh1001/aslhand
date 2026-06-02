/**
 * Export Instructions.pptx → PNG slides for the scroll book.
 * Requires: LibreOffice (soffice), poppler (pdftoppm)
 *
 * Usage: node scripts/export-manual-slides.mjs [path/to/Instructions.pptx]
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pptx =
  process.argv[2] ?? path.join(process.env.HOME ?? '', 'Downloads/Instructions.pptx')
const tmp = path.join(root, 'tmp')
const out = path.join(root, 'public/manual-book')

if (!fs.existsSync(pptx)) {
  console.error('PPTX not found:', pptx)
  process.exit(1)
}

fs.mkdirSync(tmp, { recursive: true })
fs.mkdirSync(out, { recursive: true })

console.log('Converting to PDF…')
execSync(`soffice --headless --convert-to pdf --outdir "${tmp}" "${pptx}"`, {
  stdio: 'inherit',
})

const pdf = path.join(tmp, path.basename(pptx, '.pptx') + '.pdf')
console.log('Rasterizing slides…')
execSync(`pdftoppm -png -r 150 "${pdf}" "${path.join(out, 'slide')}"`, {
  stdio: 'inherit',
})

const count = fs.readdirSync(out).filter((f) => f.startsWith('slide-') && f.endsWith('.png')).length
console.log(`Done — ${count} slides in public/manual-book/`)
