import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_E2E_BASE_URL ?? 'http://localhost:3000',
    defaultCommandTimeout: 40000,
    retries: 2,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
