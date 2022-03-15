describe("View Profile", () => {
  it("View the profile page", async () => {
    // sign up

    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("test name");
    
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#view-profile").click();

    cy.url().should("include", "/users/show");
    cy.contains("p", "test name");
  });

});