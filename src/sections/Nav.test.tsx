import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Nav } from './Nav'
import { COMMAND_PALETTE_OPEN_EVENT } from '../lib/commandPalette'

describe('Nav', () => {
  it('renders the logo as a terminal prompt `> ollama`', () => {
    render(<Nav />)
    // The amber `>` is decorative (aria-hidden); the accessible name is "ollama".
    const logo = screen.getByRole('link', { name: 'ollama' })
    expect(logo).toBeInTheDocument()
  })

  it('renders the CLI-flag nav links with the right hashes', () => {
    render(<Nav />)
    expect(screen.getAllByRole('link', { name: '--models' })[0]).toHaveAttribute('href', '#models')
    expect(screen.getAllByRole('link', { name: '--docs' })[0]).toHaveAttribute('href', '#docs')
    expect(screen.getAllByRole('link', { name: '--pricing' })[0]).toHaveAttribute('href', '#')
    expect(screen.getAllByRole('link', { name: '--github' })[0]).toHaveAttribute('href', '#github')
  })

  it('exposes the ⌘K hint as a real button that opens the shared palette', () => {
    render(<Nav />)
    const chip = screen.getByRole('button', { name: /command menu/i })
    expect(chip.tagName).toBe('BUTTON')

    let opened = false
    const onOpen = () => {
      opened = true
    }
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
    fireEvent.click(chip)
    window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
    expect(opened).toBe(true)
  })

  it('renders a Download action pointing at the CTA section', () => {
    render(<Nav />)
    const downloads = screen.getAllByRole('link', { name: /download/i })
    expect(downloads.length).toBeGreaterThanOrEqual(1)
    expect(downloads[0]).toHaveAttribute('href', '#download')
  })

  it('toggles the mobile menu via the hamburger (aria-expanded)', () => {
    render(<Nav />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'nav-mobile-menu')
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
