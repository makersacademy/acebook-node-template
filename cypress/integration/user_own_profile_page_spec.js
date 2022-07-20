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
  it('redirects user to sign-in page if user has not logged-in', () => {
    cy.visit("/users/profile");
    cy.url().should("include", "/sessions/new")
  });
  it('can read own post in profile page', () => {
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
  it('does not show posts by other users', () => {
    cy.task('emptyUsers').then(() => {
      // first user signs up
      cy.visit("/users/new");
      cy.get("#email").type("user1@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      
      // first user signs in
      cy.visit("/sessions/new");
      cy.get("#email").type("user1@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // first user submits a post
      cy.visit("/posts");
      cy.contains("New post").click();
      cy.get("#new-post-form").find('#message').type("Testing profile page");
      cy.get("#new-post-form").submit();
      
      //check content at profile page of first user
      cy.get('#view-self-profile').click();
      cy.get(".posts").should("contain", "Testing profile page");
      cy.get(".posts").should("contain", "user1@example.com");

      // first user logs out
      cy.get('#sign-out-button').click();

      // sign up as a second user
      cy.visit("/users/new");
      cy.get("#email").type("user2@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // sign in as a second user
      cy.visit("/sessions/new");
      cy.get("#email").type("user2@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      });

      // second user checking his own profile page
      cy.get('#view-self-profile').click();
      cy.get(".posts").should('not.contain', 'Testing profile page');
  })
});
});
