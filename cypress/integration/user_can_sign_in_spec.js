describe("Authentication", () => {
  it("A user signs in after signing up and is redirected to /posts", () => {
    // sign up
    cy.visit("/");
    cy.get("#name").type("The Constable");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-signup").click();

    cy.url().should("include", "/posts");
    cy.contains("h1", "Timeline");
  });

  it("A user with an account logs in and is redirected to /posts", () => {
    //sign up
    cy.visit("/");
    cy.get("#name").type("The Constable");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-login").click();

    //log out
    cy.get("#logout").click();

    //log in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("h1", "Timeline");
  })
});
