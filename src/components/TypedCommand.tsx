import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Cursor } from './Cursor'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { useInView } from '../lib/useInView'

type TypedCommandProps = {
  /** The command string to type out (without the prompt). */
  command: string
  /** Prompt glyph rendered in amber before the command. */
  prompt?: string
  /** Milliseconds per typed character. */
  speed?: number
  /** Type when scrolled into view (default) vs. immediately on mount. */
  startOnView?: boolean
  /** Trailing substring of `command` to render in amber (e.g. a model name). */
  accent?: string
  /** Output revealed once the command finishes typing. */
  children?: ReactNode
  className?: string
  onDone?: () => void
}

/**
 * Types a terminal command character-by-character, then reveals its output.
 * Used both in the hero and as the per-section command markers that frame the
 * page as one continuous session. Reduced motion → command + output show
 * complete instantly.
 */
export function TypedCommand({
  command,
  prompt = '$ ',
  speed = 28,
  startOnView = true,
  accent,
  children,
  className,
  onDone,
}: TypedCommandProps) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>()
  const [chars, setChars] = useState(0)
  const [done, setDone] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const shouldStart = reduced || (startOnView ? inView : true)

  useEffect(() => {
    if (reduced) {
      setChars(command.length)
      setDone(true)
      return
    }
    if (!shouldStart) return
    setChars(0)
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setChars(i)
      if (i >= command.length) {
        clearInterval(id)
        setDone(true)
        onDoneRef.current?.()
      }
    }, speed)
    return () => clearInterval(id)
  }, [reduced, shouldStart, speed, command])

  const boundary = accent ? command.length - accent.length : command.length
  const base = command.slice(0, Math.min(chars, boundary))
  const accentPart = chars > boundary ? command.slice(boundary, chars) : ''

  return (
    <div ref={ref} className={className}>
      <div
        className="font-mono text-sm leading-relaxed break-words"
        aria-label={`${prompt}${command}`}
      >
        <span aria-hidden>
          <span className="select-none text-accent-amber">{prompt}</span>
          <span className="text-text-paper">{base}</span>
          {accentPart && <span className="text-accent-amber">{accentPart}</span>}
          {!done && <Cursor />}
        </span>
      </div>
      {done && children}
    </div>
  )
}
