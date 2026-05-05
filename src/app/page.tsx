import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const DynamicNavbar = dynamic(() => Promise.resolve(Navbar), { ssr: false })
const DynamicHero = dynamic(() => Promise.resolve(Hero), { ssr: false })
const DynamicFeatures = dynamic(() => Promise.resolve(Features), { ssr: false })
const DynamicPricing = dynamic(() => Promise.resolve(Pricing), { ssr: false })
const DynamicCTA = dynamic(() => Promise.resolve(CTA), { ssr: false })
const DynamicFooter = dynamic(() => Promise.resolve(Footer), { ssr: false })

export default function Home() {
  return (
    <main>
      <DynamicNavbar />
      <DynamicHero />
      <DynamicFeatures />
      <DynamicPricing />
      <DynamicCTA />
      <DynamicFooter />
    </main>
  )
}
