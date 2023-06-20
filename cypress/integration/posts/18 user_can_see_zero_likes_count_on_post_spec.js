describe("Timeline", () => {
    it("can see likes count on a new post", () => {
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
  
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      cy.visit("/posts");
      cy.get(".posts").should("contain", "Hello, world!");
      
      // Assert that we can see the likes count
      cy.get(".posts").should("contain", "0 likes");

    });
  });