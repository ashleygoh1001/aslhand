import sharp from 'sharp'

const input = 'public/hero-hand.gif'

const { data, info } = await sharp(input, { page: 0 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info

function isBlack(r, g, b) {
  return r < 20 && g < 20 && b < 20
}

function isWhite(r, g, b) {
  return r > 240 && g > 240 && b > 240
}

let minX = width,
  maxX = -1,
  minY = height,
  maxY = -1

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (isBlack(r, g, b)) continue
    if (minX > x) minX = x
    if (maxX < x) maxX = x
    if (minY > y) minY = y
    if (maxY < y) maxY = y
  }
}

console.log('non-black bounds:', { minX, minY, maxX, maxY })
console.log('crop size:', maxX - minX + 1, 'x', maxY - minY + 1)

// per-frame global bounds across animation
const meta = await sharp(input, { animated: true }).metadata()
let gMinX = width,
  gMaxX = -1,
  gMinY = height,
  gMaxY = -1

for (let page = 0; page < meta.pages; page++) {
  const frame = await sharp(input, { page, animated: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let y = 0; y < frame.info.height; y++) {
    for (let x = 0; x < frame.info.width; x++) {
      const i = (y * frame.info.width + x) * frame.info.channels
      const r = frame.data[i],
        g = frame.data[i + 1],
        b = frame.data[i + 2]
      if (isBlack(r, g, b)) continue
      if (gMinX > x) gMinX = x
      if (gMaxX < x) gMaxX = x
      if (gMinY > y) gMinY = y
      if (gMaxY < y) gMaxY = y
    }
  }
}

console.log('global non-black bounds:', { gMinX, gMinY, gMaxX, gMaxY })

const pad = 8
const left = Math.max(0, gMinX - pad)
const top = Math.max(0, gMinY - pad)
const cropW = Math.min(width - left, gMaxX - gMinX + 1 + pad * 2)
const cropH = Math.min(height - top, gMaxY - gMinY + 1 + pad * 2)
console.log('crop box:', { left, top, width: cropW, height: cropH })
