import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // @/ → src/ — allows clean imports like:
      // import Header from '@/components/layout/Header'
      '@': resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    open: false,
  },

  build: {
    // Generate source maps for production debugging
    sourcemap: false,
    // Chunk size warning threshold (kB)
    chunkSizeWarningLimit: 1000,
  },
});
