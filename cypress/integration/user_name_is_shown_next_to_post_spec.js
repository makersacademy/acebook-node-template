const testHelper = require('../support/commands.js')

describe('UserNameNextToPost', function() {

    it ('shows a user name next to a post',function() {

      testHelper.signUpTestUser('123@123.com', '123')
      testHelper.loginTestUser('123@123.com', '123')
  
      cy.visit('/posts');
      testHelper.createTestPost('First Post - lowest');
  
      cy.get('#0').find('.user_name').should('contain', '123@123.com')

    });

});