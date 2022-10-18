describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
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

    // // submit a post
    // cy.visit("/posts");
    cy.contains("Make a post").click();
    // cy.visit("/posts/new");
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
    // cy.get("#submit").click();

    // cy.get(".post:first")
    //   .find(".post-content")
    //   .should("contain", "Hello, world!");
    // cy.get(".post:first").find(".post-author").should("contain", "someone");
  });
});
