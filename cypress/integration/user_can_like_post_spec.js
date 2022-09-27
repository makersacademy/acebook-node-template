describe("like button", () => {
    it('user can like a post', () => {
        cy.task('emptyPosts').then(() => {

            // sign up attempt 1
            cy.visit("/users/new");
            cy.get("#email").type("newsomeone@example.com");
            cy.get("#password").type("Password8$");
            cy.get("#first_name").type("name");
            cy.get("#last_name").type("surname");
            cy.get("#submit").click();
            
            //sign in
            cy.visit("/sessions/new");
            cy.get("#email").type("newsomeone@example.com");
            cy.get("#password").type("Password8$");
            cy.get("#submit").click();

            //submit a post

            cy.visit("/posts");
            cy.contains("New post").click();
            cy.get("#new-post-form").find("#message").type("Hello!");
            cy.get("#new-post-form").submit();

            //User can like a post

            cy.get("#like_button").click();
            cy.get('.posts').should('contain', 1);
            cy.get("#like_counts").should('contain', 1);
        })
          
    })
})