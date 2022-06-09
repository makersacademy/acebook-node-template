describe("Timeline", () => {

  it("can submit posts, when signed in, and view who made them, test with two users both making posts", () => {
     // sign up with first user
    cy.visit("/users/new");
    cy.get("#email").type("jerrysmith@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("Jerry Smith")
    cy.get("#submit").click();

    // sign in with first user
    cy.visit("/sessions/new");
    cy.get("#email").type("jerrysmith@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // logout
    cy.get("#log-out").click();

    // user 2 sign up
    cy.visit("/users/new");
    cy.get("#email").type("BorisJohnson@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("Boris Johnson")
    cy.get("#submit").click();

    // user 2 sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("BorisJohnson@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // user 2 submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
  
    // test to see the username displayed for both posts
    cy.get(".posts>div.username").eq(0).should("contain", "Boris Johnson");
    cy.get(".posts>div.username").eq(1).should("contain", "Jerry Smith");
  });

});
