require("../../spec/mongodb_dropusers");

describe('Signup', function() {
    beforeEach(function () {
        cy.task('npm run db:reset')
    })
    it('can submit sign up and show success', function() {
        cy.visit('/');
  
        cy
            .get('input[name="firstName"]')
            .type('terry')
            .should("have.value", "terry");
        
        cy
            .get('input[name="surname"]')
            .type('wogan')
            .should("have.value", "wogan");

        cy
            .get('input[name="email"]')
            .type("terry@wogan.com")
            .should("have.value", "terry@wogan.com");

        cy
            .get('input[name="password"]')
            .type('pudsey')
            .should("have.value", "pudsey");


        cy
            .get('input[name="dob"]')
            .type('03/08/1938')
            .should("have.value", "03/08/1938");

        cy.get('#submit-button').click();
  
        cy.contains('success');
    });
});