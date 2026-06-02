import sharp from 'sharp'

const { data, info } = await sharp('public/hero-hand.gif', { page: 0 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

let black = 0,
  white = 0,
  other = 0
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (r < 20 && g < 20 && b < 20) black++
    else if (r > 240 && g > 240 && b > 240) white++
    else other++
  }
}
console.log({ black, white, other, size: info })

for (const x of [0, 1, 2, 5, 10, 20, info.width - 1]) {
  let bc = 0,
    wc = 0
  for (let y = 0; y < info.height; y++) {
    const i = (y * info.width + x) * info.channels
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (r < 20 && g < 20 && b < 20) bc++
    else if (r > 240 && g > 240 && b > 240) wc++
  }
  console.log('col', x, 'black', bc, 'white', wc)
}
