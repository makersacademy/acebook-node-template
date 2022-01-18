'use strict'

const testHelper = require('../support/commands.js')

describe('Loggin fails', function() { 

  it('when user is unknown', function() { 
    testHelper.signUpTestUser('123@123.com', '123')
    testHelper.loginTestUser('456@123.com', '123')

    cy.get('#error-form').should('contain', 'Unknown User');
  });

  it('when password is wrong', function() { 
    testHelper.signUpTestUser('456@123.com', '456')
    testHelper.loginTestUser('456@123.com', '123')

    cy.get('#error-form').should('contain', 'Wrong Password');

  });
});