const webHelper = require('../support/web_helpers.js');

describe("Timeline", () => {
  it("can see profile picture", () => {

    webHelper.signUp();

    cy.get("#side-bar").find("img").should('be.visible');
    });
  })