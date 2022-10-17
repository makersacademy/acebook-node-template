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
    //this test works well only when one post is on the page
    //need a way to distinguish between posts for submitting and viewing comments
    //perhaps they can all have html id's of the mongo post id
    cy.get(".comment-input:first").type("A comment");
    cy.get(".submit-comment:first").click();

    //there can be better ways to structure nested posts & comments
    //to ensure there is match between a comment and it's author when testing
    cy.get(".comments:first").should("contain", "A comment");
    cy.get(".comments:first").should("contain", "someone");
  });
});
