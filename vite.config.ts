import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig({
  base: '/',
  plugins: [react(), cloudflare()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    css: true,
  },
});
