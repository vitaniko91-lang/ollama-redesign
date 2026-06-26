import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TypedCommand } from '../components/TypedCommand'
import { Icon } from '../components/Icon'
import { features } from '../data/features'
import type { Feature } from '../data/features'

/**
 * Features — the runtime's capabilities rendered as a `--help` flags section.
 *
 * The marker `$ ollama --help` types in on scroll, and its output is a man-page
 * "Flags" block: a hairline grid where every capability reads as one documented
 * flag — amber Iconify glyph, amber `--flag` token, the human name in mono paper,
 * and a Geist Sans description. The 1px dividers come from a `gap-px` grid over a
 * `bg-line` track (cells are `bg-bg-raised`), which gives a crisp documentation
 * table at any column count. One gentle, capped stagger reveals the rows; under
 * `prefers-reduced-motion: reduce` the whole block renders complete and static.
 * Amber is the only accent.
 */

// Each capability's canonical CLI flag — the man-page token that names it. Kept
// explicit (not derived) so the slugs read like real flags ("--api", not
// "--openai-compatible-api") rather than a mechanical slug of the title.
const FLAGS: Record<string, string> = {
  'Local & private': 'local',
  'OpenAI-compatible API': 'api',
  'Cross-platform': 'cross-platform',
  'Model library': 'library',
  'GPU-accelerated': 'gpu',
  'Open source': 'open-source',
}

export function Features() {
  return (
    <Section id="features">
      {/* The visible marker is a stylised, typed terminal line, so a real <h2>
          carries the section in the heading outline. */}
      <h2 className="sr-only">Features</h2>

      <TypedCommand command="ollama --help" prompt="$ " startOnView speed={42}>
        <Reveal className="mt-4">
          <p className="max-w-xl text-base leading-relaxed text-text-muted">
            Everything the runtime does,{' '}
            <span className="text-text-paper">at a glance.</span>
          </p>
        </Reveal>

        {/* Man-page section label, mirroring the real `ollama --help` output. */}
        <Reveal delay={0.05} className="mt-8 lg:mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-dim">Flags</p>
        </Reveal>

        {/* Hairline flags table. `gap-px` over a `bg-line` track draws the 1px
            dividers; cells are `bg-bg-raised`. role="list" survives Safari
            stripping list semantics under a grid display. */}
        <ul
          role="list"
          aria-label="Runtime capabilities"
          className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <li key={feature.title} className="bg-bg-raised">
              {/* One gentle, capped stagger across the grid — a single intended
                  sequence, not stagger-spam. Top-aligned content + the cell's bg
                  keeps the rows equal height via the grid's stretch. */}
              <Reveal delay={Math.min(i * 0.05, 0.25)}>
                <FlagEntry feature={feature} />
              </Reveal>
            </li>
          ))}
        </ul>
      </TypedCommand>
    </Section>
  )
}

function FlagEntry({ feature }: { feature: Feature }) {
  const { icon, title, desc } = feature
  const flag = FLAGS[title] ?? title.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex items-start gap-4 p-5 sm:p-6">
      <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber" />
      <div className="min-w-0">
        {/* The flag token — the man-page signature, in amber mono. */}
        <code className="block font-mono text-[15px] font-medium leading-none text-accent-amber">
          --{flag}
        </code>
        {/* The human-readable name, in mono paper — the entry's real heading. */}
        <h3 className="mt-2 font-mono text-sm font-medium leading-snug text-text-paper">{title}</h3>
        {/* Description in Geist Sans (inherited), secondary weight. */}
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{desc}</p>
      </div>
    </div>
  )
}
