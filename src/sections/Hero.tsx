import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { Icon } from '../components/Icon'
import { TerminalMockup } from '../components/TerminalMockup'

export function Hero() {
  return (
    <Section full bg="primary" className="relative overflow-hidden">
      {/* Decorative glow — bleeds off the top-right, clipped by the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[600px] w-[600px] rounded-full bg-accent-green opacity-[0.06] blur-[120px]"
      />

      <div className="relative grid items-center gap-12 lg:min-h-[68vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left column — message + actions */}
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-green">
            <Icon name="lucide:terminal" className="h-3.5 w-3.5" />
            Local LLM runtime
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-text-primary sm:text-5xl lg:text-[3.5rem]">
            Run any open model.
            <br />
            <span className="text-accent-green">Locally.</span> Privately.
          </h1>

          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-text-muted">
            Install in one command, then pull from a library of open models — Llama,
            Mistral, Gemma and more. OpenAI-compatible API, fully offline, your data
            never leaves your machine.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <Button variant="primary" href="#download" className="w-full sm:w-auto">
              <Icon name="lucide:download" className="h-4 w-4" />
              Download
            </Button>
            <CodeBlock
              code="curl -fsSL https://ollama.com/install.sh | sh"
              className="w-full min-w-0 sm:flex-1"
            />
          </div>

          <p className="mt-4 text-xs text-text-dim">
            Available for macOS, Linux, and Windows
          </p>
        </div>

        {/* Right column — the signature terminal */}
        <div className="lg:pl-4">
          <TerminalMockup />
        </div>
      </div>
    </Section>
  )
}
