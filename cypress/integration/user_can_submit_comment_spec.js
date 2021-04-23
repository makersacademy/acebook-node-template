describe('Timeline', function() {
  beforeEach(() => {
    cy.visit('/users/signup');
    cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
    cy.get('#sign-up-form').find('#password').type('test123');
    cy.get('#sign-up-form').submit();
    cy.contains('Log in').click();
    cy.get('#log-in-form').find('#email').type('email@test.co.uk');
    cy.get('#log-in-form').find('#password').type('test123');
    cy.get('#log-in-form').submit();
  });

  it('can submit a coment and view it', function() {
      cy.visit('/posts');
      cy.contains('Add Comment').click();
      cy.get('#new-comment-form').find('[type="text"').type('Cool story bro!')
      cy.contains('Submit').click();
      
      cy.get('.comments').should('contain', 'Cool story bro!');
  })
});