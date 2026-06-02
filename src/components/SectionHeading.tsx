import { motion, useReducedMotion } from 'framer-motion'
import { springBouncy, staggerContainer, staggerItem } from '../lib/motion'

const barColors = ['bg-pop-coral', 'bg-pop-purple', 'bg-pop-teal', 'bg-pop-lemon']

interface SectionHeadingProps {
  id: string
  title: string
  subtitle?: string
}

export function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
      id={id}
      className="mb-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="mb-4 flex gap-2" aria-hidden="true">
        {barColors.map((color, i) => (
          <motion.span
            key={color}
            variants={staggerItem}
            className={`h-2 w-8 rounded-full ${color}`}
            animate={
              reduceMotion
                ? undefined
                : {
                    scaleX: [1, 1.3, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    },
                  }
            }
          />
        ))}
      </div>
      <motion.h2 variants={staggerItem} className="text-3xl font-bold text-pop-ink sm:text-4xl">
        <motion.span
          className="inline-block italic text-pop-purple"
          whileHover={reduceMotion ? undefined : { rotate: [-6, 6, 0], scale: 1.1 }}
          transition={springBouncy}
        >
          {title.charAt(0)}
        </motion.span>
        {title.slice(1)}
      </motion.h2>
      {subtitle && (
        <motion.p variants={staggerItem} className="mt-3 max-w-2xl text-lg italic text-pop-ink/70">
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  )
}
