import ContactMethodItem from './ContactMethodItem';

/**
 * ContactDetailsStrip — mobile 1-col, tablet 2-col, desktop 3-col.
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
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/60 dark:border-theme-border/40',
        'shadow-card dark:shadow-theme',
        'px-4 py-2 sm:px-6 sm:py-5 md:px-8 md:py-6',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <ul
        className={[
          'list-none m-0 p-0',
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'gap-0',
        ].join(' ')}
      >
        {channels.map((channel, index) => {
          const isLast = index === count - 1;
          const isOddLastOnSm = count % 2 === 1 && isLast;

          return (
            <li
              key={channel.id}
              className={[
                'min-w-0',
                'py-4 first:pt-3 last:pb-3',
                'sm:py-2 sm:px-4 sm:first:pl-0',
                index > 0
                  ? 'border-t border-theme-border/50 dark:border-theme-border/40 sm:border-t-0'
                  : '',
                index % 2 === 1 ? 'sm:border-l sm:border-theme-border/50 dark:sm:border-theme-border/40' : '',
                index >= 2
                  ? 'sm:col-span-2 sm:border-l-0 sm:border-t sm:mt-3 sm:pt-4 lg:col-span-1 lg:border-t-0 lg:border-l lg:mt-0 lg:pt-2 lg:pl-4'
                  : '',
                isOddLastOnSm ? 'sm:col-span-2 lg:col-span-1' : '',
                isLast ? 'lg:pr-0' : '',
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
