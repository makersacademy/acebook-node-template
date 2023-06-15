describe("Fill in fields", () => {
    it("A user tries to sign in with no fields", () => {
      // sign up
        cy.visit("/users/new");
        cy.get("#lastName").type("Simpson");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.url().should("include", "/users/new");

        cy.visit("/users/new");
        cy.get("#firstName").type("Simpson");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.url().should("include", "/users/new");

        cy.visit("/users/new");
        cy.get("#firstName").type("Simpson");
        cy.get("#lastName").type("Simpson");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.url().should("include", "/users/new");

        cy.visit("/users/new");
        cy.get("#firstName").type("Simpson");
        cy.get("#lastName").type("Simpson");
        cy.get("#email").type("someone@example.com");
        cy.get("#submit").click();
        cy.url().should("include", "/users/new");

        cy.visit("/users/new");
        cy.get("#submit").click();
        cy.url().should("include", "/users/new");
    });
});