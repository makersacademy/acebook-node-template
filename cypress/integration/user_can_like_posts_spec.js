describe("Timeline Likes", () => {
    it("can see likes count on a new post", () => {
        // sign up
        cy.task("wipe_database");
        cy.visit("/users/new");
        cy.get("#email").type("tester@email.com");
        cy.get("#password").type("password123");
        cy.get("#submit").click();

        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("tester@email.com");
        cy.get("#password").type("password123");
        cy.get("#submit").click();

        // submit a post
        cy.visit("/posts");
        cy.contains("New post").click();

        cy.get("#new-post-form").find('[type="text"]').type("Testing time 1234");
        cy.get("#new-post-form").submit();

        cy.get(".posts").should("contain", "Testing time 1234");

        // Assert that we can see the likes count
        cy.get(".posts").should("contain", "0 likes");
        cy.get("button").click();
        cy.wait(1000);
        // Assert that we can see the updated likes count
        cy.get(".posts").should("contain", "1 likes");
    });

    it("can see likes count on a new post with two existing posts", () => {
        // sign up
        cy.task("wipe_database");
        cy.visit("/users/new");
        cy.get("#email").type("tester@email.com");
        cy.get("#password").type("password123");
        cy.get("#submit").click();

        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("tester@email.com");
        cy.get("#password").type("password123");
        cy.get("#submit").click();


        cy.visit("/posts");

        // submit first post
        cy.contains("New post").click();
        cy.get("#new-post-form").find('[type="text"]').type("Testing time 1");
        cy.get("#new-post-form").submit();

        cy.get(".posts").should("contain", "Testing time 1");

        // submit second post
        cy.contains("New post").click();
        cy.get("#new-post-form").find('[type="text"]').type("Testing time 2");
        cy.get("#new-post-form").submit();

        cy.get(".posts").should("contain", "Testing time 2");
        cy.get("button:first").click();

        // Assert that we can see the likes count
        cy.get(".posts").should("contain", "0 likes");

        // Assert that we can see the updated likes count
        cy.get(".posts").should("contain", "1 like");
    });
});
