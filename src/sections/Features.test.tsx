import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Features } from './Features'
import { features } from '../data/features'

// jsdom reports prefers-reduced-motion: reduce, so the typed marker and its
// flags output render complete and static — every entry is present immediately.
describe('Features', () => {
  it('renders the section marker as a heading', () => {
    render(<Features />)
    expect(screen.getByRole('heading', { level: 2, name: /features/i })).toBeInTheDocument()
  })

  it('renders all six feature titles as headings', () => {
    render(<Features />)
    for (const feature of features) {
      expect(screen.getByRole('heading', { level: 3, name: feature.title })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
  })

  it('renders a CLI flag token for each feature', () => {
    render(<Features />)
    const flags = ['--local', '--api', '--cross-platform', '--library', '--gpu', '--open-source']
    for (const flag of flags) {
      expect(screen.getByText(flag)).toBeInTheDocument()
    }
  })
})
