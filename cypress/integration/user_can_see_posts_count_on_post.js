describe("Timeline", () => {
    it("can see likes count on a new post", () => {
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
      cy.get("#message").type("Hello, world!");
      cy.get("#submit_post").click();
  
      cy.get(".posts").should("contain", "Hello, world!");

      // Assert that we can see the likes count
      cy.get(".posts").should("contain", "0 likes");
    });
  });
  