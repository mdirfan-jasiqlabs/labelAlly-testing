import { Link } from 'react-router-dom';
import { navigation, company } from '../../config/site';

/**
 * Footer — Persistent bottom layout section.
 *
 * Phase 1: Minimal boilerplate only.
 * - Semantic <footer> landmark
 * - Footer navigation columns from site config
 * - Copyright notice
 * - No social icons (Phase 2+)
 * - No animations (Phase 2+)
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-neutral-800 bg-neutral-950"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="section-container py-12 lg:py-16">
        {/* ── Footer Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Company Column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Company
            </p>
            <ul className="space-y-2" role="list">
              {navigation.footer.company.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="link-base text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Services
            </p>
            <ul className="space-y-2" role="list">
              {navigation.footer.services.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="link-base text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Partners
            </p>
            <ul className="space-y-2" role="list">
              {navigation.footer.partners.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="link-base text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Legal
            </p>
            <ul className="space-y-2" role="list">
              {navigation.footer.legal.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="link-base text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} {company.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-neutral-600">
            {company.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
