  describe("liking a post", () => {
    it('user likes a post', () => { 
    
    cy.signUp()
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#likeForm").submit();
    cy.get("#numberOfLikes").should("contain", "1");
    })

    it('user can like a post once only', () => { 
    
      cy.signUp()
      cy.contains("New post").click();
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      cy.get("#likeForm").submit();
      cy.get("#likeForm").submit();
      cy.get("#numberOfLikes").should("contain", "1");
      })

  })
