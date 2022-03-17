
  describe("Nav bar", () => {
    it('should jump to the next page', () => {
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

      cy.visit("/posts/new");
      cy.contains("Posts").click();
      cy.url().should("include", "/posts");
      cy.contains("h1", "Timeline");
      

    })
  })