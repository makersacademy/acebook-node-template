describe("Password Validation", () => {
  it("A user cannot sign up if providing invalid password", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneexample.com");
    cy.get("#email").should('have.class', 'is-invalid');

    cy.visit("/users/new");
    cy.get("#firstName").type("X");
    cy.get("#firstName").should('have.class', 'is-invalid');

    cy.visit("/users/new");
    cy.get("#surName").type("X");
    cy.get("#surName").should('have.class', 'is-invalid');

    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#password").should('have.class', 'is-invalid');
  });
});