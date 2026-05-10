'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const features = [
  {
    number: '01',
    title: 'Quick Bill Creation',
    description: 'Fast, keyboard-friendly billing with instant token generation.',
    span: 'lg:col-span-4',
  },
  {
    number: '02',
    title: 'Table Management',
    description: 'Assign bills to tables, visual table selection with occupied/available status.',
    span: 'lg:col-span-4',
  },
  {
    number: '03',
    title: 'Multiple Order Types',
    description: 'Dine-in, takeaway, and delivery support.',
    span: 'lg:col-span-4',
  },
  {
    number: '04',
    title: 'Hold & Resume Bills',
    description: 'Park bills mid-order and pick them up later with draft auto-save.',
    span: 'lg:col-span-3',
  },
  {
    number: '05',
    title: 'Discounts',
    description: 'Apply per-order discounts, with dedicated tracking for discounted orders.',
    span: 'lg:col-span-5',
  },
  {
    number: '06',
    title: 'SGST & CGST Tax',
    description: 'Automatic dual tax calculation on every bill.',
    span: 'lg:col-span-4',
  },
  {
    number: '07',
    title: 'KOT Printing',
    description: 'Kitchen Order Ticket printing for kitchen communication.',
    span: 'lg:col-span-4',
  },
  {
    number: '08',
    title: 'Menu Item Management',
    description: 'Add, edit, and delete food items with full pricing control.',
    span: 'lg:col-span-3',
  },
  {
    number: '09',
    title: 'Category Organisation',
    description: 'Group items into categories for easy browsing and reporting.',
    span: 'lg:col-span-5',
  },
  {
    number: '10',
    title: 'Per-Item Tax Rates',
    description: 'Assign individual SGST/CGST rates per menu item.',
    span: 'lg:col-span-4',
  },
  {
    number: '11',
    title: 'Veg / Non-Veg Tags',
    description: 'Mark items as vegetarian or non-vegetarian.',
    span: 'lg:col-span-4',
  },
  {
    number: '12',
    title: 'Visual Receipt Editor',
    description: 'Drag-and-style receipt designer with live preview.',
    span: 'lg:col-span-4',
  },
  {
    number: '13',
    title: 'Custom Receipt Layout',
    description: 'Control every line: title, subtitle, contact, table, cashier, tax lines, footer.',
    span: 'lg:col-span-5',
  },
  {
    number: '14',
    title: 'Receipt Display Toggles',
    description: 'Show/hide table, cashier, tax breakdowns, and item numbers on printed bills.',
    span: 'lg:col-span-4',
  },
  {
    number: '15',
    title: 'Customisable Templates',
    description: 'Edit alignment, bold, underline, font size, and divider characters per line.',
    span: 'lg:col-span-3',
  },
  {
    number: '16',
    title: 'KOT Template Editor',
    description: 'Separate kitchen order ticket template with its own layout.',
    span: 'lg:col-span-4',
  },
  {
    number: '17',
    title: 'Thermal Printer Support',
    description: 'Configurable printer setup for receipt and KOT printing.',
    span: 'lg:col-span-4',
  },
  {
    number: '18',
    title: 'Auto-Print',
    description: 'Automatically print customer bills and/or KOTs after saving an order.',
    span: 'lg:col-span-4',
  },
  {
    number: '19',
    title: "Today's Orders",
    description: 'Quick view of all orders placed today.',
    span: 'lg:col-span-3',
  },
  {
    number: '20',
    title: 'Order History',
    description: 'Browse past orders by date range with date filtering.',
    span: 'lg:col-span-5',
  },
  {
    number: '21',
    title: 'Search Order',
    description: 'Find any order by bill number.',
    span: 'lg:col-span-4',
  },
  {
    number: '22',
    title: 'Discounted Orders View',
    description: 'Dedicated list of all orders where discounts were applied.',
    span: 'lg:col-span-4',
  },
  {
    number: '23',
    title: 'Deleted Orders Log',
    description: 'Track and review deleted orders for accountability.',
    span: 'lg:col-span-4',
  },
  {
    number: '24',
    title: 'Day End Summary',
    description: 'End-of-day revenue and order totals at a glance.',
    span: 'lg:col-span-4',
  },
  {
    number: '25',
    title: 'Sales Overview',
    description: 'Revenue trends and order volume over any date range.',
    span: 'lg:col-span-5',
  },
  {
    number: '26',
    title: 'Category Sales',
    description: 'Breakdown of sales by menu category.',
    span: 'lg:col-span-3',
  },
  {
    number: '27',
    title: 'Top Selling Items',
    description: 'See your most popular dishes.',
    span: 'lg:col-span-4',
  },
  {
    number: '28',
    title: 'Top Selling Categories',
    description: 'Identify which category drives the most revenue.',
    span: 'lg:col-span-4',
  },
  {
    number: '29',
    title: 'Item Summary',
    description: 'Detailed per-item sales data.',
    span: 'lg:col-span-4',
  },
  {
    number: '30',
    title: 'Employee Analysis',
    description: 'Track billing activity by employee/staff member.',
    span: 'lg:col-span-5',
  },
  {
    number: '31',
    title: 'Best In Category',
    description: 'The top performer within each category.',
    span: 'lg:col-span-4',
  },
  {
    number: '32',
    title: 'Tax Report',
    description: 'Itemised tax breakdown (SGST/CGST) for filing and compliance.',
    span: 'lg:col-span-3',
  },
  {
    number: '33',
    title: 'Visual Charts',
    description: 'Bar and pie charts for instant data comprehension.',
    span: 'lg:col-span-4',
  },
  {
    number: '34',
    title: 'Excel Export',
    description: 'Export any report to Excel (.xlsx) for external analysis.',
    span: 'lg:col-span-4',
  },
  {
    number: '35',
    title: 'Sortable Tables',
    description: 'Click any column header to sort report data.',
    span: 'lg:col-span-4',
  },
  {
    number: '36',
    title: 'Profile & Password',
    description: 'Secure login with password management.',
    span: 'lg:col-span-4',
  },
  {
    number: '37',
    title: 'Feature Toggles',
    description: 'Enable or disable features like hold billing, table selection, auto-print, and more.',
    span: 'lg:col-span-5',
  },
  {
    number: '38',
    title: 'Tax Configuration',
    description: 'Set default SGST/CGST labels and rates.',
    span: 'lg:col-span-3',
  },
  {
    number: '39',
    title: 'Business Info',
    description: 'Store your restaurant name, location, and contact details.',
    span: 'lg:col-span-4',
  },
  {
    number: '40',
    title: 'Theme Customisation',
    description: 'Choose from multiple colour presets — Cream + Charcoal, Navy + Sunburst, Forest + Cream.',
    span: 'lg:col-span-4',
  },
  {
    number: '41',
    title: 'App Updates',
    description: 'Built-in update checker and install flow.',
    span: 'lg:col-span-4',
  },
  {
    number: '42',
    title: 'Database Backup',
    description: 'One-click backup of all your data.',
    span: 'lg:col-span-4',
  },
  {
    number: '43',
    title: 'Database Restore',
    description: 'Restore from a previous backup when needed.',
    span: 'lg:col-span-5',
  },
  {
    number: '44',
    title: 'Offline-First',
    description: 'Runs locally on your machine with no internet dependency.',
    span: 'lg:col-span-3',
  },
  {
    number: '45',
    title: 'User Authentication',
    description: 'Login screen to keep your data secure.',
    span: 'lg:col-span-4',
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
      transition={{ duration: 0.5, delay: index * 0.02 }}
      className={`group relative p-6 lg:p-8 border border-zinc-800/40 hover:border-zinc-700/60 transition-all duration-300 ${feature.span}`}
      style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-1.5 h-1.5 bg-amber-500/60 group-hover:bg-amber-400 transition-colors duration-300" />
        <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.15em]">
          {feature.number}
        </span>
      </div>

      <h3 className="font-heading text-[17px] font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-[15px] text-zinc-500 leading-relaxed">
        {feature.description}
      </p>

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

export default function AllFeaturesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 lg:py-28 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 font-mono text-[12px] text-zinc-500 hover:text-amber-400 transition-colors duration-200 uppercase tracking-[0.1em]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        {/* Page header */}
        <div ref={ref} className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="block w-8 h-px bg-amber-500/60" />
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.15em]">
              Every Single Feature
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3"
          >
            Everything ViperCore can do
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[16px] text-zinc-500 leading-relaxed"
          >
            All 45 features. No omissions. Running entirely on your desktop.
          </motion.p>
        </div>

        {/* Full feature grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}