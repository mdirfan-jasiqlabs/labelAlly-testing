import ContactHero    from '../components/sections/contact/ContactHero';
import ContactMethods from '../components/sections/contact/ContactMethods';
import ContactForm    from '../components/sections/contact/ContactForm';

/**
 * ContactPage — Route: /contact
 *
 * Renders the full Contact page layout.
 * Content is sourced from src/data/contact.json.
 */
function ContactPage() {
  return (
    <main aria-label="Contact LabelAlly Entertainment">
      <ContactHero />
      <ContactMethods />
      <ContactForm />
    </main>
  );
}

export default ContactPage;
