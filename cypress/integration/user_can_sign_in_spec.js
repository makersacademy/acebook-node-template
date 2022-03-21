describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    cy.sign_up_and_sign_in();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
