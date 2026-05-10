import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Problem from "@/components/Problem"
import Features from "@/components/Features"
import Comparison from "@/components/Comparison"
import Mangalore from "@/components/Mangalore"
import Migration from "@/components/Migration"
import DataSafety from "@/components/DataSafety"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import FounderStory from "@/components/FounderStory"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Comparison />
      <Mangalore />
      <Migration />
      <DataSafety />
      <Pricing />
      <FAQ />
      <FounderStory />
      <CTA />
      <Footer />
    </main>
  )
}
