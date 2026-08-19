import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin } from 'vite'

/**
 * Bakes the rendered page into dist/index.html.
 *
 * `npm run build` compiles src/entry-server.tsx for Node first, into the
 * throwaway directory this plugin then imports and deletes. Rendering during
 * the client build — rather than as a step after it — means the SPA fallback
 * copy and the service worker's precache manifest both see the finished HTML.
 */

const APP_MARKER = '<!--app-->'

export const prerenderPlugin = (ssrOutDir = '.prerender'): Plugin => {
  let ssrDir = ''
  let ssrEntry = ''

  return {
    name: 'sonicrelay-prerender',
    apply: 'build',

    configResolved(config) {
      ssrDir = resolve(config.root, ssrOutDir)
      ssrEntry = resolve(ssrDir, 'entry-server.js')
    },

    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        if (!html.includes(APP_MARKER)) {
          throw new Error(`index.html has no ${APP_MARKER} marker to render into`)
        }

        if (!existsSync(ssrEntry)) {
          throw new Error(
            `${ssrEntry} is missing. Build through "npm run build", which compiles the ` +
              'server entry before this build runs.',
          )
        }

        const { render } = (await import(pathToFileURL(ssrEntry).href)) as { render: () => string }

        return html.replace(APP_MARKER, render())
      },
    },

    async closeBundle() {
      await rm(ssrDir, { recursive: true, force: true })
    },
  }
}
