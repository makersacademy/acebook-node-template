
describe('Timeline', function() {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can submit posts and view them', function() {
    cy.visit('/user/new')
    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#password-id').type('123456');
    cy.get('#createUser').click()

    cy.visit('/posts');
    // cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hi');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hi');
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    console.log("err :" + err)
    console.log("runnable :" + runnable)
    return false
})
});
