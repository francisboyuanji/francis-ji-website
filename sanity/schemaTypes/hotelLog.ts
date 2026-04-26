import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hotelLog',
  title: 'Hotel Log',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Hotel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Stay Date',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Hotel Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'experience',
      title: 'Experience / Review',
      type: 'text',
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
      title: 'name',
      subtitle: 'date',
    },
  },
})
