describe("Comments", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it.only("can comment on user's posts", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?")
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".post__bottom").should("contain", "Hello, world!");

    // logout
    cy.get("#logout").click();

    // different user signs up and logs in
    cy.visit("/users/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("newpassword");
    cy.get("#firstName").type("newperson");
    cy.get("#lastName").type("newsurname");
    cy.get("#submit").click();

    // comment on a user's post
    cy.visit("/posts");
    cy.get('.comment').invoke('attr', 'placeholder').should("contain", "Comment here")
    cy.get(".comment").type("Goodbye!");
    cy.get(".submit-comment").click();
    cy.get(".comment__bottom").should("contain", "Goodbye! - newperson newsurname");
    
  });

  // it("Unable to submit a blank comment", () => {
  //   // sign up + log in
  //   cy.visit("/users/new");
  //   cy.get("#email").type("someone@example.com");
  //   cy.get("#password").type("password");
  //   cy.get("#firstName").type("someone");
  //   cy.get("#submit").click();

  //   // submit a post
  //   cy.visit("/posts");
  //   cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?")
  //   cy.get("#message").type("Hello, world!");
  //   cy.get("#submit").click();
  //   cy.get(".post__bottom").should("contain", "Hello, world!");

  //   // logout
  //   cy.get("#logout").click();

  //   // different user signs up and logs in
  //   cy.visit("/users/new");
  //   cy.get("#email").type("newperson@example.com");
  //   cy.get("#password").type("newpassword");
  //   cy.get("#firstName").type("newperson");
  //   cy.get("#submit").click();

  //   // comment on a user's post
  //   cy.visit("/posts");
  //   // cy.get('#comment').invoke('attr', 'placeholder').should("contain", "Comment here")
  //   // cy.get("#comment").type("");
  //   cy.get("#submit-comment").click();
  //   cy.get('#comment').invoke('attr', 'placeholder').should("contain", "Comment here with text")
  // });
});
