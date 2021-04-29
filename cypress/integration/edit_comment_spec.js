describe('Timeline', function () {
    beforeEach(async (done) => {
        await cy.task("db:drop:all");
        done();
    })
    it('can edit comment', function () {
        cy.visit('/')
        cy.get('input.fname').type('Edit Com')
        cy.get('input#pword').type('Edit')
        cy.get('.registration-form').submit();

        cy.visit('/posts');
        cy.contains('New post').click();

        cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
        cy.get('#new-post-form').submit();

        cy.get('#new-comment-form').type('Unedited comment');
        cy.get('#new-comment-form').submit();

        cy.get('.showcomments').click()

        cy.get('#edit-comment-form').type('Edited comment');
        cy.get('#edit-comment-form').submit();

        cy.get('.posts').should('not.contain', 'Unedited comment');
    });
    

    it('can only edit own comment', function () {
        cy.visit('/')
        cy.get('input.fname').type('Edit Com')
        cy.get('input#pword').type('Edit')
        cy.get('.registration-form').submit();

        cy.visit('/posts');
        cy.contains('New post').click();

        cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
        cy.get('#new-post-form').submit();

        cy.get('#new-comment-form').type('Unedited comment');
        cy.get('#new-comment-form').submit();

        cy.get('#logoutbutton').submit();

        cy.get('input.fname').type('other_user')
        cy.get('input#pword').type('otheruser')
        cy.get('.registration-form').submit();

        cy.get('.showcomments').click()

        cy.get('#edit-comment-form').type('Edited comment');
        cy.get('#edit-comment-form').submit();

        cy.get('.posts').should('not.contain', 'Unedited comment');
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('Bruh! You cant be editing ppls comments like that!');
         })
    });
});