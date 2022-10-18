const path = require("path");

describe("Settings", () => {
  it("displays the user information with default avatar", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone3@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone3@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // get /settings
    cy.get("#settings-navbar").click();

    cy.get(".user").should("contain", "someone");
    cy.get("#user-email").should("contain", "someone3@example.com");

    cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "testImage.png"),
      "base64"
    ).then((image) => {
      const src = `data:image/png;base64,${image}`;
      cy.get("#profile-image").should("have.attr", "src", src);
    });
  });
});
