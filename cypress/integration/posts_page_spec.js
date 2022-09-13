describe("Posts page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("redirects to home page if user goes to /posts when logged out", () => {
    cy.visit("/posts");
    // regex to match path of [any number of any characters] folowed by [/]
    cy.url().should("match", /.+\/$/);
  });

  it("Contains a link to the profile page", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    cy.contains("a", "Welcome someone")
  })
});