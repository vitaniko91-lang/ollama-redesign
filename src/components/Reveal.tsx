import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  /** Seconds to delay the reveal (for light, intentional staggering). */
  delay?: number
  className?: string
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * Reveals its children with opacity + a small upward translate when scrolled
 * into view (once). No blur, transform/opacity only. Under reduced motion the
 * children render in their final position instantly.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
