import { contactSchema } from '../src/schemas/contactSchema.js';
import { sendContactEmail } from './lib/sendContactEmail.js';

// Ephemeral in-memory rate-limiter placeholder
// (Documented: Serverless environments are stateless; replace this with Redis/Upstash for production safety)
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // Allow max 5 submissions per minute per IP

/**
 * Vercel Serverless Function: POST /api/contact
 */
export default async function handler(req, res) {
  const timestamp = new Date().toISOString();

  // 1. Method verification: POST only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    });
  }

  // 2. Allowed Origin Verification
  const requestOrigin = req.headers.origin;
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;

  if (allowedOriginsEnv && requestOrigin) {
    const allowedList = allowedOriginsEnv.split(',').map((o) => o.trim());
    if (!allowedList.includes(requestOrigin)) {
      console.log(`[${timestamp}] Origin blocked: ${requestOrigin}`);
      return res.status(403).json({
        success: false,
        message: 'Unable to process this request.',
      });
    }
  }

  // 3. Rate Limiting verification
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const clientRecord = rateLimitCache.get(clientIp);

  if (clientRecord) {
    const timePassed = now - clientRecord.startTime;
    if (timePassed < RATE_LIMIT_WINDOW) {
      if (clientRecord.count >= MAX_REQUESTS) {
        res.setHeader('Retry-After', Math.ceil((RATE_LIMIT_WINDOW - timePassed) / 1000));
        console.log(`[${timestamp}] Rate limit triggered by IP: ${clientIp.substring(0, 8)}...`);
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }
      clientRecord.count += 1;
    } else {
      rateLimitCache.set(clientIp, { startTime: now, count: 1 });
    }
  } else {
    rateLimitCache.set(clientIp, { startTime: now, count: 1 });
  }

  // 4. Content-Type and request body verification
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(400).json({
      success: false,
      message: 'Please check the submitted information.',
    });
  }

  try {
    const payload = req.body;

    // Check size limit: reject oversized payloads (> 50KB is excessive for a simple text form)
    const payloadString = JSON.stringify(payload);
    if (payloadString.length > 50 * 1024) {
      console.warn(`[${timestamp}] Blocked oversized payload (${payloadString.length} bytes)`);
      return res.status(400).json({
        success: false,
        message: 'Please check the submitted information.',
      });
    }

    // 5. Server-Side Validation using Zod
    const validatedData = contactSchema.parse(payload);

    // 6. Honeypot check (website field must be empty)
    if (validatedData.website && validatedData.website.trim().length > 0) {
      // Generic mock response to confuse spam bots without throwing errors or running email adapters
      console.log(`[${timestamp}] Honeypot spam submission blocked.`);
      return res.status(200).json({
        success: true,
        message: 'Your enquiry has been received.',
      });
    }

    // 7. Dispatch sanitized email via provider adapter
    const sanitisedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.trim(),
      phone: validatedData.phone ? validatedData.phone.trim() : '',
      company: validatedData.company ? validatedData.company.trim() : '',
      service: validatedData.service,
      message: validatedData.message.trim(),
    };

    await sendContactEmail(sanitisedData);

    console.log(`[${timestamp}] Successful form submission.`);
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received.',
    });
  } catch (err) {
    // Catch Zod schema validation errors
    if (err.name === 'ZodError') {
      console.warn(`[${timestamp}] Server-side validation failure`);
      return res.status(400).json({
        success: false,
        message: 'Please check the submitted information.',
      });
    }

    // Catch email configuration missing/unsupported errors
    if (err.code === 'CONFIG_MISSING' || err.code === 'PROVIDER_UNSUPPORTED') {
      console.error(`[${timestamp}] Email service error: ${err.message}`);
      return res.status(503).json({
        success: false,
        message: 'Unable to send your enquiry right now.',
      });
    }

    // Catch all other server/provider runtime failures
    console.error(`[${timestamp}] Submission error:`, err.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your enquiry right now.',
    });
  }
}
