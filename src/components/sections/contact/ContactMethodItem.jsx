import { MapPin, Phone, Mail } from 'lucide-react';

const ACCENT_MAP = {
  rose: {
    surface: 'bg-rose-50 dark:bg-rose-950/35 border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400',
    ring: 'border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400',
  },
  emerald: {
    surface: 'bg-emerald-50 dark:bg-emerald-950/35 border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    ring: 'border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400',
  },
  blue: {
    surface: 'bg-sky-50 dark:bg-sky-950/35 border-sky-100 dark:border-sky-900/40 text-sky-600 dark:text-sky-400',
    ring: 'border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400',
  },
  whatsapp: {
    surface: 'bg-green-50 dark:bg-green-950/35 border-green-100 dark:border-green-900/40 text-green-600 dark:text-green-400',
    ring: 'border-green-200 dark:border-green-800/50 text-green-600 dark:text-green-400',
  },
};

function WhatsAppGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 2.115.659 4.079 1.785 5.702l-1.836 5.666 5.808-1.521c1.558.955 3.385 1.503 5.344 1.503 5.502 0 9.96-4.458 9.96-9.96a9.923 9.923 0 00-2.917-7.042A9.923 9.923 0 0012.011 2zm5.55 13.914c-.21.583-1.05 1.077-1.706 1.157-.472.052-1.076.078-3.08-.744-2.555-1.042-4.185-3.6-4.316-3.774-.131-.174-1.05-1.383-1.05-2.637 0-1.254.646-1.867.883-2.118.21-.223.57-.32.84-.32.088 0 .175.004.245.008.219.009.324.022.464.346.175.424.604 1.45.656 1.555.052.105.088.228.018.372-.07.144-.158.24-.315.424-.158.184-.332.398-.472.538-.158.158-.324.328-.14.639.184.31.82 1.343 1.759 2.167 1.207 1.066 2.222 1.393 2.537 1.551.315.157.499.131.69-.079.193-.21.84-.967 1.058-1.298.228-.328.455-.271.761-.157.315.114 1.986.927 2.328 1.1.341.171.569.258.656.398.087.149.087.838-.123 1.428z" />
    </svg>
  );
}

function ChannelIcon({ icon, className = '' }) {
  if (icon === 'whatsapp') {
    return <WhatsAppGlyph className={className || 'w-[18px] h-[18px]'} />;
  }

  const Icon =
    icon === 'phone' ? Phone : icon === 'mail' ? Mail : MapPin;

  return <Icon size={18} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

/**
 * ContactMethodItem — Reusable channel row for panel + strip layouts.
 */
function ContactMethodItem({
  channel,
  layout = 'panel',
  className = '',
}) {
  if (!channel?.value) return null;

  const accent = ACCENT_MAP[channel.accent] ?? ACCENT_MAP.blue;
  const isLink = Boolean(channel.href);
  const valueClass =
    channel.type === 'whatsapp'
      ? 'text-green-600 dark:text-green-400 font-semibold'
      : 'text-ink-primary dark:text-theme-heading';

  const valueNode = isLink ? (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      className={[
        'text-sm leading-relaxed break-words focus-ring rounded-sm',
        'hover:text-brand-orange transition-colors duration-250',
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
      <div
        className={[
          'flex items-start gap-3 min-w-0',
          className,
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className={[
            'shrink-0 w-10 h-10 rounded-full border bg-surface-card dark:bg-theme-card',
            'flex items-center justify-center',
            accent.ring,
          ].join(' ')}
        >
          <ChannelIcon icon={channel.icon} />
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
    <div className={['flex items-start gap-3.5 py-4 first:pt-0 last:pb-0', className].join(' ')}>
      <div
        aria-hidden="true"
        className={[
          'shrink-0 w-10 h-10 rounded-full border',
          'flex items-center justify-center',
          accent.surface,
        ].join(' ')}
      >
        <ChannelIcon icon={channel.icon} />
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
