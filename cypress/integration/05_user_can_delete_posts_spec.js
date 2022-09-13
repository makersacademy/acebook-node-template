
describe("Timeline", () => {
 
  it('can delete posts, when signed in', () => {
      // Empty Posts and Users
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
  
      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();
      cy.get("#new-post-form").find('#message').type("Hello, world!");
      cy.get("#new-post-form").submit();
      
      // delete a post
      cy.get('.delete').submit();
      cy.get(".posts").should("not.contain", "Hello, world!");
    })
  });
});