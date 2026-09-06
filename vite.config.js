import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// See: https://vitejs.dev/config/ and https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    css: true,
  },
});
