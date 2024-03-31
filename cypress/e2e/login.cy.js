describe("Login Test suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  it("Test Case 1 | Login with non existing ");

  it("Test Case 1 | Login with correct credentials", () => {
    cy.get("#email").should("be.visible").focus();
    cy.flakyType("#email", "some@email.com");
    cy.flakyType("#password", "password");
    cy.contains("button", "Sign in").click();
  });

  it("Experiment", () => {
    cy.getAllCookies().then((a) => {
      cy.log("the cookies ", a);
    });
  });

  it.only("Try to find csrf token", () => {});
});
