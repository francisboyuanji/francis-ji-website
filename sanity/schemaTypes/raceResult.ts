import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'raceResult',
  title: 'Race Result',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'place',
      title: 'Placement',
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
      title: 'event',
      subtitle: 'time',
    },
  },
})
