import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App scaffold', () => {
  it('renders the placeholder copy', () => {
    render(<App />)
    expect(screen.getByText(/scaffold ready/i)).toBeInTheDocument()
  })
})
