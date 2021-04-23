describe('Timeline', function () {
    it('can sort by date in descending order', function() {
        cy.visit('/posts');
        cy.contains('New post').click();
        cy.get('#new-post-form').find('[type="text"]').type('Goodbye, world!');
        cy.get('#new-post-form').submit();

        cy.contains('New post').click();
        cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
        cy.get('#new-post-form').submit();

        cy.contains('Sort').click()
        
        cy.get('.posts').first().should('contain', 'Hello, world!');
    })
})