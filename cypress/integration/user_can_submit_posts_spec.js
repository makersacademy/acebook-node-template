describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/')
    cy.get('input.fname').type('Morris')
    cy.get('input#pword').type('Morris')
    cy.get('.registration-form').submit();
    
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.cards').should('contain', 'Hello, world!');
  });
});
