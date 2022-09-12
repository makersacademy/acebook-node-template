describe("Registration", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("A user signs up and is redirected to posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.url().should("include", "/posts");
  });

  it("'users/new/' redirects to '/posts' if user is already logged in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // visit sign up page when signed in
    cy.visit("/users/new");
    cy.url().should("include", "/posts");
  });

  it("is unable to signup without a email", () => {
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get('input:invalid').should('have.length', 1)
    // cy.get("#error").should("contain", "Please enter the required details");
  });

  it("is unable to signup without a firstname", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get('input:invalid').should('have.length', 1)
    // cy.get("#error").should("contain", "Please enter the required details");
  });

  it.only("is unable to signup without a password", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get('input:invalid').should('have.length', 1)
    // cy.get("#error").should("contain", "Please enter the required details");
  });

  it("redirects to '/' if user already exists", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // log out
    cy.get("#logout").click();

    // sign up again
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // regex to match path of [any number of any characters] folowed by [/]
    cy.url().should("match", /.+\/$/);
  });
});
