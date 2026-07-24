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
        title="Contact LabelAlly Entertainment | Start Your Enquiry"
        description="Contact LabelAlly Entertainment to discuss music distribution, YouTube management, content rights, OTT distribution, and revenue optimization services."
        canonical="https://label-ally-testing.vercel.app/contact"
      />
      <ContactFormSection />
      <WhatsAppCTA />
    </main>
  );
}

export default ContactPage;
