import type { ReactNode, MouseEventHandler } from 'react'
import { cx } from '../lib/cx'

type Variant = 'primary' | 'outline' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-white text-black',
  outline: 'border border-border-card text-white hover:border-accent-green',
  ghost: 'text-text-muted hover:text-white',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-semibold ' +
  'transition-colors duration-200 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-accent-green outline-offset-2'

type ButtonProps = {
  children: ReactNode
  variant: Variant
  href?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

export function Button({ children, variant, href, className, onClick }: ButtonProps) {
  const classes = cx(baseClasses, variantClasses[variant], className)

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
