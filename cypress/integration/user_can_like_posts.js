describe('Liking', () => {
  it('likes a posts', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //create post
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //click like button
    cy.get("#like-button").click();

    cy.contains("#like-number", '1');
  });

  it('unlikes a posts', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //create post
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //click like button
    cy.get("#like-button").click();

    cy.contains("#like-number", '1');

    //click like button again
    cy.get("#like-button").click();

    cy.contains("#like-number", '0');
  });

  it('likes someone elses posts', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone3@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //create post
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //click like button
    cy.get("#like-button").click();

    cy.contains("#like-number", '1');

    //logout
    cy.get("#logout").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //click like button
    cy.get("#like-button").click();

    cy.contains("#like-number", '2');
  });
});