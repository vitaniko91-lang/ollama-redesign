import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  beforeEach(() => {
    // jsdom has no clipboard; provide a writable stub per test.
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
  })

  it('exposes a stable, accessibly-named "Copy command" control', () => {
    render(<CodeBlock code="echo hi" />)
    expect(screen.getByRole('button', { name: /copy command/i })).toBeInTheDocument()
  })

  it('starts with an empty polite live region (nothing announced on load)', () => {
    render(<CodeBlock code="echo hi" />)
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it('announces "Copied" to screen readers after copying, keeping the label stable', async () => {
    render(<CodeBlock code="echo hi" />)
    const button = screen.getByRole('button', { name: /copy command/i })

    fireEvent.click(button)

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/copied/i))
    // The control's accessible name does not flip to "Copied" — the live region
    // carries the success message instead.
    expect(button).toHaveAccessibleName(/copy command/i)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('echo hi')
  })
})
