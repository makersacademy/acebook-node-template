describe("Log-in Page - Log-in Functionality", () => {
    it("user can log-in successfully", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    cy.url().should("contain", "/posts")
    });
});