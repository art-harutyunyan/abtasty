describe("Test suite for password field", () => {
  beforeEach(() => {
    cy.init("/login");
    cy.location("pathname").should("equal", "/login");
  });

  it("Test Case 1 | Password field should have its label", () => {
    cy.get('[data-testid="passwordLabel"]')
      .should("be.visible")
      .and("have.text", "Password");
  });
  it("Test Case 2 | Validate password field to be focusable", () => {
    cy.get('[data-testid="passwordInput"]')
      .should("be.visible")
      .find("input")
      .focus()
      .should("be.focused");
  });

  it("Test Case 3 | Validate password field placeholder", () => {
    // this placeholder tells the password to be at least 12 characters
    // but even if you insert 1, no validation error appears
    cy.get('[data-testid="passwordInput"]')
      .should("be.visible")
      .find("input")
      .should("have.attr", "placeholder", "At least 12 characters");
  });

  it("Test Case 4 | Validate password field typing", () => {
    cy.get('[data-testid="passwordInput"]')
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "password");
    cy.flakyType('[data-testid="passwordInput"]>>input', "sometext").should(
      "have.value",
      "sometext"
    );
  });

  it.only("Test Case 5 | Validate password show/hide icon", () => {
    cy.flakyFocus('[data-testid="passwordInput"]>>input')
      .should("be.visible")
      .and("have.attr", "type", "password");
    cy.flakyType('[data-testid="passwordInput"]>>input', "password");
    cy.get('[data-testid="showIcon"]').should("be.visible").click();
    cy.get('[data-testid="passwordInput"]>>input')
      .should("be.visible")
      .should("have.attr", "type", "text");

    cy.get('[data-testid="hideIcon"]').should("be.visible").click();
    cy.get('[data-testid="passwordInput"]>>input')
      .should("be.visible")
      .should("have.attr", "type", "password");
  });
});
