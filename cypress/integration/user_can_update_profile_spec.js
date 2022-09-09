describe("Editing", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("updates email when given a new email adress",() =>{
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    
    cy.visit("/profile");

    cy.get("#edit-page").click();
    cy.get("#email").type("newemail@example.com");
    cy.get("#submit-email").click();

    cy.visit("/profile");

    cy.url().should("include", "/profile");
    cy.contains("div", "Email: newemail@example.com");
  })

})