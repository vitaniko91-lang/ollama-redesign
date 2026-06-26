import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copies text to the clipboard and exposes a transient `copied` flag that
 * auto-resets after `resetMs`. The timer is cleared on unmount so we never
 * call setState on an unmounted component.
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear any pending timer on unmount.
  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current)
    }
  }, [])

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timer.current !== null) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setCopied(false)
        timer.current = null
      }, resetMs)
    },
    [resetMs],
  )

  return { copied, copy }
}
