import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the hero headline', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /run any open model/i }),
    ).toBeInTheDocument()
  })

  it('renders download CTAs (hero + closing block)', () => {
    render(<App />)
    // The hero CTA scrolls to the closing block; the closing block is the
    // download destination — both expose an accessible "Download" link.
    expect(screen.getAllByRole('link', { name: /download/i }).length).toBeGreaterThanOrEqual(2)
  })

  it('carries the concept-redesign disclaimer in the footer', () => {
    render(<App />)
    expect(screen.getByText(/not affiliated with ollama/i)).toBeInTheDocument()
  })
})
