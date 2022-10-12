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
    cy.get("#name").type("someone");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();   

    // we send data directly to the database instead of clicking the submit button
    cy.request('POST', '/posts/', {
      message: 'Body of test post new',
      createdAt: 1665497979886
    });

    // visit a /posts page to check fr the result
    cy.visit("/posts/");
    cy.get(".posts").should("contain", "Body of test post new");
    cy.get(".posts").should("contain", "Tue Oct 11 2022 15:19:39 GMT+0100 (British Summer Time)");
  });
});
