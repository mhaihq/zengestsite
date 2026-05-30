import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'nutut50l',
  dataset: 'production',
  apiVersion: '2026-05-30',
  useCdn: true,
})

export const urlFor = (source: { asset: { _ref: string } }) =>
  `https://cdn.sanity.io/images/nutut50l/production/${source.asset._ref
    .replace('image-', '')
    .replace(/-(\w+)$/, '.$1')}`
