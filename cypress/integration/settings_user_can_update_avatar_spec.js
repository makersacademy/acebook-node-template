const path = require("path");

describe("Settings", () => {
  it("user can update their avatar (profile image)", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone7@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone7@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // get /settings
    cy.get("#settings-navbar").click();

    cy.get(".user").should("contain", "someone");
    cy.get("#user-email").should("contain", "someone7@example.com");

    // skip checking for default avatar (see other test(s))
    cy.get('#choose-file').selectFile(path.join(__dirname, "..", "..", "public", "images", "cat.png"));
    cy.get('#upload-file').click();

    cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "cat.png"),
      "base64"
    ).then((image) => {
      const src = `data:image/png;base64,${image}`;
      cy.get("#profile-image").should("have.attr", "src", src);
    });
  });
});
