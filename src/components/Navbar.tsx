'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0a0a09]/85 backdrop-blur-md border-b border-zinc-800/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/favicon.ico"
              alt="ViperCore logo"
              width={22}
              height={22}
              className="rounded-sm"
            />
            <span className="font-heading font-semibold text-white text-[15px] tracking-tight">
              ViperCore
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-mono text-[12px] transition-colors duration-150 uppercase tracking-[0.1em] ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="mailto:alstondmendonca@gmail.com"
              className="inline-flex items-center h-8 px-4 text-[12px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-colors duration-200" style={{ borderRadius: '2px' }}
            >
              Contact
            </a>
          </div>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 -mr-2 text-zinc-400">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] bg-[#0a0a09] border-zinc-800/40">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white text-[15px] font-heading font-semibold">
                  <img
                    src="/favicon.ico"
                    alt="ViperCore logo"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  ViperCore
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 font-mono text-[13px] text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Separator className="my-4 bg-zinc-800/40" />
              <a
                href="mailto:alstondmendonca@gmail.com"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-colors" style={{ borderRadius: '2px' }}
              >
                Contact
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
