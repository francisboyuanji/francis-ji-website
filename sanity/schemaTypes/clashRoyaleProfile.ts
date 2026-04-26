import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clashRoyaleProfile',
  title: 'CR Deck',
  type: 'document',
  fields: [
    defineField({
      name: 'deckName',
      title: 'Deck Name',
      type: 'string',
      initialValue: 'My Deck',
    }),
    defineField({
      name: 'cards',
      title: 'Cards (8 total)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'nameEn', title: 'English Name', type: 'string' }),
            defineField({ name: 'nameZh', title: 'Chinese Name', type: 'string' }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(8).max(8).error('A deck must have exactly 8 cards'),
    }),
    defineField({
      name: 'trophies',
      title: 'Current Trophies',
      type: 'number',
      initialValue: 6500,
    }),
    defineField({
      name: 'bestTrophies',
      title: 'Best Trophies',
      type: 'number',
      initialValue: 7200,
    }),
  ],
  preview: {
    select: {
      title: 'deckName',
      subtitle: 'trophies',
    },
  },
})
