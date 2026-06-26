import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Container } from './Container'

type Background = 'base' | 'raised' | 'invert'

const bgClasses: Record<Background, string> = {
  base: 'bg-bg-base',
  raised: 'bg-bg-raised',
  invert: 'bg-text-paper text-bg-base',
}

type SectionProps = {
  children: ReactNode
  id?: string
  /** Apply the background to the full-width <section> frame (vs. inheriting parent bg). */
  full?: boolean
  bg?: Background
  className?: string
}

export function Section({ children, id, full, bg, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cx('py-20 md:py-28', full && bg ? bgClasses[bg] : undefined, className)}
    >
      <Container>{children}</Container>
    </section>
  )
}
