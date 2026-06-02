import { motion, useReducedMotion } from 'framer-motion'
import type { Callout as CalloutType } from '../data/manual'
import { springBouncy } from '../lib/motion'

const styles = {
  warning: {
    border: 'border-pop-coral',
    bg: 'bg-pop-peach/40',
    icon: '⚠️',
    title: 'font-bold italic text-pop-coral',
    body: 'text-pop-ink/80',
  },
  caution: {
    border: 'border-pop-lemon',
    bg: 'bg-pop-lemon/30',
    icon: '⚡',
    title: 'font-bold italic text-pop-ink',
    body: 'text-pop-ink/80',
  },
  info: {
    border: 'border-pop-teal',
    bg: 'bg-pop-mint/50',
    icon: 'ℹ️',
    title: 'font-bold italic text-pop-teal',
    body: 'text-pop-ink/80',
  },
}

interface CalloutProps {
  callout: CalloutType
}

export function Callout({ callout }: CalloutProps) {
  const s = styles[callout.type]
  const reduceMotion = useReducedMotion()

  return (
    <motion.aside
      className={`my-4 flex gap-3 rounded-2xl border-2 border-pop-ink/10 border-l-4 ${s.border} ${s.bg} p-4`}
      role="note"
      aria-label={`${callout.type}: ${callout.title}`}
      initial={reduceMotion ? false : { opacity: 0, x: -24, rotate: -1 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={springBouncy}
      whileHover={reduceMotion ? undefined : { scale: 1.01, x: 4 }}
    >
      <motion.span
        className="shrink-0 text-xl"
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : { rotate: [0, 10, -10, 0], transition: { duration: 2, repeat: Infinity } }
        }
      >
        {s.icon}
      </motion.span>
      <div>
        <p className={s.title}>{callout.title}</p>
        <p className={`mt-1 text-sm leading-relaxed ${s.body}`}>{callout.body}</p>
      </div>
    </motion.aside>
  )
}
