describe("Timeline", () => {
  beforeEach(() => {
    cy.task('dropUsers');
    cy.task('dropPosts');
  })

  it('redirects to home page if user goes to /posts when logged out', () => {
    cy.visit("/posts");
    // regex to match path of [any number of any characters] folowed by [/]
    cy.url().should("match", /.+\/$/);
  });

  it("can submit posts, when signed in, and view them", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Whats on your mind?")

    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("Unable to submit a blank post", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a blank post
    cy.get("#submit").click();

    cy.contains("div", "Please enter a message")
    // cy.get("li").should("be.null");
    // cy.get("li").should("have.length", 0);
  });
});
