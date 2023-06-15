import sitePage, { LoginAs } from "../page_objects/site_page"

before(() => {
sitePage.seed_db();
})

// The Database is Seeded/Dropped as Empty by Default

// When test blocks are separated the session is cleared so you may 
// need to use the LoginAs() method provided to test features
// which are behind signup/login wall.

describe("Test Core Site Feature Functionality", () => {

it('1) Can Access Homepage', () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
})

it('2) Can Signup and Signin', () => {
    sitePage.signupAndSignInAs("test@test.com", "testerman", "password123");
    cy.url().should("include", "/posts");
    
})

it('3) Can Make a Post and See It', () => {
    sitePage.LoginAs("test@test.com", "password123")
    sitePage.createPostWith("THIS IS NEWER");
    cy.get(".posts").should("contain", "THIS IS NEWER")
})

it('4) Can See Likes Counts On Post', () => {
    sitePage.LoginAs("test@test.com", "password123");
    sitePage.createPostWith("THIS IS NEWER");
    cy.get(".posts").should("contain", "THIS IS NEWER")
    sitePage.likeLatestPost()
    cy.get(".post-likes").eq(0).should("contain", "1 likes")
})

it('5) Can See Posts In Reverse Order', () => {
    sitePage.seed_db();
    sitePage.signupAndSignInAs("test@test.com", "testerman", "password123");
    sitePage.createPostWith("THIS IS OLDER");
    cy.get(".posts").should("contain", "THIS IS OLDER")
    sitePage.createPostWith("THIS IS NEWER");
    cy.get(".posts").should("contain", "THIS IS NEWER")
    cy.get('.post-message').then($elements => {
        const textArray = Array.from($elements).map(element => Cypress.$(element).text());
    expect(textArray).to.deep.equal(['THIS IS NEWER', 'THIS IS OLDER']);
    })
})

it('6) Can See Multiple Different Likes Counts On Posts', () => {
    sitePage.seed_db();
    sitePage.signupAndSignInAs("test@test.com", "testerman", "password123");
    sitePage.createPostWith("THIS IS OLDER");
    sitePage.createPostWith("THIS IS NEWER");
    cy.get(".posts").should("contain", "THIS IS OLDER")
    cy.get(".posts").should("contain", "THIS IS NEWER")
    sitePage.likeLatestPost()
    cy.get(".post-likes").eq(0).should("contain", "1 likes")
    cy.get(".post-likes").eq(1).should("contain", "0 likes")
})
});
