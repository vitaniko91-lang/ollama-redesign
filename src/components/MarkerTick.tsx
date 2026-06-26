import { cx } from '../lib/cx'

/**
 * MarkerTick — a short amber bar in the left gutter beside a section's command
 * marker: the recurring "active prompt" of the ongoing session, the thin thread
 * that ties the sections together. Purely decorative (hidden from AT) and
 * absolutely positioned into the container's padding, so it never shifts content
 * or introduces horizontal overflow. Its parent must be `relative`.
 */
export function MarkerTick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'pointer-events-none absolute -left-4 top-1.5 h-4 w-0.5 bg-accent-amber/50 sm:-left-6 sm:h-5',
        className,
      )}
    />
  )
}
