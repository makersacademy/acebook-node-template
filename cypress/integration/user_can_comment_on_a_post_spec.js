describe("Timeline", () => {
  it("can comment on a post", () => {
    cy.sign_up_and_sign_in();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get('.posts').first().find('#input-comment').type("My name isn't world");
    cy.get(".posts").first().find('#comment-btn').click();
    cy.get(".posts").first().get(".comments").first().should("contain", "My name isn't world");
 
  });
});
