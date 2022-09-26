describe("Authentication", () => {
 
  it("A user signs in and is redirected to /posts", () => {
    cy.task('emptyUsers').then(() => {
    
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("makers@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("makers@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.task('emptyPosts').then(() => {
      cy.url().should("include", "/posts");
      cy.contains("a", "New post");
    })
    })
  });
  it("A user signs in with incorrect details and is redirected to /signinerror", () => {
    cy.visit("/sessions/new");
    cy.get("#email").type("makers123@example53.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/signinerror");
  })
});
