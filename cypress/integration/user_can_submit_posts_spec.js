const testHelper = require('../support/commands.js')

describe('Timeline', function() {

    it ('puts latest posts on top',function() {

      testHelper.signUpTestUser('123@123.com', '123')
      testHelper.loginTestUser('123@123.com', '123')
  
      cy.visit('/posts');
      testHelper.createTestPost('First Post - lowest');
      testHelper.createTestPost('Second Post- middle');
      testHelper.createTestPost('Third Post - top');
  
      cy.get('#posts > .post').should(($lis) => {
        
        expect($lis.eq(0)).to.contain('Third Post - top')
        expect($lis.eq(1)).to.contain('Second Post- middle')
        expect($lis.eq(2)).to.contain('First Post - lowest')
      })
      
    });
});
