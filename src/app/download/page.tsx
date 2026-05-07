'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Shield, Monitor, Zap, ArrowLeft } from 'lucide-react'

interface ReleaseInfo {
  version: string
  fileName: string
  sha256: string | null
  releaseNotes: string | null
  chunkCount: number
  fileSize: number | null
  publishedAt: string
  chunkUrls: string[]
}

type Stage = 'loading' | 'ready' | 'downloading' | 'done' | 'error'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function DownloadPage() {
  const [stage, setStage] = useState<Stage>('loading')
  const [release, setRelease] = useState<ReleaseInfo | null>(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [downloadedBytes, setDownloadedBytes] = useState(0)
  const [totalBytes, setTotalBytes] = useState(0)
  const [speed, setSpeed] = useState(0)
  const downloadStarted = useRef(false)

  useEffect(() => {
    fetch('/api/latest-release')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setRelease(data)
          setStage('ready')
        } else {
          setError(data.message || 'No release available')
          setStage('error')
        }
      })
      .catch(() => {
        setError('Failed to connect to update server')
        setStage('error')
      })
  }, [])

  const startDownload = useCallback(async () => {
    if (!release || downloadStarted.current) return
    downloadStarted.current = true
    setStage('downloading')
    setTotalBytes(release.fileSize || 0)

    try {
      const blobs: Blob[] = []
      let transferred = 0
      const speedTracker = { bytes: 0, lastTime: Date.now(), speed: 0 }

      for (let i = 0; i < release.chunkUrls.length; i++) {
        const response = await fetch(release.chunkUrls[i])
        if (!response.ok) throw new Error(`Failed to download chunk ${i + 1}`)

        const reader = response.body?.getReader()
        if (!reader) throw new Error('ReadableStream not supported')

        const chunks: Uint8Array[] = []
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          chunks.push(value)
          transferred += value.length
          speedTracker.bytes += value.length
          const now = Date.now()
          const elapsed = now - speedTracker.lastTime
          if (elapsed >= 500) {
            speedTracker.speed = Math.round((speedTracker.bytes / elapsed) * 1000)
            speedTracker.bytes = 0
            speedTracker.lastTime = now
            setSpeed(speedTracker.speed)
          }
          setDownloadedBytes(transferred)
          if (release.fileSize) {
            setProgress(Math.min(100, Math.round((transferred / release.fileSize) * 100)))
          }
        }

        const blob = new Blob(chunks as BlobPart[])
        blobs.push(blob)
      }

      const finalBlob = new Blob(blobs)
      const url = URL.createObjectURL(finalBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = release.fileName || `ViperCore-${release.version}.exe`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setProgress(100)
      setStage('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed')
      setStage('error')
      downloadStarted.current = false
    }
  }, [release])

  useEffect(() => {
    if (stage === 'ready' && release) {
      startDownload()
    }
  }, [stage, release, startDownload])

  return (
    <div className="min-h-screen bg-[#0a0a09] text-white">
      {/* Grain overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }} />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[500px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 30% 30%, rgba(212, 149, 42, 0.06) 0%, transparent 65%)'
      }} />

      <div className="relative max-w-2xl mx-auto px-6 pt-20 pb-24">
        {/* Back link */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to ViperCore
        </motion.a>

        {/* Loading state */}
        {stage === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-block w-6 h-6 border-2 border-zinc-700 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="text-[15px] text-zinc-500">Finding the latest version...</p>
          </motion.div>
        )}

        {/* Downloading state */}
        {(stage === 'downloading' || stage === 'done') && release && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-amber-500/60" />
              <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em]">
                {stage === 'done' ? 'Download complete' : 'Downloading'}
              </span>
            </div>

            <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              {stage === 'done' ? 'Your download is ready' : 'Downloading ViperCore'}
            </h1>
            <p className="text-[16px] text-zinc-500 mb-8">
              Version {release.version}
              {release.fileSize ? ` \u00b7 ${formatBytes(release.fileSize)}` : ''}
            </p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-1.5 bg-zinc-800/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between mt-2 font-mono text-[12px] text-zinc-600">
                <span>{progress}%</span>
                <span>
                  {downloadedBytes > 0 && formatBytes(downloadedBytes)}
                  {totalBytes > 0 && ` / ${formatBytes(totalBytes)}`}
                  {speed > 0 && ` \u00b7 ${formatBytes(speed)}/s`}
                </span>
              </div>
            </div>

            {stage === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 border border-zinc-800/60 mb-10"
                style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}
              >
                <CheckCircle className="w-5 h-5 text-amber-500/70 shrink-0" />
                <div>
                  <p className="text-[14px] text-white">File saved to your Downloads folder</p>
                  <p className="text-[12px] text-zinc-600 font-mono mt-0.5">{release.fileName}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Error state */}
        {stage === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h1 className="font-heading text-3xl font-bold text-white mb-3">Download unavailable</h1>
            <p className="text-[16px] text-zinc-500 mb-6">{error}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 h-11 px-6 text-[13px] font-medium text-zinc-950 bg-white hover:bg-amber-400 transition-all duration-200"
              style={{ borderRadius: '2px' }}
            >
              Go back
            </a>
          </motion.div>
        )}

        {/* What to expect section - always visible after loading */}
        {stage !== 'loading' && stage !== 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 pt-10 border-t border-zinc-800/40"
          >
            <h2 className="font-heading text-xl font-bold text-white mb-6">What to expect</h2>
            <div className="space-y-5">
              {[
                {
                  icon: Monitor,
                  title: 'Run the installer',
                  desc: 'Double-click the downloaded .exe file. The setup wizard will guide you through installation.'
                },
                {
                  icon: Shield,
                  title: 'Activate your license',
                  desc: 'On first launch, enter your activation key. ViperCore runs 100% offline after activation.'
                },
                {
                  icon: Zap,
                  title: 'Start billing',
                  desc: 'Set up your menu, connect a thermal printer, and you are ready to go. No internet required.'
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-zinc-800/60 shrink-0" style={{ borderRadius: '2px', background: 'rgba(19,19,17,0.4)' }}>
                    <item.icon className="w-4 h-4 text-amber-500/60" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-white">{item.title}</p>
                    <p className="text-[13px] text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System requirements */}
        {stage !== 'loading' && stage !== 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-10 pt-8 border-t border-zinc-800/40"
          >
            <h3 className="font-mono text-[11px] text-zinc-600 uppercase tracking-[0.15em] mb-4">System requirements</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-zinc-500">
              <span>Windows 10 / 11</span>
              <span className="text-zinc-800">\u00b7</span>
              <span>64-bit</span>
              <span className="text-zinc-800">\u00b7</span>
              <span>4 GB RAM</span>
              <span className="text-zinc-800">\u00b7</span>
              <span>200 MB disk</span>
            </div>
          </motion.div>
        )}

        {/* Support */}
        {stage !== 'loading' && stage !== 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mt-8"
          >
            <p className="text-[13px] text-zinc-600">
              Need help? Contact us at{' '}
              <a href="mailto:alstondmendonca@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                alstondmendonca@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:+919108816244" className="text-zinc-400 hover:text-white transition-colors">
                +91 91088 16244
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}