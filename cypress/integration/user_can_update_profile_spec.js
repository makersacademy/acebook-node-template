describe("Editing", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("updates email only when given a new email address", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();


    cy.visit("/profile");

    cy.get("#edit-page").click();
    // cy.get("#email").type("newemail@example.com");
    // cy.get("#submit").click();

    // cy.visit("/profile");

    // cy.url().should("include", "/profile");
    // cy.contains("div", "Email: newemail@example.com");
  })

  it("updates all details when changed", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();


    cy.visit("/profile");

    cy.get("#edit-page").click();
    cy.get("#email").type("newemail@example.com");
    cy.get("#password").type("newpassword")
    cy.get("#firstName").type("someoneelse")
    cy.get("#lastName").type("somelastname")
    cy.get("#profilePic").type("http://c.files.bbci.co.uk/8512/production/_123166043_photo07-02-2022124525.jpg")
    cy.get("#submit").click();

    cy.visit("/profile");

    cy.url().should("include", "/profile");
    cy.contains("div", "Email: newemail@example.com");
    cy.contains("div", "Password: ***********");
    cy.contains("div", "First name: someoneelse");
    cy.contains("div", "Last name: somelastname");
    cy.get('#profile_pic').should('have.attr', 'src', 'http://c.files.bbci.co.uk/8512/production/_123166043_photo07-02-2022124525.jpg')

  })
})