import { Link, NavLink } from 'react-router-dom';
import { navigation, company } from '../../config/site';

/**
 * Header — Persistent top navigation bar.
 *
 * Phase 1: Minimal boilerplate only.
 * - Semantic <header> landmark
 * - Logo / company name linked to homepage
 * - Primary navigation from site config
 * - No mobile menu (Phase 2+)
 * - No animations (Phase 2+)
 */
function Header() {
  return (
    <header
      className="sticky top-0 z-200 w-full glass-strong border-b border-neutral-800"
      role="banner"
    >
      <div className="section-container">
        <nav
          className="flex items-center justify-between h-[var(--header-height)]"
          aria-label="Main navigation"
        >
          {/* ── Logo / Brand ── */}
          <Link
            to="/"
            className="focus-ring rounded-md"
            aria-label={`${company.name} — Go to homepage`}
          >
            <span className="font-heading text-xl font-bold text-neutral-50">
              {company.name}
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <ul
            className="hidden md:flex items-center gap-8"
            role="list"
          >
            {navigation.primary.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    [
                      'text-sm font-medium transition-colors duration-250 focus-ring rounded-md px-1 py-0.5',
                      isActive
                        ? 'text-accent-400'
                        : 'text-neutral-400 hover:text-neutral-50',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA Placeholder (Phase 2+) ── */}
          <div className="hidden md:block w-32" aria-hidden="true" />
        </nav>
      </div>
    </header>
  );
}

export default Header;
