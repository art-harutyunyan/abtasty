describe("Test suite for SSO email field", () => {
  beforeEach(() => {
    cy.init("/ssologin");
    cy.location("pathname").should("equal", "/ssologin");
  });

  it("Test Case 1 | Should be able to go back to login page", () => {
    cy.get('[data-testid="chevronAloneLeftIcon"]')
      .parent("a")
      .invoke("attr", "href")
      .then((href) => {
        cy.contains("Go back to Login page").click();
        cy.location("pathname").should("equal", href);
      });
  });

  it("Test Case 2 | Validate navigation on SSO button click", () => {
    cy.get('[data-testid="inputWrapper"]')
      .find("div")
      .should("be.visible")
      .and("have.text", "E-mail");
  });

  it("Test Case 3 | Validate sso email field", () => {
    cy.get('[data-testid="inputWrapper"]')
      .find("input")
      .should("have.attr", "type", "email")
      .type("something")
      .should("have.value", "something")
      .clear()
      .should("have.value", "");
  });

  it("Test Case 3 | Validate sso incorrect email format case", () => {
    cy.get('[data-testid="inputWrapper"]')
      .find("input")
      .type("incorrectemailformat")
      .tab();
    cy.get('[data-testid="emailErrorMessage"]').should(($err) => {
      expect($err).to.exist;
      expect($err).to.be.visible;
      expect($err).to.have.text("Please enter a valid email");
    });
  });
});
