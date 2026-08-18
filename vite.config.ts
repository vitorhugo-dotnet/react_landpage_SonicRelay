import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages serves a project site from /<repo>/, so the base path has to be
 * baked into the build. The Pages workflow passes it in as VITE_BASE; local
 * builds and previews default to the domain root.
 */
const resolveBase = (): string => {
  const configured = process.env.VITE_BASE?.trim()
  if (!configured || configured === '/') return '/'
  return configured.endsWith('/') ? configured : `${configured}/`
}

/**
 * Static hosts return their 404 document for any path that is not a file on
 * disk. Shipping a copy of index.html as 404.html makes GitHub Pages serve the
 * app instead of its default error page, so deep links and stale URLs still
 * land on the site.
 */
const spaFallback = (): Plugin => ({
  name: 'sonicrelay-spa-fallback',
  apply: 'build',
  closeBundle() {
    const outDir = resolve(import.meta.dirname, 'dist')
    const indexHtml = resolve(outDir, 'index.html')

    if (existsSync(indexHtml)) {
      copyFileSync(indexHtml, resolve(outDir, '404.html'))
    }
  },
})

export default defineConfig({
  base: resolveBase(),
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
