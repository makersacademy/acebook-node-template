

describe("Registration", () => {


  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#fullname").type("Ali Cocelli")
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
