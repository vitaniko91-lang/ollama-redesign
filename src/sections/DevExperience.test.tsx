import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DevExperience } from './DevExperience'

// jsdom reports prefers-reduced-motion: reduce, so the typed marker, the request
// block and the streamed response all render complete and static.
describe('DevExperience', () => {
  it('renders the section marker as a heading', () => {
    render(<DevExperience />)
    expect(
      screen.getByRole('heading', { level: 2, name: /openai-compatible api/i }),
    ).toBeInTheDocument()
  })

  it('renders the copyable curl request body', () => {
    render(<DevExperience />)
    // CodeBlock exposes a copy control, proving the request is copyable.
    expect(screen.getByRole('button', { name: /copy command/i })).toBeInTheDocument()
    // Match the leaf <code> so the request body is found unambiguously.
    const code = screen.getByText(
      (_, el) =>
        el?.tagName === 'CODE' &&
        el.textContent?.includes('"model": "llama3.2"') === true &&
        el.textContent?.includes('"stream": true') === true,
    )
    expect(code).toBeInTheDocument()
  })

  it('renders the streamed assistant response content', () => {
    render(<DevExperience />)
    // StreamText exposes the full answer as the host element's aria-label.
    expect(
      screen.getByText(
        (_, el) =>
          el?.getAttribute('aria-label')?.startsWith('Entropy is the amount of disorder') ?? false,
      ),
    ).toBeInTheDocument()
  })
})
