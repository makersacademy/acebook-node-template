// describe("Timeline", function() {
//   it("can can view comments on post", function() {
//     // sign up
//     cy.visit("/users/new");
//     cy.get("#email").type("someone@example.com");
//     cy.get("#password").type("password");
//     cy.get("#submit").click();

//     // sign in
//     cy.visit("/sessions/new");
//     cy.get("#email").type("someone@example.com");
//     cy.get("#password").type("password");
//     cy.get("#submit").click();

//     // submit a post
//     cy.visit("/posts");
//     cy.contains("New post").click();

//     cy.get("#new-post-form").find('#message').type("Hello, world!");
//     cy.get("#new-post-form").submit();

//     cy.get(".posts").should("contain", "Hello, world!");

//     // can comment on post
//     cy.get('.comment-toggle').click();
//     cy.get('.form-container').find('[type="text"]').type('First Comment');
//     cy.get('.form-container').submit();
//     cy.get('.comment-list').should('contain', 'First Comment')
//   });
// });