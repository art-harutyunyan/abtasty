import { hexToRGB } from "../../support/helper.js";

describe("Test suite for SignIn button", () => {
  beforeEach(() => {
    cy.init("/login");
    cy.location("pathname").should("equal", "/login");
  });

  it("Test Case 1 | Validate the button existence andd default state", () => {
    cy.contains("button", "Sign in").should(($button) => {
      expect($button).to.be.visible;
      expect($button).to.have.attr("disabled", "disabled");
      expect($button).to.have.css("background-color", hexToRGB("#57b8c7"));
    });
  });

  it("Test Case 2 | Validate button enabled state", () => {
    cy.flakyType('[data-testid="emailInput"]>>input', "some@email.com");
    cy.flakyType('[data-testid="passwordInput"]>>input', "sometext");
    cy.contains("button", "Sign in").should(($button) => {
      expect($button).to.be.visible;
      expect($button).to.not.have.attr("disabled", "disabled");
      expect($button).to.have.css("background-color", hexToRGB("#007f91"));
    });
  });

  it("Test Case 3 | Validate button state with incorrect email format", () => {
    cy.flakyType('[data-testid="emailInput"]>>input', "someemail.com");
    cy.flakyType('[data-testid="passwordInput"]>>input', "sometext");
    cy.contains("button", "Sign in").should(($button) => {
      expect($button).to.be.visible;
      expect($button).to.have.attr("disabled", "disabled");
      expect($button).to.have.css("background-color", hexToRGB("#57b8c7"));
    });
  });
});
