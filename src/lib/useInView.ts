import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/**
 * One-shot in-view detector. Returns a ref to attach and a boolean that flips
 * to `true` once the element first enters the viewport, then stays true.
 * If IntersectionObserver is unavailable, reports `true` immediately so content
 * is never trapped off-screen.
 */
export function useInView<T extends Element>(
  rootMargin = '0px 0px -12% 0px',
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
