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

  it('renders the primary download CTA', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument()
  })
})
