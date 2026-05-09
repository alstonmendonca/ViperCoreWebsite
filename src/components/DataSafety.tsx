'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HardDrive, Shield, Usb, RefreshCw, CloudOff } from 'lucide-react'

const points = [
  {
    icon: HardDrive,
    title: 'All data stored locally on your machine',
  },
  {
    icon: Shield,
    title: 'Encrypted for safety',
  },
  {
    icon: Usb,
    title: 'Backup to USB anytime',
  },
  {
    icon: RefreshCw,
    title: 'License transferable if PC changes',
  },
  {
    icon: CloudOff,
    title: 'No dependency on third-party servers',
  },
]

export default function DataSafety() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="data-safety" className="py-20 lg:py-28">
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
                Data Safety
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
            >
              Your Data Stays With You
            </motion.h2>
          </div>

          {/* Points grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className="group relative p-6 lg:p-8 border border-zinc-800/40 hover:border-zinc-700/60 transition-all duration-300 lg:col-span-4 last:lg:col-start-5"
                style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <point.icon className="w-4 h-4 text-amber-500/60" />
                </div>
                <p className="text-[15px] text-zinc-400 leading-relaxed">
                  {point.title}
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
            ))}
          </div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-10 pt-8 border-t border-zinc-800/40 max-w-xl"
          >
            <p className="text-[15px] text-zinc-400 leading-relaxed italic">
              Even if ViperCore stops operating, your software continues to work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
