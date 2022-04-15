const webHelper = require('../support/web_helpers.js');

describe("Timeline", () => {
  it("can delete post", () => {
    webHelper.signUp();
    webHelper.signIn();
    webHelper.submitPost();

    cy.get("#delete-post").submit();

    cy.get(".posts").should("not.contain", "Hello, world!")
  });
});
