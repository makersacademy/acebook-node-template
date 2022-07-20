describe("User's Own Profile Page", function() {
  it('goes to the Profile Page', () => {

    cy.task('emptyPosts', 'emptyUsers').then(() => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("name");
    cy.get("#surname").type("surname");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();


    // visiting profile page and check contents
    cy.visit("/users/profile");
    cy.get(".title").should("contain", "Profile Page");
    cy.get(".greeting").should('contain', "someone@example.com");
  });
});
});