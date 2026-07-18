import ContactHero    from '../components/sections/contact/ContactHero';
import ContactMethods from '../components/sections/contact/ContactMethods';
import ContactForm    from '../components/sections/contact/ContactForm';
import SEO            from '../components/common/SEO';

/**
 * ContactPage — Route: /contact
 *
 * Renders the full Contact page layout.
 * Content is sourced from src/data/contact.json.
 */
function ContactPage() {
  return (
    <main aria-label="Contact LabelAlly Entertainment">
      <SEO
        title="Contact LabelAlly Entertainment | Start Your Enquiry"
        description="Contact LabelAlly Entertainment to discuss music distribution, YouTube management, content rights, OTT distribution, and revenue optimization services."
        canonical="https://label-ally-testing.vercel.app/contact"
      />
      <ContactHero />
      <ContactMethods />
      <ContactForm />
    </main>
  );
}

export default ContactPage;
