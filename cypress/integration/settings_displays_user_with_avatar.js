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

    cy.log(cy.get("#user-name"));
    cy.get("#user-name").should("contains", "someone");
    cy.get("#user-email").should("contains", "someone3@example.com");
    const image = cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "testImage.png")
    );
    const srcString = `data:image\png;base64,${image.toString("base64")}`;
    cy.get("#profile-image").should("have.attr", "src", srcString);
  });
});
