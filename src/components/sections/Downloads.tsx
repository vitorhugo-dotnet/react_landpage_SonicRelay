import { downloads, storeLinks } from '@/content/downloads'
import { site } from '@/content/site'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StoreButton } from '@/components/ui/StoreButton'
import { LinkButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const COMING_SOON = 'Coming soon'

export function Downloads() {
  return (
    <Section id="downloads" labelledBy="downloads-title" className="border-y border-ink-900 bg-ink-900/20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
        <SectionHeading
          id="downloads-title"
          eyebrow={downloads.eyebrow}
          title={downloads.title}
          description={downloads.description}
        />

        <div>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
            {storeLinks.map((link) => (
              <li key={link.id} className="sm:flex-1 lg:flex-none">
                <StoreButton link={link} comingSoonLabel={COMING_SOON} />
                <p className="mt-1.5 px-1 text-xs text-ink-700">{link.target}</p>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-sm text-ink-500">{downloads.note}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href={site.repositories.desktop} external variant="secondary">
              <Icon name="desktop" className="h-4 w-4" />
              Windows publisher
            </LinkButton>
            <LinkButton href={site.repositories.mobile} external variant="secondary">
              <Icon name="phone" className="h-4 w-4" />
              Mobile viewer
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
