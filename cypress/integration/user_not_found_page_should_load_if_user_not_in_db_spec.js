describe("User Not Found Page", () => {
  it("loads a user not found page if user doesn't exist in users collection", () => {
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

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // loading profile that doesn't exist
    cy.visit("/profiles/simon");
    cy.get("#header").contains("This user doesn't exist!");

    // return to posts page
    cy.get("#return-button").click();
    cy.url().should("includes", "/posts");
  });
});
