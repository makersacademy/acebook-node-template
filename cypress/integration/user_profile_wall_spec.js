describe('user profile wall',() => {
  it('allows a user to write on the wall',() => {
    cy.task('emptyPosts').then(() => {
      // sign up & log out
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("name");
      cy.get("#surname").type("surname");
      cy.get("#submit").click();

      // log in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();

      cy.get("#new-post-form").find('#message').type("Hello, world!");
      cy.get("#new-post-form").submit();

      cy.get(".posts").should("contain", "Hello, world!");
      cy.get(".posts").should("contain", "someone@example.com");
      
      // log out
      cy.get("#sign-out-button").click();

      // sign up as second user
      cy.visit("/users/new");
      cy.get("#email").type("newperson@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("second name");
      cy.get("#surname").type("second surname");
      cy.get("#submit").click();

      // log in as second user
      cy.visit("/sessions/new");
      cy.get("#email").type("newperson@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // click to go through to the other person's page
      cy.get(".profile-link").first().submit();
      
      // write on their wall
      cy.get("#write-on-wall").click();
      cy.get("#new-post-form").find('#message').type("Hey there someone. This is new person");
      cy.get("#new-post-form").submit();

      // expect to see this post on main page
      cy.get('#view-posts').click();
      cy.get('.post-container').first().should('contain', "Hey there someone. This is new person");
      cy.get('.post-container').first().should('contain', "To someone@example.com");


      // expect the message to appear on their profile
      cy.get(".profile-link").last().submit();
      cy.get('#wall').find(".post-container").should('contain',"Hey there someone. This is new person")
      cy.get('#wall').find(".post-container").should('contain', 'newperson@example.com')

    })
  })
})