import { cx } from '../lib/cx'

/**
 * Static visual of an `ollama run` session, in the Living Terminal palette.
 * The only motion is an authentic step-end cursor blink (see `.terminal-cursor`
 * in index.css), suppressed under `prefers-reduced-motion`. Colour is the
 * duotone signature: amber = prompts / commands / in-progress, paper = output.
 * (The hero uses the animated `LivingTerminal`; this is the static variant.)
 */
export function TerminalMockup({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border border-line bg-bg-raised',
        'shadow-[0_25px_50px_rgba(0,0,0,0.35)]',
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

      {/* Session body */}
      <div className="space-y-1.5 px-5 py-5 font-mono text-sm leading-relaxed">
        <p>
          <span className="select-none text-accent-amber">$ </span>
          <span className="text-text-paper">ollama run </span>
          <span className="text-accent-amber">llama3.2</span>
        </p>
        <p className="text-text-muted">
          <span className="text-accent-amber" aria-hidden>
            ✓{' '}
          </span>
          success
        </p>

        <p className="pt-3">
          <span className="select-none text-accent-amber">{'>>> '}</span>
          <span className="text-text-paper">What can you run locally?</span>
        </p>
        <p className="text-text-muted">
          Any open model — Llama, Mistral, Gemma,
          <br />
          Qwen and more — right on your machine.
        </p>

        <p className="pt-2">
          <span className="select-none text-accent-amber">{'>>> '}</span>
          <span
            aria-hidden
            className="terminal-cursor inline-block h-4 w-2 translate-y-[2px] bg-accent-amber"
          />
        </p>
      </div>
    </div>
  )
}
