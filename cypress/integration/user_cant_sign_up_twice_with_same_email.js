describe("Registration with same email", () => {
    it("A user tries to sign up twice with same email", () => {
      // sign up
        cy.visit("/users/new");
        cy.get("#firstName").type("Homer");
        cy.get("#lastName").type("Simpson");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();

        cy.visit("/users/new");
        cy.get("#firstName").type("Homer");
        cy.get("#lastName").type("Simp");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();

        cy.get("#error").should("include", "That email is already in use!");
    });
});