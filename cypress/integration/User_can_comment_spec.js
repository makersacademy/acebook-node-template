const testHelper = require('../support/commands.js')

describe('Comment', function() {

  it ('displays comment form',function() {
    testHelper.signUpTestUser('123@123.com', '123')
    testHelper.loginTestUser('123@123.com', '123')

    cy.visit('/posts');
    testHelper.createTestPost('First Post - lowest');
    cy.get('#0').find('#comment-btn').click();

    cy.get('form#comment-form').should('contain', 'Submit');
  });
  
  it ('displays comment on post on submission',function() {
    testHelper.signUpTestUser('123@123.com', '123')
    testHelper.loginTestUser('123@123.com', '123')

    cy.visit('/posts');
    testHelper.createTestPost('First Post - lowest');
    cy.get('#0').find('#comment-btn').click();

    cy.get('#0').find('#comment').type("This is a comment");
    cy.get('#0').find('#submit').click();
    cy.get('#0').find('.comments').should('contain', 'This is a comment')    
  });
});