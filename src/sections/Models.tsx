import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TypedCommand } from '../components/TypedCommand'
import { Icon } from '../components/Icon'
import { useCopyToClipboard } from '../lib/useCopyToClipboard'
import { models } from '../data/models'
import type { Model } from '../data/models'
import { cx } from '../lib/cx'

/**
 * Models — the section that fixes the original site's biggest weakness: the
 * homepage shows zero models. Here the model library IS the star.
 *
 * The marker `$ ollama list` types in on scroll, and the card grid reads as that
 * command's OUTPUT. Each card is a terminal-row/card hybrid whose pinned bottom
 * line — `$ ollama run <slug>` — is a real "copy the run command" button: on
 * hover or keyboard focus the card lifts, its border goes amber, and an amber ▶
 * slides in to signal the model is runnable. One accent (amber) carries it all.
 * Every motion has a `prefers-reduced-motion: reduce` static fallback.
 */

// Canonical Ollama registry slugs for the run command. Kept as an explicit map
// (rather than derived) because the conventions are inconsistent — "Phi-3" drops
// its hyphen to `phi3`, while "DeepSeek-R1" keeps it as `deepseek-r1`.
const SLUGS: Record<string, string> = {
  'Llama 3.2': 'llama3.2',
  Mistral: 'mistral',
  'Gemma 2': 'gemma2',
  'Qwen 2.5': 'qwen2.5',
  'Phi-3': 'phi3',
  'DeepSeek-R1': 'deepseek-r1',
}

export function Models() {
  return (
    <Section id="models">
      {/* The visible marker is a stylised, typed terminal line, so a real <h2>
          lives here for heading-navigation and the document outline. */}
      <h2 className="sr-only">Model library</h2>

      <TypedCommand command="ollama list" prompt="$ " startOnView speed={42}>
        <Reveal className="mt-4">
          <p className="max-w-xl text-base leading-relaxed text-text-muted">
            Pull any of these with one command —{' '}
            <span className="text-text-paper">the library the homepage never shows you.</span>
          </p>
        </Reveal>

        {/* role="list" survives Safari stripping list semantics under a grid
            display. Each <li> is the grid item; the h-full chain below keeps
            sibling cards equal height regardless of blurb length. */}
        <ul
          role="list"
          aria-label="Available models"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3"
        >
          {models.map((model, i) => (
            <li key={model.name} className="h-full">
              {/* One gentle, capped stagger across the grid — a single intended
                  sequence, not stagger-spam. */}
              <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
                <ModelCard model={model} />
              </Reveal>
            </li>
          ))}
        </ul>
      </TypedCommand>
    </Section>
  )
}

function ModelCard({ model }: { model: Model }) {
  const { name, params, blurb, tag } = model
  const slug = SLUGS[name] ?? name.toLowerCase().replace(/\s+/g, '')
  const { copied, copy } = useCopyToClipboard()

  return (
    <article
      className={cx(
        'group flex h-full flex-col rounded-xl border border-line bg-bg-raised',
        // Single transition declaration; only the lift is gated to motion-safe.
        'transition-[transform,border-color] duration-200 ease-out',
        'hover:border-line-amber focus-within:border-line-amber',
        'motion-safe:hover:-translate-y-0.5 motion-safe:focus-within:-translate-y-0.5',
      )}
    >
      {/* Header row: mono name + dim params on the left, amber tag flag right. */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="min-w-0">
          <h3 className="truncate font-mono text-lg font-medium leading-tight text-text-paper">
            {name}
          </h3>
          <p className="mt-1 font-mono text-xs text-text-muted">{params}</p>
        </div>
        <span className="shrink-0 rounded bg-accent-amber/10 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent-amber">
          {tag}
        </span>
      </div>

      {/* Blurb in Geist Sans (inherited from <main>), secondary weight. */}
      <p className="mt-3 px-5 pb-5 text-sm leading-relaxed text-text-muted">{blurb}</p>

      {/* Pinned run line — a real "copy run command" action. mt-auto holds it to
          the card bottom so the cards read as a tidy, equal-height grid. */}
      <button
        type="button"
        onClick={() => {
          void copy(`ollama run ${slug}`)
        }}
        aria-label={`Copy run command: ollama run ${slug}`}
        className={cx(
          'mt-auto flex w-full items-center gap-2 border-t border-line px-5 py-3.5 text-left',
          'font-mono text-sm text-text-muted transition-colors duration-200',
          'group-hover:text-text-paper group-focus-within:text-text-paper',
          'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2',
          'focus-visible:outline-accent-amber',
        )}
      >
        {/* Runnable marker — reserved slot (fixed width) so revealing it never
            shifts the line. Slides in on card hover or keyboard focus. */}
        <span
          aria-hidden
          className={cx(
            'w-[1ch] shrink-0 text-accent-amber opacity-0 transition duration-200',
            'motion-safe:-translate-x-1',
            'group-hover:translate-x-0 group-hover:opacity-100',
            'group-focus-within:translate-x-0 group-focus-within:opacity-100',
          )}
        >
          ▶
        </span>
        <span aria-hidden className="select-none text-accent-amber">
          $
        </span>
        <span className="min-w-0 truncate">ollama run {slug}</span>
        <Icon
          name={copied ? 'lucide:check' : 'lucide:copy'}
          className={cx(
            'ml-auto h-3.5 w-3.5 shrink-0 transition-opacity duration-200',
            copied
              ? 'text-accent-amber opacity-100'
              : 'opacity-0 group-hover:opacity-60 group-focus-within:opacity-60',
          )}
        />
      </button>

      {/* Success is otherwise only the icon swap — announce it politely to AT. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `Copied: ollama run ${slug}` : ''}
      </span>
    </article>
  )
}
