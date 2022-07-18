describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
   
      // Empty Posts and Users
      cy.task('emptyPosts', 'emptyUsers').then(() => {
        
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

      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();

      cy.get("#new-post-form").find('#message').type("This is the first line.\nThis is the second line.\nThis is the last line.");
      cy.get("#new-post-form").submit();

      cy.get(".posts").should("contain", "This is the first line.\nThis is the second line.\nThis is the last line.");
    });
  });
});
