describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
      cy.task('emptyUsers').then(() => {
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("name");
      cy.get("#surname").type("surname");
      cy.get("#submit").click();

      cy.url().should("include", "/sessions/new");
    });  
  });
});
