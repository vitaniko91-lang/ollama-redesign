import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { ProofBar } from './sections/ProofBar'
import { HowItWorks } from './sections/HowItWorks'
import { Models } from './sections/Models'
import { Features } from './sections/Features'
import { DevExperience } from './sections/DevExperience'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { CommandPalette } from './components/CommandPalette'
import { TokenStreamField } from './components/TokenStreamField'

function App() {
  return (
    <>
      {/* Bypass-blocks: a keyboard-only skip link that reveals on focus and
          jumps past the nav straight to the main content (WCAG 2.4.1). */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:border focus:border-line-amber focus:bg-bg-raised focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-text-paper focus:outline focus:outline-2 focus:outline-accent-amber focus:outline-offset-2"
      >
        Skip to content
      </a>

      {/* Signature ambient layer — the living token field, painted once behind
          everything (z-0). The page's charcoal base comes from <body>; this sits
          above it and below the content layer, so the field breathes through the
          transparent gaps between the floating panels. */}
      <TokenStreamField />

      {/* Content layer — lifted above the field. Sections are transparent; only
          the panels that hold text carry a solid bg, so they read as windows
          floating over the live session. */}
      <div className="relative z-10">
        {/* Sticky session header — transparent over the hero, hairline + blur on scroll. */}
        <Nav />
        <main id="main" className="min-h-screen text-text-paper font-sans antialiased">
          <Hero />
          <ProofBar />
          <HowItWorks />
          <Models />
          <Features />
          <DevExperience />
          <CTA />
        </main>
        {/* Terminal footer — carries the concept-redesign disclaimer. */}
        <Footer />
      </div>

      {/* Mounted once so ⌘K / Ctrl+K opens the palette anywhere on the page. */}
      <CommandPalette />
    </>
  )
}

export default App
