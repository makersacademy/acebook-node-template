describe("Home page", () => {
    it("A user signs in and is redirected to /posts", () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#firstName").type("first name example");
        cy.get("#lastName").type("exampleLastName");
        cy.get("#email").type("someone3@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("someone3@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.visit('/users/index');
        cy.get(".title").should("contain", "Welcome to your profile");
});
})