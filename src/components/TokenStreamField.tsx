import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * TokenStreamField — the page's signature ambient layer: a generative Canvas 2D
 * field of faint amber "tokens" drifting slowly upward, the way an LLM emits
 * them. It is the living substrate the whole terminal session floats over.
 *
 * Mounted ONCE, globally, as a `fixed inset-0 z-0 pointer-events-none` layer
 * behind all content (the content wrapper sits at z-10). It never holds text,
 * so it can never lower the contrast of real copy — tokens stay between
 * ~3–14% amber on charcoal, and the panels that DO carry text sit on solid
 * `bg-raised`/`bg-inset` above it.
 *
 * Concept fit, not decoration: the glyph pool is real model vernacular — JSON
 * fragments, prompt glyphs, model names, `tok/s`, quant tags — so the field
 * reads as half-formed generation, not abstract "matrix rain". Density is low
 * and refined.
 *
 * Behaviour:
 *  - drift: gentle upward + slight diagonal, slow (framerate-independent dt).
 *  - cursor-reactive: tokens within a radius of the (smoothly-eased) pointer
 *    brighten and gain a soft amber glow.
 *  - scroll parallax: the field shifts a few px against scroll, per-token depth.
 *
 * Performance (house design.md): single rAF loop, dt-throttled; token count
 * scales to the viewport (~44–110); devicePixelRatio-aware sizing capped at 2;
 * only globalAlpha/fillText work; the loop PAUSES when the tab is hidden
 * (visibilitychange) or the canvas leaves the viewport (IntersectionObserver);
 * resize is debounced; every listener and the rAF are cleaned up on unmount.
 *
 * Reduced motion (`prefers-reduced-motion: reduce`): renders ONE static, sparse
 * frame and starts no loop and no pointer/scroll listeners at all.
 */

// rgb of accent.amber (#E8B339) — the only colour the field ever paints.
const AMBER = '232, 179, 57'

// Frequent, single-glyph fragments — the connective tissue of "code being made".
const COMMON = ['{', '}', '<', '>', '/', '|', '$', '~', '·', '▓', '░', ';', ':', '=', '7B']
// Rarer, longer tokens — model names + runtime vernacular. Spawned ~1-in-5.
const RARE = ['>>>', '70B', '0xA1', 'llama', 'mistral', 'gemma', 'tok/s', '0.97', 'phi3', '~/', '[]']

type Token = {
  x: number
  y: number
  vx: number // px/s, gentle horizontal
  vy: number // px/s, negative = upward
  size: number
  glyph: string
  baseAlpha: number
  depth: number // parallax depth, 0.4–1
}

export function TokenStreamField() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // jsdom / very old browsers: no 2D context — bail before any work or loop.
    if (!ctx) return

    let W = 0
    let H = 0
    let tokens: Token[] = []

    // Pointer target (viewport coords; matches the fixed canvas) + eased follow.
    const ptr = { x: -9999, y: -9999 }
    let smX = -9999
    let smY = -9999
    let scrollY = typeof window !== 'undefined' ? window.scrollY : 0

    const PAD = 48
    const CURSOR_RADIUS = 175

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const pick = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0]
    const spawnGlyph = () => (Math.random() < 0.2 ? pick(RARE) : pick(COMMON))

    function makeToken(initial: boolean): Token {
      // ~1-in-8 tokens are "active" — a touch brighter, so the field has a few
      // points of life rather than a uniform wash.
      const active = Math.random() < 0.12
      const size = Math.round(rand(11, 14)) + (Math.random() < 0.16 ? 3 : 0)
      return {
        x: rand(0, W),
        // initial: scatter across the whole field; respawn: just below the fold.
        y: initial ? rand(-PAD, H + PAD) : H + PAD + rand(0, 80),
        vx: rand(-4, 4),
        vy: -rand(6, 17),
        size,
        glyph: spawnGlyph(),
        baseAlpha: active ? rand(0.1, 0.15) : rand(0.04, 0.08),
        depth: rand(0.4, 1),
      }
    }

    function build() {
      W = canvas!.clientWidth
      H = canvas!.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.max(1, Math.round(W * dpr))
      canvas!.height = Math.max(1, Math.round(H * dpr))
      // Resizing the bitmap clears all context state — re-establish it here.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.textBaseline = 'middle'
      // Scale to the viewport but keep large desktops from reading too sparse:
      // ~104 tokens at 1440×900, ~40 on a phone — alive, never "matrix rain".
      const count = Math.max(40, Math.min(120, Math.round((W * H) / 12500)))
      tokens = Array.from({ length: count }, () => makeToken(true))
    }

    // Wrap a value into [min, max) so the parallax-shifted field never empties.
    const wrap = (v: number, min: number, max: number) => {
      const r = max - min
      return (((v - min) % r) + r) % r + min
    }

    function drawToken(t: Token, live: boolean) {
      const drawY = live ? wrap(t.y - scrollY * 0.04 * t.depth, -PAD, H + PAD) : t.y
      let alpha = t.baseAlpha
      let blur = 0
      if (live) {
        const dx = t.x - smX
        const dy = drawY - smY
        const d2 = dx * dx + dy * dy
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
          const f = 1 - Math.sqrt(d2) / CURSOR_RADIUS
          alpha = Math.min(0.28, t.baseAlpha + f * f * 0.16)
          if (f > 0.4) blur = 8
        }
      }
      ctx!.font = `${t.size}px "Geist Mono", ui-monospace, monospace`
      ctx!.fillStyle = `rgba(${AMBER}, ${alpha})`
      if (blur) {
        ctx!.shadowColor = `rgba(${AMBER}, 0.5)`
        ctx!.shadowBlur = blur
      }
      ctx!.fillText(t.glyph, t.x, drawY)
      if (blur) ctx!.shadowBlur = 0
    }

    function paintStatic() {
      ctx!.clearRect(0, 0, W, H)
      for (const t of tokens) drawToken(t, false)
    }

    // ---- Reduced motion: one static frame, no loop, no listeners ----
    if (reduced) {
      build()
      paintStatic()
      let resizeId: ReturnType<typeof setTimeout> | undefined
      const onResize = () => {
        clearTimeout(resizeId)
        resizeId = setTimeout(() => {
          build()
          paintStatic()
        }, 150)
      }
      window.addEventListener('resize', onResize)
      return () => {
        clearTimeout(resizeId)
        window.removeEventListener('resize', onResize)
      }
    }

    // ---- Animated path ----
    let raf = 0
    let running = false
    let last = 0

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      // Ease the pointer toward its target — smooth follow, never jittery.
      const e = Math.min(1, dt * 10)
      smX += (ptr.x - smX) * e
      smY += (ptr.y - smY) * e

      ctx!.clearRect(0, 0, W, H)
      for (const t of tokens) {
        t.x += t.vx * dt
        t.y += t.vy * dt
        if (t.y < -PAD) Object.assign(t, makeToken(false))
        if (t.x < -PAD) t.x = W + PAD
        else if (t.x > W + PAD) t.x = -PAD
        drawToken(t, true)
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    build()

    const onMove = (ev: PointerEvent) => {
      ptr.x = ev.clientX
      ptr.y = ev.clientY
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    let resizeId: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      clearTimeout(resizeId)
      resizeId = setTimeout(build, 150)
    }

    // Pause when the canvas is fully out of the viewport. (A fixed inset-0 layer
    // is effectively always intersecting, so this is a correctness safety net.)
    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((en) => en.isIntersecting)
          if (visible && !document.hidden) start()
          else stop()
        },
        { threshold: 0 },
      )
      io.observe(canvas)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      clearTimeout(resizeId)
      io?.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 block h-full w-full"
    />
  )
}
