describe("Timeline", () => {
    it("can submit comments on posts, when signed in, and view them", () => {
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
  
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();

      //write comment
      cy.contains("Comment").click();
      cy.visit({
        url: '/posts/#/comment',
        qs: {'name': 'foo'}
      })

      cy.get("#new-comment-form").find('[type="text"]').type("First comment!");
      cy.get("#new-comment-form").submit();

      cy.get(".posts").should("contain", "First comment!");

    });
  });