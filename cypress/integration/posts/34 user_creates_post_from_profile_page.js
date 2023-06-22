describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("User1");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.visit("/users/user1");
    //cy.get("#content").click();
    cy.get('textarea[name="content"]').type("Profile Post Test");
    //cy.get("#textarea").type("Profile Post Test");
    cy.get('button[type="submit"]').click()

    cy.get(".posts").should("contain", "Hello, world!");
  });
});
