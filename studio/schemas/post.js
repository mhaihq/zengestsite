import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Articolo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Estratto',
      type: 'text',
      rows: 3,
      description: 'Breve descrizione per anteprima e SEO (max 160 caratteri)',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'mainImage',
      title: 'Immagine copertina',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'AI Clinica', value: 'ai-clinica' },
          { title: 'Note e Documentazione', value: 'note-documentazione' },
          { title: 'GDPR e Privacy', value: 'gdpr-privacy' },
          { title: 'Psicologia e Pratica', value: 'psicologia-pratica' },
          { title: 'ZenGest Updates', value: 'zengest-updates' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Contenuto',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Didascalia', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titolo SEO',
      type: 'string',
      description: 'Se diverso dal titolo principale (max 60 caratteri)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'mainImage' },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media }
    },
  },
  orderings: [
    {
      title: 'Data pubblicazione, recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
