import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { prerenderPlugin } from './vite/prerender.ts'
import { seoPlugin } from './vite/seo.ts'
import { seo } from './src/content/seo.ts'
import { site } from './src/content/site.ts'

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

/**
 * Installable app shell. A landing page gains nothing from offline support on
 * its own, but the precache and the font runtime caches make repeat visits
 * paint from disk, which is what Core Web Vitals — and therefore ranking —
 * actually measure.
 */
const pwa = (base: string): Plugin[] =>
  VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    includeAssets: ['favicon.svg', 'favicon-96.png', 'apple-touch-icon.png', 'og-cover.png'],
    manifest: {
      id: base,
      name: seo.title,
      short_name: site.name,
      description: seo.description,
      lang: seo.language,
      dir: 'ltr',
      start_url: base,
      scope: base,
      display: 'standalone',
      orientation: 'any',
      background_color: seo.backgroundColor,
      theme_color: seo.themeColor,
      categories: ['utilities', 'music', 'productivity'],
      icons: [
        { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      screenshots: [
        {
          src: 'og-cover.png',
          sizes: '1200x630',
          type: 'image/png',
          form_factor: 'wide',
          label: seo.socialImage.alt,
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
      navigateFallback: 'index.html',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'google-fonts-stylesheets' },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: { maxEntries: 24, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
  })

export default defineConfig(({ isSsrBuild }) => {
  const base = resolveBase()

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // The server bundle only has to render the tree. Everything that shapes
      // the deployed HTML would either be wasted work or infinite recursion.
      ...(isSsrBuild ? [] : [seoPlugin(), prerenderPlugin(), ...pwa(base), spaFallback()]),
    ],
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
      include: ['src/**/*.test.{ts,tsx}', 'vite/**/*.test.ts'],
    },
  }
})
