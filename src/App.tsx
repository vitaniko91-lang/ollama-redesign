import { Hero } from './sections/Hero'
import { ProofBar } from './sections/ProofBar'
import { HowItWorks } from './sections/HowItWorks'
import { Models } from './sections/Models'
import { Features } from './sections/Features'
import { DevExperience } from './sections/DevExperience'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { CommandPalette } from './components/CommandPalette'

function App() {
  return (
    <>
      <main className="min-h-screen bg-bg-base text-text-paper font-sans antialiased">
        <Hero />
        <ProofBar />
        <HowItWorks />
        <Models />
        <Features />
        <DevExperience />
        <CTA />
      </main>
      {/* Terminal footer — sibling of <main>, carries the concept-redesign disclaimer. */}
      <Footer />
      {/* Mounted once so ⌘K / Ctrl+K opens the palette anywhere on the page. */}
      <CommandPalette />
    </>
  )
}

export default App
