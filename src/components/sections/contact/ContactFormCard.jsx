import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  Building2,
  ListFilter,
  MessageSquare,
  Send,
} from 'lucide-react';
import Button from '../../common/Button';
import { contactSchema } from '../../../schemas/contactSchema';
import { sendContactForm } from '../../../services/contactApi';
import contactData from '../../../data/contact.json';

const inputBase = [
  'w-full h-11 pl-10 pr-4 rounded-xl',
  'bg-surface-page dark:bg-theme-page',
  'border text-sm text-ink-primary dark:text-theme-heading',
  'placeholder:text-ink-muted/70 dark:placeholder:text-theme-muted/70',
  'focus-ring transition-colors duration-250',
].join(' ');

const selectBase = [
  'w-full h-11 pl-10 pr-8 rounded-xl appearance-none',
  'bg-surface-page dark:bg-theme-page',
  'border text-sm text-ink-primary dark:text-theme-heading',
  'focus-ring transition-colors duration-250',
].join(' ');

const textareaBase = [
  'w-full min-h-[140px] pl-10 pr-4 py-3 rounded-xl resize-y',
  'bg-surface-page dark:bg-theme-page',
  'border text-sm text-ink-primary dark:text-theme-heading',
  'placeholder:text-ink-muted/70 dark:placeholder:text-theme-muted/70',
  'focus-ring transition-colors duration-250',
].join(' ');

function fieldBorder(hasError) {
  return hasError
    ? 'border-red-400 focus-visible:ring-red-500'
    : 'border-theme-border/80 dark:border-theme-border hover:border-neutral-300 dark:hover:border-theme-border';
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} className="text-xs text-red-500 mt-1 flex items-center gap-1.5" role="alert">
      <AlertCircle size={14} aria-hidden="true" />
      {message}
    </span>
  );
}

/**
 * ContactFormCard — Right-side form card. Preserves existing submit / validation flow.
 * Subject is intentionally omitted — not supported in schema/API/email template.
 */
function ContactFormCard({ formCard }) {
  const { form } = contactData;
  const [formStatus, setFormStatus] = useState('idle');
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
      website: '',
    },
  });

  const messageVal = watch('message', '');
  const messageCharCount = messageVal.length;

  useEffect(() => {
    if (formStatus !== 'idle' && statusRef.current) {
      statusRef.current.focus();
    }
  }, [formStatus]);

  if (!form) return null;

  const heading = formCard?.heading || form.heading;
  const description = formCard?.description || form.description;

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
    <div
      className={[
        'h-full flex flex-col',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/70 dark:border-theme-border/50',
        'shadow-card dark:shadow-theme',
        'p-5 sm:p-6 md:p-8',
        'relative overflow-hidden',
      ].join(' ')}
    >
      <div className="mb-6 sm:mb-7">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink-primary dark:text-theme-heading">
          {heading}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-ink-muted dark:text-theme-muted leading-relaxed max-w-prose">
            {description}
          </p>
        )}
      </div>

      {formStatus === 'success' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center text-center py-10 px-4 gap-6 outline-none flex-1"
        >
          <div
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 size={32} />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-bold font-heading text-ink-primary dark:text-theme-heading">
              {form.status.success.heading}
            </h4>
            <p className="text-sm text-ink-secondary dark:text-theme-body max-w-sm leading-relaxed mx-auto">
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

      {formStatus !== 'success' && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
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

          {/* Row 1: Name | Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {form.labels.name} <span className="text-brand-orange" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  id="form-name"
                  type="text"
                  placeholder={form.placeholders.name}
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={[inputBase, fieldBorder(errors.name)].join(' ')}
                  {...register('name')}
                />
              </div>
              <FieldError id="name-error" message={errors.name?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-email" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {form.labels.email} <span className="text-brand-orange" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  id="form-email"
                  type="email"
                  placeholder={form.placeholders.email}
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={[inputBase, fieldBorder(errors.email)].join(' ')}
                  {...register('email')}
                />
              </div>
              <FieldError id="email-error" message={errors.email?.message} />
            </div>
          </div>

          {/* Row 2: Phone | Company (Subject not in schema/API — keep existing optional company) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-phone" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {form.labels.phone} <span className="text-brand-orange" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                  <Phone size={16} />
                </span>
                <input
                  id="form-phone"
                  type="tel"
                  placeholder={form.placeholders.phone}
                  autoComplete="tel"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={[inputBase, fieldBorder(errors.phone)].join(' ')}
                  {...register('phone')}
                />
              </div>
              <FieldError id="phone-error" message={errors.phone?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-company" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {form.labels.company}
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                  <Building2 size={16} />
                </span>
                <input
                  id="form-company"
                  type="text"
                  placeholder={form.placeholders.company}
                  autoComplete="organization"
                  aria-invalid={errors.company ? 'true' : 'false'}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                  className={[inputBase, fieldBorder(errors.company)].join(' ')}
                  {...register('company')}
                />
              </div>
              <FieldError id="company-error" message={errors.company?.message} />
            </div>
          </div>

          {/* Service Interest — required by existing schema */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-interest" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
              {form.labels.interest} <span className="text-brand-orange" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none z-[1]">
                <ListFilter size={16} />
              </span>
              <select
                id="form-interest"
                aria-invalid={errors.service ? 'true' : 'false'}
                aria-describedby={errors.service ? 'interest-error' : undefined}
                className={[selectBase, fieldBorder(errors.service)].join(' ')}
                {...register('service')}
              >
                {form.interests.map((option, index) => (
                  <option key={option} value={index === 0 ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <FieldError id="interest-error" message={errors.service?.message} />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center gap-3">
              <label htmlFor="form-message" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {form.labels.message} <span className="text-brand-orange" aria-hidden="true">*</span>
              </label>
              <span
                className={[
                  'text-xs tabular-nums',
                  messageCharCount > 1500 ? 'text-red-500' : 'text-ink-muted dark:text-theme-muted',
                ].join(' ')}
                aria-live="polite"
              >
                {messageCharCount} / 1500
              </span>
            </div>
            <div className="relative">
              <span aria-hidden="true" className="absolute left-3 top-3.5 text-ink-muted dark:text-theme-muted pointer-events-none">
                <MessageSquare size={16} />
              </span>
              <textarea
                id="form-message"
                rows={5}
                placeholder={form.placeholders.message}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={[textareaBase, fieldBorder(errors.message)].join(' ')}
                {...register('message')}
              />
            </div>
            <FieldError id="message-error" message={errors.message?.message} />
          </div>

          {/* Consent */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input
                id="form-consent"
                type="checkbox"
                aria-invalid={errors.consent ? 'true' : 'false'}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                className={[
                  'mt-1 w-4 h-4 rounded border text-brand-orange focus-ring cursor-pointer bg-surface-page dark:bg-theme-page',
                  errors.consent ? 'border-red-400' : 'border-theme-border',
                ].join(' ')}
                {...register('consent')}
              />
              <label htmlFor="form-consent" className="text-xs text-ink-secondary dark:text-theme-body leading-relaxed select-none cursor-pointer">
                {form.labels.consent}{' '}
                Read our{' '}
                <Link
                  to="/privacy-policy"
                  className="text-brand-orange hover:opacity-80 transition-opacity focus-ring rounded"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            <FieldError id="consent-error" message={errors.consent?.message} />
          </div>

          {formStatus === 'serverError' && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm outline-none"
            >
              <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
              <p>{form.status.errors.serverError}</p>
            </div>
          )}

          {formStatus === 'rateLimited' && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm outline-none"
            >
              <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
              <p>{form.status.errors.rateLimited}</p>
            </div>
          )}

          {formStatus === 'networkError' && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm outline-none"
            >
              <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
              <p>{form.status.errors.networkError}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={formStatus === 'submitting'}
            leftIcon={<Send size={18} />}
            className={[
              '!bg-gradient-to-r !from-brand-orange !to-brand-pink',
              '!border-transparent !text-white',
              'shadow-md hover:shadow-lg hover:!opacity-95',
              '!ring-offset-surface-page dark:!ring-offset-theme-page',
            ].join(' ')}
          >
            {form.labels.submit}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ContactFormCard;
