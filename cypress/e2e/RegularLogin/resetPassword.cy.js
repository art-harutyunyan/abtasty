describe("Test suite for reset password", () => {
  beforeEach(() => {
    cy.init("/login");
    cy.location("pathname").should("equal", "/login");
  });

  it("Test case 1 | Reset Password link should be available", () => {
    cy.get('[data-testid="resetPasswordLink"]')
      .should("be.visible")
      .find("a")
      .should("have.attr", "href", "/reset-password")
      .and("have.text", "Forgot your password?");
  });

  it.only("Test Case 2 | Validate navigation with ResetPassword", () => {
    cy.get('[data-testid="resetPasswordLink"]>a')
      .invoke("attr", "href")
      .then((href) => {
        cy.get('[data-testid="resetPasswordLink"]>a').click();
        cy.location("pathname").should("equal", href);
      });
    cy.contains("Return to login").click();
    cy.location("pathname").should("equal", "/login");
  });
});
