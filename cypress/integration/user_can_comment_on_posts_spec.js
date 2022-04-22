// const webHelper = require("../support/web_helpers.js");

describe("Timeline", () => {
  it("can submit comments on posts and view them", () => {
    webHelper.signUp();
    webHelper.submitPost();

    // submit a comment

    cy.get("#new-comment-form").find('[type="text"]').type("Awesome Cat!");
    cy.get("#new-comment-form").submit();

    cy.get("#comment").should("contain", "Awesome Cat!");
    cy.get("#comment").should("contain", "a few seconds ago");
  });
});
