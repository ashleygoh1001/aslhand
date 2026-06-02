import { motion, useReducedMotion } from 'framer-motion'
import { dartmouthResources, type PrintingLocation } from '../data/manual'
import { springBouncy, staggerContainer, staggerItem } from '../lib/motion'
import { MotionLink } from './MotionLink'
import { SectionHeading } from './SectionHeading'

const borderAccents = ['border-l-pop-coral', 'border-l-pop-purple'] as const

function LocationBlock({
  location,
  accentClass,
}: {
  location: PrintingLocation
  accentClass: string
}) {
  return (
    <article className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-3">
        <div className="shadow-pop overflow-hidden rounded-3xl border-2 border-pop-ink bg-white">
          <div className="relative aspect-[4/3] w-full sm:aspect-video">
            <iframe
              title={`Map showing ${location.name} at Dartmouth`}
              src={location.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="border-t-2 border-pop-ink/10 bg-pop-mint/30 px-4 py-3 text-center text-sm italic text-pop-ink/70">
            {location.name}
          </p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
          className="mt-3 inline-block text-sm font-medium text-pop-teal underline underline-offset-2 hover:text-pop-purple"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps ↗
        </a>
      </div>

      <div className={`card-pop lg:col-span-2 border-l-4 ${accentClass}`}>
        <h4 className="text-lg font-bold text-pop-ink">{location.name}</h4>
        <p className="mt-2 text-sm leading-relaxed text-pop-ink/75">{location.summary}</p>
        <address className="mt-4 not-italic text-sm text-pop-ink/85">
          <span className="block font-semibold">{location.building}</span>
          <span className="mt-1 block">{location.address}</span>
        </address>
        <ul className="mt-4 space-y-2">
          {location.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-pop-ink/80">
              <span className="font-bold text-pop-teal" aria-hidden="true">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={location.websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pop px-5 py-2.5 text-sm text-center"
          >
            {location.websiteLabel}
          </a>
          {location.email && (
            <a
              href={`mailto:${location.email}`}
              className="text-center text-sm font-medium text-dartmouth-green underline underline-offset-2"
            >
              {location.email}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Resources() {
  const reduceMotion = useReducedMotion()
  const { locations, steps } = dartmouthResources

  return (
    <section className="section-padding bg-canvas" aria-labelledby="resources-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="resources"
          title={dartmouthResources.title}
          subtitle={dartmouthResources.subtitle}
        />

        <motion.p
          className="mb-10 max-w-3xl text-lg leading-relaxed text-pop-ink/85"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springBouncy}
        >
          {dartmouthResources.intro}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          <h3 className="mb-6 text-xl font-bold italic text-pop-purple">
            How to get help with 3D printing
          </h3>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={staggerItem}
                className="card-pop flex gap-4 border-l-4 border-l-pop-teal"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pop-purple text-lg font-bold italic text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-pop-ink">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-pop-ink/75">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className="mt-14 space-y-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springBouncy}
        >
          <h3 className="text-xl font-bold italic text-pop-coral">
            Places to go for 3D printing
          </h3>

          {locations.map((location, index) => (
            <LocationBlock
              key={location.id}
              location={location}
              accentClass={borderAccents[index % borderAccents.length]}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm italic text-pop-ink/60">
            Need parts, STLs, or the full wiring guide? Head to the{' '}
            <MotionLink to="/build-manual" className="font-bold text-pop-purple underline">
              Build Manual
            </MotionLink>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
