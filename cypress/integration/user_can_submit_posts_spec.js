const testHelper = require('../support/commands.js')

describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/users/new');

    cy.get('#new-user-form').find('[type="email"]').type('123@123.com');
    cy.get('#new-user-form').find('[type="password"]').type('123');
    cy.get('#new-user-form').submit();
    cy.visit('/sessions/new');

    cy.get('#new-session-form').find('[type="email"]').type('123@123.com');
    cy.get('#new-session-form').find('[type="password"]').type('123');
    cy.get('#new-session-form').submit();

    cy.visit('/posts');
    testHelper.createTestPost('Hello, world!')

    cy.get('.posts').should('contain', 'Hello, world!');
  });

    it ('puts latest posts on top',function() {

      testHelper.signUpTestUser('123@123.com', '123')
  
      cy.get('#new-session-form').find('[type="email"]').type('123@123.com');
      cy.get('#new-session-form').find('[type="password"]').type('123');
      cy.get('#new-session-form').submit();
  
      cy.visit('/posts');
      testHelper.createTestPost('First Post - lowest');
      testHelper.createTestPost('Second Post- middle');
      testHelper.createTestPost('Third Post - top');
  
      cy.get('.posts > li').should(($lis) => {
        
        expect($lis.eq(0)).to.contain('Third Post - top')
        expect($lis.eq(1)).to.contain('Second Post- middle')
        expect($lis.eq(2)).to.contain('First Post - lowest')
      })
      
    });
});
