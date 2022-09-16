describe("Profile picture", () => {
  it("user cannot upload a profile photo from other user's page", () => {
    // delete all table entries
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    cy.get(".homepage-title").contains("Welcome to Acebook");

    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("simon");
    cy.get("#first-name").type("simon");
    cy.get("#last-name").type("jones");
    cy.get("#email").type("simon@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // visit profile to see add picture button
    cy.visit("/profiles/billy");
    cy.get("#profile-header").contains("billy's profile");
    cy.get(".picture-text").should("exist")

    // visit other profile to not see button
    cy.visit("/profiles/simon");
    cy.get("#profile-header").contains("simon's profile");
    cy.get(".picture-text").should("not.exist")
  });
});
