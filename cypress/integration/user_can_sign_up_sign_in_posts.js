describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("john@example.com");
    cy.get("#password").type("password!123");
    cy.get("#confirm-password").type("password!123");
    cy.get("#first-name").type("John")
    cy.get("#last-name").type("Doe")
    cy.get("#submit").click();


    cy.get("#email").type("john@example.com");
    cy.get("#password").type("password!123");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
