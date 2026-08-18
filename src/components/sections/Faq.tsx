import { faqItems } from '@/content/faq'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" className="border-t border-ink-900">
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions worth asking first" />

      <div className="mt-12 divide-y divide-ink-900 border-y border-ink-900">
        {faqItems.map((item) => (
          <details key={item.id} name="faq" className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
              <h3 className="text-base font-medium text-ink-100">{item.question}</h3>
              <Icon
                name="chevronDown"
                className="h-4 w-4 shrink-0 text-ink-700 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-500">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
