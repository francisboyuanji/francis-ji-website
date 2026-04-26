import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'runningPB',
  title: 'Running Personal Best',
  type: 'document',
  fields: [
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      options: {
        list: [
          { title: '100m', value: '100m' },
          { title: '400m', value: '400m' },
          { title: '800m', value: '800m' },
          { title: '1000m', value: '1000m' },
          { title: '1500m', value: '1500m' },
          { title: '3K', value: '3K' },
          { title: '5K', value: '5K' },
          { title: '10K', value: '10K' },
          { title: 'Half Marathon', value: 'Half Marathon' },
          { title: 'Marathon', value: 'Marathon' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pace',
      title: 'Pace',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'event',
      title: 'Event Name',
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
      title: 'distance',
      subtitle: 'time',
    },
  },
})
