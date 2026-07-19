import ContactMethodItem from './ContactMethodItem';
import { resolveContactIcon, resolveContactAccent } from './contactFormMaps';

/**
 * ContactInfoPanel — Left contact-information card.
 */
function ContactInfoPanel({ infoPanel, channels }) {
  if (!infoPanel?.enabled || !channels?.length) return null;

  const PanelIcon = resolveContactIcon(infoPanel.icon || 'headphones');
  const panelAccent = resolveContactAccent('orange');
  const showResponseNote = Boolean(
    infoPanel.responseNote?.enabled && infoPanel.responseNote?.text
  );

  return (
    <aside
      aria-labelledby="contact-info-heading"
      className={[
        'h-full flex flex-col',
        'rounded-card sm:rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-card dark:shadow-theme',
        'p-4 sm:p-6 md:p-7',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <div className="flex items-start gap-3 sm:gap-3.5 pb-4 sm:pb-5 border-b border-theme-border/60 dark:border-theme-border/40">
        <div
          aria-hidden="true"
          className={[
            'shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border',
            'flex items-center justify-center',
            panelAccent.surface,
          ].join(' ')}
        >
          <PanelIcon size={20} strokeWidth={1.75} />
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

      {showResponseNote && (
        <p className="mt-5 pt-4 border-t border-theme-border/60 dark:border-theme-border/40 text-xs text-ink-muted dark:text-theme-muted leading-relaxed">
          {infoPanel.responseNote.text}
        </p>
      )}
    </aside>
  );
}

export default ContactInfoPanel;
