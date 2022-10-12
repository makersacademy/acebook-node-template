// const User = require('../../models/user');
// const Post = require('../../models/post');

describe("Timeline", () => {
  // beforeEach(() => {
  //   User.collection.drop();
  //   Post.collection.drop();
  // });
  
  it("can submit posts, when signed in, and view them", () => {

    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password1").type("password");
    cy.get("#password2").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post 

    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hi, guys!");
    cy.get("#new-post-form").submit();

    cy.get(".posts li").first().contains("Hi, guys!");
    

  });
});
