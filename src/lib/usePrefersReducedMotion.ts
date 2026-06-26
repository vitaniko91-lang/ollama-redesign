import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitial(): boolean {
  // Default to reduced (true) when matchMedia is unavailable (SSR / jsdom):
  // the safe fallback is to render the final, static state with no animation.
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true
  return window.matchMedia(QUERY).matches
}

/**
 * Tracks the user's `prefers-reduced-motion` setting and updates live if it
 * changes. Every motion primitive consults this: when it returns `true`, the
 * primitive renders its final state instantly with no animation.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitial)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
