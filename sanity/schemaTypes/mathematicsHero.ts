import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mathematicsHero',
  title: 'Mathematics Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Where abstraction meets discovery',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      initialValue: '"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." — William Paul Thurston',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'string',
      initialValue: 'William Paul Thurston',
    }),
  ],
  preview: {
    select: {
      title: 'subtitle',
    },
  },
})
