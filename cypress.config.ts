/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_E2E_BASE_URL ?? 'http://localhost:3000',
    defaultCommandTimeout: 40000,
    retries: 2,
    specPattern: 'cypress/e2e/*.cy.ts',
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
});
