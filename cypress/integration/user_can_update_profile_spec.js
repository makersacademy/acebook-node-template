describe("Editing", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");

    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    cy.visit("/profile");
    cy.get("#edit-page").click();
  });

  it("updates email only when given a new email address", () => {
    cy.get("#email").type("newemail@example.com");
    cy.get("#submit").click();

    cy.visit("/profile");
    cy.url().should("include", "/profile");
    cy.contains("li", "Email: newemail@example.com");
  })

  it("updates all details when changed", () => {
    cy.get("#email").type("newemail@example.com");
    cy.get("#password").type("newpassword")
    cy.get("#firstName").type("someoneelse")
    cy.get("#lastName").type("somelastname")
    // need to sort this test
    // cy.get("#profilePic").type("http://c.files.bbci.co.uk/8512/production/_123166043_photo07-02-2022124525.jpg")
    cy.get("#submit").click();

    cy.visit("/profile");
    cy.url().should("include", "/profile");
    cy.contains("li", "First name: someoneelse");
    cy.contains("li", "Last name: somelastname");
    cy.contains("li", "Email: newemail@example.com");
    cy.contains("li", "Password: ***********");
    // need to sort this result
    // cy.get('#profile_pic').should('have.attr', 'src', 'http://c.files.bbci.co.uk/8512/production/_123166043_photo07-02-2022124525.jpg')
  })
})