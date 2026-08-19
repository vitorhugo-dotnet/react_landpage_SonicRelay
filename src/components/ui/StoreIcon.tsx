import type { StoreId } from '@/content/types'

/**
 * Simplified store marks. These are filled brand glyphs rather than the
 * stroked UI glyphs in `Icon`, so they live in their own component with their
 * own rendering rules.
 */
const marks: Record<StoreId, () => React.JSX.Element> = {
  play: () => (
    <path d="M4.2 2.1a1 1 0 0 0-.7.96v17.88a1 1 0 0 0 1.53.85l14.4-8.94a1 1 0 0 0 0-1.7L5.03 2.2a1 1 0 0 0-.83-.1" />
  ),
  fdroid: () => (
    <>
      <path d="M8.4 3.1a.9.9 0 0 1 1.25.32l.72 1.24a7.6 7.6 0 0 1 3.26 0l.72-1.24a.9.9 0 1 1 1.56.9l-.64 1.1A6.3 6.3 0 0 1 18.3 10v1.2H5.7V10a6.3 6.3 0 0 1 3.03-4.58l-.64-1.1a.9.9 0 0 1 .31-1.22" />
      <path d="M5.7 12.8h12.6v4.9a2.6 2.6 0 0 1-2.6 2.6H8.3a2.6 2.6 0 0 1-2.6-2.6z" />
      <circle cx="9.6" cy="8.9" r="1" fill="var(--color-ink-950)" />
      <circle cx="14.4" cy="8.9" r="1" fill="var(--color-ink-950)" />
    </>
  ),
  microsoft: () => (
    <>
      <path d="M3 3h8.4v8.4H3z" />
      <path d="M12.6 3H21v8.4h-8.4z" />
      <path d="M3 12.6h8.4V21H3z" />
      <path d="M12.6 12.6H21V21h-8.4z" />
    </>
  ),
}

interface StoreIconProps {
  store: StoreId
  className?: string
}

export function StoreIcon({ store, className }: StoreIconProps) {
  const Mark = marks[store]

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <Mark />
    </svg>
  )
}
