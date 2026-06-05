import { sanityClient } from './sanity'

export type PostCard = {
  _id: string
  titolo: string
  slug: { current: string }
  estratto?: string
  category?: string
  pubblicatoIl?: string
}

export type Post = PostCard & {
  corpo?: unknown[]
  titoloSeo?: string
  descrizioneSeo?: string
}

const CARD_FIELDS = `
  _id,
  titolo,
  slug,
  estratto,
  category,
  pubblicatoIl
`

export async function getPosts(): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(titolo) && defined(slug)] | order(pubblicatoIl desc) { ${CARD_FIELDS} }`,
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(titolo) && slug.current == $slug][0] {
      ${CARD_FIELDS},
      corpo,
      titoloSeo,
      descrizioneSeo
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
