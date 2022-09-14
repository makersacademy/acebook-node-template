describe("Deauthentication", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("A user can log out from signup and is redirected to homepage", () => {
    // sign up which also signs in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // log out
    cy.get("#logout").click();

    // check we're on the homepage
    // regex to match path of [any number of any characters] folowed by [/]
    cy.url().should("match", /.+\/$/);
    cy.contains("p", "acebook helps axolotyls meet in the pond")
    cy.get('#login_submit_btn').should("have.value", "Log In")
  });
});
