// This test suite covers the funtionality of the landing page, log-in page and sign-up page
// End-To-End - Happy Paths only

describe("Home Page", () => {
    it("has loaded correctly", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
    cy.get('a[href="/users/new"]').should('be.visible');
    cy.get('a[href="/sessions/new"]').should('be.visible');
    });
});

describe("Home Page > Sign-up Page", () => {
    it("redirects to sign-up page", () => {
    cy.get('a[href="/users/new"]').click()
    cy.url().should("include", "/users/new")
    });
});

