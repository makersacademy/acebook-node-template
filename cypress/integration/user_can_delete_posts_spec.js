
describe("Timeline", () => {
 
  it('can delete posts, when signed in', () => {
    // sign up
<<<<<<< HEAD
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
    
    // delete a post
    cy.get('.posts').submit();
    cy.get(".posts").should("not.contain", "Hello, world!");
=======
    cy.task('emptyPosts').then(() => {
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
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
      
      // delete a post
      cy.get('.delete').submit();
      cy.get(".posts").should("not.contain", "Hello, world!");
    })
>>>>>>> main
  });
});