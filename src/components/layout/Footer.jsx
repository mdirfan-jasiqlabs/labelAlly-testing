import { Link } from 'react-router-dom';
import {
  AtSign,
  Send,
  Globe,
  Share2,
  Music,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import footerData from '../../data/footer.json';

/**
 * Maps the icon string from footer.json to the Lucide component.
 */
const SOCIAL_ICON_MAP = {
  AtSign,
  Send,
  Globe,
  Share2,
  Music,
};

/**
 * Footer — Converted to premium light theme.
 * Content source: src/data/footer.json
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-neutral-50 border-t border-neutral-200/80 text-neutral-600"
    >
      {/* ── Main Footer Body ── */}
      <div className="section-container py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* ── Brand Column (wider) ── */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link
              to="/"
              aria-label="LabelAlly Entertainment — Go to homepage"
              className="inline-flex items-center focus-ring rounded-md w-fit group"
            >
              <img
                src="/logo.jpeg"
                alt="LabelAlly Entertainment Logo"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-16 w-24 md:h-20 md:w-[120px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Description */}
            <p className="text-sm text-neutral-900 leading-relaxed max-w-xs">
              {footerData.company.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              {footerData.social.map((item) => {
                const IconComponent = SOCIAL_ICON_MAP[item.icon];
                if (!item.href || !IconComponent) return null;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'flex items-center justify-center',
                      'w-9 h-9 rounded-lg',
                      'bg-white hover:bg-neutral-100',
                      'text-neutral-900 hover:text-neutral-900',
                      'border border-neutral-200 hover:border-neutral-300',
                      'transition-all duration-250',
                      'focus-ring',
                    ].join(' ')}
                  >
                    <IconComponent size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            {/* Tagline */}
            <p className="text-xs text-neutral-600 italic">
              {footerData.company.tagline}
            </p>
          </div>

          {/* ── Navigation Groups ── */}
          {footerData.groups.map((group) => (
            <nav
              key={group.id}
              aria-label={`${group.heading} navigation`}
              className="flex flex-col gap-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                {group.heading}
              </p>
              <ul role="list" className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-250 focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ── Contact Column ── */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
              {footerData.contact.heading}
            </p>
            <address className="not-italic flex flex-col gap-3">
              {/* Email */}
              {footerData.contact.email && (
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-start gap-2.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-250 focus-ring rounded group break-all"
                >
                  <Mail
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-neutral-600 group-hover:text-primary-600 transition-colors duration-250"
                  />
                  <span>{footerData.contact.email}</span>
                </a>
              )}

              {/* Phone */}
              {footerData.contact.phone && (
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex items-start gap-2.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-250 focus-ring rounded group break-words"
                >
                  <Phone
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-neutral-600 group-hover:text-primary-600 transition-colors duration-250"
                  />
                  <span>{footerData.contact.phone}</span>
                </a>
              )}

              {/* Address */}
              {footerData.contact.address && (
                <p className="flex items-start gap-2.5 text-sm text-neutral-600 break-words">
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-neutral-600"
                  />
                  <span>{footerData.contact.address}</span>
                </p>
              )}

              {/* Placeholder when all contact fields are empty */}
              {!footerData.contact.email &&
               !footerData.contact.phone &&
               !footerData.contact.address && (
                <p className="text-sm text-neutral-600 italic">
                  Contact details coming soon.
                </p>
              )}
            </address>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-neutral-200/80">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <p className="text-xs text-neutral-600 text-center sm:text-left">
              &copy; {currentYear} {footerData.bottom.copyright}
            </p>

            {/* Legal links */}
            <nav aria-label="Legal navigation" className="flex items-center gap-4 flex-wrap justify-center">
              <Link
                to={footerData.bottom.privacyLink.href}
                className="text-xs text-neutral-600 hover:text-neutral-600 transition-colors duration-250 focus-ring rounded"
              >
                {footerData.bottom.privacyLink.label}
              </Link>
              <span className="text-neutral-200" aria-hidden="true">·</span>
              <Link
                to={footerData.bottom.termsLink.href}
                className="text-xs text-neutral-600 hover:text-neutral-600 transition-colors duration-250 focus-ring rounded"
              >
                {footerData.bottom.termsLink.label}
              </Link>
            </nav>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
