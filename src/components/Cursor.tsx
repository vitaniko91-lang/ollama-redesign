import { cx } from '../lib/cx'

/**
 * Blinking amber block cursor — the page's single intentional infinite loop.
 * The blink lives in CSS (`.terminal-cursor`) and is gated behind
 * `prefers-reduced-motion: no-preference`, so reduced-motion users see a solid,
 * static block instead. Purely decorative, hidden from assistive tech.
 */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'terminal-cursor ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.12em] bg-accent-amber',
        className,
      )}
    />
  )
}
