'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const rows = [
  { year: 'Year 1', viper: '₹10,000', cloud: '₹10,000' },
  { year: 'Year 2', viper: '₹0', cloud: '₹10,000' },
  { year: 'Year 3', viper: '₹0', cloud: '₹10,000' },
]

export default function Comparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="comparison" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div ref={ref}>
          {/* Section header */}
          <div className="mb-14 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="block w-8 h-px bg-amber-500/60" />
              <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                Cost Comparison
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
            >
              See the Difference in 3 Years
            </motion.h2>
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="border border-zinc-800/60 overflow-hidden" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 border-b border-zinc-800/40">
              <div className="p-4 lg:p-5">
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                  &nbsp;
                </span>
              </div>
              <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                <span className="font-mono text-[11px] text-amber-500/80 uppercase tracking-[0.15em]">
                  ViperCore
                </span>
              </div>
              <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                  Typical Cloud POS
                </span>
              </div>
            </div>

            {/* Table rows */}
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-zinc-800/40">
                <div className="p-4 lg:p-5">
                  <span className="text-[14px] text-zinc-500">
                    {row.year}
                  </span>
                </div>
                <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                  <span className="font-mono text-[14px] text-amber-500/80">
                    {row.viper}
                  </span>
                </div>
                <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                  <span className="font-mono text-[14px] text-zinc-500">
                    {row.cloud}
                  </span>
                </div>
              </div>
            ))}

            {/* Total row */}
            <div className="grid grid-cols-3">
              <div className="p-4 lg:p-5">
                <span className="text-[14px] text-white font-medium">
                  Total
                </span>
              </div>
              <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                <span className="font-mono text-[15px] text-amber-500 font-medium">
                  ₹10,000
                </span>
              </div>
              <div className="p-4 lg:p-5 border-l border-zinc-800/40">
                <span className="font-mono text-[15px] text-zinc-400 line-through">
                  ₹30,000
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom question */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 text-[15px] text-zinc-500 italic"
          >
            Why keep paying every year for software you already bought?
          </motion.p>
        </div>
      </div>
    </section>
  )
}
