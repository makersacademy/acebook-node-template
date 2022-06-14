const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("timeline", () => {
  it("shows profile photo next to username on a post", (done) => {  
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    submitPost("Hello, world!");

    // test to see the profile pic 
    cy.get('.author_container').find('img[class="profile-photo"]').should('have.attr', 'src', 'images/default_profile_photo.png');
    done();
  });

  it("should change the photo when a new photo is chosen", (done) => {
    const p = 'upload3.jpeg';
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    cy.get("#change_profile_photo").click();
    cy.get("#file-upload").attachFile(p);
    cy.get("#file-submit").click(); 
    
    // test to check the profile pic has changed
    cy.get('body').find('img[class="profile-photo"]').should('not.have.attr', 'src', 'images/default_profile_photo.png');
    done();
  });
});