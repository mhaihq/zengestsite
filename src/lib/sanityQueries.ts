import { sanityClient } from './sanity'

export type PostCard = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset?: { url?: string; _ref?: string }; alt?: string }
  category?: string
  publishedAt?: string
}

export type Post = PostCard & {
  body?: unknown[]
  seoTitle?: string
  seoDescription?: string
}

const CARD_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  "mainImage": mainImage { alt, asset-> { url } },
  category,
  publishedAt
`

export async function getPosts(opts?: { category?: string }): Promise<PostCard[]> {
  const filter = opts?.category ? `&& category == $category` : ''
  return sanityClient.fetch(
    `*[_type == "post" ${filter}] | order(publishedAt desc) { ${CARD_FIELDS} }`,
    { category: opts?.category ?? null },
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${CARD_FIELDS},
      body,
      seoTitle,
      seoDescription
    }`,
    { slug },
  )
}

export const CATEGORY_LABELS: Record<string, string> = {
  'ai-clinica': 'AI Clinica',
  'note-documentazione': 'Note e Documentazione',
  'gdpr-privacy': 'GDPR e Privacy',
  'psicologia-pratica': 'Psicologia e Pratica',
  'zengest-updates': 'ZenGest Updates',
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS)
