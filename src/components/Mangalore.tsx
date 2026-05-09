'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wifi, MapPin, ArrowRightLeft, Phone, Minimize2 } from 'lucide-react'

const points = [
  {
    icon: Wifi,
    title: 'Works during internet outages',
    description: 'Your billing never stops, even when the network does.',
  },
  {
    icon: MapPin,
    title: 'On-site installation available',
    description: 'We come to your café and set everything up for you.',
  },
  {
    icon: ArrowRightLeft,
    title: 'We handle migration from existing POS',
    description: 'Switch from your current system without losing data.',
  },
  {
    icon: Phone,
    title: 'Direct phone support — no call centers',
    description: 'Talk to us directly when you need help.',
  },
  {
    icon: Minimize2,
    title: 'Built for simplicity, not complexity',
    description: 'No bloated features you’ll never touch.',
  },
]

export default function Mangalore() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="mangalore" className="py-20 lg:py-28">
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
                Local Advantage
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
            >
              Designed for Small Cafés in Mangalore
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[16px] text-zinc-500 leading-relaxed"
            >
              We’re not a distant SaaS company. We’re right here.
            </motion.p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className={`group relative p-6 lg:p-8 border border-zinc-800/40 hover:border-zinc-700/60 transition-all duration-300 ${
                  i < 3 ? 'lg:col-span-4' : 'lg:col-span-6'
                }`}
                style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <point.icon className="w-4 h-4 text-amber-500/60" />
                </div>
                <h3 className="font-heading text-[17px] font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors duration-300">
                  {point.title}
                </h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed">
                  {point.description}
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
        </div>
      </div>
    </section>
  )
}
