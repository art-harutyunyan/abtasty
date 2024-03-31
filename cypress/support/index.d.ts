declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Use this function to recursively type in an input
     * when the input field typing is flaky
     * @example
     * cy.flakyType("#email", "some@email.com")
     */
    flakyType(selector: string, text: string): Chainable<any>;

    /**
     * Use this function to recursively focus the field
     * when the input field focus is flaky
     * @example
     * cy.flakyFocus("#email", "some@email.com")
     */
    flakyFocus(selector: string, text: string): Chainable<any>;
    /**
     * Hiding the public message in the local storage
     * visiting the desired page
     * Intercepting the unnecessary xhr|fetch requests
     * @example
     * cy.init('/home')
     */
    init(page: string): Chainable<any>;
  }
}
