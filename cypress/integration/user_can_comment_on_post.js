describe("Testing", () => {
    it("testing", () => {
    cy.visit("/users/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    
        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
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
    })
})