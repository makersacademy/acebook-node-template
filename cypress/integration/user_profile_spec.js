describe('Profile', function() {
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })
	
	describe('profile views', function(){
		beforeEach(() => {
			cy.signupAndLogin()
		});

		it('can view profile', function() {
			cy.visit('/posts');
			cy.contains('user1').click();
	
			cy.contains('user1');
			cy.contains('I have not written a bio yet');
		});

		it('can edit a profile', function(){
			cy.visit('/posts');
			cy.contains('user1').click();
	
			cy.contains('Edit Profile').click();
			cy.get('#edit-profile-form').find('#message').type('I am a robot');
			cy.get('#edit-profile-button').click();

			cy.contains('I am a robot');
	
		});

		it('can view posts created by the author', function(){
			
		})
	})
  
})