describe('Delete posts', function() {
    before(async (done) => {
        await cy.task("db:drop");
        done();
    })

    beforeEach(() => {
        cy.signupAndLogin()
    });

    it('can delete a post and view the updated list', function() {
        cy.visit('/posts');
        cy.get('.new-post-link').click();
        cy.get('#new-post-form').find('[type="text"]').type('Goodbye, world!');
        cy.get('#new-post-form').submit();
        cy.contains('Delete').click();

        cy.get('.posts').should('not.contain', 'Goodbye, world!');
    })
})