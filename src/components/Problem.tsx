'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X } from 'lucide-react'

const painPoints = [
  '₹10,000 every year for billing software',
  'Billing stops when internet goes down',
  'Paying for features you never use',
  'No local support when something breaks',
  'Data stored on external servers',
]

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="problem" className="py-20 lg:py-28">
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
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.15em]">
                The Problem
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
            >
              Tired of Paying Every Year for Your POS?
            </motion.h2>
          </div>

          {/* Pain points grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {painPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="flex items-center gap-4 p-4 border border-zinc-800/40" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
                  >
                    <X className="w-4 h-4 text-red-500/60 shrink-0" />
                    <span className="text-[15px] text-zinc-400">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-5 lg:mt-4"
            >
              <div className="border border-zinc-800/60 p-6 lg:p-8" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}>
                <p className="text-[16px] text-zinc-300 leading-relaxed mb-4">
                  Most small cafés in Mangalore don’t need a cloud-heavy POS system.
                </p>
                <p className="text-[16px] text-zinc-300 leading-relaxed">
                  They need fast billing. GST invoices. Table management. <span className="text-white font-medium">That’s it.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
