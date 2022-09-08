describe("Friends", () => {
  it("A user can add a friend", () => {
    // delete all table entries
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

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

    // making PUT request to add friend
    cy.request("PUT", "/friends/requests/new/simon");

    // visiting profile to check friend is added
    cy.visit("/profiles/billy");
    cy.get("#profile-header").contains("billy's profile");
    cy.get(".friend-username").contains("simon");
  });
});
