import { resolveContactIcon, resolveContactAccent } from './contactFormMaps';

/**
 * ContactMethodItem — Reusable channel row for panel + strip layouts.
 * Icons and accents resolve from static maps (no dynamic Tailwind).
 */
function ContactMethodItem({
  channel,
  layout = 'panel',
  className = '',
}) {
  if (!channel?.value) return null;

  const accent = resolveContactAccent(channel.accent);
  const Icon = resolveContactIcon(channel.icon);
  const isLink = Boolean(channel.href);
  const isExternal = Boolean(channel.external);
  const valueClass =
    accent.value || 'text-ink-primary dark:text-theme-heading';

  const valueNode = isLink ? (
    <a
      href={channel.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={[
        'text-sm leading-relaxed break-words focus-ring rounded-sm',
        'hover:text-brand-orange transition-colors duration-250 motion-reduce:transition-none',
        valueClass,
      ].join(' ')}
    >
      {channel.value}
    </a>
  ) : (
    <p className={['text-sm leading-relaxed break-words', valueClass].join(' ')}>
      {channel.value}
    </p>
  );

  if (layout === 'strip') {
    return (
      <div className={['flex items-start gap-3 min-w-0', className].join(' ')}>
        <div
          aria-hidden="true"
          className={[
            'shrink-0 w-10 h-10 rounded-full border bg-surface-card dark:bg-theme-card',
            'flex items-center justify-center',
            accent.ring,
          ].join(' ')}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-theme-muted">
            {channel.label}
          </span>
          {valueNode}
        </div>
      </div>
    );
  }

  return (
    <div className={['flex items-start gap-3.5 py-3.5 sm:py-4 first:pt-0 last:pb-0', className].join(' ')}>
      <div
        aria-hidden="true"
        className={[
          'shrink-0 w-10 h-10 rounded-full border',
          'flex items-center justify-center',
          accent.surface,
        ].join(' ')}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex flex-col gap-1 pt-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-theme-muted">
          {channel.label}
        </span>
        {valueNode}
      </div>
    </div>
  );
}

export default ContactMethodItem;
