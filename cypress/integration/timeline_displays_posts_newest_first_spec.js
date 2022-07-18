const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  it("displays posts most recent first", () => {
     // run webhelper to sign up and sign in to acebook
     signUpAndSignIn();


    // submit first post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

     // submit second post
     cy.visit("/posts");
     cy.contains("New post").click();
 
     cy.get("#new-post-form").find('[type="text"]').type("Second post");
     cy.get("#new-post-form").submit();

    cy.get(".posts").first().should("contain", "Second post");
  });
});
