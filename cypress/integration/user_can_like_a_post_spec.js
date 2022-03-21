describe("Timeline", () => {
  it("Like count on a post increases by 1", () => {
    cy.sign_up_and_sign_in();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").first().get('#like').click();
    cy.get(".posts").first().get('#likecount').should("contain", "1");
 
  });
});
