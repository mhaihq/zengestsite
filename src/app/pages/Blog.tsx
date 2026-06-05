'use client';

import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { SEO } from '../components/SEO'
import { Footer } from '../components/Footer'
import { getPosts, type PostCard } from '../../lib/sanityQueries'

const G = { background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

function PostCard({ post }: { post: PostCard }) {
  const date = post.pubblicatoIl
    ? new Date(post.pubblicatoIl).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <article className="group border-b border-slate-100 py-7 last:border-0">
      <Link to={`/blog/${post.slug.current}`} className="block">
        <h3 className="font-['Instrument_Serif'] text-[21px] text-[#00122F] leading-[1.3] mb-2 group-hover:opacity-70 transition-opacity">
          {post.titolo}
        </h3>
      </Link>
      {post.estratto && (
        <p className="font-['DM_Sans'] text-[14px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
          {post.estratto}
        </p>
      )}
      <div className="flex items-center justify-between">
        {date && <p className="font-['DM_Sans'] text-[12px] text-slate-400">{date}</p>}
        <Link to={`/blog/${post.slug.current}`} className="font-['DM_Sans'] text-[12px] font-semibold text-[#3B6FD4] hover:text-[#00122F] transition-colors ml-auto">
          Leggi →
        </Link>
      </div>
    </article>
  )
}

function FeaturedPost({ post }: { post: PostCard }) {
  const date = post.pubblicatoIl
    ? new Date(post.pubblicatoIl).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <article className="mb-12 pb-12 border-b border-slate-200">
      <span className="inline-block font-['DM_Sans'] text-[11px] font-semibold tracking-[0.08em] uppercase text-[#0D9488] mb-4">
        In evidenza
      </span>
      <Link to={`/blog/${post.slug.current}`} className="block mb-3 group">
        <h2 className="font-['Instrument_Serif'] text-[32px] md:text-[40px] text-[#00122F] leading-[1.1] group-hover:opacity-70 transition-opacity">
          {post.titolo}
        </h2>
      </Link>
      {post.estratto && (
        <p className="font-['DM_Sans'] text-[15px] text-slate-500 leading-relaxed mb-5 max-w-2xl">
          {post.estratto}
        </p>
      )}
      <div className="flex items-center gap-5">
        <Link
          to={`/blog/${post.slug.current}`}
          className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] hover:text-[#3B6FD4] transition-colors"
        >
          Leggi l'articolo →
        </Link>
        {date && <p className="font-['DM_Sans'] text-[12px] text-slate-400">{date}</p>}
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
    <div className="bg-white min-h-screen">
      <SEO
        title="Blog · ZenGest"
        useExactTitle={true}
        description="Articoli su AI clinica, note psicologiche, GDPR e pratica clinica per psicologi italiani."
        path="/blog"
      />

      {/* Header */}
      <div className="border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6 py-14 md:py-20">
          <p className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-4">
            ZenGest · Blog
          </p>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] mb-3">
            Articoli, riflessioni{' '}
            <span style={G}>e aggiornamenti.</span>
          </h1>
          <p className="font-['DM_Sans'] text-[15px] text-slate-500 leading-relaxed">
            Psicologia, AI e pratica clinica — per professionisti italiani.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-5 h-5 rounded-full border-2 border-[#3B6FD4] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="font-['DM_Sans'] text-slate-400 text-sm py-16 text-center">
            Nessun articolo ancora pubblicato.
          </p>
        )}

        {!loading && featured && <FeaturedPost post={featured} />}

        {!loading && rest.length > 0 && (
          <div>
            {rest.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}
