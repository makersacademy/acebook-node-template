describe("Timeline Page - Empty Post Check", () => {
    it("user can't submit a post with no content", () => {

    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

      // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").submit();
    cy.contains("Please enter valid text or upload an image.")
    });
});
