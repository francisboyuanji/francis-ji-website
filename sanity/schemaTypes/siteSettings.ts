import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: "Francis Ji | Digital Life Museum",
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      initialValue: "Welcome to my digital life museum — a curated journey through mathematics, athletics, arts, and adventures.",
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: "Francis Ji",
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: "季临海",
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: "Digital Life Museum",
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      initialValue: "Crafted with curiosity and code",
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'strava', title: 'Strava', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
})
