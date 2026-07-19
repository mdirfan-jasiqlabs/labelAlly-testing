import { Headphones, Target, CheckCircle2 } from 'lucide-react';

/**
 * AboutInfoGroup — Reusable information block (e.g. What We Do, Why Choose Us).
 * Renders a left-side rounded-square icon and right-side bullet list.
 */
function AboutInfoGroup({ title, icon, items }) {
  if (!items || items.length === 0) return null;

  // Filter enabled items
  const enabledItems = items.filter((item) => item.enabled);
  if (enabledItems.length === 0) return null;

  // Map icon key to Lucide icon component
  const IconComponent = icon === 'headphones' ? Headphones : Target;

  return (
    <div className="flex flex-col xs:flex-row gap-4 xs:gap-5 md:gap-6 items-start py-4 md:py-5 min-w-0">
      {/* Left Column: Rounded Square Icon Container */}
      <div
        aria-hidden="true"
        className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-100/50 dark:border-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-sm"
      >
        <IconComponent size={26} strokeWidth={1.8} className="md:w-[28px] md:h-[28px]" />
      </div>

      {/* Right Column: Title and Bullet List */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4 text-left">
        <h3 className="font-heading font-black text-lg sm:text-xl md:text-2xl text-neutral-900 dark:text-theme-heading leading-snug text-balance">
          {title}
        </h3>

        {/* Single column until intro two-column layout is active */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 w-full">
          {enabledItems.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2.5 text-sm sm:text-[0.92rem] text-neutral-600 dark:text-theme-body leading-snug"
            >
              {/* Checkmark icon with brand accent */}
              <span className="shrink-0 mt-0.5 text-pink-600 dark:text-pink-500" aria-hidden="true">
                <CheckCircle2 size={15} strokeWidth={2.5} fill="currentColor" className="text-white dark:text-slate-900" />
              </span>
              <span className="break-words">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AboutInfoGroup;
