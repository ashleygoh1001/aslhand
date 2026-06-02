import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteMeta } from '../data/manual'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-dartmouth-green-light/60 to-white section-padding"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-dartmouth-green shadow-sm ring-1 ring-dartmouth-green/20">
            Dartmouth Student Build Project
          </p>
          <h1
            id="hero-heading"
            className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            {siteMeta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-700">{siteMeta.tagline}</p>
          <p className="mt-4 max-w-2xl text-base text-gray-600">{siteMeta.subhead}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center rounded-xl bg-dartmouth-green px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-dartmouth-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dartmouth-green"
            >
              Watch the demo
            </Link>
            <Link
              to="/build-manual"
              className="inline-flex items-center justify-center rounded-xl border-2 border-dartmouth-green bg-white px-6 py-3 text-base font-semibold text-dartmouth-green transition-colors hover:bg-dartmouth-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dartmouth-green"
            >
              Start building
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
