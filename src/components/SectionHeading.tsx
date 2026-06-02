import { motion } from 'framer-motion'

interface SectionHeadingProps {
  id: string
  title: string
  subtitle?: string
}

export function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.header
      id={id}
      className="mb-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3 h-1 w-12 rounded-full bg-dartmouth-green" aria-hidden="true" />
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-lg text-gray-600">{subtitle}</p>
      )}
    </motion.header>
  )
}
