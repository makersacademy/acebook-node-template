describe("Registration", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");

    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");

    cy.get("#username").type("CypressTestUser");
  
    cy.get("#birthday").type("1999-06-11");
    cy.get("#location").type("Cypress");

    cy.get("#email").type("test@cypress.com");
    cy.get("#password").type("password");

    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });


});
