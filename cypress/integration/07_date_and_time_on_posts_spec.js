import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can submit a post and see the date and time of it", () => {
    signUp();
    signIn();

    const timeBeforePost = new Date();

    submitPost();

    cy.get(".datestamp").first().invoke('text').then(dateText => {
      const date = new Date(dateText);

      const timeAfterPost = new Date();

      expect(date).to.be.lte(timeAfterPost);
      expect(date).to.be.gte(timeBeforePost);
    });
  });
});
