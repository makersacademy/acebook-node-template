describe ('Sign up', function (){

  it('allows a user to sign up', ()=>{
    cy.visit('/users/new');
    cy.get('#new-user-form').submit();
    cy.url('/sessions/new')
  });

  it ('post sign up can log in', ()=>{
    cy.visit('/users/new');
    cy.get('#new-user-form').submit();
    cy.url('/sessions/new');
    cy.get('#new-session-form').submit();
    cy.url('/posts');
  });

});