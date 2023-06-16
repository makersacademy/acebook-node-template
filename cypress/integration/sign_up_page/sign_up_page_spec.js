//Test Suite that checks the expected elements are on the page upon loading

describe("Sign-up Page", () =>{
    it("has a title", () =>{
    cy.visit("/users/new");
    cy.get("h1").should("contain", "Acebook");
    });
});

describe("Sign-up Page - Login Button Check", () => {
    it("has a link to sign-up", () => {
    cy.get('a[href="/sessions/new"]').should('be.visible');
    });
});

describe("Sign-up Page - Return to Home Page Button Check", () => {
    it("has a link to return to the home page", () => {
    cy.get("#home-link").should('be.visible');
    });
});

describe("Sign-up Page - First Name Check", () => {
    it("has a text box for inputting first name", () => {
    cy.get("#firstName").should("be.visible")
    });
});

describe("Sign-up Page - Last Name Check", () => {
    it("has a text box for inputting last name", () => {
    cy.get("#lastName").should("be.visible")
    });
});

describe("Sign-up Page - E-mail Check", () => {
    it("has a text box for inputting e-mail address", () => {
    cy.get("#email").should("be.visible")
    });
});

describe("Sign-up Page - Password Check", () => {
    it("has a text box for inputting password", () => {
    cy.get("#password").should("be.visible")
    });
});