class sitePage {
  elements = {
    postURL: "/posts",
    newPostUrl: "/posts/new",
    signUpURL: "/users/new",
    signInUrl: "/sessions/new",

    enterEmail: () => cy.get("#email"),
    enterPassword: () => cy.get("#password"),
    enterUsername: () => cy.get("#username"),
    detailsSubmitButton: () => cy.get("#submit"),
    newPostInput: () => cy.get("#message"),
    newPostSubmit: () => cy.get("#new-post-form").submit(),
    likeButton: () => cy.get('button[class="like-button"]'),
    numberOfLikes: () => cy.get(".post-likes"),
    logOutButton: () => cy.get("a.nav-link:nth-child(2)"),
  };

  seed_db() {
    cy.exec("npm run seed");
  }

  shouldContain(element, value) {
    cy.get(element).should("contain", value);
  }

  signupAndSignInAs(email, username, password) {
    cy.visit(this.elements.signUpURL);
    this.elements.enterEmail().type(email);
    this.elements.enterPassword().type(password);
    this.elements.enterUsername().type(username);
    this.elements.detailsSubmitButton().click();
    this.elements.enterEmail().type(email);
    this.elements.enterPassword().type(password);
    this.elements.detailsSubmitButton().click();
  }

  LoginAs(email, password) {
    cy.visit(this.elements.signInUrl);
    this.elements.enterEmail().type(email);
    this.elements.enterPassword().type(password);
    this.elements.detailsSubmitButton().click();
  }

  createPostWith(input) {
    this.elements.newPostInput().type(input);
    this.elements.newPostSubmit();
  }

  likePost(arrayPosition) {
    this.elements.likeButton().eq(arrayPosition).click({ multiple: true });
  }

  logOut() {
    this.elements.logOutButton().click();
  }
}
module.exports = new sitePage();
