const signUpAndSignIn = require("./webhelper");

describe("Profile Page", () => {
  afterEach(() => {
    // use tasks to drop collections after each test
    cy.task("dropUsers");
  })

  it("Profile page displays username", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // page contains the content 'Profile Page'
    cy.contains("Profile Page")
    cy.contains("CypressTestUser")
  })


  it("displays detailed information (dob, location, full name) about user", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // test for information on profile page
    cy.contains("Test User")
    cy.contains("Cypress")
    cy.contains("11th June 1999")

  })

  it("Displays posts made by user", () => {
  // sign up, sign in, and make post as different user
  cy.visit("/users/new");
  cy.get("#name").type("AnotherTestUser");
  cy.get("#email").type("test2@cypress.com");
  cy.get("#password").type("password123");
  cy.get("#submit").click();

  cy.get("#email").type("test2@cypress.com");
  cy.get("#password").type("password123");
  cy.get("#submit").click();

  cy.contains("New post").click();

  cy.get("#new-post-form")
    .find('[type="text"]')
    .type("Do not display");
  cy.get("#new-post-form").submit();

  cy.contains("Sign Out").click();
  cy.url().should("include", "/");

  // use webhelper to sign up and sign in
  signUpAndSignIn();

  // make another post as new user
  cy.contains("New post").click();

  cy.get("#new-post-form")
    .find('[type="text"]')
    .type("Show this message");
  cy.get("#new-post-form").submit();

  // visit profile page and only see post made by current user
  cy.contains("Profile Page").click();
  cy.url().should("include", "/profile/user");
  cy.get("ul").should(($post) => {
    expect($post).to.contain("Show this message")
    expect($post).not.to.include.text("Do not display")
  })
  // cy.get(".posts").should("contain", "Show this message")
  // cy.get(".posts").should("not.contain", "Do not display")
  
  // drop Posts collection from database
  cy.task("dropPosts");
  })
})