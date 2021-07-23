describe("like & dislike buttons", function(){
    it("can like & dislike a post", function(){
        cy.visit('/posts');
        cy.contains('New post').click({force:true});
        cy.get('#new-post-form').find('[type="text"]').type('Please like me!');
        cy.get('#new-post-form').submit();

        cy.get('#like-button:last').click();
        // cy.get('#like-counter:last').should('contain', 1);
        cy.get('.posts').should('contain', 1);

        cy.get('#dislike-button:last').click();
        // cy.get('#dislike-counter:last').should('contain', 1);
        cy.get('.posts').should('contain', 1);

        cy.get('#like-button:last').click();
        // cy.get('#like-counter:last').should('contain', 2);
        cy.get('.posts').should('contain', 2);

        cy.get('.delete-button:last').click();
    });
});
