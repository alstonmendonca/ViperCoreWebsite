'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className="relative overflow-hidden border border-zinc-800/60 p-10 lg:p-16"
          style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(212,149,42,0.06) 0%, transparent 70%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-amber-500/60" />
              <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                Get started
              </span>
            </div>

            <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              Ready to ditch the monthly bills?
            </h2>
            <p className="text-[16px] text-zinc-500 mb-8 leading-relaxed">
              One purchase. Your machine. No middleman. We’ll get you set up in minutes.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="mailto:alstondmendonca@gmail.com"
                className="group inline-flex items-center gap-2 h-11 px-6 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-all duration-200" style={{ borderRadius: '2px' }}
              >
                Get ViperCore
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:alstondmendonca@gmail.com"
                className="inline-flex items-center h-11 px-6 text-[13px] text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all duration-200" style={{ borderRadius: '2px' }}
              >
                Talk to us
              </a>
            </div>

            {/* Contact details */}
            <div className="pt-6 border-t border-zinc-800/40 space-y-2">
              <p className="text-[14px] text-zinc-400">
                Alston D’Mendonca
              </p>
              <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.1em]">
                Co-Founder &amp; CEO, ViperCore
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-1">
                <a
                  href="mailto:alstondmendonca@gmail.com"
                  className="text-[13px] text-zinc-500 hover:text-white transition-colors duration-150"
                >
                  alstondmendonca@gmail.com
                </a>
                <a
                  href="tel:+919108816244"
                  className="text-[13px] text-zinc-500 hover:text-white transition-colors duration-150"
                >
                  +91 91088 16244
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
