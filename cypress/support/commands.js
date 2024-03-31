// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("flakyType", (selector, text, retries = 3) => {
  let attempts = 0;

  const typeUntilMatch = () => {
    attempts++;
    cy.log(selector, attempts);

    if (attempts > retries) {
      throw new Error(`Failed to type "${text}" after ${retries} attempts`);
    }

    return cy
      .get(selector)
      .clear()
      .type(text, { delay: 80 })
      .then(() => {
        return cy.get(selector).then((element) => {
          if (element.val() !== text) {
            return typeUntilMatch();
          }
        });
      })
      .should("have.value", text);
  };

  return typeUntilMatch();
});

Cypress.Commands.add("flakyFocus", (selector, retries = 3) => {
  let attempts = 0;

  const focusUntilMatch = () => {
    attempts++;
    cy.log(selector, attempts);

    if (attempts > retries) {
      throw new Error(
        `Failed to focus on "${selector}" after ${retries} attempts`
      );
    }

    return cy
      .get(selector)
      .focus()
      .should("be.focused")
      .then(() => {
        return cy.get(selector).then((element) => {
          if (!element.is(":focus")) {
            return focusUntilMatch();
          }
        });
      });
  };

  return focusUntilMatch();
});

Cypress.Commands.add("init", (page) => {
  cy.visit(page);
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});
