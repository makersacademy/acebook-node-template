// describe("Timeline", () => {
//   it("can submit posts, when signed in, and view them", () => {
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

//     cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
//     cy.get("#new-post-form").submit();

//     cy.get(".posts").should("contain", "Hello, world!");
//   });

//   it('can show the posts in date order', () => {
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

//     cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
//     cy.get("#new-post-form").submit();    

//     // submit a second post
//     cy.visit("/posts");
//     cy.contains("New post").click();

//     cy.get("#new-post-form").find('[type="text"]').type("Hello Universe!");
//     cy.get("#new-post-form").submit();
//     cy.get(".posts").eq(0).should("contain", "Hello Universe!")
//   });

//   it('allows a user to comment on a post', () => {
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

//     cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
//     cy.get("#new-post-form").submit();

//     //  click on comment button
//     cy.get("#comment").click();
//     cy.url().should("include", "/comment/new");

//     cy.get("#comment-form").find('[type="text"]').type("This is a comment on a post");
//     cy.get("#add-comment").submit();

//     cy.url().should("include", "/posts");
//   })
// });
