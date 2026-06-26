import { Hero } from './sections/Hero'
import { ProofBar } from './sections/ProofBar'
import { CommandPalette } from './components/CommandPalette'

function App() {
  return (
    <>
      <main className="min-h-screen bg-bg-base text-text-paper font-sans antialiased">
        <Hero />
        <ProofBar />
      </main>
      {/* Mounted once so ⌘K / Ctrl+K opens the palette anywhere on the page. */}
      <CommandPalette />
    </>
  )
}

export default App
