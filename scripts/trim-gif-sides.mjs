import sharp from 'sharp'
import fs from 'fs'

const input = process.argv[2] ?? 'public/hero-hand.gif'
const output = process.argv[3] ?? input
const trim = Number(process.argv[4] ?? 10)

const meta = await sharp(input, { animated: true }).metadata()
const pageHeight = meta.pageHeight ?? 270
const left = trim
const width = meta.width - trim * 2

if (width <= 0) {
  throw new Error(`Cannot trim ${trim}px from each side of ${meta.width}px-wide GIF`)
}

console.log(`Trimming ${trim}px/side: ${meta.width}x${pageHeight} → ${width}x${pageHeight}`)

const cropped = await sharp(input, { animated: true })
  .extract({ left, top: 0, width, height: pageHeight })
  .gif()
  .toBuffer()

await fs.promises.writeFile(output, cropped)
console.log('Saved', output)
