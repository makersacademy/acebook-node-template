'use strict'

const testHelper = require('../support/commands.js')

describe('Like Button', function() { 

  it('shows if it was clicked', function() {
    
    testHelper.signUpTestUser('123@123.com', '123')
    testHelper.loginTestUser('123@123.com', '123')
  
    cy.visit('/posts');
    testHelper.createTestPost('Like Button tester');
    cy.get('#0').find('.like').should('not.have.class', 'active')
    cy.get('#0').find('.like').click();
    cy.get('#0').find('.like').should('have.class', 'active')
    cy.get('#0').find('.like').click();
    cy.get('#0').find('.like').should('not.have.class', 'active')


  })
});