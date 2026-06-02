import { motion } from 'framer-motion'
import { demoVideo } from '../data/manual'
import { SectionHeading } from './SectionHeading'

export function DemoVideo() {
  // TODO: Replace demoVideo.youtubeId in src/data/manual.ts with your real video ID
  const embedUrl = `https://www.youtube.com/embed/${demoVideo.youtubeId}`

  return (
    <section
      className="section-padding bg-gray-50"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="demo"
          title="Demo Video"
          subtitle="See the hand fingerspell letters in response to spoken words."
        />

        <motion.div
          className="overflow-hidden rounded-2xl bg-gray-900 shadow-lg ring-1 ring-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* TODO: Update youtubeId in src/data/manual.ts */}
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title="Voice-Controlled ASL Fingerspelling Hand demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-center text-sm text-gray-600 sm:text-base"
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
