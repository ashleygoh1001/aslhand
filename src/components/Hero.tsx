import { motion, useReducedMotion } from 'framer-motion'
import { helloSigns, siteMeta, type TaglineEmphasisStyle } from '../data/manual'
import {
  blobFloat,
  floatDrift,
  staggerContainer,
  staggerItem,
  springBouncy,
  wiggleHover,
} from '../lib/motion'
import { MotionLink } from './MotionLink'

const emphasizeStyles: Record<TaglineEmphasisStyle, string> = {
  purple: 'font-bold italic text-pop-purple text-wavy decoration-pop-purple/50',
  coral: 'font-bold italic text-pop-coral text-wavy decoration-pop-coral/50',
}

const blobs = [
  { className: '-left-20 top-20 h-64 w-64 bg-pop-mint' },
  { className: '-right-16 bottom-24 h-72 w-72 bg-pop-peach' },
  { className: 'left-1/3 top-1/2 h-48 w-48 bg-pop-lemon' },
]

const titleParts = [
  { text: 'Build Buddy', className: 'font-bold text-pop-ink' },
  { text: '@', className: 'font-bold italic text-pop-teal' },
  { text: 'Dartmouth', className: 'font-bold italic text-dartmouth-green' },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden section-padding text-center"
      aria-labelledby="hero-heading"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`hero-blob ${blob.className}`}
          aria-hidden="true"
          animate={reduceMotion ? undefined : blobFloat(i)}
        />
      ))}

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mb-10 flex w-full max-w-5xl flex-nowrap items-end justify-center gap-1 sm:gap-2 md:gap-3"
          aria-label="HELLO spelled in American Sign Language fingerspelling"
        >
          {helloSigns.map((sign, index) => (
            <motion.figure
              key={`${sign.letter}-${index}`}
              variants={staggerItem}
              className="flex min-w-0 flex-1 cursor-default flex-col items-center"
            >
              <motion.div
                animate={reduceMotion ? undefined : floatDrift(index)}
                whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                className="flex w-full flex-col items-center"
              >
              <motion.img
                src={sign.src}
                alt={sign.alt}
                className="h-auto max-h-24 w-full object-contain sm:max-h-32 md:max-h-40 lg:max-h-48"
                whileHover={reduceMotion ? undefined : wiggleHover}
              />
              <motion.figcaption
                className={`mt-2 text-3xl font-bold italic sm:text-4xl md:text-5xl ${sign.color}`}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1],
                        transition: {
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: 'easeInOut',
                        },
                      }
                }
              >
                {sign.letter}
              </motion.figcaption>
              </motion.div>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative flex max-w-3xl flex-col items-center"
        >
          <motion.p
            variants={staggerItem}
            className="text-lg font-medium italic tracking-wide text-pop-purple"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.7, 1, 0.7], transition: { duration: 2.5, repeat: Infinity } }
            }
          >
            {siteMeta.welcomeLine}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={staggerItem}
            className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            {titleParts.map((part) => (
              <motion.span
                key={part.text}
                className={part.className}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.05 }}
                transition={springBouncy}
              >
                {part.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-xl leading-relaxed text-pop-ink/85">
            {siteMeta.tagline.map((part, i) => {
              if (part.emphasize && part.style) {
                const style = part.style as TaglineEmphasisStyle
                return (
                  <motion.em
                    key={i}
                    className={`inline-block ${emphasizeStyles[style]}`}
                    whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -2 }}
                    transition={springBouncy}
                  >
                    {part.text}
                  </motion.em>
                )
              }
              return <span key={i}>{part.text}</span>
            })}
          </motion.p>

          <motion.p variants={staggerItem} className="mt-4 max-w-2xl text-base italic text-pop-ink/60">
            {siteMeta.subhead}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MotionLink to="/demo" className="btn-pop">
              Watch the <span className="italic">demo</span>
            </MotionLink>
            <MotionLink to="/build-manual" className="btn-pop-outline">
              Start <span className="italic text-pop-coral">building</span>
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
