describe("Login page", function(){

  it("returns to login page if user is not in database", function() {
    cy.task('emptyPosts');
    cy.task('emptyUsers');
    cy.visit('/');
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();

    cy.get('#login-message').should('contain', 'Login unsuccessful: incorrect email or password.');
  })


  it("login success if user credentials are correct", function(){
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345', profilePicture: "" });
    cy.visit('/');
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();

    cy.get('#login-message').should('contain', 'Welcome');
    // cy.get('.loginMessage').should('contain', 'Login sucessful')
  })

  it("login fails if user credentials are incorrect", function() {
    cy.visit('/'); //will change route on refactor
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('wrong')
    cy.get('#login-form').submit();

    cy.get('#login-message').should('contain', 'Login unsuccessful: incorrect email or password.');
  });
})
