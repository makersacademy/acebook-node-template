describe("Comments", () => {
    it("Deletes a comment if you are the owner", () => {
      // sign up
      cy.visit("/users/new");
      cy.get("#name").type("name");
      cy.get("#email").type("someone@example.com");
      cy.get("#password1").type("Password@1");
      cy.get("#password2").type("Password@1");
      cy.get("#submit").click();
  
      // submit a post
      cy.contains("#logout", "Logout");
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      cy.get("#new-comment-form").find('[type="text"]').type("comment on post");
      cy.get("#new-comment-form").submit();
      cy.get(".comment").first().contains("comment on post");
      cy.get("#delete-comment-form").submit();
  
      cy.get("#delete-comment-form").should('not.exist');
    });



    it('Cannot delete a comment if you do not own it', () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#name").type("name");
        cy.get("#email").type("someone2@example.com");
        cy.get("#password1").type("Password@1");
        cy.get("#password2").type("Password@1");
        cy.get("#submit").click();
    
        //create post
        cy.contains("#logout", "Logout");
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();

        //creat comment
        cy.get("#new-comment-form").find('[type="text"]').type("comment on post");
        cy.get("#new-comment-form").submit();
        cy.get(".comment").first().contains("comment on post");

        //logout
        cy.get("#logout").click();
        
        //sign up with different user
        cy.visit("/users/new");
        cy.get("#name").type("name");
        cy.get("#email").type("somebody3@example.com");
        cy.get("#password1").type("Password@1");
        cy.get("#password2").type("Password@1");
        cy.get("#submit").click();
        
        //no option to delete
        cy.get("#delete-post-form").should('not.exist');
        cy.get("#delete-comment-form").should('not.exist');
      });
  });
  