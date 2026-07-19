import ContactMethodItem from './ContactMethodItem';

/**
 * ContactDetailsStrip — Full-width address / phone / email strip.
 * Mobile: 1 col + horizontal dividers
 * Tablet: 2 cols
 * Desktop: 3 equal cols + vertical dividers
 */
function ContactDetailsStrip({ channels }) {
  if (!channels?.length) return null;

  const count = channels.length;

  return (
    <div
      role="region"
      aria-label="Quick contact details"
      className={[
        'w-full',
        'rounded-card sm:rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-card dark:shadow-theme',
        'px-4 py-4 sm:px-6 sm:py-6 md:px-8',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <ul
        className={[
          'list-none m-0 p-0',
          'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          'gap-0',
        ].join(' ')}
      >
        {channels.map((channel, index) => {
          const isLast = index === count - 1;
          const isOddLastOnTablet = count % 2 === 1 && isLast;

          return (
            <li
              key={channel.id}
              className={[
                'min-w-0',
                'py-4 first:pt-0 last:pb-0',
                'md:py-0 md:px-5 md:first:pl-0',
                index > 0
                  ? 'border-t border-theme-border/60 dark:border-theme-border/40 md:border-t-0'
                  : '',
                index > 0 && index % 2 === 1
                  ? 'md:border-l'
                  : '',
                index >= 2
                  ? 'xl:border-l md:border-t xl:border-t-0 md:pt-5 md:mt-5 xl:pt-0 xl:mt-0 xl:pl-5'
                  : '',
                isOddLastOnTablet
                  ? 'md:col-span-2 xl:col-span-1'
                  : '',
                isLast ? 'md:last:pr-0' : '',
              ].join(' ')}
            >
              <ContactMethodItem channel={channel} layout="strip" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContactDetailsStrip;
