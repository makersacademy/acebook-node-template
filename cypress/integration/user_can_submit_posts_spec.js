describe("Timeline", () => {
  it("can submit posts, when signed in, and view them with email attached", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone3@example.com");
    cy.get("#password").type("password3");
    cy.get("#submit").click();


    // submit a post
    // cy.visit("/posts");

    cy.get(".new-field").type("Hello, world!");
    cy.get(".post-button").click();

    cy.get(".posts").find(".post-message").should("contain", "Hello, world!");
    cy.get(".posts").find(".post-user").should("contain", "someone3@example.com");
  });

  it("when posts are submitted, new posts are shown at the top", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone10@example.com");
    cy.get("#password").type("password3");
    cy.get("#submit").click();

    cy.get(".new-field").type("This goes on top!");
    cy.get(".post-button").click();

    // Unit tests already submitted a message which will be older than this one, 
    cy.get(".posts").first().find(".post-message").should("contain", "This goes on top!");
    cy.get(".posts").last().find(".post-message").should("contain", "Hello, world!");
  })
});
