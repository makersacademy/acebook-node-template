describe('Log in', function(){
  it('has a fields to log in', function(){
    cy.visit('/');
    cy.contains('Log in').click();
    cy.contains('Log in').click();
    cy.get('input[name=username]').type('jane.lane')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
  });
  });

  //feature 'Verify user' do
  	//scenario 'User does not exsist' do
  	//login('sasquatch@hotmail.com', 'farts')
    //expect(page).to have_content 'This user does not exsist please sign up.'
     //end
