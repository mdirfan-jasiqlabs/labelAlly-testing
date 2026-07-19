import ContactMethodItem from './ContactMethodItem';
import { resolveContactIcon, resolveContactAccent } from './contactFormMaps';

/**
 * ContactInfoPanel — Left contact-information card (reference layout).
 */
function ContactInfoPanel({ infoPanel, channels }) {
  if (!infoPanel?.enabled || !channels?.length) return null;

  const PanelIcon = resolveContactIcon(infoPanel.icon || 'headphones');
  const panelAccent = resolveContactAccent('orange');
  const showResponseNote = Boolean(
    infoPanel.responseNote?.enabled && infoPanel.responseNote?.text
  );
  const NoteIcon = resolveContactIcon(infoPanel.responseNote?.icon || 'clock');

  return (
    <aside
      aria-labelledby="contact-info-heading"
      className={[
        'h-full flex flex-col overflow-hidden',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/60 dark:border-theme-border/40',
        'shadow-card dark:shadow-theme',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
        <div className="flex items-start gap-3 sm:gap-3.5 pb-5 border-b border-theme-border/50 dark:border-theme-border/40">
          <div
            aria-hidden="true"
            className={[
              'shrink-0 w-12 h-12 rounded-full border',
              'flex items-center justify-center',
              panelAccent.surface,
            ].join(' ')}
          >
            <PanelIcon size={22} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 pt-0.5">
            <h3
              id="contact-info-heading"
              className="text-lg sm:text-xl font-bold font-heading text-ink-primary dark:text-theme-heading leading-snug"
            >
              {infoPanel.title}
            </h3>
            {infoPanel.description && (
              <p className="mt-1 text-sm text-ink-muted dark:text-theme-muted leading-relaxed">
                {infoPanel.description}
              </p>
            )}
          </div>
        </div>

        <ul className="list-none m-0 p-0 divide-y divide-theme-border/50 dark:divide-theme-border/40 flex-1">
          {channels.map((channel) => (
            <li key={channel.id}>
              <ContactMethodItem channel={channel} layout="panel" />
            </li>
          ))}
        </ul>
      </div>

      {showResponseNote && (
        <div
          className={[
            'mt-auto px-5 py-3.5 sm:px-6 sm:py-4',
            'bg-violet-50 dark:bg-violet-950/40',
            'border-t border-violet-100 dark:border-violet-900/40',
            'flex items-start gap-2.5',
          ].join(' ')}
        >
          <span
            aria-hidden="true"
            className="shrink-0 mt-0.5 text-violet-500 dark:text-violet-300"
          >
            <NoteIcon size={16} strokeWidth={2} />
          </span>
          <p className="text-xs sm:text-sm text-violet-800 dark:text-violet-200 leading-relaxed">
            {infoPanel.responseNote.text}
          </p>
        </div>
      )}
    </aside>
  );
}

export default ContactInfoPanel;
