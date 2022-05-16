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

  it("Can see who has liked the post", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone6@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // page has a post made in unit tests already
    cy.get('.card').first().find(".likebtn").click()

    cy.contains("1");

    cy.get('.card').first().find("a").click()

    cy.contains("Liked by:");
    cy.contains("someone6@example.com");
  });
});
