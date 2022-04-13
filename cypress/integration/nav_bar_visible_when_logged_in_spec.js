describe("Nav bar", () => {
  it("Nav bar is only visible when logged in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("input").should('not.contain', 'Log Out');
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.contains("input", "Log Out");
  });
});
