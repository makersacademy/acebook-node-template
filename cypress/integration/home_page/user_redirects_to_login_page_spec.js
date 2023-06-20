describe("Home Page - Log-in Redirect", () => {
    it("log-in button redirects", () => {
    cy.visit("/")
    cy.get('a[href="/sessions/new"]').click();
    cy.url().should("contain", "/sessions/new")
    });
});