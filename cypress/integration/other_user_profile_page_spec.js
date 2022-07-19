const signUpAndSignIn = require("./webhelper");

describe("Other user profile page", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("displays detailed information for other users on their profile page", () => {
         // sign up, sign in, and make post as different user
         cy.visit("/users/new");
         cy.get("#firstName").type("Someone");
         cy.get("#lastName").type("Else");
         cy.get("#username").type("AnotherTestUser");
         cy.get("#email").type("test2@cypress.com");
         cy.get("#password").type("password123");
         cy.get("#location").type("London")
         cy.get("#birthday").type("1996-06-01")
         cy.get("#submit").click();
     
         cy.get("#email").type("test2@cypress.com");
         cy.get("#password").type("password123");
         cy.get("#submit").click();
     
         cy.contains("New post").click();
     
         cy.get("#new-post-form")
           .find('[type="text"]')
           .type("Look at my profile");
         cy.get("#new-post-form").submit();
     
         cy.contains("Sign Out").click();
         
         // use webhelper to sign up and sign in
         signUpAndSignIn();
     
         cy.get(".display-profile").submit();
     
         // assert that the page contains detailed info
         cy.contains("Someone Else")
         cy.contains("London")
         cy.contains("1 June 1996")
  })

})
