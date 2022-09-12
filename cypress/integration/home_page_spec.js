describe("Home page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it.only("goes to homepage if user is not logged in", () => {
    cy.visit("/");
    cy.contains("p", "Acebook helps you connect and share")
    // cy.get(".title").should("contain", "Acebook");
    cy.contains("input", "Log in");
  });

  it(" '/' redirects to '/posts' if user is logged in", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // visit homepage when signed in
    cy.visit("/");
    cy.url().should("include", "/posts");
  });
});
