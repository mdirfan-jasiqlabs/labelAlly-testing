/**
 * LabelAlly Entertainment — Central Site Configuration
 *
 * This file is the single source of truth for all business information.
 * Navigation, contact details, social links, and company info all live here.
 * Never hardcode business data inside components.
 */

// ─────────────────────────────────────────────
// COMPANY
// ─────────────────────────────────────────────
export const company = {
  name: 'LabelAlly',
  brandName: 'LabelAlly Entertainment',
  legalName: 'LabelAlly Entertainment Private Limited',
  tagline: 'Your Music. Global Impact.',
  description:
    'LabelAlly Entertainment helps artists and music labels manage YouTube channels, digital rights, monetization and music distribution workflows.',
  founded: '',
  location: 'Deoghar, Jharkhand',
  country: 'India',
};

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
export const contact = {
  email: 'business@labelally.in',
  phone: '+919334931823',
  address: 'Thari Dulampur, Deoghar, Jharkhand, 814112',
  city: 'Deoghar',
  state: 'Jharkhand',
  zip: '814112',
  country: 'India',
  businessHours: '',
};

// ─────────────────────────────────────────────
// SOCIAL LINKS (verified from footer.json — official LabelAlly profiles only)
// ─────────────────────────────────────────────
export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=61592167809072',
  instagram: 'https://www.instagram.com/labelallyentertainment',
  youtube: 'https://www.youtube.com/channel/UCVYhRFVq8_r5svDNCzS8rWQ',
  linkedin: 'https://www.linkedin.com/company/142890624',
  twitter: '',
  spotify: '',
  tiktok: '',
};

/** Active profile URLs for Organization schema sameAs (exclude empty). */
export const socialSameAs = Object.values(social).filter(Boolean);

// ─────────────────────────────────────────────
// SEO / META DEFAULTS
// ─────────────────────────────────────────────
export const seo = {
  defaultTitle:
    'LabelAlly Entertainment | YouTube Channel Management & Music Rights',
  titleTemplate: '%s | LabelAlly Entertainment',
  defaultDescription:
    'LabelAlly Entertainment provides YouTube channel management, rights management, monetization support and music distribution management for artists and music labels.',
  siteUrl: 'https://labelally.in',
  ogImage: '/default-og.png',
  logoPath: '/brand/logo.png',
  ogSiteName: 'LabelAlly',
  twitterHandle: '',
};

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
export const navigation = {
  // Primary header navigation
  primary: [
    {
      id: 'home',
      label: 'Home',
      href: '/',
    },
    {
      id: 'about',
      label: 'About',
      href: '/about',
    },
    {
      id: 'services',
      label: 'Services',
      href: '/services',
    },
    {
      id: 'artists-labels-partners',
      label: 'Artists & Partners',
      href: '/artists-labels-partners',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
    },
  ],

  // Footer navigation columns
  footer: {
    company: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'about', label: 'About', href: '/about' },
    ],
    services: [{ id: 'services', label: 'Services', href: '/services' }],
    partners: [
      {
        id: 'artists-labels-partners',
        label: 'Artists & Partners',
        href: '/artists-labels-partners',
      },
    ],
    legal: [
      {
        id: 'privacy-policy',
        label: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        id: 'terms-and-conditions',
        label: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
    ],
  },
};

// ─────────────────────────────────────────────
// AGGREGATED EXPORT
// ─────────────────────────────────────────────
export const site = {
  company,
  contact,
  social,
  socialSameAs,
  seo,
  navigation,
};

export default site;
