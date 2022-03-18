  describe("liking a post", () => {
    it('user likes a post', () => { 
    
    cy.signUp()
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#like").submit();
    cy.get("#numberOfLikes").should("contain", "1");
    })
  })

  //npx cypress run --spec ./cypress/integration/user_can_like_a_post_spec.js
