import { Fragment, useState } from 'react'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { StreamText } from '../components/StreamText'
import { TypedCommand } from '../components/TypedCommand'
import { Icon } from '../components/Icon'
import { useCopyToClipboard } from '../lib/useCopyToClipboard'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { steps } from '../data/steps'
import type { Step } from '../data/steps'
import { cx } from '../lib/cx'

/**
 * HowItWorks — the section IS three real commands. Install → pull → run are
 * typed into three terminal panes as one continuous session: the intro marker
 * streams in, then each command types in turn (chained, not staggered three
 * ways at once), and each command's one-line `#` comment output reveals after
 * it finishes. Under `prefers-reduced-motion: reduce` the whole session renders
 * complete and static. Amber is the only accent; everything else is paper/grey.
 */

// Per-step "output": the comment line that explains what each command does,
// plus the trailing substring to colour amber inside the typed command.
const OUTPUT: { description: string; accent?: string }[] = [
  { description: 'Installs the Ollama runtime on macOS, Linux, or Windows.' },
  { description: 'Downloads the model weights once, locally.', accent: 'llama3.2' },
  { description: 'Starts an interactive session — fully offline.', accent: 'llama3.2' },
]

export function HowItWorks() {
  const reduced = usePrefersReducedMotion()
  // `active` is the highest step index allowed to start typing. A pane is armed
  // when active >= its index; its output reveals once active passes it. Under
  // reduced motion every pane is armed and revealed from the first render.
  const [active, setActive] = useState(reduced ? steps.length : -1)

  return (
    <Section id="how-it-works">
      <div className="max-w-2xl">
        {/* Marker reads as the next line of the session — a real <h2> for
            heading navigation, dressed as a typed shell comment. */}
        <h2 className="font-mono text-xl font-medium leading-snug tracking-tight text-text-paper sm:text-2xl lg:text-3xl">
          <span aria-hidden className="select-none text-accent-amber">
            {'$ '}
          </span>
          <StreamText
            as="span"
            text="# get started in three commands"
            startOnView
            speed={38}
            onDone={() => setActive(0)}
          />
        </h2>

        <Reveal delay={0.05} className="mt-4">
          <p className="text-base leading-relaxed text-text-muted">
            Install the runtime, pull a model, then start chatting — each step is a single line
            you can copy, and the whole thing runs locally on your machine.
          </p>
        </Reveal>
      </div>

      {/* Three panes that read left-to-right as the session advances. Equal
          height via items-stretch; min-heights inside keep outputs from shifting
          layout as they reveal. Stacks to one column below lg, where narrow
          columns would mangle the long install command. */}
      <div className="mt-10 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:items-stretch lg:gap-0">
        {steps.map((step, i) => (
          <Fragment key={step.n}>
            {i > 0 && <Connector />}
            <StepCard
              step={step}
              armed={active >= i}
              revealed={active > i}
              description={OUTPUT[i].description}
              accent={OUTPUT[i].accent}
              onDone={() => setActive((a) => Math.max(a, i + 1))}
            />
          </Fragment>
        ))}
      </div>
    </Section>
  )
}

type StepCardProps = {
  step: Step
  /** Type the command now (vs. show an idle, awaiting-input prompt). */
  armed: boolean
  /** Reveal the output comment line. */
  revealed: boolean
  description: string
  accent?: string
  onDone: () => void
}

function StepCard({ step, armed, revealed, description, accent, onDone }: StepCardProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-line bg-bg-raised">
      {/* Pane title — dim index + the step title. */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="font-mono text-xs tabular-nums text-text-dim">{step.n}</span>
        <span className="font-mono text-sm font-medium text-text-paper">{step.title}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        {/* Command well — the typed line, plus a copy affordance that always
            copies the real command regardless of the typing state. */}
        <div className="relative min-h-[4.25rem] rounded-lg border border-line bg-bg-inset px-3 py-2.5 pr-9">
          {armed ? (
            <TypedCommand
              command={step.code}
              prompt="$ "
              startOnView={false}
              accent={accent}
              onDone={onDone}
            />
          ) : (
            <div className="font-mono text-sm leading-relaxed" aria-hidden>
              <span className="select-none text-accent-amber">{'$ '}</span>
              {/* Static (non-blinking) caret: an idle prompt awaiting its turn,
                  so only the actively-typing command carries the live cursor. */}
              <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.12em] bg-text-dim/40 align-baseline" />
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              void copy(step.code)
            }}
            aria-label={`Copy command: ${step.code}`}
            className={cx(
              'absolute right-2 top-2 rounded p-1.5 text-text-muted transition-colors duration-150',
              'hover:text-text-paper focus-visible:outline focus-visible:outline-2',
              'focus-visible:outline-accent-amber outline-offset-2',
            )}
          >
            <Icon
              name={copied ? 'lucide:check' : 'lucide:copy'}
              className={cx('h-4 w-4', copied && 'text-accent-amber')}
            />
          </button>

          {/* Success is otherwise only the icon swap — announce it politely. */}
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? 'Copied' : ''}
          </span>
        </div>

        {/* Output — a shell comment describing what the command does. Space is
            reserved so revealing it never grows the pane. */}
        <div className="min-h-[2.25rem]">
          {revealed && (
            <Reveal>
              <p className="font-mono text-xs leading-relaxed text-text-muted">
                <span className="select-none text-text-dim">{'# '}</span>
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}

/** Quiet directional connector that carries the eye through the sequence. */
function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center text-accent-amberDim lg:px-3">
      <span className="font-mono text-base lg:hidden">↓</span>
      <span className="hidden font-mono text-xl lg:inline">→</span>
    </div>
  )
}
