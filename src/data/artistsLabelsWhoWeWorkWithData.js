/**
 * Artists & Labels — “Who We Work With” section content.
 * Components only render this data; do not hardcode visible copy in JSX.
 */
export const artistsLabelsWhoWeWorkWithData = {
  sectionId: 'who-we-work-with',

  badge: {
    label: 'Who We Work With',
    icon: 'users',
  },

  heading: {
    id: 'artists-labels-who-we-work-with-title',
    prefix: 'Built for',
    highlightedWords: [
      {
        text: 'Artists',
        theme: 'orange',
      },
      {
        text: 'Labels',
        theme: 'pink',
      },
    ],
    suffix: '& Content Owners.',
  },

  description:
    'Whether you’re an independent creator, a growing artist, or an established label, we provide the platform, technology, and support to help you grow with confidence.',

  accentBars: [
    { id: 'orange-bar', theme: 'orange' },
    { id: 'pink-bar', theme: 'pink' },
    { id: 'teal-bar', theme: 'teal' },
    { id: 'purple-bar', theme: 'purple' },
  ],

  audiences: [
    {
      id: 'independent-artists',
      title: 'Independent Artists',
      description:
        'For singers, musicians, composers, and independent creators preparing to release and grow their music.',
      image: '/images/artists-labels/independent-artist.webp',
      imageAlt:
        'Independent artist recording and composing music in a professional studio',
      imageWidth: 800,
      imageHeight: 560,
      icon: 'artistMusic',
      theme: 'orange',
      features: [
        'Distribute across supported platforms',
        'Protect and manage your content rights',
        'Receive professional release support',
      ],
    },
    {
      id: 'record-labels',
      title: 'Record Labels',
      description:
        'For labels managing multiple artists, releases, channels, and music catalogues.',
      image: '/images/artists-labels/record-label-team.jpg',
      imageAlt:
        'Record label team reviewing music releases and catalogue strategy',
      imageWidth: 800,
      imageHeight: 560,
      icon: 'team',
      theme: 'pink',
      features: [
        'Manage multiple releases efficiently',
        'Access clear reporting and support',
        'Organize catalogue and channel workflows',
      ],
    },
    {
      id: 'content-owners-creators',
      title: 'Content Owners & Creators',
      description:
        'For rights holders and digital creators seeking protection, monetization, and platform management.',
      image: '/images/artists-labels/content-owner-creator.webp',
      imageAlt:
        'Digital content creator recording vocals in a professional studio',
      imageWidth: 800,
      imageHeight: 560,
      icon: 'rightsProtection',
      theme: 'purple',
      features: [
        'Content ID and rights-management support',
        'Monetization across eligible platforms',
        'Ongoing operational assistance',
      ],
    },
  ],

  trustMessage: {
    icon: 'shieldCheck',
    text: 'Trusted by Artists, Labels & Content Creators Worldwide',
  },
};
