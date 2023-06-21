describe("List ordering on profile page", () => {
    it("lists in order", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // go to profile
    cy.contains("My profile").click();

    // heading orders
    cy.get("#heading1").should("contain", 'Friend Requests');
    cy.get("#heading2").should("contain", 'Friends');
    cy.get("#heading3").should("contain", 'Users');
    });
});