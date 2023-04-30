const { defineConfig } = require('cypress');
const vitePreprocessor = require('cypress-vite');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    video: false,
  },
});
