describe("Post Page - Comment Functionality", () => {
    it("user can comment on post", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Comment Function");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Comment Function").click();

    cy.get('textarea').type("Testing Comment");
    cy.get("button[type='submit']").click();
    cy.get(".comments").should("contain", "Testing Comment");      
    });
});