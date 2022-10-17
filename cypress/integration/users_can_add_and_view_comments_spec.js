describe("Comments", () => {
  it("users can submit and view comments", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone6@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone6@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.contains("Make a post").click();
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    //submit a comment
    cy.get(".comment-input:first").type("A comment");
    cy.get(".submit-comment:first").click();

    cy.get(".comments:first").should("contain", "A comment");
    cy.get(".comments:first").should("contain", "someone");
  });

  it("users can submit and view multiple comments", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone8@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone2");
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in as someone
    cy.visit("/sessions/new");
    cy.get("#email").type("someone8@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.contains("Make a post").click();
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    // submit another post
    cy.contains("Make a post").click();
    cy.get("#message").type("Another test post");
    cy.get("#submit").click();

    //comment on the first post
    cy.get(".post:first")
      .find(".comment-form")
      .within(() => {
        cy.get(".comment-input:first").type("A comment");
        cy.get(".submit-comment:first").click();
      });

    //expect comment to be visible
    cy.get(".post:first")
      .find(".comments:first")
      .within(() => {
        cy.get(".comment:first").within(() => {
          cy.get(".comment-content:first").should("contain", "A comment");
          cy.get(".comment-author:first").should("contain", "someone");
        });
      });

    //log-out
    cy.get("#logout").click();

    //sign in as someone2
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    //comment on the first post
    cy.get(".post")
      .eq(0)
      .find(".comment-form")
      .within(() => {
        cy.get(".comment-input:first").type("Another comment");
        cy.get(".submit-comment:first").click();
      });

    //comment on the second post
    cy.get(".post")
      .eq(1)
      .find(".comment-form")
      .within(() => {
        cy.get(".comment-input:first").type("Comment on second post");
        cy.get(".submit-comment:first").click();
      });

    //expect two comments for first post
    cy.get(".post:first")
      .find(".comments:first")
      .within(() => {
        cy.get(".comment")
          .eq(0)
          .within(() => {
            cy.get(".comment-content:first").should("contain", "A comment");
            cy.get(".comment-author:first").should("contain", "someone");
          });
        cy.get(".comment")
          .eq(1)
          .within(() => {
            cy.get(".comment-content:first").should(
              "contain",
              "Another comment"
            );
            cy.get(".comment-author:first").should("contain", "someone2");
          });
      });

    //and one comment for second post
    cy.get(".post")
      .eq(1)
      .find(".comments:first")
      .within(() => {
        cy.get(".comment:first").within(() => {
          cy.get(".comment-content:first").should(
            "contain",
            "Comment on second post"
          );
          cy.get(".comment-author:first").should("contain", "someone2");
        });
      });
  });
});
