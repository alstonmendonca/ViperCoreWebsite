import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cjkbjnazwewpnzypgber.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function GET() {
  if (!SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      { success: false, message: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const queryUrl = `${SUPABASE_URL}/rest/v1/app_releases?channel=eq.stable&platform=eq.win32&arch=eq.x64&active=eq.true&order=published_at.desc&limit=1&select=id,version,storage_bucket,storage_path,file_name,sha256,release_notes,mandatory,chunk_count,file_size,published_at`

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
    const chunkCount = Number(release.chunk_count || 1)
    const chunkUrls: string[] = []

    for (let i = 0; i < chunkCount; i++) {
      const objectPath = chunkCount > 1
        ? `${release.storage_path}.part${i}`
        : release.storage_path

      const signUrl = `${SUPABASE_URL}/storage/v1/object/sign/${release.storage_bucket}/${objectPath}`

      const signRes = await fetch(signUrl, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn: 3600 }),
      })

      if (!signRes.ok) {
        return NextResponse.json(
          { success: false, message: 'Failed to generate download URL' },
          { status: 502 }
        )
      }

      const signData = await signRes.json()
      chunkUrls.push(`${SUPABASE_URL}/storage/v1${signData.signedURL}`)
    }

    return NextResponse.json({
      success: true,
      version: release.version,
      fileName: release.file_name,
      sha256: release.sha256,
      releaseNotes: release.release_notes,
      mandatory: release.mandatory,
      chunkCount,
      fileSize: release.file_size,
      publishedAt: release.published_at,
      chunkUrls,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}