describe("Timeline", () => {
  // This assumes the test database contains record of below
  // user created using the sign-up process
  it("User can click on log-in and log in to acebook", () => {
    const now = new Date();
    // log in from home page
    cy.visit("/");
    cy.contains("Log in").click();

    // log in 
    cy.get("#email").type("a@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // Redirected to posts page
    cy.contains('Timeline').should('be.visible');
    

  });
});
