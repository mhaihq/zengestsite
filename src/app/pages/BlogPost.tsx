'use client';

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { PortableText } from '@portabletext/react'
import { SEO } from '../components/SEO'
import { Footer } from '../components/Footer'
import { getPostBySlug, type Post } from '../../lib/sanityQueries'

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-['DM_Sans'] text-[16px] text-slate-700 leading-[1.8] mb-6">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] leading-[1.2] mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-['Instrument_Serif'] text-xl md:text-2xl text-[#00122F] leading-[1.25] mt-10 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#3B6FD4] pl-6 my-8">
        <p className="font-['Instrument_Serif'] text-xl text-slate-600 leading-relaxed italic">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="font-['DM_Sans'] text-[16px] text-slate-700 leading-[1.8] mb-6 space-y-2 pl-6 list-disc">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="font-['DM_Sans'] text-[16px] text-slate-700 leading-[1.8] mb-6 space-y-2 pl-6 list-decimal">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#00122F]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} className="text-[#3B6FD4] underline underline-offset-2 hover:text-[#00122F] transition-colors" target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
      const url = value?.asset?.url
      if (!url) return null
      return (
        <figure className="my-10">
          <img
            src={`${url}?w=1000&auto=format`}
            alt={value?.alt ?? ''}
            className="w-full rounded-2xl"
            style={{ border: '1px solid #e2e8f0' }}
          />
          {value?.caption && (
            <figcaption className="font-['DM_Sans'] text-[12px] text-slate-400 text-center mt-3">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPostBySlug(slug)
      .then(p => {
        if (!p) setNotFound(true)
        else setPost(p)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#3B6FD4] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-['DM_Sans'] text-slate-500">Articolo non trovato.</p>
        <Link to="/blog" className="font-['DM_Sans'] text-sm text-[#3B6FD4] hover:underline">Torna al blog</Link>
      </div>
    )
  }

  const date = post.pubblicatoIl
    ? new Date(post.pubblicatoIl).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={post.titoloSeo ?? post.titolo}
        useExactTitle={true}
        description={post.descrizioneSeo ?? post.estratto ?? ''}
        path={`/blog/${post.slug.current}`}
      />

      {/* Header */}
      <div className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-10">
          <h1 className="font-['Instrument_Serif'] text-3xl md:text-4xl lg:text-5xl text-[#00122F] leading-[1.1] mb-4">
            {post.titolo}
          </h1>
          {date && <p className="font-['DM_Sans'] text-[12px] text-slate-400">{date}</p>}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {post.estratto && (
          <p className="font-['Instrument_Serif'] text-xl md:text-2xl text-slate-500 leading-relaxed mb-10 pb-10 border-b border-slate-100">
            {post.estratto}
          </p>
        )}

        {post.corpo && post.corpo.length > 0 && (
          // @ts-expect-error portabletext types
          <PortableText value={post.corpo} components={ptComponents} />
        )}

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 50%, #E8EEF5 100%)' }}>
          <p className="font-['Instrument_Serif'] text-2xl text-[#00122F] mb-2">Prova ZenGest gratis.</p>
          <p className="font-['DM_Sans'] text-sm text-slate-600 mb-6">10 sedute al mese, nessuna carta di credito.</p>
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-11 px-8 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 transition-all shadow-md"
          >
            Inizia gratis
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
