'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    number: '01',
    title: 'Fast billing',
    description:
      'Barcode scanning, quick item search, one-tap checkout. Create invoices in seconds.',
    span: 'lg:col-span-4',
  },
  {
    number: '02',
    title: 'Works offline',
    description:
      'No internet required. Process sales, print receipts, and manage tables during outages.',
    span: 'lg:col-span-4',
  },
  {
    number: '03',
    title: 'Encrypted storage',
    description:
      'AES-256 encryption on all local data. Your business records never leave your machine.',
    span: 'lg:col-span-4',
  },
  {
    number: '04',
    title: 'Thermal printing',
    description:
      'Auto-detect 58mm and 80mm thermal printers. Custom receipt templates.',
    span: 'lg:col-span-5',
  },
  {
    number: '05',
    title: 'Table management',
    description:
      'Visual floor layout for dine-in. Split bills, transfer tables, track occupancy.',
    span: 'lg:col-span-7',
  },
  {
    number: '06',
    title: 'Inventory tracking',
    description:
      'Real-time stock levels, low-stock alerts, and variant management.',
    span: 'lg:col-span-7',
  },
  {
    number: '07',
    title: 'GST invoicing',
    description:
      'GST-compliant bills with automatic CGST, SGST, and IGST calculations.',
    span: 'lg:col-span-5',
  },
  {
    number: '08',
    title: 'Multi-user roles',
    description:
      'Role-based access for cashiers, managers, and admins with activity logs.',
    span: 'lg:col-span-4',
  },
  {
    number: '09',
    title: 'Reports',
    description:
      'Daily sales, revenue trends, profit margins. Export to CSV or PDF.',
    span: 'lg:col-span-8',
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative p-6 lg:p-8 border border-zinc-800/40 hover:border-zinc-700/60 transition-all duration-300 ${feature.span}`}
      style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
    >
      {/* Amber accent dot */}
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-1.5 h-1.5 bg-amber-500/60 group-hover:bg-amber-400 transition-colors duration-300" />
        <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
          {feature.number}
        </span>
      </div>

      <h3 className="font-heading text-[17px] font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-[15px] text-zinc-500 leading-relaxed">
        {feature.description}
      </p>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          borderRadius: '2px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,149,42,0.04) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header — left-aligned, editorial */}
        <div ref={ref} className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="block w-8 h-px bg-amber-500/60" />
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
              Capabilities
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
          >
            What it does
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[16px] text-zinc-500 leading-relaxed"
          >
            Everything a restaurant or retail shop needs, running entirely on your desktop.
          </motion.p>
        </div>

        {/* Bento grid — unequal sizes, not a boring list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
