import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Articolo',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titolo', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'estratto',
      title: 'Estratto',
      type: 'text',
      rows: 3,
      description: 'Breve descrizione per anteprima e SEO (max 160 caratteri)',
      validation: Rule => Rule.max(160),
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
      name: 'pubblicatoIl',
      title: 'Data di pubblicazione',
      type: 'datetime',
    }),
    defineField({
      name: 'corpo',
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
      name: 'titoloSeo',
      title: 'Titolo SEO',
      type: 'string',
      description: 'Se diverso dal titolo principale (max 60 caratteri)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'descrizioneSeo',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'keywordPrincipale',
      title: 'Keyword principale',
      type: 'string',
    }),
    defineField({
      name: 'keywordSecondarie',
      title: 'Keyword secondarie',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'generatoDaAI',
      title: 'Generato da AI',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'prioritaAEO',
      title: 'Priorità AEO',
      type: 'string',
      options: {
        list: [
          { title: 'P0 — Alta', value: 'p0' },
          { title: 'P1 — Media', value: 'p1' },
          { title: 'P2 — Bassa', value: 'p2' },
        ],
      },
    }),
    defineField({
      name: 'statoCitazioneAI',
      title: 'Stato citazione AI',
      type: 'string',
      options: {
        list: [
          { title: 'Presente', value: 'presente' },
          { title: 'Assente', value: 'assente' },
          { title: 'In verifica', value: 'in-verifica' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'titolo', category: 'category' },
    prepare({ title, category }) {
      return { title: title ?? '(senza titolo)', subtitle: category }
    },
  },
  orderings: [
    {
      title: 'Data pubblicazione, recente',
      name: 'pubblicatoIlDesc',
      by: [{ field: 'pubblicatoIl', direction: 'desc' }],
    },
  ],
})
