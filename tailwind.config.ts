import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          elevated: '#111111',
        },
        accent: {
          green: '#4ADE80',
          amber: '#F59E0B',
        },
        text: {
          primary: '#ffffff',
          muted: '#888888',
          dim: '#555555',
        },
        border: {
          card: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.06)',
        },
      },
      borderRadius: {
        // btn corners (Tailwind v3 default `rounded` is already 4px; pinned for intent)
        DEFAULT: '4px',
        // card corners
        xl: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config
