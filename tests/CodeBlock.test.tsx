import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock } from '../src/components/CodeBlock'

test('clicking copy calls clipboard with the command', () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.assign(navigator, { clipboard: { writeText } })
  render(<CodeBlock code="ollama run llama3.2" />)
  fireEvent.click(screen.getByRole('button', { name: /copy/i }))
  expect(writeText).toHaveBeenCalledWith('ollama run llama3.2')
})
