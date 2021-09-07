var faker = require('faker');

// require('../mongodb_helper')
// var Post = require('../../models/post');


describe('Timeline', function() {
  it('can remove posts and see the changes', function() {
    let randomText1 = faker.lorem.words()
    let randomText2 = faker.lorem.words()

    cy.visit('/posts');
    cy.contains('New post').click();
    cy.get('#new-post-form').find('[type="text"]').type(randomText1);
    cy.get('#new-post-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();
    cy.get('#new-post-form').find('[type="text"]').type(randomText2);
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', randomText1);
    cy.get('.posts').should('contain', randomText2);
  
   cy.contains(randomText1).submit();
   cy.get('.posts').should('not contain', randomText1); 
  });
});