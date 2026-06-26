import { render, screen } from '@testing-library/react'
import { ProofBar } from '../src/sections/ProofBar'

test('renders the proof stats as a single labelled list', () => {
  render(<ProofBar />)
  const list = screen.getByRole('list', { name: /ollama at a glance/i })
  expect(list).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(4)
})

test('shows the proof values and labels', () => {
  render(<ProofBar />)
  expect(screen.getByText('1.2M+')).toBeInTheDocument()
  expect(screen.getByText('pulls')).toBeInTheDocument()
  expect(screen.getByText('140k+')).toBeInTheDocument()
  expect(screen.getByText('GitHub stars')).toBeInTheDocument()
  expect(screen.getByText('macOS · Linux · Windows')).toBeInTheDocument()
  expect(screen.getByText('OpenAI-compatible')).toBeInTheDocument()
})

test('uses the mono terminal type and amber-only accent on glyphs', () => {
  render(<ProofBar />)
  const list = screen.getByRole('list', { name: /ollama at a glance/i })
  expect(list.className).toMatch(/font-mono/)
  // Glyph prefixes are the single accent (amber) and hidden from assistive tech.
  const value = screen.getByText('1.2M+')
  const glyph = value.previousElementSibling as HTMLElement
  expect(glyph).toHaveAttribute('aria-hidden')
  expect(glyph.className).toMatch(/text-accent-amber/)
})
