
describe("Sign-up Page - Password Check", () => {
    it("has a text box for inputting password", () => {
    cy.get("#password").should("be.visible")
    });
});