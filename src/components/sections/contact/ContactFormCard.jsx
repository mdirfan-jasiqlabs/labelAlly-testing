import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../../common/Button';
import { contactSchema } from '../../../schemas/contactSchema';
import { sendContactForm } from '../../../services/contactApi';
import { getEnabledInterests } from '../../../data/contactData';
import { resolveContactIcon } from './contactFormMaps';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1.5" role="alert">
      <AlertCircle size={14} aria-hidden="true" />
      {message}
    </span>
  );
}

function FieldIcon({ iconKey }) {
  const Icon = resolveContactIcon(iconKey);
  return <Icon size={16} aria-hidden="true" />;
}

function controlClass(base, hasError) {
  return [base, hasError ? 'form-control-invalid' : ''].filter(Boolean).join(' ');
}

/**
 * ContactFormCard — Reference form layout.
 * Subject (Optional) maps to API `company`. Hidden `service` defaults for schema.
 */
function ContactFormCard({ formConfig }) {
  const [formStatus, setFormStatus] = useState('idle');
  const statusRef = useRef(null);

  const defaultService = formConfig?.defaultService || 'Other';
  const showServiceField = formConfig?.fields?.service?.enabled === true;

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
      service: defaultService,
      message: '',
      consent: false,
      website: '',
    },
  });

  const fields = formConfig?.fields ?? {};
  const interests = getEnabledInterests({ form: formConfig });
  const messageMax = fields.message?.maxLength ?? 1500;
  const messageVal = watch('message', '');
  const messageCharCount = messageVal.length;
  const isSubmitting = formStatus === 'submitting';
  const SendIcon = resolveContactIcon('send');
  const LockIcon = resolveContactIcon(formConfig?.securityNote?.icon || 'lock');

  useEffect(() => {
    if (formStatus !== 'idle' && statusRef.current) {
      statusRef.current.focus();
    }
  }, [formStatus]);

  if (!formConfig) return null;

  const onSubmit = async (data) => {
    setFormStatus('submitting');
    try {
      await sendContactForm({
        ...data,
        service: data.service || defaultService,
      });
      setFormStatus('success');
      reset({
        name: '',
        phone: '',
        email: '',
        company: '',
        service: defaultService,
        message: '',
        consent: false,
        website: '',
      });
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

  const showSecurityNote = Boolean(
    formConfig.securityNote?.enabled && formConfig.securityNote?.text
  );

  return (
    <div
      className={[
        'h-full flex flex-col',
        'rounded-2xl',
        'bg-surface-card dark:bg-theme-card',
        'border border-theme-border/60 dark:border-theme-border/40',
        'shadow-card dark:shadow-theme',
        'p-5 sm:p-6 md:p-8',
        'relative',
        'transition-colors duration-250 motion-reduce:transition-none',
      ].join(' ')}
    >
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink-primary dark:text-theme-heading">
          {formConfig.title}
        </h3>
        {formConfig.description && (
          <p className="mt-1.5 sm:mt-2 text-sm text-ink-muted dark:text-theme-muted leading-relaxed">
            {formConfig.description}
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
              {formConfig.status.success.heading}
            </h4>
            <p className="text-sm text-ink-secondary dark:text-theme-body max-w-sm leading-relaxed mx-auto">
              {formConfig.status.success.message}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setFormStatus('idle')}
            rightIcon={<ArrowRight size={16} />}
          >
            {formConfig.sendAnotherLabel}
          </Button>
        </div>
      )}

      {formStatus !== 'success' && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5" noValidate>
          <div className="absolute -z-50 opacity-0 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <label htmlFor="form-website">Website</label>
            <input
              id="form-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('website')}
            />
          </div>

          {!showServiceField && (
            <input type="hidden" {...register('service')} />
          )}

          {/* Row 1: Name | Email — stacks on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.name?.enabled !== false && (
              <div className="flex flex-col gap-1.5 min-w-0">
                <label htmlFor="form-name" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                  {fields.name.label}
                </label>
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                    <FieldIcon iconKey={fields.name.icon} />
                  </span>
                  <input
                    id="form-name"
                    type="text"
                    placeholder={fields.name.placeholder}
                    autoComplete="name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={controlClass('form-control-input', errors.name)}
                    {...register('name')}
                  />
                </div>
                <FieldError id="name-error" message={errors.name?.message} />
              </div>
            )}

            {fields.email?.enabled !== false && (
              <div className="flex flex-col gap-1.5 min-w-0">
                <label htmlFor="form-email" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                  {fields.email.label}
                </label>
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                    <FieldIcon iconKey={fields.email.icon} />
                  </span>
                  <input
                    id="form-email"
                    type="email"
                    placeholder={fields.email.placeholder}
                    autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={controlClass('form-control-input', errors.email)}
                    {...register('email')}
                  />
                </div>
                <FieldError id="email-error" message={errors.email?.message} />
              </div>
            )}
          </div>

          {/* Row 2: Phone | Subject (Optional) → company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.phone?.enabled !== false && (
              <div className="flex flex-col gap-1.5 min-w-0">
                <label htmlFor="form-phone" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                  {fields.phone.label}
                </label>
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                    <FieldIcon iconKey={fields.phone.icon} />
                  </span>
                  <input
                    id="form-phone"
                    type="tel"
                    placeholder={fields.phone.placeholder}
                    autoComplete="tel"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={controlClass('form-control-input', errors.phone)}
                    {...register('phone')}
                  />
                </div>
                <FieldError id="phone-error" message={errors.phone?.message} />
              </div>
            )}

            {fields.company?.enabled && (
              <div className="flex flex-col gap-1.5 min-w-0">
                <label htmlFor="form-company" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                  {fields.company.label}
                </label>
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none">
                    <FieldIcon iconKey={fields.company.icon} />
                  </span>
                  <input
                    id="form-company"
                    type="text"
                    placeholder={fields.company.placeholder}
                    autoComplete="off"
                    aria-invalid={errors.company ? 'true' : 'false'}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                    className={controlClass('form-control-input', errors.company)}
                    {...register('company')}
                  />
                </div>
                <FieldError id="company-error" message={errors.company?.message} />
              </div>
            )}
          </div>

          {showServiceField && (
            <div className="flex flex-col gap-1.5 min-w-0">
              <label htmlFor="form-interest" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {fields.service.label}
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-theme-muted pointer-events-none z-[1]">
                  <FieldIcon iconKey={fields.service.icon} />
                </span>
                <select
                  id="form-interest"
                  aria-invalid={errors.service ? 'true' : 'false'}
                  aria-describedby={errors.service ? 'interest-error' : undefined}
                  className={controlClass('form-control-select', errors.service)}
                  {...register('service')}
                >
                  {interests.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <FieldError id="interest-error" message={errors.service?.message} />
            </div>
          )}

          {fields.message?.enabled !== false && (
            <div className="flex flex-col gap-1.5 min-w-0">
              <label htmlFor="form-message" className="text-sm font-semibold text-ink-primary dark:text-theme-heading">
                {fields.message.label}
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-3 top-3.5 text-ink-muted dark:text-theme-muted pointer-events-none">
                  <FieldIcon iconKey={fields.message.icon} />
                </span>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder={fields.message.placeholder}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={controlClass('form-control-textarea', errors.message)}
                  {...register('message')}
                />
              </div>
              <div className="flex justify-between gap-2">
                <FieldError id="message-error" message={errors.message?.message} />
                <span
                  className={[
                    'text-xs tabular-nums ml-auto',
                    messageCharCount > messageMax
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-ink-muted dark:text-theme-muted',
                  ].join(' ')}
                  aria-live="polite"
                >
                  {messageCharCount} / {messageMax}
                </span>
              </div>
            </div>
          )}

          {formConfig.consent?.enabled !== false && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start gap-2.5">
                <input
                  id="form-consent"
                  type="checkbox"
                  aria-invalid={errors.consent ? 'true' : 'false'}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  className={[
                    'mt-0.5 w-4 h-4 shrink-0 rounded border text-brand-orange focus-ring cursor-pointer',
                    'bg-surface-input',
                    errors.consent ? 'border-red-400' : 'border-theme-border',
                  ].join(' ')}
                  {...register('consent')}
                />
                <label htmlFor="form-consent" className="text-xs text-ink-muted dark:text-theme-muted leading-relaxed select-none cursor-pointer">
                  {formConfig.consent.text}{' '}
                  {formConfig.consent.privacyHref && formConfig.consent.privacyLabel && (
                    <>
                      {formConfig.consent.privacyPrefix}{' '}
                      <Link
                        to={formConfig.consent.privacyHref}
                        className="text-brand-orange hover:opacity-80 transition-opacity focus-ring rounded"
                      >
                        {formConfig.consent.privacyLabel}
                      </Link>
                      .
                    </>
                  )}
                </label>
              </div>
              <FieldError id="consent-error" message={errors.consent?.message} />
            </div>
          )}

          {(formStatus === 'serverError' ||
            formStatus === 'rateLimited' ||
            formStatus === 'networkError') && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm outline-none"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                {formStatus === 'rateLimited'
                  ? formConfig.status.errors.rateLimited
                  : formStatus === 'networkError'
                    ? formConfig.status.errors.networkError
                    : formConfig.status.errors.serverError}
              </p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
            leftIcon={<SendIcon size={18} />}
            className={[
              'min-h-12',
              '!bg-gradient-to-r !from-brand-orange !to-brand-pink',
              '!border-transparent !text-white !rounded-xl',
              'shadow-md hover:shadow-lg hover:!opacity-95',
              'motion-reduce:transition-none motion-reduce:hover:scale-100',
            ].join(' ')}
          >
            {isSubmitting ? formConfig.submittingLabel : formConfig.submitLabel}
          </Button>

          {showSecurityNote && (
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-emerald-600 dark:text-emerald-400">
              <LockIcon size={13} aria-hidden="true" />
              <span>{formConfig.securityNote.text}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default ContactFormCard;
