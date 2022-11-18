describe("Homepage", () => {
    it("can see username when logged in", () => {
      // sign up
      cy.visit("/users/new");
      cy.get("#email").type("someoneelse222@example.com");
      cy.get("#name").type("Testing User");
      cy.get("#password").type("password");
      cy.get("#submit").click();

    //   sign in

    cy.visit("/sessions/new");
    cy.get("#email").type("someoneelse222@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

      // homepage view
      cy.visit("/posts");
      cy.contains("Testing User");

    
  
    //   // submit a post
    //   cy.visit("/posts");
    //   cy.contains("New post").click();
  
    //   cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    //   cy.get("#new-post-form").submit();
  
    //   cy.get(".posts").should("contain", "Hello, world!");
  
    //   // Assert that we can see the likes count
    //   cy.get(".posts").should("contain", "0 likes");
    //   //assert that we can see name of post author
    //   cy.get(".posts").should("contain", "Testing User");
    });
  });
  