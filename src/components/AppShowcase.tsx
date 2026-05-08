'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  BillingMock,
  CategoriesMock,
  MenuMock,
  HistoryMock,
  ReportsMock,
  SettingsMock,
  type MockScreen,
} from '@/components/AppMockup'

const screens: { key: MockScreen; label: string }[] = [
  { key: 'billing', label: 'Billing' },
  { key: 'categories', label: 'Categories' },
  { key: 'menu', label: 'Menu' },
  { key: 'history', label: 'History' },
  { key: 'reports', label: 'Reports' },
  { key: 'settings', label: 'Settings' },
]

const screenComponents: Record<MockScreen, React.ComponentType> = {
  billing: BillingMock,
  categories: CategoriesMock,
  menu: MenuMock,
  history: HistoryMock,
  reports: ReportsMock,
  settings: SettingsMock,
}

const T = {
  accent: '#d4952a',
  bgCard: '#EEE5DA',
  bgHover: 'rgba(38,36,36,0.06)',
  borderSubtle: 'rgba(38,36,36,0.14)',
  bgApp: '#EEE5DA',
  textOnLight: '#262424',
  textMuted: '#6B6B6B',
  btnPrimaryBg: '#262424',
  btnPrimaryText: '#EEE5DA',
}

export default function AppShowcase() {
  const [active, setActive] = useState<MockScreen>('billing')
  const [autoPlay, setAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const cycleNext = useCallback(() => {
    setActive((prev) => {
      const idx = screens.findIndex((s) => s.key === prev)
      return screens[(idx + 1) % screens.length].key
    })
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(cycleNext, 4000)
    return () => clearInterval(timer)
  }, [autoPlay, cycleNext])

  const ActiveComponent = screenComponents[active]

  return (
    <section id="app-showcase" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="block w-8 h-px" style={{ background: T.accent }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: T.textMuted }}>
              See It In Action
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-4"
            style={{ color: T.textOnLight }}
          >
            Every screen, from billing to reports
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[17px] leading-relaxed"
            style={{ color: T.textMuted }}
          >
            Click any tab to explore. Built for speed, designed for clarity.
          </motion.p>
        </div>

        {/* Screen selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-1.5 mb-8 flex-wrap"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {screens.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setActive(s.key)
                setAutoPlay(false)
              }}
              className="px-4 py-2 text-[12px] font-medium transition-all duration-200"
              style={{
                borderRadius: '2px',
                background: active === s.key ? T.btnPrimaryBg : T.bgCard,
                color: active === s.key ? T.btnPrimaryText : T.textMuted,
                border: `1px solid ${active === s.key ? T.accent : T.borderSubtle}`,
              }}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Mockup display */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <ActiveComponent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
