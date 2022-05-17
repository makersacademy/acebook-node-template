describe("Edit Profile", () => {
  it("can edit own profile", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone11@example.com");
    cy.get("#password").type("password3");
    cy.get("#first_name").type("Bob");
    cy.get("#last_name").type("Smith");
    cy.get("#dob").type("2022-05-16");
    cy.get("#submit").click();
    cy.get('.profilepage').click();

    cy.get('.editprofile').click()
    cy.get("#first_name").type("Bobby");
    cy.get("#last_name").type("Smithers");
    cy.get("#dob").type("2000-05-16");
    cy.get('[type="radio"]').first().check();
    cy.get("#home_town").type("bob town");
    cy.get(".new-field").type("bob is the best");
    cy.get("#submit").click();
    
    cy.url().should("include", "someone11@example.com");
    cy.contains("Bobby Smithers");
  });
});
