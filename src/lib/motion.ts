import type { Transition, Variants } from 'framer-motion'

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
}

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 14,
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export const pageTransition: Transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springBouncy,
  },
}

export const floatY = (distance = 10, duration = 2.8) => ({
  y: [0, -distance, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  },
})

export const floatDrift = (index: number) => ({
  x: [0, index % 2 === 0 ? 8 : -8, 0],
  y: [0, -12, 0],
  rotate: [0, index % 2 === 0 ? 2 : -2, 0],
  transition: {
    duration: 3.5 + index * 0.3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
})

export const blobFloat = (index: number) => ({
  x: [0, index % 2 === 0 ? 24 : -20, 0],
  y: [0, -18, 0],
  scale: [1, 1.08, 1],
  transition: {
    duration: 6 + index * 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
})

export const wiggleHover = {
  rotate: [0, -3, 3, -2, 2, 0],
  transition: { duration: 0.5 },
}

export const pulseScale = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
}
