// GROQ queries for Sanity CMS

// Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

// About / Bio
export const aboutInfoQuery = `*[_type == "aboutInfo"][0]`;

// Home Page Entrances
export const homeEntrancesQuery = `*[_type == "homeEntrance"] | order(order asc)`;

// ==================== MATHEMATICS ====================
export const awardsQuery = `*[_type == "award"] | order(year desc)`;
export const researchProjectsQuery = `*[_type == "researchProject"] | order(order asc)`;
export const mathematicsHeroQuery = `*[_type == "mathematicsHero"][0]`;

// ==================== SPORTS ====================
export const runningPBsQuery = `*[_type == "runningPB"] | order(order asc)`;
export const raceResultsQuery = `*[_type == "raceResult"] | order(order asc)`;

// ==================== ARTS ====================
export const photoWorksQuery = `*[_type == "photoWork"] | order(order asc)`;
export const aerialPhotosQuery = `*[_type == "aerialPhoto"] | order(order asc)`;

// ==================== PROJECTS ====================
export const projectsQuery = `*[_type == "project"] | order(order asc)`;

// ==================== TRAVEL ====================
export const travelStoriesQuery = `*[_type == "travelStory"] | order(order asc)`;
export const flightLogsQuery = `*[_type == "flightLog"] | order(order asc)`;
export const hotelLogsQuery = `*[_type == "hotelLog"] | order(order asc)`;

// ==================== GAMES ====================
export const clashRoyaleProfileQuery = `*[_type == "clashRoyaleProfile"][0]`;

// ==================== GUESTBOOK ====================
export const approvedGuestbookEntriesQuery = `*[_type == "guestbookEntry" && approved == true] | order(submittedAt desc)`;
