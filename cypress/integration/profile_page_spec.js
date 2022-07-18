const signUpAndSignIn = require("./webhelper");

describe("Profile Page", () => {
  afterEach(() => {
    // use tasks to drop collections after each test
    cy.task("dropUsers");
  })

  it("navigates to user's profile page from timeline", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // user should be on timeline page
    cy.url().should("include", "/posts");

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // user should be redirected to profile page, with the route displaying their username
    cy.url().should("include", "/profile/user")
  })

  it("Profile page displays username", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // page contains the content 'Profile Page'
    cy.contains("Profile Page")
    cy.contains("Username: CypressTestUser")
  })
})