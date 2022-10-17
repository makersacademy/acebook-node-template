describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit multiple posts
    cy.visit("/posts");

    cy.contains("Make a post").click();
    cy.visit("/posts/new");
    cy.get("#message").type("Oldest post in this test!");
    cy.get("#submit").click();

    cy.contains("Make a post").click();
    cy.visit("/posts/new");
    cy.get("#message").type("Middle post in this test!");
    cy.get("#submit").click();

    cy.contains("Make a post").click();
    cy.visit("/posts/new");
    cy.get("#message").type("Newest post in this test!");
    cy.get("#submit").click();

    // after redirection to /posts
    cy.get(".post")
      .first() // or .eq(0)
      .should("contain", "Newest post in this test!");

    cy.get(".post").eq(1).should("contain", "Middle post in this test!");

    cy.get(".post").eq(2).should("contain", "Oldest post in this test!");

    //Get the current date
    // const date = new Date();
    // var yyyy = date.getFullYear();

    // // Keeping following code for future reference/changes
    // let options = {year: 'numeric', month: 'long', day: 'numeric' };
    // const dateString = Intl.DateTimeFormat('en-UK', options).format(date)

    // temporary test to assert date
    // when doing proper test should target the actual div class
    // cy.get(".posts").should("contain", yyyy);
  });
});
