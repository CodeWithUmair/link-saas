import CTASection from '@/components/landing-page/cta-section'
import FeaturesSection from '@/components/landing-page/feature-section'
import Hero from '@/components/landing-page/Hero'
import HeroSectionOne from '@/components/landing-page/hero-section-one'
import HeroSectionThree from '@/components/landing-page/hero-section-three'
import HeroSectionTwo from '@/components/landing-page/hero-section-two'

export default function Page() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <HeroSectionOne />
      <HeroSectionTwo />
      <FeaturesSection />
      <HeroSectionThree />
      <CTASection />
    </main>
  )
}