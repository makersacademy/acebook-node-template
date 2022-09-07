describe("Profile page", () => {
  it("A user can add a friend", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("#logout-button").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("simon");
    cy.get("#email").type("simon@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    cy.visit("/profiles/simon");
    cy.get("#add-friend-button").click();
    // cy.visit("/profiles/billy");
  });
});
