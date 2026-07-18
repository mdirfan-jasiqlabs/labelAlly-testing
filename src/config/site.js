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
  name:       'LabelAlly Entertainment',
  legalName:  'LabelAlly Entertainment',
  tagline:    'Your Vision, Amplified.',
  description:
    'LabelAlly Entertainment is a full-service music industry partner providing distribution, marketing, sync licensing, and artist development services.',
  founded:    '',
  location:   '',
  country:    '',
};

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
export const contact = {
  email:        '',
  phone:        '',
  address:      '',
  city:         '',
  state:        '',
  zip:          '',
  country:      '',
  businessHours:'',
};

// ─────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────
export const social = {
  instagram: '',
  twitter:   '',
  linkedin:  '',
  youtube:   '',
  spotify:   '',
  facebook:  '',
  tiktok:    '',
};

// ─────────────────────────────────────────────
// SEO / META DEFAULTS
// ─────────────────────────────────────────────
export const seo = {
  defaultTitle:       'LabelAlly Entertainment',
  titleTemplate:      '%s | LabelAlly Entertainment',
  defaultDescription: 'LabelAlly Entertainment — a full-service music industry partner for artists, labels, and brands.',
  siteUrl:            '',
  ogImage:            '',
  twitterHandle:      '',
};

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
export const navigation = {
  // Primary header navigation
  primary: [
    {
      id:    'home',
      label: 'Home',
      href:  '/',
    },
    {
      id:    'about',
      label: 'About',
      href:  '/about',
    },
    {
      id:    'services',
      label: 'Services',
      href:  '/services',
    },
    {
      id:    'artists-labels-partners',
      label: 'Artists & Partners',
      href:  '/artists-labels-partners',
    },
    {
      id:    'contact',
      label: 'Contact',
      href:  '/contact',
    },
  ],

  // Footer navigation columns
  footer: {
    company: [
      { id: 'home',  label: 'Home',  href: '/' },
      { id: 'about', label: 'About', href: '/about' },
    ],
    services: [
      { id: 'services', label: 'Services', href: '/services' },
    ],
    partners: [
      {
        id:    'artists-labels-partners',
        label: 'Artists & Partners',
        href:  '/artists-labels-partners',
      },
    ],
    legal: [
      {
        id:    'privacy-policy',
        label: 'Privacy Policy',
        href:  '/privacy-policy',
      },
      {
        id:    'terms-and-conditions',
        label: 'Terms & Conditions',
        href:  '/terms-and-conditions',
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
  seo,
  navigation,
};

export default site;
