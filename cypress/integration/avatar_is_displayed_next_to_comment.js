const path = require("path");

describe("Timeline", () => {
  xit("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // get /settings
    cy.get("#settings-navbar").click();

    // skip checking for default avatar (see other test(s))
    cy.get("#choose-file").selectFile(
      path.join(__dirname, "..", "..", "public", "images", "cat1.png")
    );
    cy.get("#upload-file").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Make a post").click();
    cy.visit("/posts/new");

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    // new post is displayed with the author information and its avatar
    cy.get(".post")
      .first() // or .eq(0)
      .should("contain", "Hello, world!")
      .should("contain", "someone");

    cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "cat1.png"),
      "base64"
    ).then((image) => {
      const src = `data:image/png;base64,${image}`;
      cy.get(".author-post-image").first().should("have.attr", "src", src);
    });
  });
});
