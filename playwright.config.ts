import {defineConfig, devices, type PlaywrightTestConfig} from '@playwright/test';
import path from 'path';

// Locally we run the app in dev mode
const runPlaywrightServer = {
  command: `pnpm dev -- -p 8080`,
  timeout: 240 * 1000,
  reuseExistingServer: false,
  url: 'http://127.0.0.1:8080',
};

const runAnvilServer = {
  command:
    'source .env.local && anvil --fork-url https://eth-goerli.g.alchemy.com/v2/$NEXT_PUBLIC_ALCHEMY_API_KEY --chain-id 5',
  timeout: 120 * 1000,
  // Don't reuse anvil between test runs as the wallet state is persisted
  reuseExistingServer: false,
  url: 'http://127.0.0.1:8545',
};

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  // Timeout per test (slightly higher for local, as it's slower)
  timeout: process.env.CI ? 28 * 1000 : 50 * 1000,
  // Test directory
  testDir: path.join(__dirname, 'test/playwright/tests'),
  testMatch: '**/*.spec.ts',
  retries: process.env.CI ? 2 : 1,
  // 'github' for GitHub Actions CI to generate annotations, plus a concise 'dot'
  // default 'list' when running locally
  reporter: process.env.CI ? [['html', {outputFolder: 'playwright-report'}], ['list']] : 'list',
  // fullyParallel: true,
  workers: 2,

  use: {
    baseURL: 'http://localhost:8080',
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'retry-with-trace',
    // Useful for debugging, show the browser, or go in slowmo mode :)
    headless: false,
    // launchOptions: {
    //   slowMo: 1200,
    // },
    // Screenshot errors automatically
    screenshot: process.env.CI ? 'only-on-failure' : undefined,
  },

  projects: [
    {
      name: 'goerli',
      use: {...devices['Desktop Chrome']},
    },
  ],

  // It can be useful to run only the web server
  // through playwright, and run anvil manually for debugging
  // webServer: [runPlaywrightServer],
  webServer: [runAnvilServer, runPlaywrightServer],
};

// config.timeout = 240 * 1000
export default defineConfig(config);
