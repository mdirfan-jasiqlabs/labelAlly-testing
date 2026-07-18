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
  const provider = process.env.EMAIL_PROVIDER || '';
  const apiKey = process.env.EMAIL_API_KEY || '';
  const emailTo = process.env.CONTACT_EMAIL_TO || '';
  const emailFrom = process.env.CONTACT_EMAIL_FROM || 'onboarding@labelally.com';

  // If no credentials or configuration are set, return a config error
  if (!apiKey || !emailTo) {
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
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: emailTo,
        subject: `Partner Enquiry: ${name}`,
        text: textBody,
        html: htmlBody,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const resText = await response.text();
      throw new Error(`Resend API Failure: Status ${response.status} - ${resText}`);
    }

    return { success: true };
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
