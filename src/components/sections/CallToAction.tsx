import { site } from '@/content/site'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" aria-hidden="true" />
      <Container className="relative text-center">
        <h2 id="cta-title" className="text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl">
          Run the whole stack yourself
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-500">
          Dockerfile, Compose stacks with nginx and coturn, EF Core migrations and a CI/CD pipeline are all in the
          repository. Start with the client protocol.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <LinkButton href={site.docs.protocol} external>
            Read the protocol
            <Icon name="arrowRight" className="h-4 w-4" />
          </LinkButton>
          <LinkButton href={site.repositories.api} external variant="secondary">
            <Icon name="github" className="h-4 w-4" />
            Backend repository
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
