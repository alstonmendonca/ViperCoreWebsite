'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'

const steps = [
  'We migrate your item list and prices',
  'GST configuration handled for you',
  'Inventory setup included',
  'Full installation support',
  'Setup completed in under 1 hour',
]

export default function Migration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="migration" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div ref={ref}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: header */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="block w-8 h-px bg-amber-500/60" />
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.15em]">
                  Migration
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
              >
                Switching is Easy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-[16px] text-zinc-500 leading-relaxed"
              >
                We handle everything.
              </motion.p>
            </div>

            {/* Right: checklist */}
            <div className="lg:col-span-7">
              <div className="border border-zinc-800/60 p-6 lg:p-8" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-4"
                    >
                      <Check className="w-4 h-4 text-amber-500/60 mt-0.5 shrink-0" />
                      <span className="text-[15px] text-zinc-400 leading-relaxed">
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
