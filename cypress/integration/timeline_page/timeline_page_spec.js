//Test Suite that checks the expected elements are on the page upon loading

describe("Precondition - Log-in", () => {
    it("user logging in for test suite", () =>{
    
    cy.visit("/sessions/new")
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();
    cy.url().should("include", "/posts"); 
    });
});
describe("Timeline Page", () => {
    it("has a title", () => {
    cy.get("h1").should("contain", 'Timeline')
    });
});

describe("Timeline Page - Logout Button Check", () => {
    it("has a logout button", () => {
    cy.get("input[type='submit']").should("be.visible")
    });
});

describe("Timeline Page - My Profile Button Check", () => {
    it("has a my profile button", () => {
    cy.get("a[href='../profile']").should("be.visible")
    });
});

describe("Timeline Page - New Post Button Check", () => {
    it("has a new post button", () => {
    cy.get("a[href='/posts/new']").should("be.visible")
    });
});