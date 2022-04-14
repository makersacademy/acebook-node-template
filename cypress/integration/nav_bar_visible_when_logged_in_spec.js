describe("Nav bar", () => {
  beforeEach(() => {
    cy.task('clearusers')
  })
  it("Nav bar is only visible when logged in", () => {
    // sign up
    cy.signUp();

    // sign in
    cy.signIn();

    cy.contains("input", "Log Out");
  });
});
