import type { Metadata } from 'next'
import { Syne, Crimson_Pro, DM_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vipercore.in'),
  title: 'ViperCore POS \u2014 Works Even When the Internet Doesn\u2019t',
  description:
    'POS software built for small cafes in Mangalore. One-time payment, no monthly recharge. Runs fully offline after activation. Rs. 10,000 one-time.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${crimsonPro.variable} ${dmMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
