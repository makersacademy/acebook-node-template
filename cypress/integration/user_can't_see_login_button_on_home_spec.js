describe("Home page logged in", () => {
  it("has no login button", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
    cy.get("nav").should("not.contain", "Log in")
  });
  it("has logout button", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
    cy.get("nav").should("not.contain", "Log in")
  });
});
