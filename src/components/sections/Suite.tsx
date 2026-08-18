import { suiteProjects } from '@/content/suite'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'

export function Suite() {
  return (
    <Section id="suite" labelledBy="suite-title">
      <SectionHeading
        id="suite-title"
        eyebrow="The suite"
        title="Three repositories, one product"
        description="Each part is independently deployable and speaks the same documented protocol."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {suiteProjects.map((project) => (
          <li key={project.id}>
            <Card className="group h-full hover:border-signal-500/40 hover:bg-ink-900/70">
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-full flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-850 bg-ink-950 text-signal-400">
                    <Icon name={project.icon} className="h-5 w-5" />
                  </span>
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 text-ink-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-signal-400"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-100">{project.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{project.role}</p>
                <p className="mt-4 font-mono text-xs text-ink-700">{project.stack}</p>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
