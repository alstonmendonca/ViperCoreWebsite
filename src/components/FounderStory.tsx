'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FounderStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="founder" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div ref={ref}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: header + story */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="block w-8 h-px bg-amber-500/60" />
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                  Our Story
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-6"
              >
                Why We Built ViperCore
              </motion.h2>

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-[16px] text-zinc-400 leading-relaxed"
                >
                  We saw small cafés paying every year for POS systems they didn’t fully use.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-[16px] text-zinc-400 leading-relaxed"
                >
                  We believe businesses should own their software.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-[16px] text-zinc-400 leading-relaxed"
                >
                  We built ViperCore to give local cafés independence from recurring billing.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-[16px] text-zinc-400 leading-relaxed"
                >
                  We are based in Mangalore and provide direct support.
                </motion.p>
              </div>
            </div>

            {/* Right: founder card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="lg:col-span-5 lg:mt-8"
            >
              <div className="border border-zinc-800/60 p-6 lg:p-8" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}>
                <div className="mb-4">
                  <div className="w-12 h-12 bg-zinc-800/60 flex items-center justify-center mb-4" style={{ borderRadius: '2px' }}>
                    <span className="font-heading text-lg font-bold text-amber-500/80">A</span>
                  </div>
                  <p className="text-[14px] text-zinc-300 font-medium">
                    Alston D’Mendonca
                  </p>
                  <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.1em] mt-1">
                    Co-Founder &amp; CEO, ViperCore
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/40 space-y-2">
                  <a
                    href="mailto:alstondmendonca@gmail.com"
                    className="block text-[13px] text-zinc-500 hover:text-white transition-colors duration-150"
                  >
                    alstondmendonca@gmail.com
                  </a>
                  <a
                    href="tel:+919108816244"
                    className="block text-[13px] text-zinc-500 hover:text-white transition-colors duration-150"
                  >
                    +91 91088 16244
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
