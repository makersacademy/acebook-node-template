describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.signUp();

    // sign in
    cy.signIn();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
