import { Container } from '../components/Container'
import { Cursor } from '../components/Cursor'

/**
 * Footer — the terminal session, signed off. A hairline separates it from the
 * CTA above. The brand mark reads as a live prompt (`> ollama` + a blinking
 * cursor — the page's one allowed loop), and the REQUIRED concept-redesign
 * disclaimer sits under it as an amber `#` shell comment. Navigation is grouped
 * into three "directories" whose links read as filesystem paths (`~/models`,
 * `~/github`) and warm to amber on hover. The bottom bar carries the build
 * credit and copyright. Mono throughout; amber is the only accent.
 */

type FooterLink = { name: string; href: string; label?: string }
type FooterGroup = { heading: string; links: FooterLink[] }

const GROUPS: FooterGroup[] = [
  {
    heading: 'Product',
    links: [
      { name: 'models', href: '#models' },
      { name: 'pricing', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { name: 'docs', href: '#docs' },
      { name: 'blog', href: '#' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { name: 'github', href: '#github' },
      { name: 'discord', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-base">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1.9fr]">
          {/* Brand + disclaimer */}
          <div>
            <p className="font-mono text-lg font-medium text-text-paper">
              <span aria-hidden className="select-none text-accent-amber">
                {'> '}
              </span>
              ollama
              <Cursor />
            </p>

            {/* REQUIRED disclaimer — styled as a shell comment. */}
            <p className="mt-5 font-mono text-sm leading-relaxed">
              <span aria-hidden className="select-none text-accent-amber">
                #{' '}
              </span>
              <span className="text-text-muted">
                concept redesign · not affiliated with ollama
              </span>
            </p>
          </div>

          {/* Nav directories — paths that warm to amber on hover. */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {group.heading}
                </h2>
                <ul role="list" className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        aria-label={link.label}
                        className="group inline-flex font-mono text-sm text-text-muted transition-colors duration-150 hover:text-accent-amber focus-visible:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
                      >
                        <span aria-hidden className="select-none text-text-dim transition-colors duration-150 group-hover:text-accent-amber">
                          ~/
                        </span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar — build credit + copyright. */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            designed &amp; built by{' '}
            <a
              href="#"
              className="text-text-muted underline-offset-4 transition-colors duration-150 hover:text-accent-amber hover:underline focus-visible:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
            >
              Vitalina Nikulina
            </a>
            <span aria-hidden> · </span>
            <a
              href="#"
              aria-label="Vitalina Nikulina on X"
              className="text-text-muted underline-offset-4 transition-colors duration-150 hover:text-accent-amber hover:underline focus-visible:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
            >
              X
            </a>
            <span aria-hidden> · </span>
            <a
              href="#"
              aria-label="Vitalina Nikulina — portfolio site"
              className="text-text-muted underline-offset-4 transition-colors duration-150 hover:text-accent-amber hover:underline focus-visible:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
            >
              site
            </a>
          </p>
          <p>© 2026</p>
        </div>
      </Container>
    </footer>
  )
}
