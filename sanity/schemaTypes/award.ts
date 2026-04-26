import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'titleZh', title: 'Title (中文)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'orgEn', title: 'Organization (EN)', type: 'string' }),
    defineField({ name: 'orgZh', title: 'Organization (中文)', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'descEn', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'descZh', title: 'Description (中文)', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'titleEn', subtitle: 'year' },
  },
});
