describe("Login Test suite", () => {
  beforeEach(() => {
    cy.init("/login");
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  it("Test Case 1 | Login with correct credentials", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("nonExistingUsernaem");
    cy.flakyType(
      '[data-testid="emailInput"]>>input',
      Cypress.env("accounts").correctEmail
    );
    cy.flakyType(
      '[data-testid="passwordInput"]>>input',
      Cypress.env("accounts").correctPassword
    );
    cy.contains("button", "Sign in").click();
    cy.wait("@nonExistingUsernaem")
      .its("response")
      .then((res) => {
        cy.log(res);
        expect(res.statusCode).to.equal(200);
        cy.location("pathname").should("contain", "/mfa/sms");
        expect(res.body.mfaToken).to.not.be.empty;
      });
    cy.contains("Return to login").should("be.visible");

    cy.get('[data-testid="dontAskAgainTick"]').should("be.visible");
    cy.contains("Don't ask me for a code for the next 2 weeks").should(
      "be.visible"
    );
    // The MFA authentication with SMS code should go here
    // uncomment once done
    // cy.location("path").should("equal", "/dashboard");
    // cy.get('[data-testid="nav-dashboard"]').should("be.visible");
    // cy.get('[data-testid="sideBarContainer"]').should("be.visible");
  });

  it("Test Case 2 | Login with non existing username", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("nonExistingUsernaem");
    cy.flakyType(
      '[data-testid="emailInput"]>>input',
      Cypress.env("accounts").nonExistingUsername
    );
    cy.flakyType(
      '[data-testid="passwordInput"]>>input',
      Cypress.env("accounts").correctPassword
    );
    cy.contains("button", "Sign in").click();
    cy.wait("@nonExistingUsernaem")
      .its("response.body")
      .then((res) => {
        const responseBody = JSON.parse(res.responseBody);
        expect(responseBody.error.code).to.equal(401);
        expect(responseBody.error.message).to.equal("Invalid credentials.");
      });
    cy.contains("div", "Please enter a valid email or password")
      .should("be.visible")
      .and("have.css", "color", "rgb(213, 64, 64)");
  });

  it("Test Case 3 | Login with wrong password", () => {
    cy.intercept("POST", Cypress.env("apis").login).as("incorrectPassword");
    cy.flakyType(
      '[data-testid="emailInput"]>>input',
      Cypress.env("accounts").correctEmail
    );
    cy.flakyType(
      '[data-testid="passwordInput"]>>input',
      Cypress.env("accounts").incorrectPassword
    );
    cy.contains("button", "Sign in").click();
    cy.wait("@incorrectPassword")
      .its("response.body")
      .then((res) => {
        cy.log(res);
        const responseBody = JSON.parse(res.responseBody);
        expect(responseBody.error.code).to.equal(401);
        expect(responseBody.error.message).to.equal("Invalid credentials.");
      });
    cy.contains("div", "Please enter a valid email or password")
      .should("be.visible")
      .and("have.css", "color", "rgb(213, 64, 64)");
  });
});
