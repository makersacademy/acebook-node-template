// var mongoose = require("mongoose");
//
// require("../mongodb_helper2");
// var Post = require("../../models/post");
// describe("Timeline", () => {
//     beforeEach((done) => {
//         // mongoose.connection.collections.users.drop(() => {
//         //     done();
//         // });
//         mongoose.connection.collections.posts.drop(() => {
//             done();
//         });
//     });
//
//     it("can see likes count on a new post", () => {
//         // sign up
//         cy.visit("/users/new");
//         cy.get("#email").type("tester@email.com");
//         cy.get("#password").type("password123");
//         cy.get("#submit").click();
//
//         // sign in
//         cy.visit("/sessions/new");
//         cy.get("#email").type("tester@email.com");
//         cy.get("#password").type("password123");
//         cy.get("#submit").click();
//
//         // submit a post
//         cy.visit("/posts");
//         cy.contains("New post").click();
//
//         cy.get("#new-post-form").find('[type="text"]').type("Testing time 1234");
//         cy.get("#new-post-form").submit();
//
//         cy.get(".posts").should("contain", "Testing time 1234");
//
//         // Assert that we can see the likes count
//         cy.get(".posts").should("contain", "1 likes");
//
//
//
//     });
// });
