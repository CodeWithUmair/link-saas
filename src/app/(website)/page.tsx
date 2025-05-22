import CTASection from '@/components/landing-page/cta-section'
import FeaturesSection from '@/components/landing-page/feature-section'
import Hero from '@/components/landing-page/Hero'
import HeroSectionOne from '@/components/landing-page/hero-section-one'
import HeroSectionThree from '@/components/landing-page/hero-section-three'
import HeroSectionTwo from '@/components/landing-page/hero-section-two'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function Page() {
  return (
    <main className='min-h-screen'>
      <Header />
      <Hero />
      <HeroSectionOne />
      <HeroSectionTwo />
      <FeaturesSection />
      <HeroSectionThree />
      <CTASection />
      <Footer />
    </main>
  )
}