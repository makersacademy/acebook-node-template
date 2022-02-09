describe('TimelineOrder', function() {
  it.only('can display posts in order', function() {
    cy.visit('/sessions/new');
    cy.get('[id=email]').type('admin@admin.com');
    cy.get('[id=password]').type('admin');
    cy.contains('Submit').click();
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('First Post');
    cy.get('#new-post-form').submit();


    cy.get('.posts').first().should('contain', 'First Post');
  });
});