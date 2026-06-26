import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Models } from './Models'
import { models } from '../data/models'

// jsdom reports prefers-reduced-motion: reduce, so the typed marker and its
// output grid render complete and static — every card is present immediately.
describe('Models', () => {
  it('renders the section marker as a heading', () => {
    render(<Models />)
    expect(screen.getByRole('heading', { level: 2, name: /model library/i })).toBeInTheDocument()
  })

  it('renders all six model names as card titles', () => {
    render(<Models />)
    for (const model of models) {
      expect(screen.getByRole('heading', { level: 3, name: model.name })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
  })

  it('renders a copyable `ollama run <slug>` command for each of the six models', () => {
    render(<Models />)
    const slugs = ['llama3.2', 'mistral', 'gemma2', 'qwen2.5', 'phi3', 'deepseek-r1']
    for (const slug of slugs) {
      expect(screen.getByText(`ollama run ${slug}`)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('button', { name: /copy run command/i })).toHaveLength(6)
  })
})
