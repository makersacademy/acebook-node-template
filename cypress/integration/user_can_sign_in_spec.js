describe("Authentication", () => {
  it("A user signs in after signing up and is redirected to /posts", () => {
    // sign up
    cy.visit("/");
    cy.get("#signup").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });

  it("A user with an account signs in and is redirected to /posts", () => {
    //sign up
    cy.visit("/");
    cy.get("#signup").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click()

    //sign in
    cy.visit("/")
    cy.get("#signin").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  })
});
