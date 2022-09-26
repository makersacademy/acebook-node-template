describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {

    // Empty Users  
    cy.task('emptyUsers').then(() => {

    // sign up
    cy.visit("/users/new");
    cy.get("#first_name").type("first1")
    cy.get("#last_name").type("last1")
    cy.get("#email").type("london@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("london@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();


    cy.task('emptyPosts').then(() => {
      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();

      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
    })

    cy.get(".posts").should("contain", "Hello, world!", "first1 last1");

    cy.task('emptyComments').then(() => {
      // submit a comment
      cy.get("#new-comment-form").find('[type="text"]').type("test comment");
      cy.get("#new-comment-form").submit();

      cy.get(".posts").should("contain", "test comment", "first1 last1");
    })
    })
  });
});
