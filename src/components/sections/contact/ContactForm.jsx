import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Container from '../../common/Container';
import SectionHeading from '../../common/SectionHeading';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { contactSchema } from '../../../schemas/contactSchema';
import { sendContactForm } from '../../../services/contactApi';
import contactData from '../../../data/contact.json';

/**
 * ContactForm — Converted to premium light theme.
 */
function ContactForm() {
  const { form } = contactData;
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | serverError | rateLimited | networkError
  const statusRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      service: '',
      message: '',
      consent: false,
      website: '', // Honeypot
    },
  });

  // Watch message value for reactive character count
  const messageVal = watch('message', '');
  const messageCharCount = messageVal.length;

  useEffect(() => {
    if (formStatus !== 'idle' && statusRef.current) {
      statusRef.current.focus();
    }
  }, [formStatus]);

  if (!form) return null;

  const onSubmit = async (data) => {
    setFormStatus('submitting');
    try {
      await sendContactForm(data);
      setFormStatus('success');
      reset();
    } catch (err) {
      console.error('Submission request failed:', err);
      if (err.status === 429) {
        setFormStatus('rateLimited');
      } else if (err.status === 'network') {
        setFormStatus('networkError');
      } else {
        setFormStatus('serverError');
      }
    }
  };

  return (
    <section
      aria-labelledby="form-heading"
      className="py-16 md:py-24 bg-neutral-50 border-t border-neutral-100"
    >
      <Container className="max-w-2xl animate-fade-in">
        <SectionHeading
          titleAs="h2"
          title={form.heading}
          description={form.description}
          align="center"
          className="mb-14"
        />

        <Card padding="lg" radius="2xl" bordered hover={false} className="bg-white relative overflow-hidden shadow-md">
          
          {/* ── SUCCESS STATE UI ── */}
          {formStatus === 'success' && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center text-center py-10 px-4 gap-6 outline-none"
            >
              <div aria-hidden="true" className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={32} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold font-heading text-neutral-900">
                  {form.status.success.heading}
                </h3>
                <p className="text-sm text-neutral-900 max-w-sm leading-relaxed">
                  {form.status.success.message}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setFormStatus('idle')}
                rightIcon={<ArrowRight size={16} />}
              >
                Send Another Message
              </Button>
            </div>
          )}

          {/* ── STANDARD FORM UI ── */}
          {formStatus !== 'success' && (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
              
              {/* ── Honeypot field (Website) ── */}
              <div className="absolute -z-50 opacity-0 h-0 w-0 pointer-events-none" aria-hidden="true">
                <label htmlFor="form-website">Website</label>
                <input
                  id="form-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-name" className="text-sm font-semibold text-neutral-700">
                  {form.labels.name} <span className="text-accent-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="form-name"
                  type="text"
                  placeholder={form.placeholders.name}
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={[
                    'h-11 px-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring transition-colors duration-250',
                    errors.name ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('name')}
                />
                {errors.name && (
                  <span id="name-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Address Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-email" className="text-sm font-semibold text-neutral-700">
                  {form.labels.email} <span className="text-accent-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  placeholder={form.placeholders.email}
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={[
                    'h-11 px-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring transition-colors duration-250',
                    errors.email ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('email')}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-phone" className="text-sm font-semibold text-neutral-700">
                  {form.labels.phone} <span className="text-accent-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  placeholder={form.placeholders.phone}
                  autoComplete="tel"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={[
                    'h-11 px-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring transition-colors duration-250',
                    errors.phone ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('phone')}
                />
                {errors.phone && (
                  <span id="phone-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Company / Label Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-company" className="text-sm font-semibold text-neutral-700">
                  {form.labels.company}
                </label>
                <input
                  id="form-company"
                  type="text"
                  placeholder={form.placeholders.company}
                  autoComplete="organization"
                  aria-invalid={errors.company ? 'true' : 'false'}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                  className={[
                    'h-11 px-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring transition-colors duration-250',
                    errors.company ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('company')}
                />
                {errors.company && (
                  <span id="company-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.company.message}
                  </span>
                )}
              </div>

              {/* Service Selection Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-interest" className="text-sm font-semibold text-neutral-700">
                  {form.labels.interest} <span className="text-accent-600" aria-hidden="true">*</span>
                </label>
                <select
                  id="form-interest"
                  aria-invalid={errors.service ? 'true' : 'false'}
                  aria-describedby={errors.service ? 'interest-error' : undefined}
                  className={[
                    'h-11 px-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring transition-colors duration-250',
                    errors.service ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('service')}
                >
                  {form.interests.map((option, index) => (
                    <option key={index} value={index === 0 ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span id="interest-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.service.message}
                  </span>
                )}
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="form-message" className="text-sm font-semibold text-neutral-700">
                    {form.labels.message} <span className="text-accent-600" aria-hidden="true">*</span>
                  </label>
                  <span
                    className={[
                      'text-xs',
                      messageCharCount > 1500 ? 'text-red-500' : 'text-neutral-600',
                    ].join(' ')}
                    aria-live="polite"
                  >
                    {messageCharCount} / 1500
                  </span>
                </div>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder={form.placeholders.message}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={[
                    'p-4 rounded-lg bg-white border text-neutral-900 text-sm focus-ring resize-y min-h-[120px] transition-colors duration-250',
                    errors.message ? 'border-red-400 focus-visible:ring-red-500' : 'border-neutral-200 hover:border-neutral-300',
                  ].join(' ')}
                  {...register('message')}
                />
                {errors.message && (
                  <span id="message-error" className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <input
                    id="form-consent"
                    type="checkbox"
                    aria-invalid={errors.consent ? 'true' : 'false'}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className={[
                      'mt-1 w-4 h-4 rounded border text-primary-600 focus-ring cursor-pointer bg-white',
                      errors.consent ? 'border-red-400' : 'border-neutral-300',
                    ].join(' ')}
                    {...register('consent')}
                  />
                  <label htmlFor="form-consent" className="text-xs text-neutral-900 leading-normal select-none cursor-pointer">
                    I agree that LabelAlly Entertainment may use my submitted information to contact me regarding this enquiry. Read our{' '}
                    <Link
                      to="/privacy-policy"
                      className="text-primary-600 hover:text-primary-500 transition-colors focus-ring rounded"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {errors.consent && (
                  <span id="consent-error" className="text-xs text-red-500 flex items-center gap-1.5" role="alert">
                    <AlertCircle size={14} />
                    {errors.consent.message}
                  </span>
                )}
              </div>

              {/* ── Global Submission Errors ── */}
              {formStatus === 'serverError' && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm outline-none"
                >
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <p>{form.status.errors.serverError}</p>
                </div>
              )}

              {formStatus === 'rateLimited' && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm outline-none"
                >
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <p>{form.status.errors.rateLimited}</p>
                </div>
              )}

              {formStatus === 'networkError' && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm outline-none"
                >
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <p>{form.status.errors.networkError}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={formStatus === 'submitting'}
                >
                  {form.labels.submit}
                </Button>
              </div>

            </form>
          )}

        </Card>
      </Container>
    </section>
  );
}

export default ContactForm;
