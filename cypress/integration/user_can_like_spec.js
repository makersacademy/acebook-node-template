describe("Likes", () => {
  it("A user can like and unlike a post made by someone else", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // page has a post made in unit tests already
    cy.get('.card').first().find(".likebtn").click()

    cy.contains("1");

    cy.get('.card').first().find(".unlikebtn").click()

    cy.contains("0");
  });
});
