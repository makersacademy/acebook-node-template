const signUpAndSignIn = require("./webhelper");

 describe("Timeline", () => {
   afterEach(() => {
     cy.task("dropPosts");
     cy.task("dropUsers");
   });

  //  xit("shows no comments when there are no comments to display", () =>{
  //    // run webhelper to sign up and sign in to acebook
  //    signUpAndSignIn("test", "users");

  //    cy.visit("/posts");
  //    cy.contains("New post").click();

  //    cy.get("#new-post-form")
  //      .find('#message')
  //      .type("no comments on this post.");
  //    cy.get("#new-post-form").submit();

  //    cy.visit("/posts")
  //    cy.get("#show-comments").click();

  //    cy.get(".comments").should("contain", "no comments to see");
  //  });

 

   it("submits a comment and it's displayed", () => {
     // run webhelper to sign up and sign in to acebook
     signUpAndSignIn("test", "users");

     // submit a post
     cy.visit("/posts");
     cy.contains("New post").click();

     cy.get("#new-post-form")
       .find('#message')
       .type("to try if comments work.");
     cy.get("#new-post-form").submit();

     cy.visit("/posts");
     cy.get("#enter-comment").find("#comment").type("test comment");
     cy.get("#enter-comment").submit();

     // click show comments
     cy.get("#show-comments").click();

     cy.get("#post-comment").should("contain", "test comment");
   });
 });