import { createElement, useEffect, useRef, useState } from 'react'
import type { ElementType } from 'react'
import { cx } from '../lib/cx'
import { Cursor } from './Cursor'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { useInView } from '../lib/useInView'

type StreamTextProps = {
  /** Text to stream. Falls back to `children` when omitted. */
  text?: string
  children?: string
  /** Milliseconds between revealed tokens (words). */
  speed?: number
  /** Element to render as. Defaults to a span. */
  as?: ElementType
  /** Start streaming only once scrolled into view (otherwise on mount). */
  startOnView?: boolean
  /** Render a trailing amber block cursor. */
  cursor?: boolean
  /** A single word to render in the amber accent colour. */
  highlight?: string
  className?: string
  cursorClassName?: string
  onDone?: () => void
}

/**
 * Reveals its text word-by-word, the way an LLM streams tokens. The full text
 * is always exposed to assistive tech via `aria-label`; the visible, animating
 * tokens are `aria-hidden`. Under `prefers-reduced-motion: reduce` the complete
 * text renders instantly with no animation.
 */
export function StreamText({
  text,
  children,
  speed = 34,
  as = 'span',
  startOnView = false,
  cursor = false,
  highlight,
  className,
  cursorClassName,
  onDone,
}: StreamTextProps) {
  const content = text ?? children ?? ''
  const segments = content.match(/\s*\S+/g) ?? []
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>()

  const [count, setCount] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const shouldStart = reduced || (startOnView ? inView : true)

  useEffect(() => {
    if (reduced) {
      setCount(segments.length)
      return
    }
    if (!shouldStart) return
    setCount(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= segments.length) {
        clearInterval(id)
        onDoneRef.current?.()
      }
    }, speed)
    return () => clearInterval(id)
    // segments.length keys the effect to the content; shouldStart gates the start.
  }, [reduced, shouldStart, speed, segments.length])

  const revealed = segments.slice(0, count)

  return createElement(
    as,
    { ref, className, 'aria-label': content },
    <span aria-hidden>
      {revealed.map((seg, i) =>
        highlight && seg.trim() === highlight ? (
          <span key={i} className="text-accent-amber">
            {seg}
          </span>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
      {cursor && <Cursor className={cx(cursorClassName)} />}
    </span>,
  )
}
