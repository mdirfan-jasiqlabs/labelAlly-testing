/**
 * Artists & Labels — Onboarding Process + CTA content.
 * Components only render this data; do not hardcode visible copy in JSX.
 */
export const artistsLabelsOnboardingData = {
  sectionId: 'onboarding-process',

  badge: {
    label: 'Onboarding Process',
    icon: 'rocket',
  },

  heading: {
    id: 'artists-labels-onboarding-title',
    prefix: 'Simple. Transparent.',
    highlightedText: 'Artist-First.',
  },

  description:
    'We’ve designed a smooth onboarding experience to get your music live on global platforms — quickly and hassle-free.',

  steps: [
    {
      id: 'submit-your-music',
      number: '01',
      title: 'Submit Your Music',
      description:
        'Share your tracks and release details with us through our easy form.',
      icon: 'fileUpload',
      theme: 'orange',
      placement: 'top-left',
    },
    {
      id: 'review-verification',
      number: '02',
      title: 'Review & Verification',
      description:
        'Our team reviews your submission and verifies your content for quality and compliance.',
      icon: 'fileCheck',
      theme: 'purple',
      placement: 'top-center',
    },
    {
      id: 'distribution-setup',
      number: '03',
      title: 'Distribution Setup',
      description:
        'We prepare your release for global distribution and metadata optimization.',
      icon: 'music',
      theme: 'blue',
      placement: 'top-right',
    },
    {
      id: 'go-live-globally',
      number: '04',
      title: 'Go Live Globally',
      description:
        'Your music goes live on 150+ platforms and stores worldwide.',
      icon: 'globe',
      theme: 'green',
      placement: 'bottom-left',
    },
    {
      id: 'track-grow',
      number: '05',
      title: 'Track & Grow',
      description:
        'Monitor performance, earnings, and grow your fanbase with insights.',
      icon: 'chartGrowth',
      theme: 'pink',
      placement: 'bottom-right',
    },
  ],

  connectors: [
    {
      id: 'connector-1',
      from: 'submit-your-music',
      to: 'review-verification',
      direction: 'right',
      theme: 'orange',
    },
    {
      id: 'connector-2',
      from: 'review-verification',
      to: 'distribution-setup',
      direction: 'right',
      theme: 'purple',
    },
    {
      id: 'connector-3',
      from: 'distribution-setup',
      to: 'go-live-globally',
      direction: 'loop-down-left',
      theme: 'blue',
    },
    {
      id: 'connector-4',
      from: 'go-live-globally',
      to: 'track-grow',
      direction: 'right',
      theme: 'green',
    },
  ],

  cta: {
    eyebrow: {
      label: 'Ready to Get Started?',
      icon: 'spark',
    },

    heading: {
      firstLine: 'Your Music. Global Audience.',
      secondLinePrefix: 'Limitless',
      highlightedText: 'Possibilities.',
    },

    description:
      'Join independent artists and labels who trust LabelAlly to release, protect, and grow their music careers.',

    highlights: [
      {
        id: 'dedicated-onboarding',
        label: 'Dedicated Onboarding',
        icon: 'shieldCheck',
        theme: 'orange',
      },
      {
        id: 'transparent-reporting',
        label: 'Transparent Reporting',
        icon: 'fileChart',
        theme: 'purple',
      },
      {
        id: 'multi-platform-support',
        label: 'Multi-Platform Support',
        icon: 'users',
        theme: 'green',
      },
      {
        id: 'creator-first-assistance',
        label: 'Creator-First Assistance',
        icon: 'headphones',
        theme: 'pink',
      },
    ],

    buttons: [
      {
        id: 'start-journey',
        label: 'Start Your Journey',
        href: '/contact',
        icon: 'arrowRight',
        variant: 'primary',
        external: false,
        ariaLabel: 'Start your journey with LabelAlly',
      },
      {
        id: 'talk-to-team',
        label: 'Talk to Our Team',
        href: 'https://wa.me/918709002433',
        icon: 'messageCircle',
        variant: 'secondary',
        external: true,
        ariaLabel: 'Talk to the LabelAlly team on WhatsApp',
      },
    ],

    image: {
      src: '/images/artists-labels/onboarding/onboarding-cta-studio.png',
      alt: 'Music creator working in a professional recording and production studio',
      width: 960,
      height: 720,
    },
  },
};
