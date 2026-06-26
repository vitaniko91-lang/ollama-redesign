import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from './HowItWorks'

// jsdom reports prefers-reduced-motion: reduce, so every command + output
// renders complete and static — no fake timers required.
describe('HowItWorks', () => {
  it('renders the section marker as a heading', () => {
    render(<HowItWorks />)
    expect(
      screen.getByRole('heading', { level: 2, name: /get started in three commands/i }),
    ).toBeInTheDocument()
  })

  it('renders all three step titles', () => {
    render(<HowItWorks />)
    expect(screen.getByText('Install')).toBeInTheDocument()
    expect(screen.getByText('Pull a model')).toBeInTheDocument()
    expect(screen.getByText('Run')).toBeInTheDocument()
  })

  it('renders the three commands as copyable terminal lines', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/curl -fsSL/)).toBeInTheDocument()
    expect(screen.getByText(/ollama pull/)).toBeInTheDocument()
    expect(screen.getByText(/ollama run/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /copy command/i })).toHaveLength(3)
  })
})
