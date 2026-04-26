import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutInfo',
  title: 'About / Bio Info',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Francis Ji',
    }),
    defineField({
      name: 'chineseName',
      title: 'Chinese Name',
      type: 'string',
      initialValue: '季临海',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Mathematician · Athlete · Artist · Explorer',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bioCn',
      title: 'Biography (Chinese)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume PDF URL',
      type: 'url',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'interests',
      title: 'Interests / Hobbies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'tagline',
    },
  },
})
