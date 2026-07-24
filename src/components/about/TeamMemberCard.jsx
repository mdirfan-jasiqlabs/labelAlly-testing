import { useState } from 'react';
import { Mail } from 'lucide-react';

/** Existing project portraits used when JSON image is empty (dev placeholders). */
const TEAM_IMAGE_FALLBACKS = [
  '/images/about/about-1.png',
  '/images/about/about-2.png',
  '/images/about/about-3.png',
  '/images/about/about-4.png',
];

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

/**
 * TeamMemberCard — Premium centered SaaS profile card.
 */
function TeamMemberCard({ member, contactButton }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!member?.name) return null;

  const { name, role, description, imageAlt } = member;

  const imageSrc = resolveMemberImage(member);
  const hasImage = Boolean(imageSrc) && !imageFailed;
  const altText = imageAlt?.trim() || `${name}${role ? `, ${role}` : ''}`;

  const contactEmail = contactButton?.email?.trim() || '';
  const contactLabel = contactButton?.label?.trim() || 'Contact';
  const contactHref = contactEmail
    ? `mailto:${contactEmail.replace(/^mailto:/i, '')}`
    : '';
  const contactAria =
    contactButton?.ariaLabel?.trim() ||
    (contactEmail ? `Contact LabelAlly at ${contactEmail}` : contactLabel);

  return (
    <article
      className={[
        'group relative h-full flex flex-col items-center',
        'rounded-2xl sm:rounded-[1.35rem]',
        'px-5 pt-7 pb-6 sm:px-6 sm:pt-8 sm:pb-7',
        'bg-surface-card/95 dark:bg-theme-card/80',
        'backdrop-blur-sm',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-sm dark:shadow-theme',
        'transition-all duration-300 ease-out',
        'motion-reduce:transition-none',
        'hover:-translate-y-1',
        'hover:shadow-card-hover',
        'hover:border-theme-action-primary/25 dark:hover:border-theme-action-primary/40',
        'motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          'relative shrink-0',
          'h-36 w-36 sm:h-40 sm:w-40',
          'rounded-full overflow-hidden',
          'ring-[2.5px] ring-theme-action-primary/85 dark:ring-orange-400/85',
          'ring-offset-[3px] ring-offset-surface-card dark:ring-offset-theme-card',
          'bg-surface-secondary dark:bg-theme-elevated',
          'shadow-sm',
        ].join(' ')}
      >
        {hasImage ? (
          <img
            src={imageSrc}
            alt={altText}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className={[
              'h-full w-full object-cover object-[center_12%] scale-[1.08]',
              'origin-center',
              'transition-transform duration-500 ease-out',
              'motion-reduce:transition-none',
              'group-hover:scale-[1.12]',
              'motion-reduce:group-hover:scale-[1.08]',
            ].join(' ')}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center"
          >
            <span className="font-heading text-3xl font-bold tracking-tight text-ink-muted dark:text-theme-muted select-none">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 sm:mt-6 flex flex-1 w-full flex-col items-center text-center min-w-0">
        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-ink-primary dark:text-theme-heading leading-snug">
          {name}
        </h3>

        <span
          aria-hidden="true"
          className="mt-3 h-0.5 w-10 rounded-full bg-theme-action-primary dark:bg-orange-400"
        />

        {role && (
          <p className="mt-3 text-sm font-medium leading-snug text-theme-action-primary dark:text-orange-300 break-words max-w-[18rem] min-h-[2.75rem]">
            {role}
          </p>
        )}

        {description && (
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary dark:text-theme-body max-w-xs">
            {description}
          </p>
        )}

        {contactHref && (
          <div className="mt-auto pt-5 w-full flex justify-center shrink-0">
            <a
              href={contactHref}
              aria-label={contactAria}
              className={[
                'inline-flex items-center justify-center gap-2',
                'h-10 px-5 rounded-xl',
                'text-sm font-semibold',
                'text-theme-action-primaryForeground',
                'bg-theme-action-primary',
                'shadow-sm',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:shadow-md',
                'focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-theme-action-primary',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page-bg)]',
                'active:scale-[0.98]',
                'motion-reduce:hover:translate-y-0',
                'motion-reduce:active:scale-100',
              ].join(' ')}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{contactLabel}</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default TeamMemberCard;
