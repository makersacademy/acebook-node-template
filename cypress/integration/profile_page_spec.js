const signUpAndSignIn = require("./webhelper");

describe("Profile Page", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("Profile page displays username", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // page contains the username
    cy.contains("Test User");
  });

  it("displays detailed information (dob, location, full name) about user", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // test for information on profile page
    cy.contains("Test User");
    cy.contains("London");
    cy.contains("11 June 1999");
  });

  it("Displays posts made by user", () => {
    // use webhelper to sign up and sign in as a different user
    signUpAndSignIn("Test", "User2");

    cy.contains("New post").click();

    cy.get("#new-post-form").find('#message').type("Do not display");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();
    cy.url().should("include", "/");

    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User1");

    // make another post as new user
    cy.contains("New post").click();

    cy.get("#new-post-form").find('#message').type("Show this message");
    cy.get("#new-post-form").submit();

    // visit profile page and only see post made by current user
    cy.contains("Profile Page").click();
    cy.url().should("include", "/profile/user");
    cy.get("ul").should(($post) => {
      expect($post).to.contain("Show this message");
      expect($post).not.to.include.text("Do not display");
    });

    // use webhelper to drop users and posts collections
    cy.task("dropPosts");
  });

  it("allows user to update their personal information", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // test for information on profile page
    cy.contains("Test User");
    cy.contains("London");
    cy.contains("11 June 1999");

    // user clicks on 'Edit Info' button and is taken to edit page
    cy.get(".edit-btn").click();
    cy.url().should("include", "/profile/user/TestUser/editInfo");

    // existing user info is pre-populated into form
    cy.get("#firstName").should("have.value", "Test");
    cy.get("#lastName").should("have.value", "User");
    cy.get("#location").should("have.value", "London");

    // clear fields of all content
    cy.get("#firstName").clear();
    cy.get("#lastName").clear();
    cy.get("#location").clear();

    // user changes personal information and is redirected to their profile page
    cy.get("#firstName").type("Updated");
    cy.get("#lastName").type("Name");
    cy.get("#location").type("Birmingham");
    cy.get("#submit").click();
    cy.url().should("include", "/profile/user/TestUser");

    // new personal information is displayed on profile page
    cy.contains("TestUser");
    cy.contains("Updated Name");
    cy.contains("Birmingham");
  });

  it.only("allows user to add profile picture", () => {
    //sign up and sign in
    signUpAndSignIn("Test", "User")

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();
    
    // user clicks on 'Edit Info' button and is taken to edit page
    cy.get(".edit-btn").click();
    cy.url().should("include", "/profile/user/TestUser/editInfo");
    
    // user adds url of profile picture
    cy.get("#profile-pic").clear();
    cy.get("#profile-pic").type("https://media.istockphoto.com/photos/mr-who-picture-id619400810?s=612x612");
    cy.get("#submit").click();
    cy.url().should("include", "/profile/user/TestUser");

    // profile pic is displayed on profile page
    cy.get(".profile-picture").find('img').should('have.attr', 'src', "https://media.istockphoto.com/photos/mr-who-picture-id619400810?s=612x612")
  })
});
