const path = require("path");
describe("Timeline", () => {
  it("can access new post form with photo upload", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("someone");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // asserts form contents
    cy.contains("Make a post").click();
    cy.get("#new-post-form").should(
      "have.attr",
      "enctype",
      "multipart/form-data"
    );
    cy.get("#new-post-form")
      .find('[type="file"]')
      .should("have.attr", "name", "uploadedImage");
    cy.get("#new-post-form")
      .find("#submit")
      .should("have.class", "btn btn-default");
  });

  it("can submit post with just photo", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("someone");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // uploads an image and submits post
    cy.contains("Make a post").click();
    cy.get("#new-post-form")
      .find('[type="file"]')
      .selectFile(
        path.join(__dirname, "..", "..", "public", "images", "cat.png")
      );

    cy.get("#new-post-form").find("#submit").click();

    cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "cat.png"),
      "base64"
    ).then((image) => {
      const src = `data:image/png;base64,${image}`;
      cy.get(".post:first")
        .find(".post-image:first")
        .should("have.attr", "src", src);
    });
  });
});
