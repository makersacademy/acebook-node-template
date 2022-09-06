describe("Profile page", () => {
  it("A user can load a profile page", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("users/profile/63170f78e335a719c01fc909");
    cy.url().should("include", "/users/profile/63170f78e335a719c01fc909");
  });
});
