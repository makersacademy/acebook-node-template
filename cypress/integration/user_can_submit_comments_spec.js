describe("Timeline", () => {
  it("can submit comments, when signed in, and post had been submitted", () => {
    // sign up
    cy.visit("/users/new");
    cy.contains("First name:").type("Chris")
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.contains("Email:").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();


    // submit a comment
    cy.visit("/posts");

    cy.get("#new-comment-form").find('[type="text"]').type("Hi!");
    cy.get("#new-comment-form").submit();

    cy.get(".posts").should("contain", "Hi!");
  });
});