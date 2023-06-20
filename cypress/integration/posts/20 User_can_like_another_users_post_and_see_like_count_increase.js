describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
      // sign up
      cy.visit("/users/signup");
      cy.get("#username").type("User1");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-signup-button").click();

      // sign in
      cy.visit("/sessions/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-login-button").click();
    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("other user like test");
    cy.get("#new-post-form").submit();

      // sign up
      cy.visit("/users/signup");
      cy.get("#username").type("User2");
      cy.get("#email").type("someoneelse@example.com");
      cy.get("#password").type("Password2");
      cy.get("#submit-signup-button").click();

      // sign in
      cy.visit("/sessions/login");
      cy.get("#email").type("someoneelse@example.com");
      cy.get("#password").type("Password2");
      cy.get("#submit-login-button").click();
    // nav to posts
    cy.visit("/posts");
    //clikc like
    cy.get("#likes-form").submit()
    // check amount of likes
    cy.get(".posts").should("contain", "1 like");
      });
});
