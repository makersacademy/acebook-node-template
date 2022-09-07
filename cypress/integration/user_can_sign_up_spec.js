describe("Registration", () => {
  // beforeEach((done) => {
  //   cy.task('dropUsers');
  //   done();
  // })

  it("A user signs up and is redirected to posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("'users/new/' redirects to '/posts' if user is already logged in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("anotherone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("anotherone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // visit sign up page when signed in
    cy.visit("/users/new");
    cy.url().should('include', '/posts')
  })

  it("redirects to '/' if user already exists", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("person@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // log out
    cy.get("#logout").click();

    // sign up again
    cy.visit("/users/new");
    cy.get("#email").type("person@example.com");
    // cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("match", /.+\/$/)
  })
});
