import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cjkbjnazwewpnzypgber.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.viper-core.com'

export async function GET() {
  if (!SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      { success: false, message: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const queryUrl = `${SUPABASE_URL}/rest/v1/app_releases?channel=eq.stable&platform=eq.win32&arch=eq.x64&active=eq.true&order=published_at.desc&limit=1&select=id,version,file_name,sha256,release_notes,mandatory,file_size,published_at,download_url`

    const res = await fetch(queryUrl, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to fetch release info' },
        { status: 502 }
      )
    }

    const releases = await res.json()

    if (!releases || releases.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No release available' },
        { status: 404 }
      )
    }

    const release = releases[0]

    // Build the download URL through our proxy
    const downloadUrl = release.download_url || `${SITE_URL}/api/download/releases/${release.file_name}`

    return NextResponse.json({
      success: true,
      version: release.version,
      fileName: release.file_name,
      sha256: release.sha256,
      releaseNotes: release.release_notes,
      mandatory: release.mandatory,
      fileSize: release.file_size,
      publishedAt: release.published_at,
      downloadUrl,
      chunkCount: 1,
      chunkUrls: [downloadUrl],
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}

