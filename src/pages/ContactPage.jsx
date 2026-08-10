import ContactFormSection  from '../components/sections/contact/ContactFormSection';
import WhatsAppCTA         from '../components/sections/contact/WhatsAppCTA';
import SEO                 from '../components/common/SEO';

/**
 * ContactPage — Route: /contact
 *
 * Renders the Contact page layout.
 * Content is sourced from src/data/contactData.js
 * (form section; verified channels from footer.json).
 */
function ContactPage() {
  return (
    <main aria-label="Contact LabelAlly Entertainment">
      <SEO
        title="Contact LabelAlly Entertainment"
        description="Contact LabelAlly Entertainment to discuss YouTube channel management, rights management, monetization support, and music distribution management."
        canonical="/contact"
      />
      <ContactFormSection />
      <WhatsAppCTA />
    </main>
  );
}

export default ContactPage;
