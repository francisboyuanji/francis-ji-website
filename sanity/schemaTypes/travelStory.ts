import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'travelStory',
  title: 'Travel Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Story Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'travelDate',
      title: 'Travel Date',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'travelDate',
    },
  },
})
