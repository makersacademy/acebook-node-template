describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    // sign in
    cy.url().should("include", "/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.get("#log_out").click();
    
  });
});
