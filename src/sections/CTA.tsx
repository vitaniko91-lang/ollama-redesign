import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TypedCommand } from '../components/TypedCommand'
import { Button } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { Icon } from '../components/Icon'

/**
 * CTA — the closing move of the session. A single raised terminal block,
 * centered, that frames the final command `$ ollama run` as "start your own
 * session". The marker types in on scroll; its output is the page's last
 * pitch (mono H2, one phrase in amber), a Geist Sans subline, and the action
 * row: the big paper Download button beside the copyable install command.
 *
 * `id="download"` lives on the section, so the nav, hero and ⌘K "Download"
 * command all land on this closing block — it is the page's download
 * destination. Amber is the only accent; the lone decorative glow is static
 * (no pulse), and the whole block reveals with opacity + translateY, which
 * collapses to a static render under `prefers-reduced-motion: reduce`.
 */
export function CTA() {
  return (
    <Section id="download">
      <Reveal>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-line bg-bg-raised">
          {/* One static amber glow bleeding off the top — warmth for the closing
              block, decorative, no animation, hidden from AT. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-amber opacity-[0.05] blur-[120px]"
          />

          {/* Terminal window header — three hairline dots + a session label. */}
          <div className="relative flex items-center gap-2 border-b border-line px-5 py-3">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
            </span>
            <span className="ml-2 font-mono text-[11px] tracking-tight text-text-dim">
              ollama — start session
            </span>
          </div>

          {/* Body — centered closing pitch. */}
          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* The hook: the final command, typed on scroll. */}
            <div className="flex justify-center">
              <TypedCommand
                command="ollama run"
                prompt="$ "
                startOnView
                speed={70}
                className="text-left"
              />
            </div>

            <h2 className="mx-auto mt-6 max-w-xl font-mono text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-text-paper sm:text-4xl lg:text-[2.75rem]">
              Start running models in{' '}
              <span className="text-accent-amber">one command</span>.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Install once, pull a model, and you're talking to it locally —
              private by default, no API keys, no cloud.
            </p>

            {/* Action row: big paper Download beside the copyable install line. */}
            <div className="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row">
              <Button
                variant="primary"
                href="https://ollama.com/download"
                className="w-full sm:w-auto"
              >
                <Icon name="lucide:download" className="h-4 w-4" />
                Download
              </Button>
              <CodeBlock
                code="curl -fsSL https://ollama.com/install.sh | sh"
                className="w-full min-w-0 text-left sm:flex-1"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
