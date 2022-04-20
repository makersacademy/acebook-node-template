describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
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
  });

  it('A user can click a link to the singup page if they are not a member', () => {

    cy.visit('/sessions/new');
    cy.get('#signup-link').click();

    cy.url().should("include", "/users/new");
  });

  it('includes the page title', () => {
    cy.visit('/sessions/new');
    cy.get(".page-header").should("contain", "Login");
  })
});
