import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { Icon } from '../components/Icon'
import { StreamText } from '../components/StreamText'
import { LivingTerminal } from '../components/LivingTerminal'
import { openCommandPalette } from '../lib/commandPalette'

export function Hero() {
  return (
    <Section full bg="base" className="relative overflow-hidden">
      {/* Craft background — full-bleed, decorative. Single amber glow bleeding
          off the top-right + a barely-there scanline. Hidden from AT. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-48 h-[620px] w-[620px] rounded-full bg-accent-amber opacity-[0.06] blur-[130px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(236,232,221,0.02) 0px, rgba(236,232,221,0.02) 1px, transparent 1px, transparent 3px)',
          }}
        />
      </div>

      <div className="relative grid items-center gap-12 lg:min-h-[76vh] lg:grid-cols-[52fr_48fr] lg:gap-16">
        {/* Left — message + actions */}
        <div className="max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs tracking-tight text-text-muted">
            <span className="select-none text-accent-amber">{'>'}</span>
            ollama --help
          </p>

          <StreamText
            as="h1"
            text="Run any open model. Locally. Privately."
            highlight="open"
            cursor
            speed={36}
            className="mt-5 font-mono text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-text-paper sm:text-[2.75rem] lg:text-[3.5rem]"
          />

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

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex items-center gap-2 rounded border border-line bg-bg-raised px-3 py-1.5 font-mono text-xs text-text-muted transition-colors duration-150 hover:border-line-amber hover:text-text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
            >
              <kbd className="font-mono text-accent-amber">⌘K</kbd>
              command menu
            </button>
            <p className="font-mono text-xs text-text-dim">macOS · Linux · Windows</p>
          </div>
        </div>

        {/* Right — the living terminal */}
        <div className="lg:pl-4">
          <LivingTerminal />
        </div>
      </div>
    </Section>
  )
}
