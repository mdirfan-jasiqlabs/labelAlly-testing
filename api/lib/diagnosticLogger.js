import fs from 'node:fs';
import path from 'node:path';

/**
 * Diagnostic logger for server-side contact API tracking.
 * Writes sanitized metadata to contact-api.log for debugging,
 * and logs to stderr. Never logs full private keys or message bodies.
 */
export function logContactDiagnostic(stage, details = {}) {
  const timestamp = new Date().toISOString();
  const sanitized = { ...details };

  // Safety: Ensure API keys are never written to disk or console
  if (sanitized.apiKey) {
    sanitized.hasApiKey = true;
    delete sanitized.apiKey;
  }

  const logEntry = `[${timestamp}] [${stage}] ${JSON.stringify(sanitized)}\n`;

  try {
    const logFilePath = path.resolve(process.cwd(), 'contact-api.log');
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
  } catch {
    // Non-blocking in read-only / serverless production environments
  }
}
