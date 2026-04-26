// Sanity configuration
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || ''
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

// Check if Sanity is properly configured (not placeholder)
export const isSanityConfigured = 
  SANITY_PROJECT_ID && 
  SANITY_PROJECT_ID !== 'placeholder' && 
  SANITY_PROJECT_ID !== 'your-project-id' &&
  SANITY_PROJECT_ID !== ''

// Log for debugging
console.log('[Sanity Config] Project ID:', SANITY_PROJECT_ID)
console.log('[Sanity Config] isSanityConfigured:', isSanityConfigured)
