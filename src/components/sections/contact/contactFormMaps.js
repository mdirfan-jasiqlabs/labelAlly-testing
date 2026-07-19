import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Headphones,
  Tag,
  Send,
  Clock,
  Building2,
  ListFilter,
} from 'lucide-react';

/**
 * Static icon map — resolve JSON icon keys to Lucide components.
 * Do not store React components in JSON.
 */
export const contactIconMap = {
  user: User,
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  headphones: Headphones,
  tag: Tag,
  send: Send,
  clock: Clock,
  building: Building2,
  'list-filter': ListFilter,
};

/**
 * Static accent styles — never build dynamic Tailwind class strings.
 */
export const contactAccentStyles = {
  rose: {
    surface:
      'bg-rose-50 dark:bg-rose-950/35 border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400',
    ring: 'border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400',
    value: '',
  },
  emerald: {
    surface:
      'bg-emerald-50 dark:bg-emerald-950/35 border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    ring: 'border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400',
    value: '',
  },
  blue: {
    surface:
      'bg-sky-50 dark:bg-sky-950/35 border-sky-100 dark:border-sky-900/40 text-sky-600 dark:text-sky-400',
    ring: 'border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400',
    value: '',
  },
  whatsapp: {
    surface:
      'bg-green-50 dark:bg-green-950/35 border-green-100 dark:border-green-900/40 text-green-600 dark:text-green-400',
    ring: 'border-green-200 dark:border-green-800/50 text-green-600 dark:text-green-400',
    value: 'text-green-600 dark:text-green-400 font-semibold',
  },
  orange: {
    surface:
      'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/40 text-brand-orange',
    ring: 'border-orange-200 dark:border-orange-800/50 text-brand-orange',
    value: '',
  },
};

export function resolveContactIcon(iconKey) {
  return contactIconMap[iconKey] ?? MapPin;
}

export function resolveContactAccent(accentKey) {
  return contactAccentStyles[accentKey] ?? contactAccentStyles.blue;
}
