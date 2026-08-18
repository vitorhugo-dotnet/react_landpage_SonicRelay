import { features } from '@/content/features'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'

export function Features() {
  return (
    <Section id="features" labelledBy="features-title" className="border-y border-ink-900 bg-ink-900/20">
      <SectionHeading
        id="features-title"
        eyebrow="Features"
        title="Built around one decision: keep the audio off the server"
        description="Everything else — identity, pairing, codes, retention — follows from treating the backend as a control plane and nothing more."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li key={feature.id}>
            <Card className="h-full hover:border-ink-800 hover:bg-ink-900/70">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-850 bg-ink-950 text-signal-400">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink-100">{feature.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{feature.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
