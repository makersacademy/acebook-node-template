describe("Delete button", () => {
  it("deletes the post when signed in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password4");
    cy.get("#submit").click();

    cy.get(".new-field").type("Delete test");
    cy.get(".post-button").click();

    cy.get(".posts").should("contain", "Delete test");
    cy.get(".posts").should("contain", "someone4@example.com");

    cy.get('.post-message').contains('Delete test').gfind(".btn").click();

    cy.get('.post-message').should("not.contain", "Delete test");
  });
});