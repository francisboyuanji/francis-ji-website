import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeEntrance',
  title: 'Home Page Museum Entrance',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleCn',
      title: 'Chinese Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'descriptionCn',
      title: 'Description (Chinese)',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., Calculator, Dumbbell, Palette, Briefcase, Globe, Gamepad2, BookOpen',
      initialValue: 'Star',
    }),
    defineField({
      name: 'route',
      title: 'Route Path',
      type: 'string',
      description: 'e.g., /mathematics, /sports, /arts',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Tailwind color class e.g., blue-500, emerald-500',
      initialValue: 'blue-500',
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
      subtitle: 'route',
    },
  },
})
