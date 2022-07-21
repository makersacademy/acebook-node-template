const signUpAndSignIn = require("./webhelper");

 describe("Timeline", () => {
   afterEach(() => {
     cy.task("dropPosts");
     cy.task("dropUsers");
   });

   it("displays comment text box and comment button ", () => {
     // run webhelper to sign up and sign in to acebook
     signUpAndSignIn("test", "users");

     // submit a post
     cy.visit("/posts");
     cy.contains("New post").click();

     cy.get("#new-post-form")
       .find('[type="text"]')
       .type("to try if comments work.");
     cy.get("#new-post-form").submit();

     cy.visit("/posts");
     cy.get("#enter-comment").find("#comment").type("test comment");
     cy.get("#enter-comment").submit();

     cy.get("#post-comment").should("contain", "test comment");
   });
 });