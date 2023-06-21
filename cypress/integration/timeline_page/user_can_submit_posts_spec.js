describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {

    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Successful Post Testing");
    cy.get("#new-post-form").submit();

    cy.contains("Successful Post Testing");
  });
});
