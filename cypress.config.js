const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://auth.abtasty.com/",
    $schema: "https://on.cypress.io/cypress.schema.json",
    defaultCommandTimeout: 10000,
    viewportHeight: 864,
    viewportWidth: 1536,
    retries: {
      openMode: 2,
      runMode: 2,
    },
  },
});
