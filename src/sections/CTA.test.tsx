import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CTA } from './CTA'

// jsdom reports prefers-reduced-motion: reduce, so the typed marker and the
// reveal render complete and static.
describe('CTA', () => {
  it('renders the closing headline', () => {
    render(<CTA />)
    expect(
      screen.getByRole('heading', { level: 2, name: /start running models in one command/i }),
    ).toBeInTheDocument()
  })

  it('renders the Download control', () => {
    render(<CTA />)
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument()
  })

  it('exposes the install command as a copyable code block', () => {
    render(<CTA />)
    expect(screen.getByRole('button', { name: /copy command/i })).toBeInTheDocument()
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === 'CODE' &&
          el.textContent?.includes('curl -fsSL https://ollama.com/install.sh | sh') === true,
      ),
    ).toBeInTheDocument()
  })
})
