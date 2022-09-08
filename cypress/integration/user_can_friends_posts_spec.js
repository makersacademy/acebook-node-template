// describe("Post feed", () => {
//   it("A user can see their friends posts in reverse chronological order", () => {
//     // sign up
//     cy.visit("/users/new");
//     cy.get("#first-name").type("some");
//     cy.get("#last-name").type("one");
//     cy.get("#username").type("someone");
//     cy.get("#email").type("someone@example.com");
//     cy.get("#password").type("password");
//     cy.get("#signup").click();
    
//     // sign in
//     cy.visit("/");
//     cy.get("#email").type("someone@example.com");
//     cy.get("#password").type("password");
//     cy.get("#login").click();

//     // redirects to post feed

//     cy.visit("/posts/");
//     cy.get("#profile-header").contains("someone's profile");
//   });
// });



// for a different ticket