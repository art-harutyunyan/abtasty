describe("Test Suite for SSO login", () => {
  beforeEach(() => {
    cy.init("/ssologin");
  });

  it("Test Case 1 | SSO login with valid sso email", () => {
    cy.intercept("POST", Cypress.env("apis").ssologin).as("correctSSO");
    cy.get('[data-testid="inputWrapper"]')
      .find("input")
      .type(Cypress.env("ssoCreds").validSSO);
    cy.contains("button", "Sign in").click();
    cy.wait("@correctSSO").then(({ request, response }) => {
      cy.log(response.body);
      cy.log(request.body);
      //   uncomment once the correct SSO is set
      //   expect(response.statusCode).to.equal(200);
      expect(request.body.csrfToken).to.not.be.empty;
    });
    // Uncomment when the correct SSO email is set
    // cy.location("path").should("equal", "/dashboard");
    // cy.get('[data-testid="nav-dashboard"]').should("be.visible");
    // cy.get('[data-testid="sideBarContainer"]').should("be.visible");
  });
  it("Test Case 2 | SSO login with no sso email", () => {
    cy.intercept("POST", Cypress.env("apis").ssologin).as("incorrectSSO");
    cy.get('[data-testid="inputWrapper"]')
      .find("input")
      .type("incorrectemail@fake.com");
    cy.contains("button", "Sign in").click();
    cy.wait("@incorrectSSO").then(({ request, response }) => {
      cy.log(response.body);
      cy.log(request.body);
      expect(response.statusCode).to.equal(400);
      expect(request.body.csrfToken).to.not.be.empty;
    });
    cy.get('[data-testid="emailErrorMessage"]').should(($err) => {
      expect($err).to.exist;
      expect($err).to.be.visible;
      expect($err).to.have.text("Please enter a valid email");
    });
  });
});
