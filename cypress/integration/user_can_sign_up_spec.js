describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("Surname");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
  it("a user cannot register without a password", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("Surname");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  
  });
  it("a user cannot register with an empty password", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("Surname");
    cy.get("#password").type(" ");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  
  });

  it("a user cannot register with an empty email", () => {
    cy.visit("/users/new");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("Surname");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  
  });

  it("a user cannot register with an empty email", () => {
    cy.visit("/users/new");
    cy.get("#email").type(" ");
    cy.get("#password").type("password");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("Surname");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  
  });
  it("A user cannot register with an empty first name", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#surname").type("Surname");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user cannot register with an empty surname", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#first-name").type("Aga");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it('A user can register with a profile picture', () => {
    const fixtureFile = 'photo.png'
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#first-name").type("Aga");
    cy.get("#surname").type("surname");
    cy.get("#profile-pic").attachFile(fixtureFile);
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  })

  it('A user can click a link to the login page if they are already a member', () => {

    cy.visit('/users/new');
    cy.get('#login-link').click();

    cy.url().should("include", "/sessions/new");
  });

  it('includes the page title', () => {
    cy.visit('/users/new');
    cy.get(".page-header").should("contain", "Sign Up");
  })
});
