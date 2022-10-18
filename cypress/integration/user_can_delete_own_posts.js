describe('Post deletion', () => {
    it('Deletes a post if you are the owner of it', () => {
      // sign up
      cy.visit("/users/new");
      cy.get("#name").type("name");
      cy.get("#email").type("someone1@example.com");
      cy.get("#password1").type("Password@1");
      cy.get("#password2").type("Password@1");
      cy.get("#submit").click();
  
      //create post
      cy.contains("#logout", "Logout");
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
        
      // delete post
      cy.get("#delete-post-form").click();
      cy.get(".post").eq(0);

    });


    it('Cannot delete a post if you do not own it', () => {
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
  
      });
});