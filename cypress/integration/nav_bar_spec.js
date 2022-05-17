describe("Navigation Bar", () => {
  it("options when signed out", () => {
    cy.visit("/")

    cy.get(".navigation-bar").find('.loginpage').click();
    cy.url().should("include", "/sessions/new");

    cy.get(".navigation-bar").find('.registerpage').click();
    cy.url().should("include", "/users/new");

    cy.get(".navigation-bar").find('.homepage').click();
    cy.url().should("eq", "http://localhost:3030/?");

    cy.get(".navigation-bar").find('.help').click();
    cy.url().should("include", "/help");

    cy.get(".navigation-bar").find('.aboutus').click();
    cy.url().should("include", "github");

  });

  it("options when signed in", () => {
    cy.visit("/users/new")
    cy.get("#email").type("someone7@example.com");
    cy.get("#password").type("password");
    cy.get("#first_name").type("Bob");
    cy.get("#last_name").type("Smith");
    cy.get("#dob").type("2022-05-16");
    cy.get("#submit").click();

    cy.get(".navigation-bar").find('.timelinepage').click();
    cy.url().should("include", "/posts");

    cy.get(".navigation-bar").find('.help').click();
    cy.url().should("include", "/help");

    cy.get(".navigation-bar").find('.profilepage').click();
    cy.url().should("include", "/users");

    cy.get(".navigation-bar").find('.logout').click();
    cy.url().should("include", "/sessions/new");
  });
});
