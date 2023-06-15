class sitePage {

    elements ={
        postURL : "/posts",
        newPostUrl : "/posts/new",
        signUpURL: "/users/new",
        signInUrl: "/sessions/new",

        enterEmail : () => cy.get("#email"),
        enterPassword : () => cy.get("#password"),
        enterUsername : () => cy.get("#username"),
        detailsSubmitButton : () => cy.get("#submit"),
        newPostButton : () => cy.get(".new-post-link"),
        newPostInput : () => cy.get("#new-post-form").find('[type="text"]'),
        newPostSubmit : () => cy.get("#new-post-form").submit(),
        likeButton : () => cy.get('button[class="like-button"]'),
        //likeButtonSubmit : () => cy.get("#like-button").submit(),
        numberOfLikes : () => cy.get(".post-likes")
    }

    seed_db(){
            cy.exec("npm run seed");
    }

    signupAndSignInAs(email, username, password){
        cy.visit(this.elements.signUpURL);
        this.elements.enterEmail().type(email);
        this.elements.enterPassword().type(password);
        this.elements.enterUsername().type(username);
        this.elements.detailsSubmitButton().click();
        this.elements.enterEmail().type(email);
        this.elements.enterPassword().type(password);
        this.elements.detailsSubmitButton().click();
    }
    
    LoginAs(email, password){
        cy.visit(this.elements.signInUrl);
        this.elements.enterEmail().type(email);
        this.elements.enterPassword().type(password);
        this.elements.detailsSubmitButton().click();
    }
    
    createPostWith(input){
        this.elements.newPostButton().click();
        this.elements.newPostInput().type(input);
        this.elements.newPostSubmit();
    }

    likeLatestPost(){
        this.elements.likeButton().eq(0).click({ multiple: true });
    }
}
module.exports = new sitePage();
