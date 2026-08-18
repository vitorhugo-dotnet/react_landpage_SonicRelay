import { footerLinks, site } from '@/content/site'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

const isExternal = (href: string) => href.startsWith('http')

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-900 py-14">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">{site.tagline}</p>
        </div>

        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(isExternal(link.href) ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="text-sm text-ink-500 transition-colors hover:text-ink-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="mt-12 border-t border-ink-900 pt-6">
        <p className="text-xs text-ink-700">
          {site.name} is an open-source project. Audio never passes through the control plane.
        </p>
      </Container>
    </footer>
  )
}
