import { motion } from 'framer-motion'
import { howItWorksSteps, scopeCallout } from '../data/manual'
import { Callout } from './Callout'
import { SectionHeading } from './SectionHeading'

export function HowItWorks() {
  return (
    <section className="section-padding" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="how-it-works"
          title="How It Works"
          subtitle="From your voice to a signed letter — six steps through the hardware chain."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <motion.article
              key={step.id}
              className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {index < howItWorksSteps.length - 1 && (
                <span
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-dartmouth-green lg:block xl:-right-4"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
              <span className="text-3xl" role="img" aria-label={step.label}>
                {step.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Callout callout={scopeCallout} />
        </motion.div>
      </div>
    </section>
  )
}
