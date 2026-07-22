import { useState } from 'react';
import { Mail } from 'lucide-react';

/** Existing project portraits used when JSON image is empty (dev placeholders). */
const TEAM_IMAGE_FALLBACKS = [
  '/images/about/about-1.png',
  '/images/about/about-2.png',
  '/images/about/about-3.png',
  '/images/about/about-4.png',
];

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SOCIAL_DEFINITIONS = [
  {
    key: 'linkedin',
    label: (name) => `${name} on LinkedIn`,
    Icon: LinkedinIcon,
    external: true,
  },
  {
    key: 'instagram',
    label: (name) => `${name} on Instagram`,
    Icon: InstagramIcon,
    external: true,
  },
  {
    key: 'email',
    label: (name) => `Email ${name}`,
    Icon: Mail,
    external: false,
  },
];

function getSocialItems(socialLinks = {}, memberName = 'Team member') {
  return SOCIAL_DEFINITIONS.map(({ key, label, Icon, external }) => {
    const raw = socialLinks[key]?.trim() ?? '';
    let href = null;

    if (raw) {
      href = key === 'email' ? `mailto:${raw.replace(/^mailto:/i, '')}` : raw;
    }

    return {
      key,
      href,
      label: label(memberName),
      Icon,
      external,
      enabled: Boolean(href),
    };
  });
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function resolveMemberImage(member) {
  if (member.image?.trim()) return member.image.trim();

  const idMatch = member.id?.match(/(\d+)$/);
  if (idMatch) {
    const index = parseInt(idMatch[1], 10) - 1;
    if (index >= 0 && index < TEAM_IMAGE_FALLBACKS.length) {
      return TEAM_IMAGE_FALLBACKS[index];
    }
  }

  const hash = (member.id || member.name || '')
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return TEAM_IMAGE_FALLBACKS[hash % TEAM_IMAGE_FALLBACKS.length];
}

const socialButtonBase = [
  'inline-flex items-center justify-center',
  'h-9 w-9 rounded-md',
  'border',
  'transition-colors duration-200',
  'focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-theme-action-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page-bg)]',
].join(' ');

/**
 * TeamMemberCard — SaaS-style team card with theme-aware contrast.
 */
function TeamMemberCard({ member }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!member?.name) return null;

  const {
    name,
    role,
    description,
    imageAlt,
    socialLinks,
  } = member;

  const imageSrc = resolveMemberImage(member);
  const socialItems = getSocialItems(socialLinks, name);
  const hasImage = Boolean(imageSrc) && !imageFailed;
  const altText = imageAlt?.trim() || `${name}${role ? `, ${role}` : ''}`;

  return (
    <article
      className={[
        'group relative h-full flex flex-col overflow-hidden',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/80 dark:border-theme-border/60',
        'shadow-sm dark:shadow-theme',
        'transition-all duration-300 ease-out',
        'motion-reduce:transition-none',
        'hover:-translate-y-1 hover:shadow-card-hover',
        'hover:border-theme-action-primary/20 dark:hover:border-theme-action-primary/35',
        'motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-surface-secondary dark:bg-theme-elevated">
        {hasImage ? (
          <img
            src={imageSrc}
            alt={altText}
            width={480}
            height={320}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className={[
              'h-full w-full object-cover object-center',
              'transition-transform duration-500 ease-out',
              'motion-reduce:transition-none',
              'group-hover:scale-[1.04]',
              'motion-reduce:group-hover:scale-100',
            ].join(' ')}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-surface-secondary dark:bg-theme-elevated"
          >
            <span className="font-heading text-4xl font-bold tracking-tight text-ink-muted dark:text-theme-muted select-none">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8 text-left">
        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-ink-primary dark:text-theme-heading leading-snug">
          {name}
        </h3>

        {role && (
          <p className="mt-1.5 text-sm font-semibold text-theme-action-primary dark:text-orange-300">
            {role}
          </p>
        )}

        {description && (
          <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-secondary dark:text-theme-body line-clamp-3 min-h-[4.5rem]">
            {description}
          </p>
        )}

        <ul className="mt-6 flex items-center gap-2.5 list-none p-0 m-0">
          {socialItems.map(({ key, href, label, Icon, external, enabled }) => (
            <li key={key}>
              {enabled ? (
                <a
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={[
                    socialButtonBase,
                    'text-ink-secondary dark:text-theme-body',
                    'bg-surface-secondary dark:bg-theme-elevated',
                    'border-theme-border/70 dark:border-theme-border/60',
                    'hover:text-theme-action-primary dark:hover:text-orange-300',
                    'hover:border-theme-action-primary/35 dark:hover:border-orange-400/40',
                    'hover:bg-theme-action-primary/5 dark:hover:bg-theme-action-primary/10',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <span
                  aria-hidden="true"
                  className={[
                    socialButtonBase,
                    'text-ink-muted/50 dark:text-theme-muted/50',
                    'bg-surface-secondary/80 dark:bg-theme-elevated/60',
                    'border-theme-border/50 dark:border-theme-border/40',
                    'cursor-default',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default TeamMemberCard;
