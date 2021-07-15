describe("like button", function(){
    it("can like a post", function(){
        cy.visit('/posts');
        cy.contains('New post').click();
        cy.get('#new-post-form').find('[type="text"]').type('Please like me!');
        cy.get('#new-post-form').submit();

        cy.get('.like-button:last.btn').click();
    
        cy.get('.like-button:last').should('contain', 1);
       
    });
});
