import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react';
import footerData from '../../data/footer.json';

// Dynamic brand social SVG icons map to prevent any lucide bundle export errors
const SOCIAL_ICONS = {
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  WhatsApp: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 2.115.659 4.079 1.785 5.702l-1.836 5.666 5.808-1.521c1.558.955 3.385 1.503 5.344 1.503 5.502 0 9.96-4.458 9.96-9.96a9.923 9.923 0 00-2.917-7.042A9.923 9.923 0 0012.011 2zm5.55 13.914c-.21.583-1.05 1.077-1.706 1.157-.472.052-1.076.078-3.08-.744-2.555-1.042-4.185-3.6-4.316-3.774-.131-.174-1.05-1.383-1.05-2.637 0-1.254.646-1.867.883-2.118.21-.223.57-.32.84-.32.088 0 .175.004.245.008.219.009.324.022.464.346.175.424.604 1.45.656 1.555.052.105.088.228.018.372-.07.144-.158.24-.315.424-.158.184-.332.398-.472.538-.158.158-.324.328-.14.639.184.31.82 1.343 1.759 2.167 1.207 1.066 2.222 1.393 2.537 1.551.315.157.499.131.69-.079.193-.21.84-.967 1.058-1.298.228-.328.455-.271.761-.157.315.114 1.986.927 2.328 1.1.341.171.569.258.656.398.087.149.087.838-.123 1.428z"/>
    </svg>
  )
};

// Trust points icons map
const WHY_ICONS = {
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
};

/**
 * Footer — Premium dark-themed redesigned footer matching references.
 * Sourced dynamically from src/data/footer.json
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  if (!footerData || !footerData.enabled) return null;

  const { logo, company, socials, quickLinks, contact, whyUs, bottom } = footerData;

  const enabledSocials = socials?.items ? socials.items.filter(s => s.enabled) : [];
  const enabledQuickLinks = quickLinks?.links ? quickLinks.links.filter(l => l.enabled) : [];
  const enabledWhyUs = whyUs?.items ? whyUs.items.filter(i => i.enabled) : [];

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-[#080B11] text-neutral-400 border-t border-neutral-900 relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-8 animate-fade-in"
    >
      {/* ── Custom CSS Animations Block ── */}
      <style>{`
        @keyframes float-note-footer {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        .animate-float-note {
          animation: float-note-footer 4s ease-in-out infinite;
        }
        .animate-float-note-delayed {
          animation: float-note-footer 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-note, .animate-float-note-delayed {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Background Music Wave Equalizer Decoration ── */}
      <div 
        aria-hidden="true" 
        className="absolute left-6 top-10 flex items-end gap-1 h-36 opacity-[0.03] pointer-events-none select-none z-0"
      >
        <span className="w-1 bg-[#FF2E74] h-[60%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[80%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[100%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[40%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[90%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[70%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[50%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[85%] rounded-t-full" />
        <span className="w-1 bg-[#FF2E74] h-[65%] rounded-t-full" />
      </div>

      {/* Floating music note symbols */}
      <div 
        aria-hidden="true" 
        className="absolute right-12 top-20 text-[#FF2E74]/5 text-5xl font-bold select-none pointer-events-none z-0 animate-float-note"
      >
        ♪
      </div>
      <div 
        aria-hidden="true" 
        className="absolute right-36 bottom-32 text-[#FF2E74]/5 text-4xl font-bold select-none pointer-events-none z-0 animate-float-note-delayed"
      >
        ♫
      </div>

      <div className="section-container relative z-10 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* ── Column 1: Brand & Socials ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Logo Wrapper (white card for exact logo colors rendering) */}
            {logo && (
              <Link
                to="/"
                aria-label="LabelAlly Entertainment — Go to homepage"
                className="inline-block focus-ring rounded-xl bg-white p-3.5 w-fit group shadow-sm transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-[72px] object-contain"
                />
              </Link>
            )}

            {/* Description */}
            {company?.description && (
              <p className="text-sm text-neutral-400 leading-relaxed">
                {company.description}
              </p>
            )}

            {/* Follow Us Section */}
            {socials && enabledSocials.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-white text-base tracking-wide mb-4 relative pb-2 select-none">
                  {socials.heading}
                  <span className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#FF2E74] rounded-full" />
                </h3>
                
                <div className="flex items-center gap-2.5 flex-wrap">
                  {enabledSocials.map((item) => {
                    const SvgIcon = SOCIAL_ICONS[item.icon];
                    if (!SvgIcon) return null;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        aria-label={item.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-11 h-11 rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-[#FF2E74] transition-all duration-200 focus-ring hover:shadow-[0_0_10px_rgba(255,46,116,0.2)]"
                      >
                        <SvgIcon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {quickLinks && (
              <>
                <h3 className="font-heading font-bold text-white text-base tracking-wide relative pb-2 select-none">
                  {quickLinks.heading}
                  <span className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#FF2E74] rounded-full" />
                </h3>
                
                <nav aria-label="Quick links navigation">
                  <ul className="flex flex-col gap-0.5">
                    {enabledQuickLinks.map((link) => (
                      <li 
                        key={link.id} 
                        className="border-b border-neutral-900/60 py-2.5 last:border-0 last:pb-0"
                      >
                        <Link
                          to={link.href}
                          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group/link focus-ring rounded"
                        >
                          <ChevronRight 
                            size={14} 
                            className="text-[#FF2E74] transition-transform duration-250 group-hover/link:translate-x-1 shrink-0" 
                          />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
          </div>

          {/* ── Column 3: Contact Us ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {contact && (
              <>
                <h3 className="font-heading font-bold text-white text-base tracking-wide relative pb-2 select-none">
                  {contact.heading}
                  <span className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#FF2E74] rounded-full" />
                </h3>
                
                <address className="not-italic flex flex-col gap-0.5">
                  {/* Address */}
                  {contact.address && contact.address.enabled && (
                    <div className="flex gap-3.5 items-start py-3 border-b border-neutral-900/60">
                      <div className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-900/40 flex items-center justify-center text-[#FF2E74] shrink-0 shadow-inner">
                        <MapPin size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-white text-sm select-none">{contact.address.heading}</h4>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                          {contact.address.value}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {contact.email && contact.email.enabled && (
                    <a
                      href={contact.email.href}
                      className="flex gap-3.5 items-start py-3 border-b border-neutral-900/60 hover:bg-white/[0.01] transition-colors duration-200 focus-ring rounded group"
                    >
                      <div className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-900/40 flex items-center justify-center text-[#FF2E74] shrink-0 shadow-inner group-hover:border-[#FF2E74]/55 transition-colors duration-200">
                        <Mail size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-white text-sm group-hover:text-[#FF2E74] transition-colors duration-200">{contact.email.heading}</h4>
                        <p className="text-xs text-neutral-400 mt-1 break-all">
                          {contact.email.value}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* Phone */}
                  {contact.phone && contact.phone.enabled && (
                    <a
                      href={contact.phone.href}
                      className="flex gap-3.5 items-start py-3 border-b border-neutral-900/60 hover:bg-white/[0.01] transition-colors duration-200 focus-ring rounded group"
                    >
                      <div className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-900/40 flex items-center justify-center text-[#FF2E74] shrink-0 shadow-inner group-hover:border-[#FF2E74]/55 transition-colors duration-200">
                        <Phone size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-white text-sm group-hover:text-[#FF2E74] transition-colors duration-200">{contact.phone.heading}</h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          {contact.phone.value}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {contact.whatsapp && contact.whatsapp.enabled && (
                    <a
                      href={contact.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3.5 items-start py-3 hover:bg-white/[0.01] transition-colors duration-200 focus-ring rounded group"
                    >
                      <div className="w-9 h-9 rounded-full border border-neutral-900 bg-neutral-900/40 flex items-center justify-center text-[#FF2E74] shrink-0 shadow-inner group-hover:border-[#FF2E74]/55 transition-colors duration-200">
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-4 h-4"
                          aria-hidden="true"
                        >
                          <path d="M12.011 2c-5.502 0-9.96 4.458-9.96 9.96 0 2.115.659 4.079 1.785 5.702l-1.836 5.666 5.808-1.521c1.558.955 3.385 1.503 5.344 1.503 5.502 0 9.96-4.458 9.96-9.96a9.923 9.923 0 00-2.917-7.042A9.923 9.923 0 0012.011 2zm5.55 13.914c-.21.583-1.05 1.077-1.706 1.157-.472.052-1.076.078-3.08-.744-2.555-1.042-4.185-3.6-4.316-3.774-.131-.174-1.05-1.383-1.05-2.637 0-1.254.646-1.867.883-2.118.21-.223.57-.32.84-.32.088 0 .175.004.245.008.219.009.324.022.464.346.175.424.604 1.45.656 1.555.052.105.088.228.018.372-.07.144-.158.24-.315.424-.158.184-.332.398-.472.538-.158.158-.324.328-.14.639.184.31.82 1.343 1.759 2.167 1.207 1.066 2.222 1.393 2.537 1.551.315.157.499.131.69-.079.193-.21.84-.967 1.058-1.298.228-.328.455-.271.761-.157.315.114 1.986.927 2.328 1.1.341.171.569.258.656.398.087.149.087.838-.123 1.428z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-white text-sm group-hover:text-[#FF2E74] transition-colors duration-200">{contact.whatsapp.heading}</h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          {contact.whatsapp.value}
                        </p>
                      </div>
                    </a>
                  )}
                </address>
              </>
            )}
          </div>

          {/* ── Column 4: Why LabelAlly? ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {whyUs && enabledWhyUs.length > 0 && (
              <>
                <h3 className="font-heading font-bold text-white text-base tracking-wide relative pb-2 select-none">
                  {whyUs.heading}
                  <span className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#FF2E74] rounded-full" />
                </h3>
                
                <div className="flex flex-col gap-4">
                  {enabledWhyUs.map((item) => {
                    const TrustIcon = WHY_ICONS[item.icon];
                    return (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="text-[#FF2E74] shrink-0 mt-0.5" aria-hidden="true">
                          {TrustIcon && <TrustIcon size={18} />}
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-white text-sm leading-tight">{item.heading}</h4>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      {bottom && (
        <div className="border-t border-neutral-900/80 pt-6">
          <div className="section-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              {/* Copyright */}
              <p className="text-xs text-neutral-500 text-center md:text-left select-none">
                &copy; {currentYear} <span className="text-[#FF2E74] font-semibold">LabelAlly</span> {bottom.copyright}
              </p>

              {/* Legal links */}
              <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs text-neutral-500">
                {bottom.privacyLink?.enabled && (
                  <Link
                    to={bottom.privacyLink.href}
                    className="inline-flex items-center min-h-11 px-1 hover:text-white transition-colors duration-250 focus-ring rounded"
                  >
                    {bottom.privacyLink.label}
                  </Link>
                )}
                {bottom.privacyLink?.enabled && bottom.termsLink?.enabled && (
                  <span className="text-neutral-800" aria-hidden="true">|</span>
                )}
                {bottom.termsLink?.enabled && (
                  <Link
                    to={bottom.termsLink.href}
                    className="inline-flex items-center min-h-11 px-1 hover:text-white transition-colors duration-250 focus-ring rounded"
                  >
                    {bottom.termsLink.label}
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

export default Footer;
