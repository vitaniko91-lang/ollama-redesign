import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { TokenStreamField } from './TokenStreamField'

// jsdom reports `prefers-reduced-motion: reduce` (see src/test/setup.ts) and
// ships no 2D canvas context, so the field must take its static path: render a
// canvas and start no animation loop.
describe('TokenStreamField', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a decorative canvas hidden from assistive tech', () => {
    const { container } = render(<TokenStreamField />)
    const canvas = container.querySelector('canvas')
    expect(canvas).not.toBeNull()
    expect(canvas).toHaveAttribute('aria-hidden')
  })

  it('does not start an animation loop under reduced motion', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    render(<TokenStreamField />)
    expect(raf).not.toHaveBeenCalled()
  })
})
