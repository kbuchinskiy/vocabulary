const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8900',
    backendBaseURL: 'http://localhost:8100/api',
    excludeSpecPattern: [],
  },
});
