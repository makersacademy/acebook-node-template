describe("User's own profile page", function() {
    it('user can go to own profile page', () => {
        cy.task('emptyPosts','emptyUsers').then(()=> {
            //signup 
             cy.visit("/users/new");
             cy.get("#email").type("newsomeone@example.com");
             cy.get("#password").type("Password8$");
             cy.get("#first_name").type("first1");
             cy.get("#last_name").type("last1");
             cy.get("#submit").click();
             
             //sign in
             cy.visit("/sessions/new");
             cy.get("#email").type("newsomeone@example.com");
             cy.get("#password").type("Password8$");
             cy.get("#submit").click();

             //User vists own profile page
             cy.visit("/users/profile");
             cy.get(".title").should("contain", "Profile page");
             cy.get(".name").should("contain", "first1 last1");
        })
    })
})