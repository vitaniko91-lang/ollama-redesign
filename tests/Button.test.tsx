import { render, screen } from '@testing-library/react'
import { Button } from '../src/components/Button'

test('primary variant uses white bg + black text', () => {
  render(<Button variant="primary">Download</Button>)
  const btn = screen.getByRole('button', { name: 'Download' })
  expect(btn.className).toMatch(/bg-white/)
  expect(btn.className).toMatch(/text-black/)
})

test('outline variant uses transparent bg + border', () => {
  render(<Button variant="outline">Docs</Button>)
  expect(screen.getByRole('button', { name: 'Docs' }).className).toMatch(/border/)
})

test('renders as anchor when href passed', () => {
  render(<Button href="https://x.com" variant="primary">Go</Button>)
  expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', 'https://x.com')
})
