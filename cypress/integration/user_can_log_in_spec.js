describe('Log in', function(){
  it('has a fields to log in', function(){
    cy.visit('/');
    cy.contains('Log in').click();
    cy.get('input[name=username]').type('jane.lane')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
  });
  });


    //cy.visit('/');
    //cy.contains('Log in').click();
    //cy.get('#username').find('[type="text"]').type('sheep');
    //cy.get('#username').find('[type="text"]').type('password');
    //cy.get('#username').type('sheep');
    //expect(cy.get('#username').submit());
    //cy.get('.posts2').should('contain', 'Hello, world!');
  //});
//});
