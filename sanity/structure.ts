import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings
      S.listItem()
        .id('settingsGroup')
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.documentTypeListItem('aboutInfo').title('About / Bio'),
              S.documentTypeListItem('homeEntrance').title('Home Entrances'),
            ])
        ),

      S.divider(),

      // Mathematics
      S.listItem()
        .id('mathematicsGroup')
        .title('Mathematics')
        .child(
          S.list()
            .title('Mathematics')
            .items([
              S.documentTypeListItem('award').title('Awards & Honors'),
              S.documentTypeListItem('researchProject').title('Research Projects'),
              S.documentTypeListItem('mathematicsHero').title('Hero Section'),
            ])
        ),

      // Sports
      S.listItem()
        .id('sportsGroup')
        .title('Sports')
        .child(
          S.list()
            .title('Sports')
            .items([
              S.documentTypeListItem('runningPB').title('Running PBs'),
              S.documentTypeListItem('raceResult').title('Race Results'),
            ])
        ),

      // Arts
      S.listItem()
        .id('artsGroup')
        .title('Arts')
        .child(
          S.list()
            .title('Arts')
            .items([
              S.documentTypeListItem('photoWork').title('Photography'),
              S.documentTypeListItem('aerialPhoto').title('Aerial Photography'),
            ])
        ),

      // Projects
      S.listItem()
        .id('projectsGroup')
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')),

      // Travel
      S.listItem()
        .id('travelGroup')
        .title('Travel')
        .child(
          S.list()
            .title('Travel')
            .items([
              S.documentTypeListItem('travelStory').title('Travel Stories'),
              S.documentTypeListItem('flightLog').title('Flight Log'),
              S.documentTypeListItem('hotelLog').title('Hotel Log'),
            ])
        ),

      // Games
      S.listItem()
        .id('gamesGroup')
        .title('Games')
        .child(
          S.list()
            .title('Games')
            .items([
              S.documentTypeListItem('clashRoyaleProfile').title('CR Deck'),
            ])
        ),

      // Guestbook
      S.listItem()
        .id('guestbookGroup')
        .title('Guestbook')
        .child(S.documentTypeList('guestbookEntry').title('Guestbook Entries')),
    ])
