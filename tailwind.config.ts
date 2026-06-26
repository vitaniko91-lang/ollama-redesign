import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // The Living Terminal — charcoal + phosphor amber + paper. NO green.
        bg: {
          base: '#0B0B0C', // page (warm near-black charcoal)
          raised: '#131312', // terminal body, cards, panels
          inset: '#0E0E0D', // code wells inside raised
        },
        accent: {
          amber: '#E8B339', // phosphor accent — prompts, active, highlight, CTA accents
          amberDim: '#8A6B2E', // dimmer amber (secondary accent, progress track-fill)
        },
        text: {
          paper: '#ECE8DD', // primary text (warm paper-white)
          muted: '#8C887C', // secondary text (warm grey)
          dim: '#54514A', // tertiary / comments / inactive
        },
        line: {
          DEFAULT: 'rgba(236,232,221,0.08)', // hairline borders/dividers
          amber: 'rgba(232,179,57,0.22)', // active/amber borders
        },
      },
      borderRadius: {
        // btn corners (Tailwind v3 default `rounded` is already 4px; pinned for intent)
        DEFAULT: '4px',
        // card / panel corners
        xl: '12px',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'palette-in': {
          from: { opacity: '0', transform: 'translateY(-6px) scale(0.985)' },
          to: { opacity: '1', transform: 'none' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        // Strong ease-out curve; gated behind motion-safe at the call site.
        'palette-in': 'palette-in 170ms cubic-bezier(0.23,1,0.32,1)',
        'overlay-in': 'overlay-in 170ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
