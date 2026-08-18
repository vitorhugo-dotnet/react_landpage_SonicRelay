import { useId, useState } from 'react'
import { navigation, site } from '@/content/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

const sectionIds = navigation.map((link) => link.href.slice(1))

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()
  const activeId = useScrollSpy(sectionIds)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/80 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="rounded-md" aria-label={`${site.name} home`}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
              className={cn(
                'rounded-full px-3 py-2 text-sm transition-colors duration-200',
                activeId === link.href.slice(1) ? 'text-ink-100' : 'text-ink-500 hover:text-ink-300',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton
            href={site.repositories.api}
            external
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            <Icon name="github" className="h-4 w-4" />
            GitHub
          </LinkButton>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-ink-800 p-2 text-ink-300 lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <Icon name="chevronDown" className={cn('h-4 w-4 transition-transform', isMenuOpen && 'rotate-180')} />
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <nav id={menuId} aria-label="Mobile" className="border-t border-ink-900 lg:hidden">
          <Container className="flex flex-col py-2">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-ink-300 hover:text-ink-100"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
