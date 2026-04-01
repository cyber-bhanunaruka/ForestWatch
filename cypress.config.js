import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents() {},
  },
})
