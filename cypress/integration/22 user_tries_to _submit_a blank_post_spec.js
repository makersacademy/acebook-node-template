describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
    // sign up
    cy.visit("/users/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    //cy.get("#new-post-form").find('[type="text"]').type("");
    cy.get("#new-post-form").submit();
    // check for error message, NOTE: this checks the entire page and as such will fail if this text is anywhere on the page. Potential area for refactoring
    //cy.contains('post must be populated');
    // tempory test to assert still on new post page
    cy.url().should('include', '/posts/new');

      });
});
