import { motion, useReducedMotion } from 'framer-motion'
import { springBouncy } from '../lib/motion'
import { demoVideo } from '../data/manual'
import { SectionHeading } from './SectionHeading'

export function DemoVideo() {
  const reduceMotion = useReducedMotion()
  // TODO: Replace demoVideo.youtubeId in src/data/manual.ts with your real video ID
  const embedUrl = `https://www.youtube.com/embed/${demoVideo.youtubeId}`

  return (
    <section
      className="section-padding bg-canvas"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="demo"
          title="Demo Video"
          subtitle="See the hand fingerspell letters in response to spoken words."
        />

        <motion.div
          className="shadow-pop overflow-hidden rounded-3xl border-2 border-pop-ink bg-gray-900"
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.95 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.02, rotate: 0.5 }}
          viewport={{ once: true }}
          transition={springBouncy}
        >
          {/* TODO: Update youtubeId in src/data/manual.ts */}
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title="Build Buddy @ Dartmouth demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-center text-sm italic text-pop-ink/70 sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {demoVideo.caption}
        </motion.p>
      </div>
    </section>
  )
}
