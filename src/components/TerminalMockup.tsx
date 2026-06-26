import { cx } from '../lib/cx'

/**
 * Static visual of an interactive `ollama run` session — the hero's signature
 * element. The only motion is an authentic step-end cursor blink (see
 * `.terminal-cursor` in index.css), which is suppressed under
 * `prefers-reduced-motion`. Colors are intentionally limited to the brand's
 * functional roles: green = command / success, amber = in-progress.
 */
export function TerminalMockup({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border border-border-card bg-bg-elevated',
        'shadow-[0_25px_50px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center border-b border-border-subtle px-4 py-3">
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </span>
        <span className="ml-3 font-mono text-xs text-text-dim">ollama — zsh</span>
      </div>

      {/* Session body */}
      <div className="space-y-1.5 px-5 py-5 font-mono text-sm leading-relaxed">
        <p>
          <span className="select-none text-text-dim">$ </span>
          <span className="text-text-primary">ollama run </span>
          <span className="text-accent-green">llama3.2</span>
        </p>
        <p className="text-accent-amber">
          <span aria-hidden>⠹ </span>pulling manifest
        </p>
        <p className="text-text-muted">
          <span className="text-accent-green" aria-hidden>
            ✓{' '}
          </span>
          success
        </p>

        <p className="pt-3">
          <span className="select-none text-accent-green">{'>>> '}</span>
          <span className="text-text-primary">What can you run locally?</span>
        </p>
        <p className="text-text-muted">
          Any open model — Llama, Mistral, Gemma,
          <br />
          Qwen and more — right on your machine.
        </p>

        <p className="pt-2">
          <span className="select-none text-accent-green">{'>>> '}</span>
          <span
            aria-hidden
            className="terminal-cursor inline-block h-4 w-2 translate-y-[2px] bg-accent-green"
          />
        </p>
      </div>
    </div>
  )
}
