import { useEffect, useState } from 'react'
import { cx } from '../lib/cx'
import { Cursor } from './Cursor'
import { StreamText } from './StreamText'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

const COMMAND = 'ollama run llama3.2'
const ACCENT = 'llama3.2'
const QUESTION = 'Why run models locally?'
const ANSWER =
  'Your data never leaves the machine — no API keys, no per-token billing, fully offline. Pull a model once, then run it anywhere.'
const BAR_CELLS = 18

/**
 * The hero centrepiece: a terminal that plays a live `ollama run` session —
 * the command types itself, the model pull animates a progress bar, then the
 * model streams an answer token-by-token and rests on a blinking cursor.
 * Under `prefers-reduced-motion: reduce` the whole session renders complete
 * and static. All motion is text reveal + the single cursor blink; nothing
 * animates layout.
 */
export function LivingTerminal({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const [cmdChars, setCmdChars] = useState(0)
  const [pct, setPct] = useState(0)
  // 0: typing command · 1: pulling · 2: answering / done
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (reduced) {
      setCmdChars(COMMAND.length)
      setPct(100)
      setPhase(2)
      return
    }

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const intervals: ReturnType<typeof setInterval>[] = []
    setCmdChars(0)
    setPct(0)
    setPhase(0)

    timeouts.push(
      setTimeout(() => {
        if (cancelled) return
        // Stage 1 — type the command.
        let ci = 0
        const typeId = setInterval(() => {
          ci += 1
          setCmdChars(ci)
          if (ci >= COMMAND.length) {
            clearInterval(typeId)
            setPhase(1)
            // Stage 2 — pull the manifest.
            timeouts.push(
              setTimeout(() => {
                if (cancelled) return
                let p = 0
                const pullId = setInterval(() => {
                  p = Math.min(100, p + 6)
                  setPct(p)
                  if (p >= 100) {
                    clearInterval(pullId)
                    // Stage 3 — stream the answer.
                    timeouts.push(
                      setTimeout(() => {
                        if (!cancelled) setPhase(2)
                      }, 280),
                    )
                  }
                }, 70)
                intervals.push(pullId)
              }, 380),
            )
          }
        }, 32)
        intervals.push(typeId)
      }, 350),
    )

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      intervals.forEach(clearInterval)
    }
  }, [reduced])

  const boundary = COMMAND.length - ACCENT.length
  const base = COMMAND.slice(0, Math.min(cmdChars, boundary))
  const accent = cmdChars > boundary ? COMMAND.slice(boundary, cmdChars) : ''
  const filled = Math.round((pct / 100) * BAR_CELLS)

  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border border-line bg-bg-raised',
        'shadow-[0_30px_60px_rgba(0,0,0,0.45)]',
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center border-b border-line px-4 py-3">
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-text-dim/40" />
          <span className="h-3 w-3 rounded-full bg-text-dim/40" />
          <span className="h-3 w-3 rounded-full bg-text-dim/40" />
        </span>
        <span className="ml-3 font-mono text-xs text-text-dim">ollama — zsh</span>
      </div>

      {/* Session body — min-height reserves space so revealing lines never shift layout */}
      <div className="min-h-[300px] space-y-2 px-5 py-5 font-mono text-sm leading-relaxed sm:min-h-[340px]">
        {/* Command */}
        <p aria-label={`$ ${COMMAND}`}>
          <span aria-hidden>
            <span className="select-none text-accent-amber">$ </span>
            <span className="text-text-paper">{base}</span>
            {accent && <span className="text-accent-amber">{accent}</span>}
            {phase === 0 && <Cursor />}
          </span>
        </p>

        {/* Pull progress */}
        {phase >= 1 && (
          <p>
            <span className="text-text-muted">pulling manifest </span>
            <span className="text-accent-amber" aria-hidden>
              {'▓'.repeat(filled)}
            </span>
            <span className="text-text-dim" aria-hidden>
              {'░'.repeat(BAR_CELLS - filled)}
            </span>
            <span className="text-text-paper"> {pct}%</span>
          </p>
        )}

        {/* Success + streamed answer */}
        {phase >= 2 && (
          <>
            <p className="text-text-muted">
              <span className="text-accent-amber" aria-hidden>
                ✓{' '}
              </span>
              success
            </p>
            <p className="pt-2">
              <span className="select-none text-accent-amber">{'>>> '}</span>
              <span className="text-text-paper">{QUESTION}</span>
            </p>
            <StreamText as="p" text={ANSWER} className="text-text-muted" cursor speed={26} />
          </>
        )}
      </div>
    </div>
  )
}
