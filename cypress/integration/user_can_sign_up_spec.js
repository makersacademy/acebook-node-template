describe("Registration", () => {
  beforeEach(() => {
    cy.task('clearusers')
  })

  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.signUp();

    cy.url().should("include", "/sessions/new");
  });

  // user should get an error if either or both field is empty 
  it("A user should get an error if the email field is empty", () => {
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#createAccount").click();

    cy.url().should("include", "/users/new");
  })

  it("A user should get an error if the password field is empty", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#createAccount").click();

    cy.url().should("include", "/users/new");
  })

  it("A user should get an error if both the email and password field is empty", () => {
    cy.visit("/users/new");
    cy.get("#createAccount").click();

    cy.url().should("include", "/users/new");
  })

  // user should get an error if user already exists
  it("A should not be able to sign up if already signed up", () => {
    // first sign up
    cy.signUp();

    // second sign up
    cy.signUp();

    cy.url().should("include", "/users/new");
    // expect error to pop up on screen
    //cy.get(".err").should("contain", "This email is in use");

  });
});
