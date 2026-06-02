import { motion, useReducedMotion } from 'framer-motion'

export function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.footer
      className="border-t-2 border-pop-ink/10 bg-pop-mint/30 py-8"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          className="text-sm font-bold text-pop-ink"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -3, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
          }
        >
          <span className="italic text-pop-purple">Build Buddy</span>
          <span className="text-pop-teal"> @ </span>
          <span className="italic text-dartmouth-green">Dartmouth</span>
        </motion.p>
        <p className="mt-2 text-sm italic text-pop-ink/60">
          Made with{' '}
          <motion.span
            className="inline-block font-bold not-italic text-pop-coral"
            whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: 8 }}
          >
            curiosity
          </motion.span>{' '}
          and{' '}
          <motion.span
            className="inline-block font-bold not-italic text-pop-purple"
            whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: -8 }}
          >
            solder
          </motion.span>
          .
        </p>
      </div>
    </motion.footer>
  )
}
