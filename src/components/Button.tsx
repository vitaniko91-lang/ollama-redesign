import type { ReactNode, MouseEventHandler } from 'react'
import { cx } from '../lib/cx'

type Variant = 'primary' | 'outline' | 'ghost'

const variantClasses: Record<Variant, string> = {
  // Paper-white on charcoal — the one high-contrast "do this now" target.
  primary: 'bg-white text-black hover:bg-text-paper active:scale-[0.98]',
  outline: 'border border-line text-text-paper hover:border-line-amber active:scale-[0.98]',
  ghost: 'text-text-muted hover:text-text-paper',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-semibold ' +
  'transition-[transform,background-color,border-color,color] duration-150 ease-out ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2'

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
