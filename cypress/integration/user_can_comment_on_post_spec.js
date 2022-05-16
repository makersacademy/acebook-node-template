describe("Comment", () => {
  it("can be added onto a post", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password5");
    cy.get("#submit").click();

    cy.get(".new-field").type("Comment post test");
    cy.get(".post-button").click();

    cy.get(".new-comment").type("This is a comment");
    cy.get(".post-comment").click();

    cy.get(".comment").should("contain", "This is a comment");
  });
});