describe("Authentication", () => {
  it("A user signs in and can see their username in /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@gmail.com");
    cy.get("#password").type("password");
    cy.get('#username').type("Jane Doe");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@gmail.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("h1", "Jane Doe's Timeline");
  });
});
