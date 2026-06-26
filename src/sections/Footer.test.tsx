import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('carries the required concept-redesign disclaimer', () => {
    render(<Footer />)
    // Legal/ethical requirement — the "not affiliated" line MUST be present.
    expect(
      screen.getByText(/concept redesign · not affiliated with ollama/i),
    ).toBeInTheDocument()
  })

  it('renders the build credit with site and X links', () => {
    render(<Footer />)
    // Exact name → just the name link, not the aria-labeled X/site links.
    expect(screen.getByRole('link', { name: 'Vitalina Nikulina' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /on X/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio site/i })).toBeInTheDocument()
  })

  it('renders grouped path links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /models/i })).toHaveAttribute('href', '#models')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', '#github')
  })
})
