import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Problem from "@/components/Problem"
import Features from "@/components/Features"
import AppShowcase from "@/components/AppShowcase"
import Comparison from "@/components/Comparison"
import Mangalore from "@/components/Mangalore"
import Migration from "@/components/Migration"
import DataSafety from "@/components/DataSafety"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import FounderStory from "@/components/FounderStory"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

const DynamicNavbar = dynamic(() => Promise.resolve(Navbar), { ssr: false })
const DynamicHero = dynamic(() => Promise.resolve(Hero), { ssr: false })
const DynamicProblem = dynamic(() => Promise.resolve(Problem), { ssr: false })
const DynamicFeatures = dynamic(() => Promise.resolve(Features), { ssr: false })
const DynamicAppShowcase = dynamic(() => Promise.resolve(AppShowcase), { ssr: false })
const DynamicComparison = dynamic(() => Promise.resolve(Comparison), { ssr: false })
const DynamicMangalore = dynamic(() => Promise.resolve(Mangalore), { ssr: false })
const DynamicMigration = dynamic(() => Promise.resolve(Migration), { ssr: false })
const DynamicDataSafety = dynamic(() => Promise.resolve(DataSafety), { ssr: false })
const DynamicPricing = dynamic(() => Promise.resolve(Pricing), { ssr: false })
const DynamicFAQ = dynamic(() => Promise.resolve(FAQ), { ssr: false })
const DynamicFounderStory = dynamic(() => Promise.resolve(FounderStory), { ssr: false })
const DynamicCTA = dynamic(() => Promise.resolve(CTA), { ssr: false })
const DynamicFooter = dynamic(() => Promise.resolve(Footer), { ssr: false })

export default function Home() {
  return (
    <main>
      <DynamicNavbar />
      <DynamicHero />
      <DynamicProblem />
      <DynamicFeatures />
      <DynamicAppShowcase />
      <DynamicComparison />
      <DynamicMangalore />
      <DynamicMigration />
      <DynamicDataSafety />
      <DynamicPricing />
      <DynamicFAQ />
      <DynamicFounderStory />
      <DynamicCTA />
      <DynamicFooter />
    </main>
  )
}
