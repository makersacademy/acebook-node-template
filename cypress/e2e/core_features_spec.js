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
    sitePage.shouldContain(".posts", "THIS IS NEWER")
})

it('4) Can See Likes Counts On Post', () => {
    sitePage.LoginAs("test@test.com", "password123");
    sitePage.createPostWith("THIS IS NEWER");
    sitePage.shouldContain(".posts", "THIS IS NEWER")
    sitePage.likePost(0)
    cy.get(".post-likes").eq(0).should("contain", "1 likes")
})

it('5) Can See Posts In Reverse Order', () => {
    sitePage.seed_db(); // DB reseeded to ensure posts are clear and not clashing during tests
    sitePage.signupAndSignInAs("test@test.com", "testerman", "password123");
    sitePage.createPostWith("THIS IS OLDER");
    sitePage.shouldContain(".posts", "THIS IS OLDER")
    sitePage.createPostWith("THIS IS NEWER");
    sitePage.shouldContain(".posts", "THIS IS NEWER")
    cy.get('.post-message').then($elements => {
        const textArray = Array.from($elements).map(element => Cypress.$(element).text());
    expect(textArray).to.deep.equal(['THIS IS NEWER', 'THIS IS OLDER']);
    })
})

it('6) Can See Multiple Different Likes Counts On Posts', () => {
    sitePage.seed_db(); // DB reseeded to ensure posts are clear and not clashing during tests
    sitePage.signupAndSignInAs("test@test.com", "testerman", "password123");
    sitePage.createPostWith("THIS IS OLDER");
    sitePage.createPostWith("THIS IS NEWER");
    sitePage.shouldContain(".posts", "THIS IS OLDER")
    sitePage.shouldContain(".posts", "THIS IS NEWER")
    sitePage.likePost(1)
    cy.get(".post-likes").eq(0).should("contain", "0 likes") // .eq(0) checks first instance of a post on the page
    cy.get(".post-likes").eq(1).should("contain", "1 likes") // .eq(1) checks second instance of a post on the page
})

it('7) User can like another users post & Likes add up', () => {
    sitePage.seed_db(); // DB reseeded to ensure posts are clear and not clashing during tests
    sitePage.signupAndSignInAs("test1@test.com", "tester1", "password123"); // First test user creation
    sitePage.createPostWith("TEST 1 POST");
    sitePage.likePost(0) // Likes the first visible post on the page
    sitePage.logOut() // Log out of first account
    sitePage.signupAndSignInAs("test2@test.com", "tester2", "password123"); // Second test user creation
    sitePage.likePost(0)
    cy.get(".post-likes").eq(0).should("contain", "2 likes")
    sitePage.shouldContain(".liked-by-tooltip", "tester1")
    sitePage.shouldContain(".liked-by-tooltip", "tester2")
})
});
