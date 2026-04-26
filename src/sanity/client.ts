import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Read from environment variables or use placeholder values
// For static deployment, these can be set at build time
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

// Debug logging
console.log('[Sanity] Project ID:', projectId)
console.log('[Sanity] Dataset:', dataset)
console.log('[Sanity] API Version:', apiVersion)

if (projectId === 'placeholder' || !projectId) {
  console.error('[Sanity] WARNING: Project ID is "placeholder" or empty. Please set VITE_SANITY_PROJECT_ID in .env')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

// Image URL builder for Sanity images
export const imageBuilder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return imageBuilder.image(source)
}

// Helper to get image URL as string
export function getImageUrl(source: any, width: number = 800) {
  if (!source) return ''
  return urlFor(source).width(width).auto('format').url()
}
