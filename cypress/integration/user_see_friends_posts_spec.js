describe("Post feed", () => {
  it("A user can see their friends posts in reverse chronological order", () => {
    // sign up user 1.0
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in as user 1.0
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // make a new post as user 1.0
    cy.visit("/posts/new");
    cy.get("#message").type("this is a friend's post");
    const today = new Date();
    const time = today.getFullYear() + '/' +(today.getMonth()+1) + '/' + today.getDate() +' ' + today.getHours() + ":" + today.getMinutes();
    cy.get("#submit-post").click();

    // sign up enemy
    cy.visit("/users/new");
    cy.get("#first-name").type("not");
    cy.get("#last-name").type("friend");
    cy.get("#username").type("enemy");
    cy.get("#email").type("enemy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in as enemy
    cy.visit("/");
    cy.get("#email").type("enemy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // make a new post as enemy
    cy.visit("/posts/new");
    cy.get("#message").type("this post should not appear");
    cy.get("#submit-post").click();

    // sign up user 2.0
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in as user 2.0
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // visit user 1.0's profile and add as friend
    cy.visit("/profiles/someone");
    cy.get("#add-friend-button").click();

    // can only see user 1.0's post in feed (and not enemy's)
    cy.visit("/posts/new");
    cy.visit("/posts");
    cy.get(".posts").contains("this is a friend's post");
    cy.get(".posts").contains("someone");
    cy.get(".posts").contains(time);
    cy.get(".posts").to.have.lengthOf(1);
  });
});

