import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const DEV_SERVER_PORT = 5173;

/**
 * Runs the Vercel contact handler during local Vite development.
 * Production continues to use /api/contact as a Vercel Serverless Function.
 */
function contactApiDevPlugin(env) {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      const serverEnvKeys = [
        'CONTACT_EMAIL_TO',
        'CONTACT_EMAIL_FROM',
        'EMAIL_PROVIDER',
        'EMAIL_API_KEY',
      ];

      serverEnvKeys.forEach((key) => {
        if (env[key] && !process.env[key]) {
          process.env[key] = env[key];
        }
      });

      // Local origins are allowed only inside the Vite development process.
      const configuredOrigins = (env.ALLOWED_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

      process.env.ALLOWED_ORIGINS = [
        ...new Set([
          ...configuredOrigins,
          `http://localhost:${DEV_SERVER_PORT}`,
          `http://127.0.0.1:${DEV_SERVER_PORT}`,
        ]),
      ].join(',');

      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          const chunks = [];

          for await (const chunk of req) {
            chunks.push(chunk);
          }

          const rawBody = Buffer.concat(chunks).toString('utf8');

          if (rawBody) {
            try {
              req.body = JSON.parse(rawBody);
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                message: 'Please check the submitted information.',
              }));
              return;
            }
          } else {
            req.body = {};
          }

          res.status = (statusCode) => {
            res.statusCode = statusCode;
            return res;
          };

          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
            return res;
          };

          const { default: contactHandler } = await import('./api/contact.js');
          await contactHandler(req, res);
        } catch (error) {
          console.error('[contact-api-dev] Request failed:', error.message);

          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
          }

          if (!res.writableEnded) {
            res.end(JSON.stringify({
              success: false,
              message: 'Unable to send your enquiry right now.',
            }));
          }
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactApiDevPlugin(env)],

    resolve: {
      alias: {
        // @/ → src/ — allows clean imports like:
        // import Header from '@/components/layout/Header'
        '@': resolve(__dirname, './src'),
      },
    },

    server: {
      port: DEV_SERVER_PORT,
      open: false,
    },

    build: {
      // Generate source maps for production debugging
      sourcemap: false,
      // Chunk size warning threshold (kB)
      chunkSizeWarningLimit: 1000,
    },
  };
});
