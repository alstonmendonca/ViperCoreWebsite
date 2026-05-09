'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What happens if my computer crashes?',
    answer: 'You can restore from your local backup (USB or external drive). We also assist with license transfer to your new system.',
  },
  {
    question: 'Do I need internet to use ViperCore?',
    answer: 'No. After one-time activation, the system runs fully offline.',
  },
  {
    question: 'Can you migrate from my current POS?',
    answer: 'Yes. We handle migration of items, pricing, and GST settings for you.',
  },
  {
    question: 'What hardware do I need?',
    answer: 'Windows PC, 58mm or 80mm thermal printer, barcode scanner (optional).',
  },
  {
    question: 'What if ViperCore shuts down?',
    answer: 'The software runs locally on your system and will continue to work. Your data remains fully accessible.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. We offer a 7-day free trial and free installation.',
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-zinc-800/40" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.3)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
      >
        <span className="text-[15px] text-zinc-300 font-medium">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
          <p className="text-[14px] text-zinc-500 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="py-20 lg:py-28">
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
                FAQ
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3"
            >
              Common Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[16px] text-zinc-500 leading-relaxed"
            >
              Everything you need to know before switching.
            </motion.p>
          </div>

          {/* FAQ items */}
          <div className="max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
