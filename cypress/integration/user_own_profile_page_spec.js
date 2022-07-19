describe("User's Own Profile Page", function() {
  it('goes to the Profile Page', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
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
  it('can own post in profile page', () => {
    cy.task('emptyUsers').then(() => {
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();

      cy.get("#new-post-form").find('#message').type("Hello, world!");
      cy.get("#new-post-form").submit();

      cy.get(".posts").should("contain", "Hello, world!");
      cy.get(".posts").should("contain", "someone@example.com");
      
      //check content at profile page
      cy.get('#view-self-profile').click();
      cy.get(".posts").should("contain", "Hello, world!");
      cy.get(".posts").should("contain", "someone@example.com");
    });
  });
});
