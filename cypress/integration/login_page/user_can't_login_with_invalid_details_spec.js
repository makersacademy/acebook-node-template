describe("Log-in Page - Log-in Functionality - Wrong Details", () => {
    it("user can't log-in successfully without correct details", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("tet@test.com");
    cy.get("#password").type("123");
    cy.get("#submit").click();

    cy.url().should("contain", "/sessions/new")
    });
});