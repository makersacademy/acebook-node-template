const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("timeline", () => {
  it.only("should show default_profile_photo", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    cy.get('body').find('img[class="profile-photo"]');
  });
});
