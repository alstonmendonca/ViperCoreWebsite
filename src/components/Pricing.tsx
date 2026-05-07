'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'

const included = [
  'Fast Billing & Invoicing',
  '100% Offline Operation',
  'Encrypted Local Storage (AES-256)',
  'Thermal Printer Support (58mm & 80mm)',
  'Table Management',
  'Inventory Tracking',
  'GST & Tax Billing',
  'Multi-User Roles',
  'Reports & Analytics Dashboard',
  'Data Backup & Restore',
  'Order History & Audit Trail',
  'Desktop App (Windows)',
  'Lifetime Access',
]

const freeTier = [
  'Occasional updates',
  'Bug fixes as needed',
  'Community support',
]

const proTier = [
  'Consistent feature releases',
  'Monthly updates',
  'Priority bug fixes',
  'Quality-of-life improvements',
  'Customer-requested features',
  'Priority email support',
  'Early access to beta features',
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="block w-8 h-px bg-amber-500/60" />
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
              Pricing
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
          >
            Buy once. Own it forever.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[16px] text-zinc-500 leading-relaxed"
          >
            One-time purchase. No mandatory renewals. Then choose how you want to stay updated.
          </motion.p>
        </div>

        {/* Step 1: The purchase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="border border-zinc-800/60 p-8 lg:p-10 mb-4"
          style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-1.5 h-1.5 bg-amber-500/60" />
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                  One-time purchase
                </span>
              </div>
              <div className="font-heading text-4xl lg:text-5xl font-bold text-white mb-2">
                ₹10,000
              </div>
              <p className="text-[15px] text-zinc-500 max-w-md">
                Pay once, get lifetime access to the full software. No recurring charges for the core product.
              </p>
            </div>

            <a
              href="/download"
              className="group inline-flex items-center gap-2 h-11 px-6 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-all duration-200 shrink-0" style={{ borderRadius: '2px' }}
            >
              Get ViperCore
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Included features - horizontal wrap */}
          <div className="mt-8 pt-8 border-t border-zinc-800/40">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {included.map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-[13px] text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-amber-500/50 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 2: Choose your update tier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-6 mt-10">
            <span className="block w-8 h-px bg-zinc-800" />
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
              Then choose your update plan
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          {/* Free tier */}
          <div className="lg:col-span-5 border border-zinc-800/40 p-8" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-1.5 h-1.5 bg-zinc-600" />
              <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                Free
              </span>
            </div>

            <div className="mb-6">
              <div className="font-heading text-3xl font-bold text-white mb-1">
                Included
              </div>
              <p className="text-[14px] text-zinc-500">
                With your purchase. No extra cost.
              </p>
            </div>

            <ul className="space-y-3">
              {freeTier.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                  <span className="text-[14px] text-zinc-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro tier */}
          <div className="lg:col-span-7 border border-zinc-800/60 p-8 lg:mt-4" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-1.5 h-1.5 bg-amber-500/60" />
              <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                Pro Maintenance
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-white">
                  ₹2,000
                </span>
                <span className="text-[14px] text-zinc-500">
                  /year
                </span>
              </div>
              <p className="text-[14px] text-zinc-500 mt-1">
                Stay ahead with continuous updates and priority support.
              </p>
            </div>

            <a
              href="mailto:alstondmendonca@gmail.com"
              className="group inline-flex items-center gap-2 h-10 px-5 mb-8 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-all duration-200" style={{ borderRadius: '2px' }}
            >
              Subscribe
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <ul className="space-y-3">
              {proTier.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-500/50 mt-0.5 shrink-0" />
                  <span className="text-[14px] text-zinc-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-14 pt-8 border-t border-zinc-800/40 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] text-zinc-600 uppercase tracking-[0.1em]"
        >
          <span>No hidden fees</span>
          <span className="text-zinc-800">·</span>
          <span>30-day money-back guarantee</span>
          <span className="text-zinc-800">·</span>
          <span>Instant access</span>
        </motion.div>
      </div>
    </section>
  )
}