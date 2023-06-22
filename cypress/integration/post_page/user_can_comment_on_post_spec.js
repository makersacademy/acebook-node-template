describe("Post Page - Comment Functionality", () => {
    it("user can comment on other users post", () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("chris@chris.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Comment Function - Other User");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Comment Function - Other User");
    
    cy.get("input[type='submit']").click();
    cy.get("#email").type("sue@sue.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    cy.contains("Testing Comment Function - Other User").click();

    cy.get('textarea').type("Testing Comment - Other User");
    cy.get("button[type='submit']").click();
    cy.get(".comments").should("contain", "Testing Comment - Other User");
    });
});