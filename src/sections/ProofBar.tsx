import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'

/**
 * A quiet line of social proof, read as the OUTPUT of the command just above it
 * in the session. Each item: an amber glyph prefix, a paper value, a muted
 * label — mono, one accent (amber). Numbers are illustrative for a concept
 * redesign; the footer carries the "not affiliated" disclaimer.
 *
 * The ︎ text-presentation selector keeps glyphs (notably ⚡) rendering as
 * monochrome text that takes the amber `color`, never a multicolor emoji.
 */
const PROOF = [
  { glyph: '✓', value: '1.2M+', label: 'pulls' },
  { glyph: '★', value: '140k+', label: 'GitHub stars' },
  { glyph: '◷', value: 'macOS · Linux · Windows', label: undefined },
  { glyph: '⚡︎', value: 'OpenAI-compatible', label: 'API' },
] as const

export function ProofBar() {
  return (
    // Thin band that hugs the Hero, divided from it by a single hairline.
    // !py overrides Section's section-scale padding for a quiet output line.
    <Section className="!py-5 border-t border-line md:!py-6">
      <Reveal>
        <ul
          role="list"
          aria-label="Ollama at a glance"
          className="flex flex-col gap-3 font-mono text-sm tracking-tight md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-2"
        >
          {PROOF.map((item) => (
            <li key={item.value} className="flex items-center gap-2">
              <span aria-hidden className="select-none text-accent-amber">
                {item.glyph}
              </span>
              <span className="font-medium text-text-paper">{item.value}</span>
              {item.label && <span className="text-text-muted">{item.label}</span>}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
