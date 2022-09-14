describe("Profile page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("goes to profile page if user is logged in", () => {
    // sign up + sign in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    //profile
    cy.visit("/profile");
    cy.get("h4").should("contain", "someone");
  });

  it("returns to posts when link is clicked", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.visit("/profile");
    cy.get('#home_icon').click();
    cy.url().should("include", "/posts");
  });

  it("Can log out by clicking on logout icon on nav bar", ()=>{
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    cy.visit("/profile")
    cy.get('#logout').click();
    cy.url().should("match", /.+\/$/);
  })
});
