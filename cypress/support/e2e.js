// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-real-events";
import "cypress-mailosaur";
import "cypress-plugin-tab";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #329") ||
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423")
  ) {
    return false;
  }
  // Enable uncaught exception failures for other errors
});
