import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      registerCodeCoverageTasks(on, config);
      return config;
    },
    video: false,
  },
});
