import { Headphones } from 'lucide-react';

const HELP_ICON_MAP = {
  headphones: Headphones,
};

/**
 * ContactHelpStrip — Compact help bar with WhatsApp CTA.
 * WhatsApp URL is passed from shared footer contact data.
 */
function WhatsAppGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 2.115.659 4.079 1.785 5.702l-1.836 5.666 5.808-1.521c1.558.955 3.385 1.503 5.344 1.503 5.502 0 9.96-4.458 9.96-9.96a9.923 9.923 0 00-2.917-7.042A9.923 9.923 0 0012.011 2zm5.55 13.914c-.21.583-1.05 1.077-1.706 1.157-.472.052-1.076.078-3.08-.744-2.555-1.042-4.185-3.6-4.316-3.774-.131-.174-1.05-1.383-1.05-2.637 0-1.254.646-1.867.883-2.118.21-.223.57-.32.84-.32.088 0 .175.004.245.008.219.009.324.022.464.346.175.424.604 1.45.656 1.555.052.105.088.228.018.372-.07.144-.158.24-.315.424-.158.184-.332.398-.472.538-.158.158-.324.328-.14.639.184.31.82 1.343 1.759 2.167 1.207 1.066 2.222 1.393 2.537 1.551.315.157.499.131.69-.079.193-.21.84-.967 1.058-1.298.228-.328.455-.271.761-.157.315.114 1.986.927 2.328 1.1.341.171.569.258.656.398.087.149.087.838-.123 1.428z" />
    </svg>
  );
}

function ContactHelpStrip({ helpStrip, whatsappUrl }) {
  if (!helpStrip?.enabled) return null;

  const { text, icon, buttonLabel, ariaLabel } = helpStrip;
  const HelpIcon = HELP_ICON_MAP[icon] ?? Headphones;

  return (
    <aside
      aria-label="Contact support"
      className={[
        'w-full max-w-4xl mx-auto',
        'flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5',
        'rounded-2xl sm:rounded-full',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-sm dark:shadow-theme',
        'px-4 py-4 sm:px-5 sm:py-3.5 md:px-6 md:py-4',
      ].join(' ')}
    >
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left min-w-0 flex-1 w-full">
        <div
          aria-hidden="true"
          className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-pink-50 dark:bg-pink-950/30 border border-pink-100/70 dark:border-pink-900/40 flex items-center justify-center text-pink-600 dark:text-pink-400"
        >
          <HelpIcon size={20} strokeWidth={1.75} />
        </div>

        {text && (
          <p className="text-sm sm:text-base font-medium text-ink-primary dark:text-theme-heading leading-snug max-w-md">
            {text}
          </p>
        )}
      </div>

      {buttonLabel && whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel || buttonLabel}
          className={[
            'inline-flex items-center justify-center gap-2 shrink-0',
            'min-h-11 h-11 px-5',
            'rounded-lg',
            'bg-brand-pink hover:opacity-90 active:opacity-80',
            'text-white text-sm font-semibold',
            'shadow-sm',
            'transition-opacity duration-250 ease-out',
            'motion-reduce:transition-none',
            'focus-ring',
            'w-full sm:w-auto',
          ].join(' ')}
        >
          <WhatsAppGlyph className="w-4 h-4" />
          <span>{buttonLabel}</span>
        </a>
      )}
    </aside>
  );
}

export default ContactHelpStrip;
