describe('Timeline', function() {
    it('can delete a post and view the updated list', function() {
        cy.visit('/posts');
        cy.contains('New post').click();
        cy.get('#new-post-form').find('[type="text"]').type('Goodbye, world!');
        cy.get('#new-post-form').submit();
        cy.contains('Delete').click();

        cy.get('.posts').should('not.contain', 'Goodbye, world!');
    })
})