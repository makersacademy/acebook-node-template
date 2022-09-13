describe("Registration", () => {
    it("A user signs up once", () => {

      cy.task('emptyPosts', 'emptyUsers').then(() => {
      // sign up
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("name");
      cy.get("#surname").type("surname");
      cy.get("#submit").click();

      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.url().should("include", "/users");

    });
  });
});
  