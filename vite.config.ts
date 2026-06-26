import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the single-page app loads its hashed assets correctly from
  // the GitHub Pages project subpath (https://<user>.github.io/ollama-redesign/).
  // Safe here: the page has no client-side router, only in-page #anchors.
  base: './',
  plugins: [react()],
})
