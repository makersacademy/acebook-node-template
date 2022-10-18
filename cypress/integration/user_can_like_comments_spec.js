describe('Timeline', () => {
    it("allows a comment to be liked", () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#firstName").type("Bob");
        cy.get("#lastName").type("John");
        cy.get("#email").type("d1@d1.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("d1@d1.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        //submit a post
        cy.visit("/posts");
        // cy.contains("New post").click({force:true});
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();
    
        // comment on a post
    
        // cy.visit("/posts");
    
        cy.get("#new-comment-form")
          .find('[type="text"]', {force:true})
          .first()
          .type("my first comment", {force:true});
        cy.get("#new-comment-form").submit();
    
        // get posts with comments
    
        cy.get("#comment-likes-form", {force:true}).submit();
        cy.scrollTo('bottom')
        cy.get(".posts").should("contain", "1");
      });
    })