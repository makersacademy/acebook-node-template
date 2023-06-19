describe("Feed Page", () => {
    it("can view post details", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Post Details");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Post Details").click();
    cy.get('h1').should("contain", "Testing Post Details");
    cy.get('p').should("contain", "Author: Test Test")
    });
});