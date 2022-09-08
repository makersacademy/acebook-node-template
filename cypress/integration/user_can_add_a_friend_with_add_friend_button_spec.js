describe("Friends", () => {
  it("A user can add a friend with the add friend button", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#logout-button").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("simon");
    cy.get("#email").type("simon@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // clicking add friend button
    cy.visit("/profiles/simon");
    cy.get("#add-friend-button").click();

    // visiting profile to check friend is added
    cy.visit("/profiles/billy");
    cy.get("#profile-header").contains("billy's profile");
    cy.get(".friend-username").contains("simon");
  });
});
