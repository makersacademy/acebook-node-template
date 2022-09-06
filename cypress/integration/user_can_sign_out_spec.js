describe("Deauthentication", () => {
  it("A user can log out and is redirected to homepage", () => {
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

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
    // cy.contains("form", "POST");

    // log out
    cy.get("#logout").click();

    cy.get(".title").should("contain", "Acebook");
  });
});
