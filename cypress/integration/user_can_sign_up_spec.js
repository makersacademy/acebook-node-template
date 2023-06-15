// Feature: Signup

// As a new user,
// When I am on homepage and I click on sign up,
// I want to be taken to the sign up page, I want to see the option to enter my first name, last name, email, password, confirm password So that I can signup.
const Chance = require('chance');
const chance = new Chance();

// BeforeUnloadEvent(() => {
//   chance.connect('mongodb:http://localhost:3030/sessions/new', {
//     useNewUrlParser: true,
//     useUnifiedTopology
//   });
// });



describe("Signup", () => {


  it("A user navigates from homepage to signup and creates a new account", () => {
    const new_email = chance.email();

    // sign up
    cy.visit("/");
    cy.get('a.global-button[href="/users/new"]').click()
    cy.get("#email").type(new_email);
    cy.get("#password").type("Password!234");
    cy.get("#confirm-password").type("Password!234");
    cy.get("#first-name").type("Mrtest")
    cy.get("#last-name").type("Testtest")
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });



  it("A user navigates from homepage to signup and creates a new account with mismatched passwords", () => {
    const new_email = chance.email();

    // sign up
    cy.visit("/");
    cy.get('a.global-button[href="/users/new"]').click();
    cy.get("#email").type(new_email);
    cy.get("#password").type("Password!234");
    cy.get("#confirm-password").type("Password!345");
    cy.get("#first-name").type("Mrtest")
    cy.get("#last-name").type("Testtest")
    cy.get("#submit").click();

    cy.url().should("not.include", "/posts");
  });



  it("A user navigates from homepage to signup and creates a new account with an email that already exists", () => {
    const new_email = chance.email();

    // sign up
    cy.visit("/");
    cy.get('a.global-button[href="/users/new"]').click();
    cy.get("#email").type("admin@example.com");
    cy.get("#password").type("Password!234");
    cy.get("#confirm-password").type("Password!345");
    cy.get("#first-name").type("Mrtest")
    cy.get("#last-name").type("Testtest")
    cy.get("#submit").click();

    cy.url().should("not.include", "/posts");
  });




});



