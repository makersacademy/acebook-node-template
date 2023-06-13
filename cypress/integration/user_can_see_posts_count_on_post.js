//THIS TEST NEEDS DEVELOPMENT - UNSURE WHAT POSTS?LIKES COUNT WILL LOOK LIKE IN FINAL PROJECT



describe("Timeline", () => {
    it("can see likes count on a new post", () => {

  
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password!123");
      cy.get("#submit").click();
  
      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();
  
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      cy.get(".posts").should("contain", "Hello, world!");

      // Assert that we can see the likes count
      cy.get(".posts").should("contain", "0 likes");
    });
  });
  
