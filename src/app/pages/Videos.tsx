'use client';

import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Play, X, Clock } from 'lucide-react'
import { SEO } from '../components/SEO'
import { Footer } from '../components/Footer'

const G = { background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

/* ──────────────────────────────────────────────────────────────────────────
   VIDEO LIST — edit this array to add / change videos.

   Each entry:
     - id:          unique string (used as React key)
     - title:       video title
     - description: one-line summary shown under the title
     - duration:    e.g. "2:30" (optional, shown as a badge)
     - category:    groups videos into sections (see CATEGORIES below for order)
     - url:         a YouTube, Vimeo, or direct .mp4 URL — playback is auto-detected
     - thumbnail:   optional image URL. If omitted, YouTube thumbnails are
                    auto-generated; otherwise a branded placeholder is shown.

   Paste real URLs in `url`. Examples of accepted formats:
     YouTube:  https://www.youtube.com/watch?v=XXXX   |  https://youtu.be/XXXX
     Vimeo:    https://vimeo.com/123456789
     MP4:      https://cdn.example.com/clip.mp4
   ────────────────────────────────────────────────────────────────────────── */

type Video = {
  id: string
  title: string
  description: string
  duration?: string
  category: string
  url: string
  thumbnail?: string
}

// Section order + labels. Any video whose `category` matches a key here is
// grouped under that label, in this order. Unknown categories appear last.
const CATEGORIES: { key: string; label: string }[] = [
  { key: 'inizia', label: 'Inizia da qui' },
  { key: 'sessioni', label: 'Sessioni cliniche' },
  { key: 'ai', label: 'Assistente AI' },
]

const VIDEOS: Video[] = [
  // ── Inizia da qui ──────────────────────────────────────────────────────
  {
    id: 'profilo-impostazioni',
    title: 'Profilo e impostazioni',
    description: 'Configura il tuo profilo e personalizza le impostazioni del tuo spazio.',
    category: 'inizia',
    url: 'https://vimeo.com/1198870419',
  },
  {
    id: 'creare-paziente',
    title: 'Creare un paziente',
    description: 'Aggiungi un nuovo paziente e imposta la sua anagrafica in pochi passaggi.',
    category: 'inizia',
    url: 'https://vimeo.com/1198870477?share=copy&fl=sv&fe=ci',
  },
  {
    id: 'caricare-file',
    title: 'Caricare file e dati',
    description: 'Importa documenti e dati clinici nella cartella del paziente.',
    category: 'inizia',
    url: 'https://vimeo.com/1198870445',
  },
  // ── Sessioni cliniche ──────────────────────────────────────────────────
  {
    id: 'iniziare-sessione',
    title: 'Iniziare una sessione',
    description: 'Avvia una seduta e registra le note in tempo reale.',
    category: 'sessioni',
    url: 'https://vimeo.com/1198870457',
  },
  {
    id: 'modulo-consenso',
    title: 'Modulo di consenso',
    description: 'Genera e gestisci il consenso informato per i tuoi pazienti.',
    category: 'sessioni',
    url: 'https://vimeo.com/1198870475',
  },
  {
    id: 'terapia-coppia',
    title: 'Terapia di coppia',
    description: 'Gestisci sedute e cartelle per la terapia di coppia.',
    category: 'sessioni',
    url: 'https://vimeo.com/1198870421?fl=ip&fe=ec',
  },
  // ── Assistente AI ──────────────────────────────────────────────────────
  {
    id: 'agenti-clinici',
    title: 'Agenti clinici',
    description: "Scopri come gli agenti clinici ti supportano nel lavoro quotidiano.",
    category: 'ai',
    url: 'https://vimeo.com/1198870440',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   Playback helpers — turn a raw URL into an embeddable player source.
   ────────────────────────────────────────────────────────────────────────── */

type Embed =
  | { kind: 'youtube'; id: string }
  | { kind: 'vimeo'; id: string; hash?: string; query?: string }
  | { kind: 'file'; src: string }
  | { kind: 'unknown'; src: string }

function parseVideoUrl(url: string): Embed {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return { kind: 'youtube', id: yt[1] }

  // Vimeo: id, optional privacy hash in the path (/123/abcdef), and any query
  // params (e.g. ?fl=ip&fe=ec or ?h=hash) — all needed to authorise embedding.
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\w-]+))?(?:\?(.*))?$/)
  if (vimeo) return { kind: 'vimeo', id: vimeo[1], hash: vimeo[2] || undefined, query: vimeo[3] || undefined }

  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return { kind: 'file', src: url }

  return { kind: 'unknown', src: url }
}

// Build the player.vimeo.com embed src, preserving privacy hash and any
// original query params, and ensuring autoplay is on.
function vimeoEmbedSrc(embed: { id: string; hash?: string; query?: string }): string {
  const params = new URLSearchParams(embed.query)
  if (embed.hash && !params.has('h')) params.set('h', embed.hash)
  params.set('autoplay', '1')
  return `https://player.vimeo.com/video/${embed.id}?${params.toString()}`
}

// Resolve a thumbnail synchronously when possible (static override or YouTube).
// Vimeo thumbnails are fetched at runtime via oEmbed — see useVideoThumbnail.
function staticThumbnailFor(video: Video): string | null {
  if (video.thumbnail) return video.thumbnail
  const embed = parseVideoUrl(video.url)
  if (embed.kind === 'youtube') return `https://img.youtube.com/vi/${embed.id}/hqdefault.jpg`
  return null
}

// Cache Vimeo oEmbed lookups so we hit the network once per video, even across
// re-renders or repeated cards.
const vimeoThumbCache = new Map<string, string>()

function useVideoThumbnail(video: Video): string | null {
  const initial = staticThumbnailFor(video)
  const [thumb, setThumb] = useState<string | null>(
    initial ?? vimeoThumbCache.get(video.url) ?? null,
  )

  useEffect(() => {
    if (initial) return // static or YouTube — nothing to fetch
    const cached = vimeoThumbCache.get(video.url)
    if (cached) { setThumb(cached); return }

    const embed = parseVideoUrl(video.url)
    if (embed.kind !== 'vimeo') return

    let cancelled = false
    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(video.url)}&width=640`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { thumbnail_url?: string }) => {
        if (cancelled || !data.thumbnail_url) return
        vimeoThumbCache.set(video.url, data.thumbnail_url)
        setThumb(data.thumbnail_url)
      })
      .catch(() => { /* fall back to branded placeholder */ })

    return () => { cancelled = true }
  }, [video.url, initial])

  return thumb
}

/* ──────────────────────────────────────────────────────────────────────────
   UI
   ────────────────────────────────────────────────────────────────────────── */

// Greedy word-wrap into at most `maxLines` lines of ~`maxChars` characters.
// The last line gets an ellipsis if the title doesn't fully fit.
function wrapTitle(title: string, maxChars = 18, maxLines = 3): string[] {
  const words = title.trim().split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
      if (lines.length === maxLines - 1) break
    }
  }
  if (lines.length < maxLines && current) lines.push(current)

  // If words remain beyond maxLines, mark truncation on the last line.
  const consumed = lines.join(' ').split(/\s+/).length
  if (consumed < words.length) {
    let last = lines[maxLines - 1] ?? ''
    while (last.length > maxChars - 1 && last.includes(' ')) last = last.slice(0, last.lastIndexOf(' '))
    lines[maxLines - 1] = `${last}…`
  }
  return lines
}

// Branded SVG placeholder shown when no real thumbnail is available.
// Renders the video title inside the artwork, wrapped over up to three lines.
function PlaceholderThumb({ title }: { title: string }) {
  const lines = wrapTitle(title)
  const lineHeight = 16 // in the 100×56.25 viewBox
  const startY = 30 - ((lines.length - 1) * lineHeight) / 2 // vertically centred block

  return (
    <svg
      viewBox="0 0 100 56.25"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="zg-thumb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b1f44" />
          <stop offset="100%" stopColor="#3B6FD4" />
        </linearGradient>
      </defs>
      <rect width="100" height="56.25" fill="url(#zg-thumb)" />
      {/* subtle decorative arcs */}
      <circle cx="92" cy="8" r="22" fill="#ffffff" opacity="0.05" />
      <circle cx="10" cy="52" r="16" fill="#ffffff" opacity="0.04" />

      {/* eyebrow */}
      <text
        x="8"
        y="11"
        fill="#ffffff"
        opacity="0.55"
        fontSize="3.4"
        letterSpacing="0.6"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="600"
        style={{ textTransform: 'uppercase' } as React.CSSProperties}
      >
        ZenGest · Video
      </text>

      {/* title, up to 3 lines */}
      <text
        x="8"
        y={startY}
        fill="#ffffff"
        fontSize="8.5"
        fontFamily="'Instrument Serif', Georgia, serif"
      >
        {lines.map((line, i) => (
          <tspan key={i} x="8" dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

function VideoThumb({ video, onPlay }: { video: Video; onPlay: () => void }) {
  const thumb = useVideoThumbnail(video)

  return (
    <button
      onClick={onPlay}
      className="group text-left flex flex-col focus:outline-none"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/70">
        {thumb ? (
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderThumb title={video.title} />
        )}

        {/* dim + play overlay */}
        <div className="absolute inset-0 bg-[#00122F]/0 group-hover:bg-[#00122F]/25 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 translate-x-[1px] fill-[#00122F] text-[#00122F]" />
          </span>
        </div>

        {video.duration && (
          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-[#00122F]/80 px-2 py-0.5 font-['DM_Sans'] text-[11px] font-medium text-white backdrop-blur">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
        )}
      </div>

      <h3 className="font-['Instrument_Serif'] text-[19px] text-[#00122F] leading-[1.25] mt-4 mb-1 group-hover:opacity-70 transition-opacity">
        {video.title}
      </h3>
      <p className="font-['DM_Sans'] text-[13.5px] text-slate-500 leading-relaxed line-clamp-2">
        {video.description}
      </p>
    </button>
  )
}

function PlayerModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  const embed = video ? parseVideoUrl(video.url) : null

  return (
    <Dialog.Root open={!!video} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] bg-[#00122F]/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[1001] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{video?.title ?? 'Video'}</Dialog.Title>

          <Dialog.Close
            className="absolute -top-11 right-0 flex items-center gap-1.5 font-['DM_Sans'] text-[13px] text-white/80 hover:text-white transition-colors"
            aria-label="Chiudi"
          >
            Chiudi
            <X className="h-4 w-4" />
          </Dialog.Close>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
            {embed?.kind === 'youtube' && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${embed.id}?autoplay=1&rel=0`}
                title={video?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {embed?.kind === 'vimeo' && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={vimeoEmbedSrc(embed)}
                title={video?.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
            {embed?.kind === 'file' && (
              <video className="absolute inset-0 h-full w-full" src={embed.src} controls autoPlay />
            )}
            {embed?.kind === 'unknown' && (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <a
                  href={embed.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['DM_Sans'] text-sm text-white/80 hover:text-white underline"
                >
                  Apri il video →
                </a>
              </div>
            )}
          </div>

          {video && (
            <div className="mt-4 px-1">
              <h2 className="font-['Instrument_Serif'] text-[22px] text-white leading-tight">{video.title}</h2>
              <p className="font-['DM_Sans'] text-[13.5px] text-white/70 mt-1">{video.description}</p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Videos() {
  const [active, setActive] = useState<Video | null>(null)

  // group videos by category, preserving CATEGORIES order, unknowns last
  const known = CATEGORIES
    .map(c => ({ ...c, items: VIDEOS.filter(v => v.category === c.key) }))
    .filter(c => c.items.length > 0)
  const knownKeys = new Set(CATEGORIES.map(c => c.key))
  const otherItems = VIDEOS.filter(v => !knownKeys.has(v.category))
  const sections = otherItems.length > 0
    ? [...known, { key: '_altro', label: 'Altro', items: otherItems }]
    : known

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Video guida · ZenGest"
        useExactTitle={true}
        description="Tutorial e video guida per usare ZenGest: dai primi passi alle note cliniche e all'assistente AI."
        path="/video"
      />

      {/* Header */}
      <div className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
          <p className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-4">
            ZenGest · Video guida
          </p>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] mb-3">
            Impara a usare ZenGest,{' '}
            <span style={G}>passo dopo passo.</span>
          </h1>
          <p className="font-['DM_Sans'] text-[15px] text-slate-500 leading-relaxed max-w-xl">
            Tutorial brevi e flussi reali. Tutto quello che ti serve per iniziare con chiarezza.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {sections.length === 0 && (
          <p className="font-['DM_Sans'] text-slate-400 text-sm py-16 text-center">
            Nessun video ancora disponibile.
          </p>
        )}

        {sections.map((section, i) => (
          <section key={section.key} className={i === 0 ? '' : 'mt-16'}>
            <h2 className="font-['DM_Sans'] text-[12px] font-semibold tracking-[0.08em] uppercase text-[#0D9488] mb-6">
              {section.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
              {section.items.map(video => (
                <VideoThumb key={video.id} video={video} onPlay={() => setActive(video)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <PlayerModal video={active} onClose={() => setActive(null)} />

      <Footer />
    </div>
  )
}
