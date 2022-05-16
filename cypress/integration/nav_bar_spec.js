describe("Navigation Bar", () => {
  it("options when signed out", () => {
    cy.visit("/")

    cy.get(".navigation-bar").find('.loginpage').click();
    cy.url().should("include", "/sessions/new");

    cy.get(".navigation-bar").find('.registerpage').click();
    cy.url().should("include", "/users/new");

    cy.get(".navigation-bar").find('.homepage').click();
    cy.url().should("eq", "http://localhost:3030/?");

    // no contact us page yet
    // cy.get(".navigation-bar").find('.contactus').click();
    // cy.url().should("include", "/contact");

    cy.get(".navigation-bar").find('.aboutus').click();
    cy.url().should("include", "github");

  });

  it("options when signed in", () => {
    cy.visit("/users/new")
    cy.get("#email").type("someone7@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get(".navigation-bar").find('.timelinepage').click();
    cy.url().should("include", "/posts");

    // no contact us page yet
    // cy.get(".navigation-bar").find('.contactus').click();
    // cy.url().should("include", "/contact");

    // no profile page yet
    // cy.get(".navigation-bar").find('.profilepage').click();
    // cy.url().should("include", "/users");

    cy.get(".navigation-bar").find('.logout').click();
    cy.url().should("include", "/sessions/new");
  });
});
