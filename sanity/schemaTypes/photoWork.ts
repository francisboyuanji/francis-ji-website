import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photoWork',
  title: 'Photography Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'City', value: 'city' },
          { title: 'Nature', value: 'nature' },
          { title: 'People', value: 'people' },
          { title: 'Film', value: 'film' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date Taken',
      type: 'string',
    }),
    defineField({
      name: 'camera',
      title: 'Camera / Equipment',
      type: 'string',
    }),
    defineField({
      name: 'settings',
      title: 'Camera Settings',
      type: 'string',
      description: 'e.g., f/2.8, 1/250s, ISO 400',
    }),
    defineField({
      name: 'story',
      title: 'Story / Description',
      type: 'text',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
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
      media: 'image',
      subtitle: 'location',
    },
  },
})
