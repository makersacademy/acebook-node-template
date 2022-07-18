import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can submit a post and see the date and time of it", () => {
    // sign up
    signUp();

    // sign in
    signIn();


    const timeBeforePost = new Date();
    // submit a post
    submitPost();
    
    // const date = today.getFullYear();

    cy.get(".datestamp").first().invoke('text').then(dateText => {
      console.log(dateText)
      const date = new Date(dateText);
      
      const timeAfterPost = new Date();

      expect(date).to.be.lte(timeAfterPost);
      expect(date).to.be.gte(timeBeforePost);
  });

    //cy.get(".datestamp").first() //.should("have.text", `${range}`);
    // checked test, passed
  });
});
