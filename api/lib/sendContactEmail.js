import { logContactDiagnostic } from './diagnosticLogger.js';

/**
 * sendContactEmail — Server-side email provider adapter.
 *
 * Supports sending emails via Resend or Brevo using REST API fetch calls,
 * avoiding external dependency bloat in serverless functions.
 * Returns a promise resolving to { success: boolean, message?: string }.
 */
export async function sendContactEmail({
  name,
  email,
  phone,
  company,
  service,
  message,
}) {
  const provider = (process.env.EMAIL_PROVIDER || '').trim();
  const apiKey = (process.env.EMAIL_API_KEY || '').trim();
  const emailTo = (process.env.CONTACT_EMAIL_TO || '').trim();
  const emailFrom = (process.env.CONTACT_EMAIL_FROM || '').trim().replace(/^["']|["']$/g, '');

  const isPlaceholderKey =
    apiKey.startsWith('your_') ||
    apiKey.startsWith('<') ||
    apiKey === 'placeholder';

  // If no credentials or configuration are set, return a config error
  if (!apiKey || !emailTo || !emailFrom || isPlaceholderKey) {
    console.error(
      `[Email Config Error] Missing or placeholder configuration: ` +
      `provider="${provider || 'NOT_SET'}", ` +
      `hasApiKey=${Boolean(apiKey && !isPlaceholderKey)}, ` +
      `hasEmailTo=${Boolean(emailTo)}, ` +
      `emailFrom="${emailFrom || 'NOT_SET'}"`
    );
    logContactDiagnostic('config_missing', {
      provider: provider || 'NOT_SET',
      hasApiKey: Boolean(apiKey && !isPlaceholderKey),
      hasEmailTo: Boolean(emailTo),
      emailFrom: emailFrom || 'NOT_SET',
    });
    const err = new Error('Email provider configuration missing');
    err.code = 'CONFIG_MISSING';
    throw err;
  }

  // Construct plain-text email body (fully escaped and safe)
  const textBody = `
New Partner Enquiry - LabelAlly Entertainment

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company/Label: ${company || 'Not provided'}
Service: ${service}

Message:
------------------------------------------
${message}
------------------------------------------

This enquiry was submitted via the contact form on the LabelAlly Entertainment website.
  `.trim();

  // Escape HTML characters for the HTML template
  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; color: #171717; line-height: 1.6;">
      <h2 style="color: #6366f1;">New Partner Enquiry</h2>
      <p>A new partner enquiry has been received from the LabelAlly Entertainment contact form.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #e5e5e5;">Name:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e5e5e5;">Email:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e5e5e5;">Phone:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e5e5e5;">Company/Label:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(company || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e5e5e5;">Service:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${escapeHtml(service)}</td>
        </tr>
      </table>
      <h3 style="color: #404040;">Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-size: 14px; border: 1px solid #e5e5e5;">
        ${escapeHtml(message)}
      </div>
    </div>
  `;

  // 1. Resend Provider Integration
  if (provider.toLowerCase() === 'resend') {
    const payload = {
      from: emailFrom,
      to: emailTo,
      subject: `Partner Enquiry: ${name}`,
      text: textBody,
      html: htmlBody,
      reply_to: email,
    };

    logContactDiagnostic('resend_dispatch', {
      emailFrom,
      emailTo,
      hasApiKey: Boolean(apiKey),
      hasReplyTo: Boolean(email),
    });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const resText = await response.text();
      let resJson = null;
      try {
        resJson = JSON.parse(resText);
      } catch {
        // Non-JSON response
      }

      const status = response.status;
      const errorName = resJson?.name || 'ResendError';
      const errorMessage = resJson?.message || resText || `HTTP ${status}`;

      // Minimal safe server-side diagnostic logging (no keys or personal message contents)
      console.error(
        `[Resend API Error] Status: ${status}, Type: ${errorName}, Details: ${errorMessage}`
      );
      logContactDiagnostic('resend_api_error', {
        status,
        type: errorName,
        details: errorMessage,
        emailFrom,
        emailTo,
      });

      const err = new Error(`Resend API Failure (${status}): ${errorMessage}`);
      err.status = status;
      err.providerError = errorName;

      if (
        status === 401 ||
        errorName === 'invalid_api_key' ||
        /invalid.*api.*key|api.*key.*invalid/i.test(errorMessage)
      ) {
        err.code = 'INVALID_API_KEY';
      } else if (
        errorName === 'restricted_api_key' ||
        /restricted.*api.*key|permission|unauthorized/i.test(errorMessage)
      ) {
        err.code = 'RESTRICTED_API_KEY';
      } else if (
        /testing emails|own email address|sandbox|only send testing/i.test(errorMessage)
      ) {
        err.code = 'TESTING_RECIPIENT_RESTRICTION';
      } else if (
        /domain.*not verified|verify your domain|not authorized to send emails from/i.test(errorMessage)
      ) {
        err.code = 'EMAIL_FROM_UNVERIFIED';
      } else if (
        status === 429 ||
        /quota|rate limit/i.test(errorMessage)
      ) {
        err.code = 'RATE_LIMIT_EXCEEDED';
      } else if (
        status === 422 ||
        errorName === 'missing_required_field' ||
        errorName === 'invalid_parameter'
      ) {
        err.code = 'PROVIDER_VALIDATION_ERROR';
      } else {
        err.code = 'PROVIDER_ERROR';
      }
      throw err;
    }

    const data = await response.json().catch(() => null);
    if (!data?.id) {
      console.warn('[Resend API] Response succeeded but no email ID was returned');
    }

    logContactDiagnostic('resend_success', { id: data?.id });
    return { success: true, id: data?.id };
  }

  // 2. Brevo Provider Integration
  if (provider.toLowerCase() === 'brevo') {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'LabelAlly Contact', email: emailFrom },
        to: [{ email: emailTo }],
        subject: `Partner Enquiry: ${name}`,
        textContent: textBody,
        htmlContent: htmlBody,
        replyTo: { email: email },
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      throw new Error(`Brevo API Failure: Status ${response.status} - ${resText}`);
    }

    return { success: true };
  }

  // If email provider environment option is unsupported/unknown
  const err = new Error(`Unsupported email provider configured: ${provider}`);
  err.code = 'PROVIDER_UNSUPPORTED';
  throw err;
}
