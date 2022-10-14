describe("Timeline", () => {

  // IGNORE ALL TESTS FOR NOW - USE FUTURE FIXED TESTS

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
    
    // submit a post
    cy.visit("/posts");
    
    cy.contains("Make a post").click(); 
    cy.visit("/posts/new");
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    //Get the current date
    const date = new Date();
    var yyyy = date.getFullYear();

    // Keeping following code for future reference/changes
    // let options = {year: 'numeric', month: 'long', day: 'numeric' };
    // const dateString = Intl.DateTimeFormat('en-UK', options).format(date)

    // visit a /posts page to check fr the result
    cy.visit("/posts/");
    cy.get(".posts").should("contain", "Cypress test post!");
    cy.get(".posts").should("contain", yyyy);
    // cy.get(".posts").should("contain", dateString);
  });
});
