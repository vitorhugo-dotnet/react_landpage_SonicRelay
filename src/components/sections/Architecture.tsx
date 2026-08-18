import { architectureNodes, architectureNotes } from '@/content/architecture'
import { site } from '@/content/site'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'

export function Architecture() {
  return (
    <Section id="architecture" labelledBy="architecture-title">
      <SectionHeading
        id="architecture-title"
        eyebrow="Architecture"
        title="A control plane, three moving parts"
        description="The API authenticates devices, persists session state and routes signaling. It never captures, encodes, buffers, transcodes or relays a single audio frame."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {architectureNodes.map((node) => (
          <Card key={node.id} className="relative">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-850 bg-ink-950 text-relay-400">
              <Icon name={node.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink-100">{node.title}</h3>
            <p className="mt-1 font-mono text-xs text-ink-700">{node.subtitle}</p>
            <ul className="mt-4 space-y-2">
              {node.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 rounded-card border border-ink-850 bg-ink-900/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="space-y-2">
          {architectureNotes.map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-ink-500">
              <Icon name="arrowRight" className="mt-0.5 h-4 w-4 shrink-0 text-ink-700" />
              {note}
            </li>
          ))}
        </ul>
        <LinkButton href={site.docs.architecture} external variant="secondary" className="shrink-0">
          Architecture doc
        </LinkButton>
      </div>
    </Section>
  )
}
