'use strict';
const testHelper = require('../support/commands.js')

describe('scroll position', function () {

  it('should be saved upon refresh', function() {

    testHelper.signUpTestUser('123@123.com', '123')
    testHelper.loginTestUser('123@123.com', '123')

    for(let i=0; i<10; i++) {
      testHelper.createTestPost(i)
    }
  cy.visit('/posts/')
    .scrollTo('bottom')
  cy.visit('/posts/')
    .window()
    .its('scrollY')
    .should('not.equal', 0);
  })
})