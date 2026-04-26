import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'flightLog',
  title: 'Flight Log',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Flight Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., PVG — KEF',
    }),
    defineField({
      name: 'airline',
      title: 'Airline',
      type: 'string',
    }),
    defineField({
      name: 'aircraft',
      title: 'Aircraft',
      type: 'string',
      description: 'e.g., Boeing 787-9',
    }),
    defineField({
      name: 'note',
      title: 'Note',
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
      title: 'route',
      subtitle: 'date',
    },
  },
})
