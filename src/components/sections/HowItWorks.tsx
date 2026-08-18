import { steps } from '@/content/steps'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StepScreenPreview } from '@/components/media/StepScreens'

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-it-works-title">
      <SectionHeading
        id="how-it-works-title"
        eyebrow="How it works"
        title="Four steps from desktop to headphones"
        description="Pairing, joining, streaming and monitoring each map to a route in the public client protocol."
      />

      <ol className="mt-14 space-y-16">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-signal-500/40 bg-signal-500/10 font-mono text-sm text-signal-400">
                {step.index}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink-100">{step.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-ink-500">{step.description}</p>
              <code className="mt-5 inline-block rounded-md border border-ink-850 bg-ink-900/70 px-3 py-1.5 font-mono text-xs text-signal-400">
                {step.endpoint}
              </code>
            </div>

            <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
              <StepScreenPreview screen={step.id} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
