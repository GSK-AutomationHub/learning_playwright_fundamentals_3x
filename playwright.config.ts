import { chromium, defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
   expect: {
    timeout: 5000
  },

  reporter: [["line"], ["allure-playwright"], ['html']], // ["./utils/CustomReporter.ts"]

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    //permissions: ['geolocation'],
    //viewport: { width: 1920, height: 1080 },
  }

  
});
