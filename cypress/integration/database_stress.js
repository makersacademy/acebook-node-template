const Chance = require('chance');
const chance = new Chance();

describe("High level of signups", () => {

  it.skip("A user navigates from homepage to signup and creates a new account", () => {

    for (let i = 0; i < 10; i ++){

        const new_email = chance.email();
        const new_first_name = chance.first();
        const new_last_name = chance.last();

        // sign up
        cy.visit("/");
        cy.get('a.global-button[href="/users/new"]').click()
        cy.get("#email").type(new_email);
        cy.get("#password").type("Password!234");
        cy.get("#confirmPassword").type("Password!234");
        cy.get("#first-name").type(new_first_name)
        cy.get("#last-name").type(new_last_name)
        cy.get("#submit").click();
        cy.get('input[type="submit"][value="Log Out"].global-button.logout').click();

    }

    cy.url().should("not.include", "/posts");
  });
});