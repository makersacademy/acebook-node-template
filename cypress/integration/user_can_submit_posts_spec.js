const webHelper = require('../support/web_helpers.js');

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {

    webHelper.signUp();
    webHelper.signIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".posts").should("contain", "a few seconds ago");
  });
});
