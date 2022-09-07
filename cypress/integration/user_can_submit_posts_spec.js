describe("Timeline", () => {
  it('redirects to home page if user goes to /posts when logged out', () => {
    cy.visit("/posts");
    // regex to match path of [any number of any characters] folowed by [/]
    cy.url().should("match", /.+\/$/)
  });

  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    // cy.contains("New post").click();

    // cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    // cy.get("#new-post-form").submit();

    // cy.get(".posts").should("contain", "Hello, world!");
  });
});
