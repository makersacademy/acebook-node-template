describe("Authentication", () => {
  it("A user cannot sign in due to incorrect credentials", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("123");
    cy.get("#submit").click();

    cy.url().should("include", "/");
    cy.contains("p", "Incorrect credentials");
  });
});
