'use client';

import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { SEO } from '../components/SEO'
import { Footer } from '../components/Footer'
import { getPosts, type PostCard } from '../../lib/sanityQueries'

const G = { background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PLACEHOLDERS = [
  { title: 'Come pseudonimizzare i dati clinici prima del processing AI' },
  { title: 'SOAP vs DAP vs BIRP: quale formato scegliere per le tue note' },
  { title: 'Ask ZenGest: come interrogare lo storico di un paziente' },
]

function PostCard({ post }: { post: PostCard }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <article
      className="group bg-white rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,18,47,0.05)' }}
    >
      <div className="p-6 flex flex-col flex-1">
        <Link to={`/blog/${post.slug.current}`} className="mb-3 block">
          <h3 className="font-['Instrument_Serif'] text-[20px] text-[#00122F] leading-[1.25] group-hover:opacity-75 transition-opacity">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="font-['DM_Sans'] text-[13px] text-slate-500 leading-relaxed line-clamp-3 mb-5">
            {post.excerpt}
          </p>
        )}

        {date && (
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="font-['DM_Sans'] text-[11px] text-slate-400">{date}</p>
            <Link to={`/blog/${post.slug.current}`} className="font-['DM_Sans'] text-[11px] font-semibold text-[#3B6FD4] hover:text-[#00122F] transition-colors">
              Leggi →
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

function FeaturedPost({ post }: { post: PostCard }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <article
      className="group bg-white rounded-2xl mb-8 transition-all duration-300 hover:shadow-xl"
      style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 20px rgba(0,18,47,0.07)' }}
    >
      <div className="p-8 md:p-10">
        <span className="inline-block font-['DM_Sans'] text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-[#00122F] text-white mb-5">
          In evidenza
        </span>

        <Link to={`/blog/${post.slug.current}`}>
          <h2 className="font-['Instrument_Serif'] text-[28px] md:text-[36px] lg:text-[42px] text-[#00122F] leading-[1.1] mb-4 max-w-3xl hover:opacity-75 transition-opacity">
            {post.title}
          </h2>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {post.excerpt && (
            <p className="font-['DM_Sans'] text-[15px] text-slate-500 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 shrink-0">
            {date && <p className="font-['DM_Sans'] text-[11px] text-slate-400">{date}</p>}
            <Link
              to={`/blog/${post.slug.current}`}
              className="font-['DM_Sans'] text-sm font-semibold text-[#3B6FD4] hover:text-[#00122F] transition-colors whitespace-nowrap"
            >
              Leggi l'articolo →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Blog() {
  const [posts, setPosts] = useState<PostCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts().then(setPosts).finally(() => setLoading(false))
  }, [])

  const [featured, ...rest] = posts

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <SEO
        title="Blog · ZenGest"
        useExactTitle={true}
        description="Articoli su AI clinica, note psicologiche, GDPR e pratica clinica per psicologi italiani."
        path="/blog"
      />

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-3">
            ZenGest · Blog
          </p>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] mb-4">
            Articoli, riflessioni{' '}
            <span style={G}>e aggiornamenti.</span>
          </h1>
          <p className="font-['DM_Sans'] text-[15px] text-slate-500 leading-relaxed">
            Psicologia, intelligenza artificiale e pratica clinica — per professionisti italiani.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 border-[#3B6FD4] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-['DM_Sans'] text-slate-400 text-sm">Nessun articolo ancora pubblicato.</p>
          </div>
        )}

        {!loading && featured && <FeaturedPost post={featured} />}

        {!loading && rest.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400">Ultimi articoli</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="flex flex-col gap-4 mb-16">
              {rest.map(post => <PostCard key={post._id} post={post} />)}
            </div>
          </>
        )}

        {/* Prossimamente */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400">Prossimamente</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="flex flex-col gap-4">
          {PLACEHOLDERS.map(p => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <p className="font-['Instrument_Serif'] text-[19px] text-slate-300 leading-[1.3] mb-4">
                {p.title}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="font-['DM_Sans'] text-[11px] text-slate-300 font-medium">In arrivo</span>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  )
}
