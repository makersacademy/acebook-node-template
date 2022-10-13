describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    const fakeEmail = (length) => {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
     return result;
    }

    const randomEmail = `${fakeEmail(10)}@example.com`

    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type(randomEmail);
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
