import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from '@/App'

/**
 * Build-time entry point. `npm run build` renders this once and bakes the
 * result into dist/index.html, so a crawler that does not execute JavaScript —
 * and the browser's first paint — both get the finished page.
 *
 * Nothing here may touch the DOM: the tree is rendered in Node.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
