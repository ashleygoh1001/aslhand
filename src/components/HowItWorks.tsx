import { motion, useReducedMotion } from 'framer-motion'
import { howItWorksSteps, scopeCallout } from '../data/manual'
import { springBouncy, staggerContainer, staggerItem } from '../lib/motion'
import { Callout } from './Callout'
import { SectionHeading } from './SectionHeading'

const cardAccents = [
  'border-l-pop-coral bg-pop-peach/20',
  'border-l-pop-purple bg-pop-mint/30',
  'border-l-pop-teal bg-pop-mint/20',
  'border-l-pop-lemon bg-pop-lemon/20',
  'border-l-pop-coral bg-pop-peach/15',
  'border-l-dartmouth-green bg-dartmouth-green-light/40',
]

const labelColors = [
  'text-pop-coral',
  'text-pop-purple',
  'text-pop-teal',
  'text-pop-lemon',
  'text-pop-coral',
  'text-dartmouth-green',
]

export function HowItWorks() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section-padding" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="how-it-works"
          title="How It Works"
          subtitle="From your voice to a signed letter — six steps through the hardware chain."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {howItWorksSteps.map((step, index) => (
            <motion.article
              key={step.id}
              variants={staggerItem}
              className={`card-pop relative border-l-4 ${cardAccents[index % cardAccents.length]}`}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -8, scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }
              }
              transition={springBouncy}
            >
              {index < howItWorksSteps.length - 1 && (
                <motion.span
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-2xl font-bold italic text-pop-purple lg:block xl:-right-4"
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : { x: [0, 6, 0], transition: { duration: 1.2, repeat: Infinity } }
                  }
                >
                  →
                </motion.span>
              )}
              <motion.span
                className="inline-block text-3xl"
                role="img"
                aria-label={step.label}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity, delay: index * 0.15 } }
                }
              >
                {step.icon}
              </motion.span>
              <h3
                className={`mt-3 text-lg font-bold italic ${labelColors[index % labelColors.length]}`}
              >
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pop-ink/75">{step.description}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={springBouncy}
        >
          <Callout callout={scopeCallout} />
        </motion.div>
      </div>
    </section>
  )
}
