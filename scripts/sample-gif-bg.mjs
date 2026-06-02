import sharp from 'sharp'

const { data, info } = await sharp('public/hero-hand.gif', { page: 0 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const counts = new Map()
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (r > 240 && g > 240 && b > 240) {
      const key = `${r},${g},${b}`
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  }
}

const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
console.log('top white shades:', top)
const [r, g, b] = top[0][0].split(',').map(Number)
console.log('hex:', `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`)
