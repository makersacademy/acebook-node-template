describe("Profile page", () => {
  it("displays user info", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("Some")
    cy.get("#surName").type("One")
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // profile page
    cy.visit("/profile");
    cy.get("#fullName").should("contain", "Some");
    cy.get("#fullName").should("contain", "One");

    cy.get("#email").should("contain", "someone@example.com");
    cy.get("#bio").should("contain", "Please update your bio");
    cy.get("#location").should("contain", "Please update your location");

  });
});


