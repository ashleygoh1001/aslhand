import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { springSnappy } from '../lib/motion'

interface MotionLinkProps extends LinkProps {
  className?: string
  children: ReactNode
}

export function MotionLink({ className, children, ...props }: MotionLinkProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={springSnappy}
    >
      <Link {...props} className={className}>
        {children}
      </Link>
    </motion.span>
  )
}
