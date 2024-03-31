import { hexToRGB } from "../support/helper.js";

describe("Test Suite for Email field test cases", () => {
  beforeEach(() => {
    cy.init("/login");
  });

  it("Test Case 1 | Email field should have its label", () => {
    cy.get('[data-testid="emailLabel"]').should("have.text", "E-mail");
  });

  it("Test Case 2 | Validate email field to be focusable", () => {
    cy.get('[data-testid="emailInput"]')
      .should("be.visible")
      .find("input")
      .focus()
      .should("be.focused");
  });

  it("Test Case 3 | Validate email field placeholder", () => {
    cy.get('[data-testid="emailInput"]')
      .should("be.visible")
      .find("input")
      .should("have.attr", "placeholder", "name@abtasty.com");
  });

  it("Test Case 4 | Validate email field typing", () => {
    cy.get('[data-testid="emailInput"]')
      .should("be.visible")
      .find("input")
      .should("have.attr", "type", "email");
    cy.flakyType('[data-testid="emailInput"]>>input', "sometext");
    cy.get('[data-testid="emailInput"]')
      .should("be.visible")
      .find("input")
      .should("have.value", "sometext");
  });

  it("Test Case 5 | Validate Email field front-end errors", () => {
    const nonEmailFormat = "nonEmailFormat";
    cy.flakyType('[data-testid="emailInput"]>>input', nonEmailFormat)
      .should("have.value", nonEmailFormat)
      .tab();
    cy.get('[data-testid="emailLabel"]').should(
      "have.css",
      "color",
      hexToRGB("#d54040")
    );
    cy.get('[data-testid="emailInput"]>label').should(
      "have.css",
      "border",
      `1px solid ${hexToRGB("#d54040")}`
    );

    cy.get('[data-testid="emailErrorMessage"]').should(($err) => {
      expect($err).to.exist;
      expect($err).to.be.visible;
      expect($err).to.have.text("Please enter a valid email");
      expect($err).to.have.css("color", hexToRGB("#d54040"));
    });
  });

  it("Test Case 6 | Validate email field with correct email format", () => {
    const correctEmailFormat = "tasty@abtasty.com";
    cy.flakyType('[data-testid="emailInput"]>>input', correctEmailFormat)
      .should("have.value", correctEmailFormat)
      .tab();
    cy.get('[data-testid="emailErrorMessage"]').should("not.exist");
  });
});
