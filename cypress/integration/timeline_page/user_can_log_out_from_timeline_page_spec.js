describe("Timeline Page - Log Out Functionality", () => {
    it("user can log out from timeline page", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("input[type='submit']").click();
    cy.url().should("include", "/sessions/new")
    });
});