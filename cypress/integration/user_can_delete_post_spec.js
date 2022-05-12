describe("Delete button", () => {
  it("deletes the post when signed in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password4");
    cy.get("#submit").click();

    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Delete test");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Delete test");
    cy.get(".posts").should("contain", "someone4@example.com");

    cy.get(".posts").contains('Delete test').find(".delete").click();

    cy.get(".posts").should("not.contain", "Delete test");
  });
});