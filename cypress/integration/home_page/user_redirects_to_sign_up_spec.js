describe("Home Page - Sign-up Redirect", () => {
    it("sign-up button redirects", () => {
    cy.visit("/")
    cy.get('a[href="/users/new"]').click();
    cy.url().should("contain", "/users/new")
    });
});