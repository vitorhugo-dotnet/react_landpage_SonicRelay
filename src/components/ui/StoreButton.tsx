import type { StoreLink } from '@/content/types'
import { StoreIcon } from './StoreIcon'
import { cn } from '@/lib/cn'

const base =
  'flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-left transition duration-200 ease-out-soft sm:w-auto'

const available =
  'border-ink-800 bg-ink-900/70 text-ink-100 hover:-translate-y-0.5 hover:border-signal-500/50 hover:bg-ink-850'

// Mirrors the disabled treatment of the reference kit: dashed edge, dimmed,
// and never lifts on hover, so "not yet" reads before the label is even read.
const pending = 'cursor-not-allowed border-dashed border-ink-800 bg-ink-900/30 text-ink-500'

interface StoreButtonProps {
  link: StoreLink
  comingSoonLabel: string
}

/**
 * One store badge. It renders as a real link only when the listing has a URL;
 * without one it is inert static markup rather than a dead anchor, so nothing
 * is focusable that cannot be acted on.
 */
export function StoreButton({ link, comingSoonLabel }: StoreButtonProps) {
  const label = (
    <span className="min-w-0">
      <small className="block text-[0.65rem] uppercase tracking-[0.14em] text-ink-700">
        {link.href ? link.eyebrow : comingSoonLabel}
      </small>
      <span className="block truncate text-sm font-semibold">{link.name}</span>
    </span>
  )

  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer noopener" className={cn(base, available)}>
        <StoreIcon store={link.id} className="h-6 w-6 shrink-0 text-signal-400" />
        {label}
      </a>
    )
  }

  return (
    <div aria-disabled="true" className={cn(base, pending)}>
      <StoreIcon store={link.id} className="h-6 w-6 shrink-0 text-ink-700" />
      {label}
    </div>
  )
}
