// Not yet implemented

describe("Post Page - Comment Functionality - Null Value", () => {
    it("user can't post an empty comment", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Comment Function - Empty Comment");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Comment Function - Empty Comment").click();
    
    cy.get("button[type='submit']").click();
    cy.get(".comments").should("be.empty")
    });
});