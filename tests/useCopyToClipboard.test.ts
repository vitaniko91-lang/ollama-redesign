import { renderHook, act } from '@testing-library/react'
import { useCopyToClipboard } from '../src/lib/useCopyToClipboard'

test('copy sets copied=true then resets', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.assign(navigator, { clipboard: { writeText } })
  const { result } = renderHook(() => useCopyToClipboard(50))
  await act(async () => {
    await result.current.copy('hello')
  })
  expect(writeText).toHaveBeenCalledWith('hello')
  expect(result.current.copied).toBe(true)
})
