import { SkipLink } from '@/components/layout/SkipLink'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Hero } from '@/components/sections/Hero'
import { Downloads } from '@/components/sections/Downloads'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { Architecture } from '@/components/sections/Architecture'
import { Security } from '@/components/sections/Security'
import { Suite } from '@/components/sections/Suite'
import { Faq } from '@/components/sections/Faq'
import { CallToAction } from '@/components/sections/CallToAction'

/**
 * The page is a plain composition of sections. Each section owns its own copy
 * source, so adding or reordering one never touches another.
 */
export default function App() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Downloads />
        <HowItWorks />
        <Features />
        <Architecture />
        <Security />
        <Suite />
        <Faq />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  )
}
