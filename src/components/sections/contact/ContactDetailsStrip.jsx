import ContactMethodItem from './ContactMethodItem';

/**
 * ContactDetailsStrip — Full-width address / phone / email strip.
 */
function ContactDetailsStrip({ channels }) {
  if (!channels?.length) return null;

  return (
    <div
      role="region"
      aria-label="Quick contact details"
      className={[
        'w-full',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-card dark:shadow-theme',
        'px-5 py-5 sm:px-6 sm:py-6 md:px-8',
      ].join(' ')}
    >
      <ul
        className={[
          'list-none m-0 p-0',
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          'gap-0',
        ].join(' ')}
      >
        {channels.map((channel, index) => (
          <li
            key={channel.id}
            className={[
              'min-w-0',
              'py-4 first:pt-0 last:pb-0',
              'md:py-0 md:px-5 md:first:pl-0 md:last:pr-0',
              index > 0
                ? 'border-t border-theme-border/60 dark:border-theme-border/40 md:border-t-0 md:border-l'
                : '',
              // On tablet 2-col: second item has left border; third wraps full
              index === 2 ? 'md:col-span-2 md:border-l-0 md:border-t md:pt-5 md:mt-5 lg:col-span-1 lg:border-t-0 lg:border-l lg:pt-0 lg:mt-0 lg:pl-5' : '',
            ].join(' ')}
          >
            <ContactMethodItem channel={channel} layout="strip" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactDetailsStrip;
