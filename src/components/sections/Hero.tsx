import { hero } from '@/content/hero'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { HeroScene } from '@/components/media/HeroScene'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      <Container className="relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal" />
            {hero.eyebrow}
          </Badge>

          <h1 id="hero-title" className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink-100 sm:text-6xl">
            {hero.title[0]}
            <br />
            <span className="text-gradient">{hero.title[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{hero.description}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href={hero.primaryAction.href} external={hero.primaryAction.external}>
              {hero.primaryAction.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={hero.secondaryAction.href} external={hero.secondaryAction.external} variant="secondary">
              <Icon name="github" className="h-4 w-4" />
              {hero.secondaryAction.label}
            </LinkButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-sm text-ink-500">
                <Icon name="check" className="h-4 w-4 text-signal-400" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-signal-500/5 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <HeroScene />
          </div>
        </div>
      </Container>
    </section>
  )
}
