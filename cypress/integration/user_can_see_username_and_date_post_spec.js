const webHelper = require('../support/web_helpers.js');

describe("Timeline", () => {
  it("can see username and date by the post", () => {

    webHelper.signUp();
    webHelper.signIn();
    webHelper.submitPost();

    cy.get(".posts:first").should("contain", "username");
    cy.get(".posts:first").should("contain", "2022");
  });
})