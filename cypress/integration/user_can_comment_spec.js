describe("Comments", () => {
    it("Allows a user to comment on a post", () => {
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      cy.contains("New post").click();
      cy.get("#new-post-form").find('[type="text"]').type("Test post");
      cy.get("#new-post-form").submit();

      cy.get("#comment").click();

      cy.contains("Test post");
      cy.get("#comment-form").find('[type="text"]').type("Test comment");
      cy.get("#comment-form").submit();
      cy.contains("Test comment");
    });
});
