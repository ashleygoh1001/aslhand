import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteMeta } from '../data/manual'

export function Hero() {
  return (
    <section
      className="flex min-h-[85vh] items-center section-padding"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Waving hand — left of text, full opacity (no fade overlay) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          <img
            src="/hero-hand.gif"
            alt="Animated ASL fingerspelling hand"
            className="h-[min(40vh,320px)] w-auto object-contain opacity-100 sm:h-[min(55vh,420px)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <p className="mb-4 inline-block rounded-full bg-canvas px-3 py-1 text-sm font-medium text-dartmouth-green shadow-sm ring-1 ring-dartmouth-green/20">
            Dartmouth Student Build Project
          </p>
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            {siteMeta.title}
          </h1>
          <p className="mt-6 max-w-xl text-xl text-gray-700">{siteMeta.tagline}</p>
          <p className="mt-4 max-w-xl text-base text-gray-600">{siteMeta.subhead}</p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center rounded-xl bg-dartmouth-green px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-dartmouth-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dartmouth-green"
            >
              Watch the demo
            </Link>
            <Link
              to="/build-manual"
              className="inline-flex items-center justify-center rounded-xl border-2 border-dartmouth-green bg-canvas px-6 py-3 text-base font-semibold text-dartmouth-green transition-colors hover:bg-dartmouth-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dartmouth-green"
            >
              Start building
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
