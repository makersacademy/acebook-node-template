describe("name appears on profile page", () => {
    it("A user signs in and goes to their profile and can see their name at top", () => {
      // sign in to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.get('.username').should("contain", 'Alex Buzea');
    });
});