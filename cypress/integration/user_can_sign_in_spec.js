
describe("Authentication", () => {

  it("A user signs in and is redirected to /posts", () => {    
    // sign up
    cy.signUp()

    cy.get('#logout').click();
    // sign in
    cy.get("#login").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
