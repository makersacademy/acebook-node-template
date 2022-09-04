// describe("Search Result Page", () => {
//   it("has a title", () => {
//     //sign up
//     cy.visit("/users/new");
//     cy.get("#email").type("pmonson55@example.com");
//     cy.get("#password").type("password");
//     cy.get("#username").type("testusername55");
//     cy.get("#firstName").type("Paris55");
//     cy.get("#lastName").type("Monson55");
//     cy.get("#phoneNumber").type("07337048255");
//     cy.get("#submit").click();

//     // sign in
//     cy.visit("/sessions/new");
//     cy.get("#email").type("pmonson55@example.com");
//     cy.get("#password").type("password");
//     cy.get("#submit").click();

//     cy.url().should("include", "/posts");
//     cy.contains("a", "New post");

//     // logout
//     cy.get(".logout-button").click();
//     cy.url().should("include", "/sessions/new");

//     //sign up User 2
//     cy.visit("/users/new");
//     cy.get("#email").type("harry@example.com");
//     cy.get("#password").type("password");
//     cy.get("#username").type("harryusername");
//     cy.get("#firstName").type("Harry");
//     cy.get("#lastName").type("Phelps");
//     cy.get("#phoneNumber").type("0733704844");
//     cy.get("#submit").click();

//     //sign in user 2
//     cy.visit("/sessions/new");

//     cy.get("#email").type("harry@example.com");
//     cy.get("#password").type("password");
//     cy.get("#submit").click();

//     cy.url().should("include", "/posts");
//     cy.get("#search-form").type("Paris");
//     cy.get("#search-form").click();

//     cy.url().should("include", "/users/search");

//     cy.contains("li", "Paris55");
//   });
// });
