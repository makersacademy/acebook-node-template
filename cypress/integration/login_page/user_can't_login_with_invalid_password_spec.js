describe("Log-in Page - Log-in Functionality - Wrong Password", () => {
    it("user can't log-in successfully without correct password", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("123");
    cy.get("#submit").click();

    cy.url().should("contain", "/sessions/new")
    });
});