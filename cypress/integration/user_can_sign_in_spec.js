describe("Authentication", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get("#logout").click();

    // sign in
    cy.visit("/");
    cy.get("#user_email").type("someone@example.com");
    cy.get("#user_password").type("password");
    cy.get("#login_submit_btn").click();

    cy.url().should("include", "/posts");
  });
});
