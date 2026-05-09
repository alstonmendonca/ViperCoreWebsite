'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-mesh relative pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Asymmetric two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          {/* Left: headline block */}
          <div className="lg:col-span-7 relative z-10">
            {/* Eyebrow with amber accent line */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-8 h-px bg-amber-500/60" />
              <span className="font-mono text-[12px] text-zinc-500 uppercase tracking-[0.15em]">
                Desktop POS Software
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold tracking-tight leading-[1.04] text-white mb-6"
            >
              POS software that works
              <span className="text-zinc-400"> — even when</span><br />
              <span className="text-zinc-400">the internet doesn’t.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-md mb-10" style={{ fontStyle: 'italic', fontWeight: 300 }}
            >
              Built for small cafés in Mangalore. One-time payment. No monthly recharge. Runs fully offline after activation.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="/download"
                className="group inline-flex items-center gap-2 h-11 px-6 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-all duration-200" style={{ borderRadius: '2px' }}
              >
                Get ViperCore
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center h-11 px-6 text-[13px] text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-all duration-200" style={{ borderRadius: '2px' }}
              >
                Start 7-Day Trial
              </a>
            </motion.div>
          </div>

          {/* Right: stats block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5 lg:pb-2"
          >
            <div className="border border-zinc-800/60 p-6 lg:p-8" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.5)' }}>
              <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-[0.15em] mb-6">
                At a glance
              </div>
              <div className="space-y-5">
                {[
                  { value: '₹10,000', label: 'One-time payment. No subscriptions, no monthly fees. Ever.' },
                  { value: '100%', label: 'Offline-first. Works without internet after one-time activation.' },
                  { value: 'AES-256', label: 'All data encrypted locally. Nothing ever leaves your machine.' },
                  { value: '9', label: 'Core modules: billing, menu, inventory, tables, reports & more.' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-baseline gap-4">
                    <span className="font-mono text-[15px] text-amber-500/80 tabular-nums w-20 shrink-0">
                      {stat.value}
                    </span>
                    <span className="text-[14px] text-zinc-500 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
