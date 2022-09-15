describe("Profile page", () => {
	it("A user can load a profile page", () => {
		// delete all table entries
		cy.request("DELETE", "http://localhost:3030/admin/reset", {
			user: "admin",
			password: "password",
		});

		// sign up
		cy.visit("/users/new");
		cy.get("#first-name").type("some");
		cy.get("#last-name").type("one");
		cy.get("#username").type("someone");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign in
		cy.visit("/");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#login").click();

		cy.visit("/profiles/someone");
		cy.get("#profile-header").contains("someone's profile");
	});

	it("Should load the logo.", () => {
		// sign up
		cy.visit("/users/new");
		cy.get("#first-name").type("some");
		cy.get("#last-name").type("one");
		cy.get("#username").type("someone");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign in
		cy.visit("/");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#login").click();

		cy.visit("/profiles/someone");
		cy.get('div[class="logo"]').find("img").should("be.visible");
	});

	it("Should load the full name on the profile", () => {
		// sign up
		cy.visit("/users/new");
		cy.get("#first-name").type("some");
		cy.get("#last-name").type("one");
		cy.get("#username").type("someone");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign in
		cy.visit("/");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#login").click();

		cy.visit("/profiles/someone");
		cy.get("#full-name").contains("some one");
	});
});
