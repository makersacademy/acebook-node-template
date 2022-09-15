describe("Add Friend button status", () => {
	it("add-friend-button only appears on a non-friend's profile ", () => {
		// delete all table entries
		cy.request("DELETE", "http://localhost:3030/admin/reset", {
			user: "admin",
			password: "password",
		});

		// sign up
		cy.visit("/users/new");
		cy.get("#username").type("billy");
		cy.get("#email").type("billy@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign up
		cy.get(".signup-button").click();
		cy.get("#username").type("simon");
		cy.get("#email").type("simon@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign in
		cy.visit("/");
		cy.get("#email").type("billy@example.com");
		cy.get("#password").type("password");
		cy.get("#login").click();

		//  visit non-friend and button appears
		// visit friend and doesnt not appear, friends! appears
		// visit own profile, does not appear

		// clicking add friend button so that "friends ✔️" appears
		cy.visit("/profiles/simon");
		cy.get("#add-friend-button").click();
		// cy.visit("/profiles/simon");
		cy.get("#add-friend-button").should("not.exist");
		cy.get("#current-friend-message").should("contain", "friends ✔️");

		// visiting own profile to add buttons disappears, and "friends ✔️" does not appear
		cy.visit("/profiles/billy");
		cy.get("#profile-header").contains("billy's profile");
		cy.get("#add-friend-button").should("not.exist");
		cy.get("#current-friend-message").should("not.exist");
	});
});
