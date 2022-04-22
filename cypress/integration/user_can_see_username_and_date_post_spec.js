const webHelper = require("../support/web_helpers.js");

describe("Timeline", () => {
  it("can see username by the post", () => {
    webHelper.signUp();
    webHelper.submitPost();

    cy.get(".posts:first").should("contain", "username");
  });
});
