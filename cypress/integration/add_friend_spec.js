describe("Friend Request", () => {
    it("A user requests to become friends", () => {
      // sign up
      cy.visit("/users/new");
        cy.get("#firstName").type("first name example");
        cy.get("#lastName").type("exampleLastName");
        cy.get("#email").type("someone3@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
  
        cy.visit("/users/new");
        cy.get("#firstName").type("Adam");
        cy.get("#lastName").type("Apple");
        cy.get("#email").type("someone4@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    
        // sign in
        cy.visit("/sessions/new");
    
        cy.get("#email").type("someone3@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.log("yo")
        cy.get("#user").then(($btn) => {
            const id = $btn.val();
          cy.get("#log-out").click();
          cy.visit("/sessions/new");
    
          cy.get("#email").type("someone4@example.com");
          cy.get("#password").type("password");
          cy.get("#submit").click();
          cy.visit("users/" + id);
        cy.get("#add-friend").submit();
        });
      cy.get(".status").should("contain", "Awaiting");
      
      // cy.get('.title').should("contain", "Timeline");
    });
    it("A user accepts a friend request", () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#firstName").type("first name example");
        cy.get("#lastName").type("exampleLastName");
        cy.get("#email").type("someone5@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
  
        cy.visit("/users/new");
        cy.get("#firstName").type("Adam");
        cy.get("#lastName").type("Apple");
        cy.get("#email").type("someone6@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    
        // sign in
        cy.visit("/sessions/new");
    
        cy.get("#email").type("someone5@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.get("#user").then(($btn) => {
            const id = $btn.val();
        cy.get("#log-out").click();
        cy.visit("/sessions/new");
        cy.get("#email").type("someone6@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.visit("/users/" + id);
        cy.get("#add-friend").submit();
        });
        cy.get("#log-out").click();
        cy.visit("/sessions/new");
        cy.get("#email").type("someone5@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.visit("/users/index");
        cy.get(".friend-requests").click();
        cy.get('.title').should('contain', 'These are your pending friend requests');
        cy.get('#confirm-request').submit();
        cy.get('.title').should('contain', "You're all up to date");
      });
  });