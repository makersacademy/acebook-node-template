describe("Timeline", () => {
  it("can submit a post and then like it only once", () => {
    // sign up x2
    cy.visit("/users/new");
    cy.get("#name").type("someone4");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/users/new");
    cy.get("#name").type("someone5");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Make a post").click();
    cy.visit("/posts/new");

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    // press like twice
    cy.get("#likeCount").should("contain", "0");
    cy.get("#submit").click();
    cy.get("#submit").click();
    cy.get("#likeCount").should("contain", "1");

    cy.get("#logout").click();

    // login with another user
    cy.visit("/sessions/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/posts");

    // press like twice
    cy.get("#likeCount").should("contain", "1");
    cy.get("#submit").click();
    cy.get("#submit").click();
    cy.get("#likeCount").should("contain", "2");
  });
});
