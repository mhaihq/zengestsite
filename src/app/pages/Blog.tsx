'use client';

import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { SEO } from '../components/SEO'
import { Footer } from '../components/Footer'
import { getPosts, CATEGORY_LABELS, ALL_CATEGORIES, type PostCard } from '../../lib/sanityQueries'

const G = { background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const PLACEHOLDERS = [
  { title: 'Come pseudonimizzare i dati clinici prima del processing AI', category: 'GDPR e Privacy' },
  { title: 'SOAP vs DAP vs BIRP: quale formato scegliere per le tue note', category: 'Note e Documentazione' },
  { title: 'Ask ZenGest: come interrogare lo storico di un paziente', category: 'AI Clinica' },
]

function PostCard({ post }: { post: PostCard }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const categoryLabel = post.category ? CATEGORY_LABELS[post.category] : null
  const imageUrl = post.mainImage?.asset?.url

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,18,47,0.05)' }}
    >
      <Link to={`/blog/${post.slug.current}`} className="block overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=600&auto=format`}
            alt={post.mainImage?.alt ?? post.title}
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[3/2] w-full" style={{ background: 'linear-gradient(135deg, #F0F5FF 0%, #e8eef8 100%)' }} />
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1">
        {categoryLabel && (
          <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.07em] uppercase text-[#0D9488] mb-3">
            {categoryLabel}
          </span>
        )}

        <Link to={`/blog/${post.slug.current}`} className="mb-3 block">
          <h3 className="font-['Instrument_Serif'] text-[19px] text-[#00122F] leading-[1.25]">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="font-['DM_Sans'] text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
        )}

        {date && (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <p className="font-['DM_Sans'] text-[11px] text-slate-400">{date}</p>
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
  const categoryLabel = post.category ? CATEGORY_LABELS[post.category] : null
  const imageUrl = post.mainImage?.asset?.url

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl"
      style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 20px rgba(0,18,47,0.07)' }}
    >
      {imageUrl ? (
        <Link to={`/blog/${post.slug.current}`} className="block overflow-hidden">
          <img
            src={`${imageUrl}?w=1400&auto=format`}
            alt={post.mainImage?.alt ?? post.title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            style={{ height: 'clamp(240px, 38vw, 460px)' }}
          />
        </Link>
      ) : (
        <div style={{ height: 'clamp(240px, 38vw, 460px)', background: 'linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 100%)' }} />
      )}

      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-[#00122F] text-white">
            In evidenza
          </span>
          {categoryLabel && (
            <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.07em] uppercase text-[#0D9488]">
              {categoryLabel}
            </span>
          )}
        </div>

        <Link to={`/blog/${post.slug.current}`}>
          <h2 className="font-['Instrument_Serif'] text-[28px] md:text-[36px] lg:text-[42px] text-[#00122F] leading-[1.1] mb-4 max-w-3xl hover:opacity-75 transition-opacity">
            {post.title}
          </h2>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {post.excerpt && (
            <p className="font-['DM_Sans'] text-[14px] text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
              {post.excerpt}
            </p>
          )}
          {date && (
            <p className="font-['DM_Sans'] text-[11px] text-slate-400 shrink-0">{date}</p>
          )}
        </div>
      </div>
    </article>
  )
}

export function Blog() {
  const { category: categoryParam } = useParams<{ category?: string }>()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPosts(categoryParam ? { category: categoryParam } : undefined)
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [categoryParam])

  const [featured, ...rest] = posts

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <SEO
        title="Blog · ZenGest"
        useExactTitle={true}
        description="Articoli su AI clinica, note psicologiche, GDPR e pratica clinica per psicologi italiani."
        path={categoryParam ? `/blog/categoria/${categoryParam}` : '/blog'}
      />

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <p className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-3">
            ZenGest · Blog
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] max-w-lg">
              Articoli, riflessioni{' '}
              <span style={G}>e aggiornamenti.</span>
            </h1>
            <p className="font-['DM_Sans'] text-[14px] text-slate-500 leading-relaxed max-w-xs md:text-right">
              Psicologia, intelligenza artificiale e pratica clinica — per professionisti italiani.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => navigate('/blog')}
            className={`font-['DM_Sans'] text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
              !categoryParam
                ? 'bg-[#00122F] text-white'
                : 'border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-[#00122F]'
            }`}
          >
            Tutti
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => navigate(`/blog/categoria/${cat}`)}
              className={`font-['DM_Sans'] text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                categoryParam === cat
                  ? 'bg-[#00122F] text-white'
                  : 'border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-[#00122F]'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 border-[#3B6FD4] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-24">
            <p className="font-['DM_Sans'] text-slate-400 text-sm">Nessun articolo ancora pubblicato in questa categoria.</p>
          </div>
        )}

        {!loading && featured && <FeaturedPost post={featured} />}

        {!loading && rest.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400">Ultimi articoli</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {rest.map(post => <PostCard key={post._id} post={post} />)}
            </div>
          </>
        )}

        {/* Prossimamente */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400">Prossimamente</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDERS.map(p => (
            <div
              key={p.title}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,18,47,0.04)' }}
            >
              <div className="aspect-[3/2] w-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F0F5FF 0%, #e8eef8 100%)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A7BCF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="p-6">
                <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.07em] uppercase text-[#0D9488] mb-3 block">
                  {p.category}
                </span>
                <p className="font-['Instrument_Serif'] text-[18px] text-slate-400 leading-[1.3]">
                  {p.title}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="font-['DM_Sans'] text-[11px] text-slate-400 font-medium">In arrivo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  )
}
