import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import contactData from '../../../data/contact.json';

/**
 * ContactForm — Renders the frontend message input form.
 *
 * Frontend only: prevents default submission behavior.
 * Accessible form markup with explicit labels, correct input types,
 * focus visible outlines, autocomplete attributes, and select menus.
 */
function ContactForm() {
  const { form } = contactData;

  if (!form) return null;

  const handleSubmit = (e) => {
    // Prevent default submission behavior (frontend-only in this phase)
    e.preventDefault();
  };

  return (
    <section
      aria-labelledby="form-heading"
      className="py-16 md:py-24 bg-neutral-900/10 border-t border-neutral-900"
    >
      <Container className="max-w-2xl">
        <SectionHeading
          titleAs="h2"
          title={form.heading}
          description={form.description}
          align="center"
          className="mb-14"
        />

        <Card padding="lg" radius="2xl" bordered hover={false} className="bg-neutral-900/40">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-name" className="text-sm font-semibold text-neutral-300">
                {form.labels.name} <span className="text-accent-400" aria-hidden="true">*</span>
              </label>
              <input
                id="form-name"
                name="name"
                type="text"
                required
                placeholder={form.placeholders.name}
                autoComplete="name"
                className="h-11 px-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-email" className="text-sm font-semibold text-neutral-300">
                {form.labels.email} <span className="text-accent-400" aria-hidden="true">*</span>
              </label>
              <input
                id="form-email"
                name="email"
                type="email"
                required
                placeholder={form.placeholders.email}
                autoComplete="email"
                className="h-11 px-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-phone" className="text-sm font-semibold text-neutral-300">
                {form.labels.phone}
              </label>
              <input
                id="form-phone"
                name="phone"
                type="tel"
                placeholder={form.placeholders.phone}
                autoComplete="tel"
                className="h-11 px-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring"
              />
            </div>

            {/* Company / Label Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-company" className="text-sm font-semibold text-neutral-300">
                {form.labels.company}
              </label>
              <input
                id="form-company"
                name="company"
                type="text"
                placeholder={form.placeholders.company}
                autoComplete="organization"
                className="h-11 px-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring"
              />
            </div>

            {/* Service Interest Dropdown */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-interest" className="text-sm font-semibold text-neutral-300">
                {form.labels.interest} <span className="text-accent-400" aria-hidden="true">*</span>
              </label>
              <select
                id="form-interest"
                name="interest"
                required
                defaultValue=""
                className="h-11 px-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring"
              >
                {form.interests.map((option, index) => (
                  <option key={index} value={index === 0 ? "" : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2">
              <label htmlFor="form-message" className="text-sm font-semibold text-neutral-300">
                {form.labels.message} <span className="text-accent-400" aria-hidden="true">*</span>
              </label>
              <textarea
                id="form-message"
                name="message"
                rows={5}
                required
                placeholder={form.placeholders.message}
                className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus-ring resize-y min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
              >
                {form.labels.submit}
              </Button>
            </div>

          </form>
        </Card>
      </Container>
    </section>
  );
}

export default ContactForm;
