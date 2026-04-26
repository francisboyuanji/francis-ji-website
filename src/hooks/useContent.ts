// Re-export all content hooks for backwards compatibility
// All hooks now use Sanity CMS instead of local API
export { useSanityQuery, useSanityDocument, useSanityList } from './useSanity'

import { useSanityDocument, useSanityList } from './useSanity'
import {
  siteSettingsQuery,
  aboutInfoQuery,
  homeEntrancesQuery,
  awardsQuery,
  researchProjectsQuery,
  mathematicsHeroQuery,
  runningPBsQuery,
  raceResultsQuery,
  photoWorksQuery,
  aerialPhotosQuery,
  projectsQuery,
  travelStoriesQuery,
  flightLogsQuery,
  hotelLogsQuery,
  clashRoyaleProfileQuery,
  approvedGuestbookEntriesQuery,
} from '@/sanity/queries'

// ==================== SITE ====================
export function useSiteSettings() {
  return useSanityDocument<any>(siteSettingsQuery)
}

export function useAboutInfo() {
  return useSanityDocument<any>(aboutInfoQuery)
}

export function useHomeEntrances() {
  return useSanityList<any>(homeEntrancesQuery)
}

// ==================== MATHEMATICS ====================
export function useAwards() {
  return useSanityList<any>(awardsQuery)
}

export function useResearchProjects() {
  return useSanityList<any>(researchProjectsQuery)
}

export function useMathematicsHero() {
  return useSanityDocument<any>(mathematicsHeroQuery)
}

// ==================== SPORTS ====================
export function useRunningPBs() {
  return useSanityList<any>(runningPBsQuery)
}

export function useRaceResults() {
  return useSanityList<any>(raceResultsQuery)
}

// ==================== ARTS ====================
export function usePhotoWorks() {
  return useSanityList<any>(photoWorksQuery)
}

export function useAerialPhotos() {
  return useSanityList<any>(aerialPhotosQuery)
}

// ==================== PROJECTS ====================
export function useProjects() {
  return useSanityList<any>(projectsQuery)
}

// ==================== TRAVEL ====================
export function useTravelStories() {
  return useSanityList<any>(travelStoriesQuery)
}

export function useFlightLogs() {
  return useSanityList<any>(flightLogsQuery)
}

export function useHotelLogs() {
  return useSanityList<any>(hotelLogsQuery)
}

// ==================== GAMES ====================
export function useClashRoyaleProfile() {
  return useSanityDocument<any>(clashRoyaleProfileQuery)
}

// ==================== GUESTBOOK ====================
export function useGuestbookEntries() {
  return useSanityList<any>(approvedGuestbookEntriesQuery)
}
