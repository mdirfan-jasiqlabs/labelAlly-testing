export const aboutIntroData = {
  enabled: true,

  pageBanner: {
    title: "About Us",
    enabled: true
  },

  label: "About Us",

  heading: "LabelAlly Entertainment",

  paragraphs: [
    {
      id: "about-para-1",
      text: "LabelAlly Entertainment is a dedicated, full-service music industry partner. We support independent creators, record labels, and creative brands in optimizing their digital distribution, content rights, and marketing strategies.",
      enabled: true
    },
    {
      id: "about-para-2",
      text: "We believe that creators should maintain control over their work while having access to the same distribution networks, channel optimization strategies, and rights protection technologies as major corporate entities.",
      enabled: true
    },
    {
      id: "about-para-3",
      text: "Our team brings together years of collective experience in digital licensing, platform management, and marketing to serve as an extension of your own operations.",
      enabled: true
    }
  ],

  whatWeDo: {
    title: "What We Do",
    icon: "headphones",
    enabled: true,
    items: [
      {
        id: "wwd-1",
        text: "Music & Video Distribution",
        enabled: true
      },
      {
        id: "wwd-2",
        text: "Artist & Label Management",
        enabled: true
      },
      {
        id: "wwd-3",
        text: "Digital Marketing & Promotions",
        enabled: true
      },
      {
        id: "wwd-4",
        text: "Content Monetization & Reporting",
        enabled: true
      },
      {
        id: "wwd-5",
        text: "Business Investments & Corporate Services",
        enabled: true
      }
    ]
  },

  whyChooseUs: {
    title: "Why Choose Us?",
    icon: "target",
    enabled: true,
    items: [
      {
        id: "wcu-1",
        text: "Transparent & timely revenue reporting",
        enabled: true
      },
      {
        id: "wcu-2",
        text: "Strong distribution network across global platforms",
        enabled: true
      },
      {
        id: "wcu-3",
        text: "Expertise in regional & mainstream markets",
        enabled: true
      },
      {
        id: "wcu-4",
        text: "End-to-end support for creators & businesses",
        enabled: true
      }
    ]
  },

  images: [
    {
      id: "about-img-1",
      src: "/images/about/about-1.png",
      alt: "LabelAlly team members collaborating on a laptop at a table in a modern corporate office",
      width: 600,
      height: 480,
      enabled: true
    },
    {
      id: "about-img-2",
      src: "/images/about/about-2.png",
      alt: "LabelAlly creative team sitting together in a discussion in a workspace",
      width: 600,
      height: 480,
      enabled: true
    },
    {
      id: "about-img-3",
      src: "/images/about/about-3.png",
      alt: "Team members hands pointing at analytics and charts on a paper on the desk",
      width: 600,
      height: 480,
      enabled: true
    },
    {
      id: "about-img-4",
      src: "/images/about/about-4.png",
      alt: "Designer/Developer at an office desk working on branding assets and audio waveform analytics on a monitor",
      width: 600,
      height: 480,
      enabled: true
    }
  ]
};

export const missionVisionData = {
  enabled: true,

  eyebrow: {
    text: 'Our Purpose',
    enabled: true,
  },

  heading: 'Our Mission & Vision',

  cards: [
    {
      id: 'mission',
      type: 'mission',
      label: 'Our Mission',
      icon: 'target',
      content: [
        {
          id: 'mission-text-1',
          text: 'To ',
          emphasis: false,
        },
        {
          id: 'mission-text-2',
          text: 'amplify the reach and value of independent music',
          emphasis: true,
        },
        {
          id: 'mission-text-3',
          text: ', providing artists and labels with ',
          emphasis: false,
        },
        {
          id: 'mission-text-4',
          text: 'transparent tools, distribution networks, and rights management solutions',
          emphasis: true,
        },
        {
          id: 'mission-text-5',
          text: ' to sustain and grow their careers.',
          emphasis: false,
        },
      ],
      enabled: true,
    },
    {
      id: 'vision',
      type: 'vision',
      label: 'Our Vision',
      icon: 'eye',
      content: [
        {
          id: 'vision-text-1',
          text: 'To foster a ',
          emphasis: false,
        },
        {
          id: 'vision-text-2',
          text: 'fair, transparent, and thriving global music ecosystem',
          emphasis: true,
        },
        {
          id: 'vision-text-3',
          text: ' where ',
          emphasis: false,
        },
        {
          id: 'vision-text-4',
          text: 'creators of all scales',
          emphasis: true,
        },
        {
          id: 'vision-text-5',
          text: ' can seamlessly monetize and protect their intellectual property without barriers.',
          emphasis: false,
        },
      ],
      enabled: true,
    },
  ],

  decorations: [
    {
      id: 'decoration-capsule-left',
      type: 'capsule',
      position: 'top-left',
      enabled: true,
    },
    {
      id: 'decoration-triangle-faded',
      type: 'triangle-faded',
      position: 'top-left-inner',
      enabled: true,
    },
    {
      id: 'decoration-triangle-outline',
      type: 'triangle-outline',
      position: 'top-right',
      enabled: true,
    },
    {
      id: 'decoration-capsule-right',
      type: 'capsule',
      position: 'top-right-inner',
      enabled: true,
    },
    {
      id: 'decoration-dots',
      type: 'dots',
      position: 'center',
      enabled: true,
    },
  ],
};
