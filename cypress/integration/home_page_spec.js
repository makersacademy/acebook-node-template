describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("has a link to the login page", () => {
    cy.visit("/");
    cy.contains("a", "Already a Member?").should("have.attr", "id", "login-link");
  });

  it("the login page link takes the user to /sessions/new", () => {
    cy.visit("/");
    cy.get('#login-link').click();

    cy.url().should('include', '/sessions/new')
  });

  it("has a link to the signup page", () => {
    cy.visit("/");
    cy.contains("a", "Not a Member?").should("have.attr", "id", "signup-link");
  });

  it("the signup page link takes the user to /users/new", () => {
    cy.visit("/");
    cy.get('#signup-link').click();

    cy.url().should('include', '/users/new')
  });
});
