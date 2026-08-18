import { retentionRows, securityControls } from '@/content/security'
import { site } from '@/content/site'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'

export function Security() {
  return (
    <Section id="security" labelledBy="security-title" className="border-y border-ink-900 bg-ink-900/20">
      <SectionHeading
        id="security-title"
        eyebrow="Security & privacy"
        title="Nothing to leak that was not already deleted"
        description="No human accounts, no stored secrets, and a retention clock that starts when data is collected — not when a device was last seen."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <ul className="space-y-7">
          {securityControls.map((control) => (
            <li key={control.id} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-850 bg-ink-950 text-emerald-signal">
                <Icon name="shield" className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-semibold text-ink-100">{control.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{control.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-card border border-ink-850 bg-ink-950/60 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-700">Retention schedule</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
              <caption className="sr-only">Maximum retention per stored record type</caption>
              <thead>
                <tr className="border-b border-ink-850 text-xs uppercase tracking-wider text-ink-700">
                  <th scope="col" className="py-2 pr-4 font-medium">Data</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Measured from</th>
                  <th scope="col" className="py-2 font-medium">Maximum retention</th>
                </tr>
              </thead>
              <tbody>
                {retentionRows.map((row) => (
                  <tr key={row.data} className="border-b border-ink-900 last:border-b-0">
                    <th scope="row" className="py-3 pr-4 font-medium text-ink-300">{row.data}</th>
                    <td className="py-3 pr-4 font-mono text-xs text-ink-700">{row.measuredFrom}</td>
                    <td className="py-3 text-ink-500">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={site.docs.security} external variant="secondary">Security controls</LinkButton>
            <LinkButton href={site.docs.retention} external variant="ghost">Retention policy</LinkButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
