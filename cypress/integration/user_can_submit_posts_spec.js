//const { json } = require("express/lib/response");

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    
    cy.signUp()

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#posts").should("contain", "Hello, world!");
    cy.get("#postedBy").should("contain", "someone123");

    // 1. Extract date/time from page in variable
    cy.get('#createdAt').then(($createdAt) => {
      cy.log('$createdAt:' +$createdAt.text());

      // 2. Convert date/time string to Date format
      
      const postedTime = Date.parse($createdAt.text());
      cy.log('postedTime:' +postedTime);

      // 3. Store curent date/time in variable
      const currentTime = Date.now();
      cy.log('currentTime:' +currentTime);

      // 4. Get difference in time in seconds
      const differenceInSeconds = currentTime - postedTime;
      cy.log('differenceInSeconds:' +differenceInSeconds);

      // 5. Check if less than 50 seconds
      cy.wrap(differenceInSeconds).should('be.lt', 5000);
    });

  });
});
