import sitePage, { LoginAs } from "./site_page"


// We will ideally seed the test DB before running tests

it('Can sign in and redirect to /posts', () => {

    sitePage.signupAndSignInWithInputs("test@test.com", "testerman", "password123");
    cy.url().should("include", "/posts");
    
})

// When test blocks are separated you will need to login again

it('can submit new post and see it', () => {
    sitePage.LoginAs("test@test.com", "password123")
    sitePage.createPostWithGivenInput("THIS IS NEWER");
})


