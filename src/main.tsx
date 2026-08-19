import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found in index.html')
}

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/**
 * Production builds ship the page already rendered (see src/entry-server.tsx),
 * so the client adopts that markup instead of throwing it away. `npm run dev`
 * serves an empty root and falls back to a plain client render.
 */
if (container.firstElementChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
