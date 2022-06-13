const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("timeline", () => {
  it("should show default_profile_photo", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    cy.get('body').find('img[class="profile-photo"]').should('have.attr', 'src', 'images/default_profile_photo.png');
  });
  
  it("should change the photo when a new photo is chosen", () => {
    const p = 'upload3.jpeg';
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    cy.get("#change_profile_photo").click();
    cy.get("#file-upload").attachFile(p);
    cy.get("#file-submit").click(); 
    cy.get('body').find('img[class="profile-photo"]').should('not.have.attr', 'src', 'images/default_profile_photo.png');
  })
});
