const testHelper = require('../support/commands.js')

describe('Likes', function() {

    it ('shows a like button next to a post',function() {

      testHelper.signUpTestUser('123@123.com', '123')
      testHelper.loginTestUser('123@123.com', '123')
  
      cy.visit('/posts');
      testHelper.createTestPost('First Post - lowest');
  
      expect(cy.get('button.like')).to.not.be.null 
    });

    it ('shows the number of times a like button was clicked',function() {

      testHelper.signUpTestUser('123@123.com', '123')
      testHelper.loginTestUser('123@123.com', '123')
  
      cy.visit('/posts');
      testHelper.createTestPost('First Post - lowest');

      cy.get('#0').find('span').should('be.empty')
      cy.get('#0').find('.like').click();
      cy.get('#0').find('span').should('contain', '1')
    });
    
    it ('shows the number of times a like button was clicked persistently',function() {
      
      testHelper.signUpTestUser('123@123.com', '123')
      testHelper.loginTestUser('123@123.com', '123')
      
      cy.visit('/posts');
      testHelper.createTestPost('This post should be liked 2 times');
      
      cy.get('#0').find('span').should('be.empty')
      cy.get('#0').find('.like').click();
      cy.get('#0').find('span').should('contain', '1')

      cy.get('#log-out').click();

      testHelper.loginTestUser('123@123.com', '123')
      cy.visit('/posts');
      
      cy.get('#0').find('span').should('contain', '1')
    });

});