import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { openCommandPalette } from '../lib/commandPalette'
import { cx } from '../lib/cx'

/**
 * Nav — the session header. It reads like the top line of the terminal: the
 * brand is a live prompt (`> ollama`, amber caret), navigation is a row of CLI
 * flags (`--models --docs …`), and a `⌘K` chip opens the SAME global command
 * palette the hero uses (`openCommandPalette()` — never a second palette).
 *
 * Sticky and transparent over the charcoal hero; once the page scrolls past a
 * few pixels it gains an 80%-charcoal blur and a hairline bottom rule. The
 * scrolled state is a single boolean toggled by a cheap passive scroll
 * listener — only a class swaps, so there is no layout thrash. Mono throughout;
 * amber is the only accent; every interactive element has a focus-visible amber
 * ring. On mobile the flags collapse into a hamburger sheet (Esc closes).
 */

type NavFlag = { flag: string; href: string }

const FLAGS: NavFlag[] = [
  { flag: '--models', href: '#models' },
  { flag: '--docs', href: '#docs' },
  { flag: '--pricing', href: '#' },
  { flag: '--github', href: '#github' },
]

const flagLinkClasses =
  'rounded-sm font-mono text-[13px] text-text-muted transition-colors duration-150 ' +
  'hover:text-accent-amber focus-visible:text-accent-amber ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scrolled state — cheap passive listener, toggles one boolean (class swap).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc closes the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b transition-colors duration-200',
        scrolled
          ? 'border-line bg-bg-base/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center gap-4 px-5 py-4 md:px-20"
      >
        {/* Logo — a live prompt. The amber caret is decorative. */}
        <a
          href="#"
          className="rounded-sm font-mono text-base font-semibold text-text-paper transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
        >
          <span aria-hidden className="select-none text-accent-amber">
            {'> '}
          </span>
          ollama
        </a>

        {/* Desktop flags. */}
        <ul role="list" className="ml-6 hidden items-center gap-6 md:flex">
          {FLAGS.map((f) => (
            <li key={f.flag}>
              <a href={f.href} className={flagLinkClasses}>
                {f.flag}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster — ⌘K chip, Download, hamburger. */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command menu"
            className="inline-flex items-center gap-1 rounded border border-line px-2 py-1.5 font-mono text-xs text-text-dim transition-colors duration-150 hover:border-line-amber hover:text-text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
          >
            <span aria-hidden>⌘</span>
            <span aria-hidden>K</span>
          </button>

          <Button variant="primary" href="#download" className="hidden md:inline-flex">
            <Icon name="lucide:download" className="h-4 w-4" />
            Download
          </Button>

          {/* Hamburger — mobile only. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            className="inline-flex items-center justify-center rounded border border-line p-2 text-text-paper transition-colors duration-150 hover:border-line-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2 md:hidden"
          >
            <Icon name={menuOpen ? 'lucide:x' : 'lucide:menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet — stacked flags + Download. Always in the DOM (stable
          aria-controls target); hidden when closed and on ≥md. */}
      <div
        id="nav-mobile-menu"
        className={cx(
          'border-line bg-bg-raised md:hidden',
          menuOpen ? 'border-t' : 'hidden',
        )}
      >
        <ul role="list" className="flex flex-col gap-1 px-5 py-4">
          {FLAGS.map((f) => (
            <li key={f.flag}>
              <a
                href={f.href}
                onClick={closeMenu}
                className="block rounded px-2 py-2.5 font-mono text-sm text-text-muted transition-colors duration-150 hover:text-accent-amber focus-visible:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber outline-offset-2"
              >
                {f.flag}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <Button
              variant="primary"
              href="#download"
              className="w-full"
              onClick={closeMenu}
            >
              <Icon name="lucide:download" className="h-4 w-4" />
              Download
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
