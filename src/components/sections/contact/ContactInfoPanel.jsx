import { Headphones } from 'lucide-react';
import ContactMethodItem from './ContactMethodItem';

/**
 * ContactInfoPanel — Left contact-information card.
 */
function ContactInfoPanel({ infoPanel, channels }) {
  if (!infoPanel || !channels?.length) return null;

  return (
    <aside
      aria-labelledby="contact-info-heading"
      className={[
        'h-full flex flex-col',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-card dark:shadow-theme',
        'p-5 sm:p-6 md:p-7',
      ].join(' ')}
    >
      <div className="flex items-start gap-3.5 pb-5 border-b border-theme-border/60 dark:border-theme-border/40">
        <div
          aria-hidden="true"
          className="shrink-0 w-11 h-11 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 flex items-center justify-center text-brand-orange"
        >
          <Headphones size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h3
            id="contact-info-heading"
            className="text-lg sm:text-xl font-bold font-heading text-ink-primary dark:text-theme-heading leading-snug"
          >
            {infoPanel.title}
          </h3>
          {infoPanel.description && (
            <p className="mt-1.5 text-sm text-ink-muted dark:text-theme-muted leading-relaxed">
              {infoPanel.description}
            </p>
          )}
        </div>
      </div>

      <ul className="list-none m-0 p-0 divide-y divide-theme-border/60 dark:divide-theme-border/40 flex-1">
        {channels.map((channel) => (
          <li key={channel.id}>
            <ContactMethodItem channel={channel} layout="panel" />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ContactInfoPanel;
