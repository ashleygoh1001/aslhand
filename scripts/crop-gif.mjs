import sharp from 'sharp'
import fs from 'fs'

const input = process.argv[2] ?? 'public/hero-hand-source.gif'
const output = 'public/hero-hand.gif'

function isBlack(r, g, b) {
  return r < 20 && g < 20 && b < 20
}

function columnIsAllBlack(data, width, height, channels, x) {
  for (let y = 0; y < height; y++) {
    const i = (y * width + x) * channels
    if (!isBlack(data[i], data[i + 1], data[i + 2])) return false
  }
  return true
}

const meta = await sharp(input, { animated: true }).metadata()
const pageHeight = meta.pageHeight ?? 270

let cropLeft = 0
let cropRight = meta.width - 1

for (let page = 0; page < meta.pages; page++) {
  const { data, info } = await sharp(input, { page, animated: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let left = 0
  while (left < info.width && columnIsAllBlack(data, info.width, info.height, info.channels, left)) {
    left++
  }

  let right = info.width - 1
  while (right > left && columnIsAllBlack(data, info.width, info.height, info.channels, right)) {
    right--
  }

  cropLeft = Math.max(cropLeft, left)
  cropRight = Math.min(cropRight, right)
}

const cropWidth = cropRight - cropLeft + 1

console.log(`Cropping ${meta.width}x${pageHeight} → ${cropWidth}x${pageHeight} (left=${cropLeft})`)

const cropped = await sharp(input, { animated: true })
  .extract({ left: cropLeft, top: 0, width: cropWidth, height: pageHeight })
  .gif()
  .toBuffer()

await fs.promises.writeFile(output, cropped)
console.log('Saved', output)
