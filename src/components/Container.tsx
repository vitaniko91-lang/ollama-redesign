import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx('max-w-content mx-auto px-5 md:px-20', className)}>
      {children}
    </div>
  )
}
