//Test Suite that checks the expected elements are on the page upon loading


describe("Log-in Page", () =>{
    it("has a title", () =>{
    cy.visit("/sessions/new");
    cy.get("h1").should("contain", "Acebook");
    });
});

describe("Log-in Page - Sign-Up Button Check", () => {
    it("has a link to sign-up", () => {
    cy.get('a[href="/users/new"]').should('be.visible');
    });
});

describe("Log-in Page - Return to Home Page Button Check", () => {
    it("has a link to return to the home page", () => {
    cy.get("#home-link").should('be.visible');
    });
});


describe("Log-in Page - E-mail Check", () => {
    it("has a text box for inputting e-mail address", () => {
    cy.get("#email").should("be.visible")
    });
});

describe("Log-in Page - Password Check", () => {
    it("has a text box for inputting password", () => {
    cy.get("#password").should("be.visible")
    });
});

describe("Log-in Page - Log-in Button Check", () => {
    it("has a button for logging in", () => {
    cy.get("#submit").should("be.visible")
    });
});